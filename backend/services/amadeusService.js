const axios = require('axios');

class AmadeusService {
  constructor() {
    this.baseURL = process.env.AMADEUS_BASE_URL || 'https://test.api.amadeus.com';
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Authenticate with Amadeus API
   * Tokens are valid for ~30 minutes
   */
  async authenticate() {
    // Return cached token if still valid
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

      console.log('✅ Amadeus authentication successful');
      return this.accessToken;
    } catch (error) {
      console.error('❌ Amadeus authentication failed:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }

  /**
   * Search for flight offers
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
      console.error('Flight search failed:', error.response?.data || error.message);
      throw this.handleAmadeusError(error);
    }
  }

  /**
   * Search hotels by city code
   */
  async searchHotels({
    cityCode,
    checkInDate,
    checkOutDate,
    adults = 1,
    roomQuantity = 1
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
      console.error('Hotel search failed:', error.response?.data || error.message);
      throw this.handleAmadeusError(error);
    }
  }

  /**
   * Get location suggestions for autocomplete
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
      console.error('Location search failed:', error.response?.data || error.message);
      return [];
    }
  }

  /**
   * Get airline information
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
      console.error('Airline lookup failed:', error.response?.data || error.message);
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

  /**
   * Calculate nights between dates
   */
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

    if (error.response?.status === 401) {
      this.accessToken = null; // Clear token to force re-auth
      return new Error('Authentication failed. Please check API credentials.');
    }

    return new Error('An error occurred while searching. Please try again.');
  }
}

module.exports = new AmadeusService();
