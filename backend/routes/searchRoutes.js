const express = require('express');
const router = express.Router();
const amadeusService = require('../services/amadeusService');
const rateLimit = require('express-rate-limit');

// Rate limiting for search endpoints
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: { error: 'Too many search requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
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

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departureDate)) {
      return res.status(400).json({
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    // Validate departure date is in future
    if (new Date(departureDate) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        error: 'Departure date must be in the future'
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

    // Validate dates
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(checkInDate) || !dateRegex.test(checkOutDate)) {
      return res.status(400).json({
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    // Validate check-in is before check-out
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({
        error: 'Check-out date must be after check-in date'
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

    if (!keyword || keyword.length < 2) {
      return res.json({ data: [] });
    }

    const locations = await amadeusService.getLocationSuggestions(keyword);
    res.json({ data: locations });
  } catch (error) {
    console.error('Location search error:', error);
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

    if (!codes) {
      return res.status(400).json({ error: 'Missing airline codes parameter' });
    }

    const airlines = await amadeusService.getAirlineInfo(codes);
    res.json({ data: airlines });
  } catch (error) {
    console.error('Airline lookup error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
