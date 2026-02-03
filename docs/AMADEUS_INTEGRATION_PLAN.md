# Amadeus API Integration Plan

## Overview

This document outlines the integration of **Amadeus for Developers API** to enable real-time flight and hotel search functionality in the Travel Agency Template.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Integration](#frontend-integration)
4. [AdminFlights Enhancement](#adminflights-enhancement)
5. [AdminHotels Enhancement](#adminhotels-enhancement)
6. [API Reference](#api-reference)
7. [Error Handling](#error-handling)
8. [Testing](#testing)
9. [Deployment Checklist](#deployment-checklist)

---

## Getting Started

### 1. Create Amadeus Developer Account

1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Sign up for a free account
3. Create a new application in the dashboard
4. Copy your **API Key** and **API Secret**

### 2. Environment Setup

Create or update your environment files:

**Backend (.env)**
```env
AMADEUS_API_KEY=your_api_key_here
AMADEUS_API_SECRET=your_api_secret_here
AMADEUS_BASE_URL=https://test.api.amadeus.com
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install axios express-rate-limit

# Frontend (if not already installed)
cd frontend
npm install axios
```

---

## Backend Implementation

### File Structure

```
backend/
├── services/
│   └── amadeusService.js    # Amadeus API wrapper
├── routes/
│   └── searchRoutes.js      # Search endpoints
├── controllers/
│   └── searchController.js  # Request handlers
└── middleware/
    └── rateLimiter.js       # API rate limiting
```

### Amadeus Service

```javascript
// filepath: backend/services/amadeusService.js

const axios = require('axios');

class AmadeusService {
  constructor() {
    this.baseURL = process.env.AMADEUS_BASE_URL || 'https://test.api.amadeus.com';
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Authenticate with Amadeus API
   * Tokens are valid for 30 minutes
   */
  async authenticate() {
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/security/oauth2/token`,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_API_KEY,
          client_secret: process.env.AMADEUS_API_SECRET
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      this.accessToken = response.data.access_token;
      // Set expiry 1 minute before actual expiry for safety
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000;
      
      return this.accessToken;
    } catch (error) {
      console.error('Amadeus authentication failed:', error.response?.data);
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }

  /**
   * Search for flight offers
   * @param {Object} params - Search parameters
   */
  async searchFlights({
    origin,
    destination,
    departureDate,
    returnDate,
    adults = 1,
    children = 0,
    infants = 0,
    travelClass = 'ECONOMY',
    nonStop = false,
    maxResults = 20
  }) {
    const token = await this.authenticate();

    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      travelClass,
      nonStop,
      max: maxResults
    };

    if (returnDate) params.returnDate = returnDate;
    if (children > 0) params.children = children;
    if (infants > 0) params.infants = infants;

    try {
      const response = await axios.get(
        `${this.baseURL}/v2/shopping/flight-offers`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return this.transformFlightResults(response.data);
    } catch (error) {
      console.error('Flight search failed:', error.response?.data);
      throw this.handleAmadeusError(error);
    }
  }

  /**
   * Search hotels by city
   * @param {Object} params - Search parameters
   */
  async searchHotels({
    cityCode,
    checkInDate,
    checkOutDate,
    adults = 1,
    roomQuantity = 1,
    ratings,
    priceRange
  }) {
    const token = await this.authenticate();

    try {
      // Step 1: Get hotels in the city
      const hotelsResponse = await axios.get(
        `${this.baseURL}/v1/reference-data/locations/hotels/by-city`,
        {
          params: {
            cityCode,
            radius: 50,
            radiusUnit: 'KM',
            hotelSource: 'ALL'
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!hotelsResponse.data.data?.length) {
        return { hotels: [], meta: { count: 0 } };
      }

      // Take top 20 hotels
      const hotelIds = hotelsResponse.data.data
        .slice(0, 20)
        .map(h => h.hotelId);

      // Step 2: Get offers for these hotels
      const offersResponse = await axios.get(
        `${this.baseURL}/v3/shopping/hotel-offers`,
        {
          params: {
            hotelIds: hotelIds.join(','),
            checkInDate,
            checkOutDate,
            adults,
            roomQuantity
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return this.transformHotelResults(offersResponse.data);
    } catch (error) {
      console.error('Hotel search failed:', error.response?.data);
      throw this.handleAmadeusError(error);
    }
  }

  /**
   * Get location suggestions for autocomplete
   * @param {string} keyword - Search keyword
   */
  async getLocationSuggestions(keyword) {
    if (!keyword || keyword.length < 2) return [];

    const token = await this.authenticate();

    try {
      const response = await axios.get(
        `${this.baseURL}/v1/reference-data/locations`,
        {
          params: {
            keyword,
            subType: 'CITY,AIRPORT',
            'page[limit]': 10
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data.data?.map(location => ({
        code: location.iataCode,
        name: location.name,
        cityName: location.address?.cityName,
        countryCode: location.address?.countryCode,
        type: location.subType,
        displayName: `${location.name} (${location.iataCode})`
      })) || [];
    } catch (error) {
      console.error('Location search failed:', error.response?.data);
      return [];
    }
  }

  /**
   * Get airline information
   * @param {string} airlineCodes - Comma-separated airline codes
   */
  async getAirlineInfo(airlineCodes) {
    const token = await this.authenticate();

    try {
      const response = await axios.get(
        `${this.baseURL}/v1/reference-data/airlines`,
        {
          params: { airlineCodes },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data.data;
    } catch (error) {
      return [];
    }
  }

  /**
   * Transform Amadeus flight response to app format
   */
  transformFlightResults(data) {
    const { data: offers, dictionaries } = data;

    return {
      flights: offers?.map(offer => ({
        id: offer.id,
        price: {
          total: parseFloat(offer.price.total),
          currency: offer.price.currency,
          perAdult: parseFloat(offer.travelerPricings?.[0]?.price?.total || offer.price.total)
        },
        itineraries: offer.itineraries.map(itinerary => ({
          duration: itinerary.duration,
          segments: itinerary.segments.map(segment => ({
            departure: {
              airport: segment.departure.iataCode,
              terminal: segment.departure.terminal,
              time: segment.departure.at
            },
            arrival: {
              airport: segment.arrival.iataCode,
              terminal: segment.arrival.terminal,
              time: segment.arrival.at
            },
            airline: segment.carrierCode,
            airlineName: dictionaries?.carriers?.[segment.carrierCode] || segment.carrierCode,
            flightNumber: `${segment.carrierCode}${segment.number}`,
            aircraft: dictionaries?.aircraft?.[segment.aircraft.code] || segment.aircraft.code,
            duration: segment.duration,
            class: segment.cabin
          }))
        })),
        seatsAvailable: offer.numberOfBookableSeats,
        lastTicketingDate: offer.lastTicketingDate
      })) || [],
      meta: {
        count: offers?.length || 0,
        carriers: dictionaries?.carriers || {}
      }
    };
  }

  /**
   * Transform Amadeus hotel response to app format
   */
  transformHotelResults(data) {
    return {
      hotels: data.data?.map(hotel => ({
        id: hotel.hotel.hotelId,
        name: hotel.hotel.name,
        rating: hotel.hotel.rating,
        location: {
          latitude: hotel.hotel.latitude,
          longitude: hotel.hotel.longitude,
          address: hotel.hotel.address
        },
        offers: hotel.offers?.map(offer => ({
          id: offer.id,
          checkIn: offer.checkInDate,
          checkOut: offer.checkOutDate,
          room: {
            type: offer.room.type,
            description: offer.room.description?.text
          },
          price: {
            total: parseFloat(offer.price.total),
            currency: offer.price.currency,
            perNight: parseFloat(offer.price.total) / 
              this.calculateNights(offer.checkInDate, offer.checkOutDate)
          },
          cancellation: offer.policies?.cancellation
        })) || []
      })) || [],
      meta: {
        count: data.data?.length || 0
      }
    };
  }

  calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
  }

  /**
   * Handle Amadeus API errors
   */
  handleAmadeusError(error) {
    const amadeusError = error.response?.data?.errors?.[0];
    
    if (amadeusError) {
      return new Error(`${amadeusError.title}: ${amadeusError.detail}`);
    }
    
    return new Error('An error occurred while searching. Please try again.');
  }
}

module.exports = new AmadeusService();
```

### Search Routes

```javascript
// filepath: backend/routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const amadeusService = require('../services/amadeusService');

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: { error: 'Too many search requests, please try again later.' }
});

/**
 * @route   GET /api/search/flights
 * @desc    Search for flight offers
 * @access  Public
 */
router.get('/flights', searchLimiter, async (req, res) => {
  try {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass,
      nonStop
    } = req.query;

    // Validation
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        error: 'Missing required parameters: origin, destination, departureDate'
      });
    }

    const results = await amadeusService.searchFlights({
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      departureDate,
      returnDate,
      adults: parseInt(adults) || 1,
      children: parseInt(children) || 0,
      infants: parseInt(infants) || 0,
      travelClass: travelClass?.toUpperCase() || 'ECONOMY',
      nonStop: nonStop === 'true'
    });

    res.json(results);
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/search/hotels
 * @desc    Search for hotel offers
 * @access  Public
 */
router.get('/hotels', searchLimiter, async (req, res) => {
  try {
    const {
      cityCode,
      checkInDate,
      checkOutDate,
      adults,
      roomQuantity
    } = req.query;

    // Validation
    if (!cityCode || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        error: 'Missing required parameters: cityCode, checkInDate, checkOutDate'
      });
    }

    const results = await amadeusService.searchHotels({
      cityCode: cityCode.toUpperCase(),
      checkInDate,
      checkOutDate,
      adults: parseInt(adults) || 1,
      roomQuantity: parseInt(roomQuantity) || 1
    });

    res.json(results);
  } catch (error) {
    console.error('Hotel search error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/search/locations
 * @desc    Get location suggestions for autocomplete
 * @access  Public
 */
router.get('/locations', async (req, res) => {
  try {
    const { keyword } = req.query;
    const locations = await amadeusService.getLocationSuggestions(keyword);
    res.json({ data: locations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/search/airlines
 * @desc    Get airline information
 * @access  Public
 */
router.get('/airlines', async (req, res) => {
  try {
    const { codes } = req.query;
    const airlines = await amadeusService.getAirlineInfo(codes);
    res.json({ data: airlines });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Register Routes in Server

```javascript
// filepath: backend/server.js (add to existing file)

const searchRoutes = require('./routes/searchRoutes');

// ...existing code...

app.use('/api/search', searchRoutes);

// ...existing code...
```

---

## Frontend Integration

### Search Hook

```javascript
// filepath: frontend/src/hooks/useAmadeusSearch.js

import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useAmadeusSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flightResults, setFlightResults] = useState(null);
  const [hotelResults, setHotelResults] = useState(null);

  const searchFlights = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.get(`${API_BASE}/search/flights`, { params });
      setFlightResults(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Flight search failed';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchHotels = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.get(`${API_BASE}/search/hotels`, { params });
      setHotelResults(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Hotel search failed';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLocationSuggestions = useCallback(async (keyword) => {
    if (!keyword || keyword.length < 2) return [];
    
    try {
      const { data } = await axios.get(`${API_BASE}/search/locations`, {
        params: { keyword }
      });
      return data.data || [];
    } catch {
      return [];
    }
  }, []);

  const clearResults = useCallback(() => {
    setFlightResults(null);
    setHotelResults(null);
    setError(null);
  }, []);

  return {
    // State
    loading,
    error,
    flightResults,
    hotelResults,
    
    // Actions
    searchFlights,
    searchHotels,
    getLocationSuggestions,
    clearResults
  };
}
```

### Location Autocomplete Component

```javascript
// filepath: frontend/src/components/LocationAutocomplete.jsx

import { useState, useEffect, useRef } from 'react';
import { MapPin, Plane, Building2 } from 'lucide-react';
import { useAmadeusSearch } from '../hooks/useAmadeusSearch';

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = 'Search city or airport...',
  label,
  required = false
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);
  const { getLocationSuggestions } = useAmadeusSearch();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const results = await getLocationSuggestions(query);
        setSuggestions(results);
        setIsOpen(true);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, getLocationSuggestions]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location) => {
    onChange({
      code: location.code,
      name: location.displayName
    });
    setQuery(location.displayName);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label} {required && '*'}
          </span>
        </label>
      )}
      
      <div className="relative">
        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
        <input
          type="text"
          value={query || value?.name || ''}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="input input-bordered w-full pl-10"
          required={required}
        />
        {isLoading && (
          <span className="loading loading-spinner loading-sm absolute right-3 top-1/2 -translate-y-1/2" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((location, index) => (
            <li key={`${location.code}-${index}`}>
              <button
                type="button"
                onClick={() => handleSelect(location)}
                className="w-full px-4 py-3 text-left hover:bg-base-200 flex items-center gap-3"
              >
                {location.type === 'AIRPORT' ? (
                  <Plane size={18} className="text-primary" />
                ) : (
                  <Building2 size={18} className="text-secondary" />
                )}
                <div>
                  <p className="font-medium">{location.displayName}</p>
                  <p className="text-sm text-base-content/60">
                    {location.cityName}, {location.countryCode}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## AdminFlights Enhancement

Add a "Search Amadeus" feature to import real flight data into `AdminFlights.jsx`:

### New Imports

```javascript
import { useAmadeusSearch } from '../../hooks/useAmadeusSearch';
import LocationAutocomplete from '../../components/LocationAutocomplete';
import { RefreshCw, Download } from 'lucide-react';
```

### New State Variables

```javascript
const { searchFlights, loading: searchLoading, error: searchError, flightResults } = useAmadeusSearch();
const [showSearchModal, setShowSearchModal] = useState(false);
const [searchParams, setSearchParams] = useState({
  origin: null,
  destination: null,
  departureDate: '',
  travelClass: 'ECONOMY'
});
```

### Amadeus Search Handler

```javascript
const handleAmadeusSearch = async (e) => {
  e.preventDefault();
  if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
    return;
  }

  await searchFlights({
    origin: searchParams.origin.code,
    destination: searchParams.destination.code,
    departureDate: searchParams.departureDate,
    travelClass: searchParams.travelClass,
    adults: 1
  });
};
```

### Import Flight Handler

```javascript
const handleImportFlight = (flight) => {
  const segment = flight.itineraries[0].segments[0];
  const newFlight = {
    id: Date.now(),
    airline: segment.airlineName,
    flightNo: segment.flightNumber,
    from: segment.departure.airport,
    to: segment.arrival.airport,
    departure: segment.departure.time,
    arrival: segment.arrival.time,
    price: Math.round(flight.price.total * 1600), // Convert to NGN
    seats: flight.seatsAvailable || 10,
    class: segment.class || 'Economy',
    status: 'available'
  };
  
  setFlights([...flights, newFlight]);
};
```

### Search Button (add to header)

```jsx
<button 
  onClick={() => setShowSearchModal(true)} 
  className="btn btn-secondary gap-2"
>
  <RefreshCw size={18} /> Search Amadeus
</button>
```

### Search Modal Component

```jsx
{showSearchModal && (
  <div className="modal modal-open">
    <div className="modal-box max-w-4xl">
      <button 
        onClick={() => setShowSearchModal(false)} 
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        <X size={20} />
      </button>
      
      <h3 className="font-bold text-lg mb-4">Search Live Flights (Amadeus)</h3>

      <form onSubmit={handleAmadeusSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LocationAutocomplete
            label="From"
            value={searchParams.origin}
            onChange={(loc) => setSearchParams({ ...searchParams, origin: loc })}
            placeholder="Departure city/airport"
            required
          />
          <LocationAutocomplete
            label="To"
            value={searchParams.destination}
            onChange={(loc) => setSearchParams({ ...searchParams, destination: loc })}
            placeholder="Arrival city/airport"
            required
          />
          <div>
            <label className="label">
              <span className="label-text font-medium">Departure Date *</span>
            </label>
            <input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-medium">Class</span>
            </label>
            <select
              value={searchParams.travelClass}
              onChange={(e) => setSearchParams({ ...searchParams, travelClass: e.target.value })}
              className="select select-bordered w-full"
            >
              <option value="ECONOMY">Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First Class</option>
            </select>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={searchLoading}
        >
          {searchLoading ? (
            <><span className="loading loading-spinner loading-sm"></span> Searching...</>
          ) : (
            <><Search size={18} /> Search Flights</>
          )}
        </button>
      </form>

      {searchError && (
        <div className="alert alert-error mt-4">
          <span>{searchError}</span>
        </div>
      )}

      {flightResults?.flights?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">
            Found {flightResults.flights.length} flights
          </h4>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {flightResults.flights.map((flight) => {
              const segment = flight.itineraries[0].segments[0];
              return (
                <div 
                  key={flight.id} 
                  className="p-4 border border-base-300 rounded-lg flex items-center justify-between hover:bg-base-200"
                >
                  <div className="flex items-center gap-4">
                    <Plane size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">
                        {segment.airlineName} {segment.flightNumber}
                      </p>
                      <p className="text-sm text-base-content/60">
                        {segment.departure.airport} → {segment.arrival.airport}
                      </p>
                      <p className="text-xs text-base-content/40">
                        {new Date(segment.departure.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {flight.price.currency} {flight.price.total}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {flight.seatsAvailable} seats
                    </p>
                    <button
                      onClick={() => handleImportFlight(flight)}
                      className="btn btn-sm btn-outline btn-primary mt-2 gap-1"
                    >
                      <Download size={14} /> Import
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="modal-action">
        <button onClick={() => setShowSearchModal(false)} className="btn">
          Close
        </button>
      </div>
    </div>
    <div className="modal-backdrop bg-black/50" onClick={() => setShowSearchModal(false)} />
  </div>
)}
```

---

## AdminHotels Enhancement

Similar integration for hotels in `AdminHotels.jsx`:

### New State

```javascript
const { searchHotels, loading: searchLoading, error: searchError, hotelResults } = useAmadeusSearch();
const [showSearchModal, setShowSearchModal] = useState(false);
const [searchParams, setSearchParams] = useState({
  city: null,
  checkInDate: '',
  checkOutDate: '',
  adults: 1
});
```

### Import Hotel Handler

```javascript
const handleImportHotel = (hotel) => {
  const offer = hotel.offers[0];
  const newHotel = {
    id: Date.now(),
    name: hotel.name,
    location: hotel.location.address?.cityName || 'Unknown',
    rating: parseInt(hotel.rating) || 4,
    pricePerNight: Math.round(offer.price.perNight * 1600), // Convert to NGN
    rooms: 10,
    amenities: ['WiFi', 'Pool', 'Restaurant'],
    status: 'available'
  };
  
  setHotels([...hotels, newHotel]);
};
```

---

## API Reference

### Amadeus APIs Used

| API | Endpoint | Purpose |
|-----|----------|---------|
| **Flight Offers Search** | `GET /v2/shopping/flight-offers` | Search flight prices & availability |
| **Hotel List** | `GET /v1/reference-data/locations/hotels/by-city` | Get hotels in a city |
| **Hotel Offers** | `GET /v3/shopping/hotel-offers` | Get hotel prices & availability |
| **Location Search** | `GET /v1/reference-data/locations` | Airport/city autocomplete |
| **Airline Lookup** | `GET /v1/reference-data/airlines` | Get airline names |

### Rate Limits (Test Environment)

- **10 requests per second**
- **2,000 requests per month** (free tier)

---

## Error Handling

### Common Amadeus Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `38187` | Invalid origin/destination | Verify IATA codes |
| `38188` | Invalid date | Date must be in future |
| `4926` | No flights found | Try different dates/routes |
| `38189` | Too many passengers | Max 9 passengers |

### Error Response Format

```javascript
{
  "errors": [{
    "code": 38187,
    "title": "INVALID FORMAT",
    "detail": "Origin location code is invalid"
  }]
}
```

---

## Testing

### Manual Testing Checklist

- [ ] Authentication works and tokens refresh
- [ ] Flight search returns results
- [ ] Hotel search returns results
- [ ] Location autocomplete works
- [ ] Error messages display correctly
- [ ] Rate limiting prevents abuse
- [ ] Results can be imported to inventory

### Test Search Parameters

```javascript
// Test flight search
{
  origin: 'LOS',           // Lagos
  destination: 'LHR',      // London Heathrow
  departureDate: '2026-03-15',
  adults: 1,
  travelClass: 'ECONOMY'
}

// Test hotel search
{
  cityCode: 'DXB',         // Dubai
  checkInDate: '2026-03-20',
  checkOutDate: '2026-03-25',
  adults: 2,
  roomQuantity: 1
}
```

---

## Deployment Checklist

### Before Going Live

- [ ] Switch from test to production API credentials
- [ ] Update `AMADEUS_BASE_URL` to `https://api.amadeus.com`
- [ ] Implement response caching (Redis recommended)
- [ ] Set up monitoring for API usage
- [ ] Add fallback to mock data when API is down
- [ ] Configure CORS properly
- [ ] Add request logging for debugging
- [ ] Set up error alerting

### Production Environment Variables

```env
AMADEUS_API_KEY=production_api_key
AMADEUS_API_SECRET=production_api_secret
AMADEUS_BASE_URL=https://api.amadeus.com
```

---

## Cost Considerations

### Amadeus Pricing Tiers

| Tier | Monthly Cost | Requests/Month |
|------|-------------|----------------|
| Free | $0 | 2,000 |
| Basic | $99 | 50,000 |
| Pro | Custom | Unlimited |

### Optimization Tips

1. **Cache location data** - Airports/cities rarely change
2. **Limit search results** - Request only needed fields
3. **Debounce autocomplete** - 300ms minimum delay
4. **Batch airline lookups** - Single request for multiple codes

---

## Implementation Timeline

| Week | Tasks |
|------|-------|
| **Week 1** | API setup, authentication, backend service |
| **Week 2** | Flight search endpoint, frontend hook |
| **Week 3** | Hotel search endpoint, autocomplete component |
| **Week 4** | AdminFlights & AdminHotels integration |
| **Week 5** | Customer-facing search pages |
| **Week 6** | Testing, error handling, optimization |

---

## Next Steps

1. Create Amadeus developer account
2. Implement backend service (`amadeusService.js`)
3. Create search routes (`searchRoutes.js`)
4. Build frontend hook (`useAmadeusSearch.js`)
5. Add autocomplete component
6. Integrate with admin pages
7. Build customer search experience
8. Add booking flow

---

*Document Version: 1.0*  
*Created: February 3, 2026*
