import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useAmadeusSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flightResults, setFlightResults] = useState(null);
  const [hotelResults, setHotelResults] = useState(null);

  /**
   * Search for flights
   */
  const searchFlights = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${API_BASE}/search/flights`, { params });
      setFlightResults(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Flight search failed. Please try again.';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search for hotels
   */
  const searchHotels = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${API_BASE}/search/hotels`, { params });
      setHotelResults(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Hotel search failed. Please try again.';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get location suggestions for autocomplete
   */
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

  /**
   * Get airline information
   */
  const getAirlineInfo = useCallback(async (codes) => {
    if (!codes) return [];

    try {
      const { data } = await axios.get(`${API_BASE}/search/airlines`, {
        params: { codes }
      });
      return data.data || [];
    } catch {
      return [];
    }
  }, []);

  /**
   * Clear all results
   */
  const clearResults = useCallback(() => {
    setFlightResults(null);
    setHotelResults(null);
    setError(null);
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
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
    getAirlineInfo,
    clearResults,
    clearError
  };
}
