import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import {
  Plane,
  ChevronDown,
  Plus,
  X,
  Filter,
  Clock,
  Info,
  ChevronUp,
  Briefcase,
} from 'lucide-react';

// --- MOCK DATA GENERATOR ---
const AIRLINES = [
  {
    name: 'Emirates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg',
  },
  {
    name: 'Qatar Airways',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png',
  },
  {
    name: 'British Airways',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/British_Airways_Logo.svg/1200px-British_Airways_Logo.svg.png',
  },
  {
    name: 'Turkish Airlines',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Turkish_Airlines_logo_%282022%29_compact.svg/2048px-Turkish_Airlines_logo_%282022%29_compact.svg.png',
  },
  {
    name: 'Lufthansa',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/2048px-Lufthansa_Logo_2018.svg.png',
  },
  {
    name: 'Air France',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png',
  },
];

const generateRandomTime = () => {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  return {
    hour,
    minute,
    str: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
  };
};

const addDuration = (timeStr, minutes) => {
  const [h, m] = timeStr.split(':').map(Number);
  let totalMinutes = h * 60 + m + minutes;
  let newHour = Math.floor(totalMinutes / 60) % 24;
  let newMinute = totalMinutes % 60;
  return `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
};

const generateSegments = (from, to, startTimeStr, stopType, airline) => {
  const segments = [];
  const layovers = [];
  const flightNum = () =>
    `${airline.name.substring(0, 2).toUpperCase()} ${Math.floor(Math.random() * 900) + 100}`;

  // Helper: Add minutes to time string (00:00 format)
  const addMins = (time, mins) => addDuration(time, mins);

  if (stopType === 'Non-stop') {
    const duration = 360 + Math.floor(Math.random() * 120); // 6-8 hours
    segments.push({
      id: 1,
      from: from || 'DXB',
      to: to || 'LHR',
      departure: startTimeStr,
      arrival: addMins(startTimeStr, duration),
      duration: `${Math.floor(duration / 60)}h ${duration % 60}m`,
      durationVal: duration,
      airline: airline.name,
      flightNumber: flightNum(),
      aircraft: `Boeing 7${Math.floor(Math.random() * 8) + 3}7`,
    });
  } else if (stopType === '1 Stop') {
    const hub = ['DOH', 'FRA', 'CDG', 'AMS'][Math.floor(Math.random() * 4)];

    // Leg 1
    const leg1 = 180 + Math.floor(Math.random() * 60);
    const arr1 = addMins(startTimeStr, leg1);
    segments.push({
      id: 1,
      from: from || 'DXB',
      to: hub,
      departure: startTimeStr,
      arrival: arr1,
      duration: `${Math.floor(leg1 / 60)}h ${leg1 % 60}m`,
      durationVal: leg1,
      airline: airline.name,
      flightNumber: flightNum(),
      aircraft: `Boeing 777`,
    });

    // Layover
    const layoverDur = 90 + Math.floor(Math.random() * 120);
    layovers.push({
      city: hub,
      duration: `${Math.floor(layoverDur / 60)}h ${layoverDur % 60}m`,
      durationVal: layoverDur,
    });

    // Leg 2
    const dep2 = addMins(arr1, layoverDur);
    const leg2 = 180 + Math.floor(Math.random() * 60);
    segments.push({
      id: 2,
      from: hub,
      to: to || 'LHR',
      departure: dep2,
      arrival: addMins(dep2, leg2),
      duration: `${Math.floor(leg2 / 60)}h ${leg2 % 60}m`,
      durationVal: leg2,
      airline: airline.name,
      flightNumber: flightNum(),
      aircraft: `Airbus A320`,
    });
  } else {
    // 2 Stops
    const hubs = ['DOH', 'MUC'];
    let currentDep = startTimeStr;

    // Leg 1
    let dur = 120;
    let arr = addMins(currentDep, dur);
    segments.push({
      id: 1,
      from: from || 'DXB',
      to: hubs[0],
      departure: currentDep,
      arrival: arr,
      duration: `2h 00m`,
      durationVal: dur,
      airline: airline.name,
      flightNumber: flightNum(),
      aircraft: 'Boeing 737',
    });
    layovers.push({ city: hubs[0], duration: '1h 30m', durationVal: 90 });
    currentDep = addMins(arr, 90);

    // Leg 2
    dur = 180;
    arr = addMins(currentDep, dur);
    segments.push({
      id: 2,
      from: hubs[0],
      to: hubs[1],
      departure: currentDep,
      arrival: arr,
      duration: `3h 00m`,
      durationVal: dur,
      airline: airline.name,
      flightNumber: flightNum(),
      aircraft: 'Airbus A380',
    });
    layovers.push({ city: hubs[1], duration: '2h 15m', durationVal: 135 });
    currentDep = addMins(arr, 135);

    // Leg 3
    dur = 140;
    arr = addMins(currentDep, dur);
    segments.push({
      id: 3,
      from: hubs[1],
      to: to || 'LHR',
      departure: currentDep,
      arrival: arr,
      duration: `2h 20m`,
      durationVal: dur,
      airline: airline.name,
      flightNumber: flightNum(),
      aircraft: 'Boeing 777',
    });
  }

  // Calculate total duration
  const totalDurationVal =
    segments.reduce((acc, s) => acc + s.durationVal, 0) +
    layovers.reduce((acc, l) => acc + l.durationVal, 0);
  const finalArrival = segments[segments.length - 1].arrival;

  return { segments, layovers, finalArrival, totalDurationVal };
};

const generateMockFlights = (
  from,
  to,
  date,
  tripType = 'oneWay',
  returnDate = null,
) => {
  const results = [];
  const count = 15;

  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    const isDirect = Math.random() > 0.4;
    const stops = isDirect
      ? 'Non-stop'
      : Math.random() > 0.5
        ? '1 Stop'
        : '2+ Stops';

    const depTime = generateRandomTime();

    // Generate Outbound Segments
    const outboundData = generateSegments(
      from,
      to,
      depTime.str,
      stops,
      airline,
    );

    const price = isDirect
      ? 800 + Math.floor(Math.random() * 500)
      : 500 + Math.floor(Math.random() * 400);
    let finalPrice = price;

    // Inbound flight data for Round Trip
    let inbound = null;
    if (tripType === 'roundTrip') {
      finalPrice = Math.floor(price * 1.8);
      const returnDepTime = generateRandomTime();
      // Generate Inbound Segments (assume same stop type for simplicity)
      const inboundData = generateSegments(
        to || 'LHR',
        from || 'DXB',
        returnDepTime.str,
        stops,
        airline,
      );

      inbound = {
        date: returnDate || getOvermorrow(),
        departure: returnDepTime.str,
        arrival: inboundData.finalArrival,
        duration: `${Math.floor(inboundData.totalDurationVal / 60)}h ${inboundData.totalDurationVal % 60}m`,
        stops: stops,
        airline: airline.name,
        logo: airline.logo,
        from: to || 'LHR',
        to: from || 'DXB',
        segments: inboundData.segments,
        layovers: inboundData.layovers,
      };
    }

    results.push({
      id: i + 1,
      airline: airline.name,
      logo: airline.logo,
      departure: depTime.str,
      arrival: outboundData.finalArrival,
      duration: `${Math.floor(outboundData.totalDurationVal / 60)}h ${outboundData.totalDurationVal % 60}m`,
      durationVal: outboundData.totalDurationVal,
      price: `₦${(finalPrice * 1500).toLocaleString()}`,
      priceVal: finalPrice * 1500,
      stops: stops,
      from: from || 'DXB',
      to: to || 'LHR',
      date: date || new Date().toISOString().split('T')[0],
      segments: outboundData.segments,
      layovers: outboundData.layovers,
      depHour: depTime.hour,
      arrHour: parseInt(outboundData.finalArrival.split(':')[0]),
      inbound: inbound,
    });
  }
  return results.sort((a, b) => a.priceVal - b.priceVal);
};

// Helper functions for date formatting
const formatDateDisplay = (dateString) => {
  if (!dateString) return { day: '', monthYear: '', dayName: '' };
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  return { day, monthYear: `${month}'${year}`, dayName };
};

const getToday = () => new Date().toISOString().split('T')[0];
const getOvermorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toISOString().split('T')[0];
};

// Custom Date Picker Component
const DatePickerField = ({ label, value, onChange, minDate }) => {
  const inputRef = useRef(null);
  const { day, monthYear, dayName } = formatDateDisplay(value);

  const handleClick = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div
      className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-base-content/60 font-medium uppercase tracking-wide">
          {label}
        </label>
        <ChevronDown className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-base-content">{day}</span>
        <span className="text-base font-medium text-base-content">
          {monthYear}
        </span>
      </div>
      <div className="text-xs text-base-content/50 mt-0.5">{dayName}</div>
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      />
    </div>
  );
};

const Flights = () => {
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searched, setSearched] = useState(false);
  const [expandedFlightId, setExpandedFlightId] = useState(null);
  const [allFlights, setAllFlights] = useState([]);

  // Search State
  const [tripType, setTripType] = useState('oneWay');
  const [ticketClass, setTicketClass] = useState('Economy');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState(getToday());
  const [returnDate, setReturnDate] = useState(getOvermorrow());
  const [passengers, setPassengers] = useState(1);

  // Filter & Sort State
  const [filters, setFilters] = useState({
    stops: new Set(),
    airlines: new Set(),
    times: new Set(),
    arrivalTimes: new Set(),
  });
  const [sortBy, setSortBy] = useState('cheapest'); // cheapest, fastest, recommended

  // Multi-city flights state
  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: '', to: '', date: getToday() },
    { id: 2, from: '', to: '', date: getOvermorrow() },
  ]);

  const addMultiCityFlight = () => {
    const newId =
      multiCityFlights.length > 0
        ? Math.max(...multiCityFlights.map((f) => f.id)) + 1
        : 1;
    setMultiCityFlights([
      ...multiCityFlights,
      { id: newId, from: '', to: '', date: '' },
    ]);
  };

  const removeMultiCityFlight = (id) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(
        multiCityFlights.filter((flight) => flight.id !== id),
      );
    }
  };

  const updateMultiCityFlight = (id, field, value) => {
    setMultiCityFlights(
      multiCityFlights.map((flight) =>
        flight.id === id ? { ...flight, [field]: value } : flight,
      ),
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Generate mock data based on inputs
    const flights = generateMockFlights(
      fromLocation,
      toLocation,
      departureDate,
      tripType,
      returnDate,
    );
    setAllFlights(flights);
    setSearched(true);
    // Reset filters
    setFilters({
      stops: new Set(),
      airlines: new Set(),
      times: new Set(),
      arrivalTimes: new Set(),
    });
  };

  // --- Filtering Logic ---
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[category]);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const isTimeMatch = (hour, periods) => {
    if (periods.size === 0) return true;
    let matched = false;
    if (periods.has('Morning') && hour >= 5 && hour < 12) matched = true;
    if (periods.has('Afternoon') && hour >= 12 && hour < 18) matched = true;
    if (periods.has('Evening') && hour >= 18 && hour < 24) matched = true;
    if (periods.has('Night') && hour >= 0 && hour < 5) matched = true;
    return matched;
  };

  const filteredFlights = useMemo(() => {
    return allFlights
      .filter((flight) => {
        // Stops
        if (filters.stops.size > 0 && !filters.stops.has(flight.stops))
          return false;
        // Airlines
        if (filters.airlines.size > 0 && !filters.airlines.has(flight.airline))
          return false;
        // Departure Time
        if (!isTimeMatch(flight.depHour, filters.times)) return false;
        // Arrival Time
        if (!isTimeMatch(flight.arrHour, filters.arrivalTimes)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'cheapest') return a.priceVal - b.priceVal;
        if (sortBy === 'fastest') return a.durationVal - b.durationVal;
        // Recommended: naive mix (cheaper is better, faster is better)
        return a.priceVal + a.durationVal - (b.priceVal + b.durationVal);
      });
  }, [allFlights, filters, sortBy]);

  // Calculate min prices for filters sidebar
  const minPrices = useMemo(() => {
    const prices = { stops: {}, airlines: {} };
    // We calculate based on ALL flights, not just filtered ones, to show available options
    allFlights.forEach((f) => {
      if (!prices.stops[f.stops] || f.priceVal < prices.stops[f.stops])
        prices.stops[f.stops] = f.priceVal;
      if (
        !prices.airlines[f.airline] ||
        f.priceVal < prices.airlines[f.airline]
      )
        prices.airlines[f.airline] = f.priceVal;
    });
    return prices;
  }, [allFlights]);

  return (
    <div className="bg-base-200 min-h-screen pb-12">
      {/* Header / Search Section */}
      <div className="bg-neutral py-12 text-neutral-content pt-20">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSearch}
            className="bg-base-100 p-6 rounded-2xl shadow-lg text-base-content"
          >
            {/* Filter Tabs & Class Selection */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneWay"
                    checked={tripType === 'oneWay'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="radio radio-primary w-4 h-4"
                  />
                  <span className="text-sm font-medium text-base-content/80">
                    One Way
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundTrip"
                    checked={tripType === 'roundTrip'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="radio radio-primary w-4 h-4"
                  />
                  <span className="text-sm font-medium text-base-content/80">
                    Round Trip
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="multiCity"
                    checked={tripType === 'multiCity'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="radio radio-primary w-4 h-4"
                  />
                  <span className="text-sm font-medium text-base-content/80">
                    Multi City
                  </span>
                </label>
              </div>

              <select
                value={ticketClass}
                onChange={(e) => setTicketClass(e.target.value)}
                className="text-sm font-medium text-base-content/80 bg-transparent border-none focus:ring-0 cursor-pointer hover:bg-base-200 p-2 rounded"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              {/* One Way & Round Trip Inputs */}
              {tripType !== 'multiCity' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border border-base-200 rounded-xl p-2 bg-base-200/50">
                  {/* From Field */}
                  <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                    <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                      From
                    </label>
                    <input
                      type="text"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="City or Airport"
                      className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                    />
                    <div className="text-xs text-base-content/50 truncate mt-1">
                      Origin
                    </div>
                  </div>

                  {/* To Field */}
                  <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                    <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                      To
                    </label>
                    <input
                      type="text"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      placeholder="City or Airport"
                      className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                    />
                    <div className="text-xs text-base-content/50 truncate mt-1">
                      Destination
                    </div>
                  </div>

                  {/* Date Field(s) */}
                  {tripType === 'oneWay' ? (
                    <DatePickerField
                      label="Departure"
                      value={departureDate}
                      onChange={setDepartureDate}
                      minDate={getToday()}
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <DatePickerField
                        label="Departure"
                        value={departureDate}
                        onChange={setDepartureDate}
                        minDate={getToday()}
                      />
                      <DatePickerField
                        label="Return"
                        value={returnDate}
                        onChange={setReturnDate}
                        minDate={departureDate}
                      />
                    </div>
                  )}

                  {/* Passengers Field */}
                  <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                    <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                      Passengers
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={passengers}
                        onChange={(e) =>
                          setPassengers(parseInt(e.target.value))
                        }
                        className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="text-xs text-base-content/50 mt-1">
                      {ticketClass}
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-City Inputs */}
              {tripType === 'multiCity' && (
                <div className="flex flex-col gap-3">
                  {multiCityFlights.map((flight, index) => (
                    <div
                      key={flight.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 border border-base-200 rounded-xl p-2 pt-4 bg-base-200/50 relative"
                    >
                      <div className="absolute -top-2 left-4 bg-primary text-primary-content text-xs font-bold px-2 py-0.5 rounded-full">
                        Flight {index + 1}
                      </div>

                      {/* From */}
                      <div className="md:col-span-4 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                        <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                          From
                        </label>
                        <input
                          type="text"
                          value={flight.from}
                          onChange={(e) =>
                            updateMultiCityFlight(
                              flight.id,
                              'from',
                              e.target.value,
                            )
                          }
                          placeholder="Select City"
                          className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                        />
                      </div>

                      {/* To */}
                      <div className="md:col-span-4 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                        <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                          To
                        </label>
                        <input
                          type="text"
                          value={flight.to}
                          onChange={(e) =>
                            updateMultiCityFlight(
                              flight.id,
                              'to',
                              e.target.value,
                            )
                          }
                          placeholder="Select City"
                          className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                        />
                      </div>

                      {/* Date */}
                      <div className="md:col-span-3">
                        <DatePickerField
                          label="Departure"
                          value={flight.date}
                          onChange={(value) =>
                            updateMultiCityFlight(flight.id, 'date', value)
                          }
                          minDate={
                            index === 0
                              ? getToday()
                              : multiCityFlights[index - 1]?.date || getToday()
                          }
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="md:col-span-1 flex items-center justify-center">
                        {multiCityFlights.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeMultiCityFlight(flight.id)}
                            className="p-2 rounded-full bg-error/10 hover:bg-error/20 text-error transition-colors"
                            title="Remove flight"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addMultiCityFlight}
                    className="self-start flex items-center gap-2 text-primary font-bold text-sm hover:text-primary/80 transition-colors px-2"
                  >
                    <Plus className="w-4 h-4" /> Add Flight
                  </button>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button type="submit" className="btn btn-primary-custom">
                  Search Flights
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 mt-8">
        {searched ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-1/4 space-y-4">
              {/* Airlines Filter */}
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
                <h3 className="font-bold text-base-content mb-3 flex items-center gap-2">
                  <Plane size={16} /> Airlines
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Emirates', price: '$950' },
                    { name: 'Qatar Airways', price: '$850' },
                    { name: 'Etihad', price: '$1200' },
                    { name: 'FlyDubai', price: '$600' },
                  ].map((airline, idx) => (
                    <label
                      key={idx}
                      className="flex justify-between items-center cursor-pointer hover:bg-base-200/50 rounded px-1 -mx-1 py-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                          checked={filters.airlines.has(airline.name)}
                          onChange={() =>
                            toggleFilter('airlines', airline.name)
                          }
                        />
                        <span className="text-sm truncate max-w-[100px]">
                          {airline.name}
                        </span>
                      </div>
                      {/* For a real app, calculate dynamic min price per airline. Here using static for simplicity or we can compute it. */}
                      <span className="text-xs text-base-content/60">
                        {airline.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Stops Filter */}
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
                <h3 className="font-bold text-base-content mb-3 flex items-center gap-2">
                  <Filter size={16} /> Stops
                </h3>
                <div className="space-y-2">
                  {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                    <label
                      key={stop}
                      className="flex justify-between items-center cursor-pointer hover:bg-base-200/50 rounded px-1 -mx-1 py-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                          checked={filters.stops.has(stop)}
                          onChange={() => toggleFilter('stops', stop)}
                        />
                        <span className="text-sm">{stop}</span>
                      </div>
                      <span className="text-xs text-base-content/60">
                        {minPrices[stop] ? `$${minPrices[stop]}` : '-'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Departure Time Filter */}
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
                <h3 className="font-bold text-base-content mb-3 flex items-center gap-2">
                  <Clock size={16} /> Departure Time
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                    <button
                      key={time}
                      onClick={() => toggleFilter('times', time)}
                      className={`border rounded p-2 text-center transition-colors ${
                        filters.times.has(time)
                          ? 'bg-primary text-primary-content border-primary'
                          : 'border-base-200 hover:bg-base-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Arrival Time Filter */}
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
                <h3 className="font-bold text-base-content mb-3 flex items-center gap-2">
                  <Clock size={16} /> Arrival Time
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                    <button
                      key={time}
                      onClick={() => toggleFilter('arrivalTimes', time)}
                      className={`border rounded p-2 text-center transition-colors ${
                        filters.arrivalTimes.has(time)
                          ? 'bg-primary text-primary-content border-primary'
                          : 'border-base-200 hover:bg-base-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{time}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Results Column */}
            <div className="w-full lg:w-3/4 space-y-4">
              {/* Sorting Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div
                  onClick={() => setSortBy('cheapest')}
                  className={`p-3 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                    sortBy === 'cheapest'
                      ? 'bg-primary/10 border border-primary text-primary'
                      : 'bg-base-100 border border-base-200 text-base-content hover:border-primary/50'
                  }`}
                >
                  {sortBy === 'cheapest' && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-content text-[10px] px-2 py-0.5 rounded-bl">
                      Selected
                    </div>
                  )}
                  <div className="font-bold">Cheapest</div>
                  <div className="text-sm font-semibold opacity-80 decoration-inherit">
                    Best Price
                  </div>
                </div>
                <div
                  onClick={() => setSortBy('fastest')}
                  className={`p-3 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                    sortBy === 'fastest'
                      ? 'bg-primary/10 border border-primary text-primary'
                      : 'bg-base-100 border border-base-200 text-base-content hover:border-primary/50'
                  }`}
                >
                  {sortBy === 'fastest' && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-content text-[10px] px-2 py-0.5 rounded-bl">
                      Selected
                    </div>
                  )}
                  <div className="font-bold">Fastest</div>
                  <div className="text-sm font-semibold opacity-80 decoration-inherit">
                    Shortest Duration
                  </div>
                </div>
                <div
                  onClick={() => setSortBy('recommended')}
                  className={`p-3 rounded-2xl cursor-pointer relative overflow-hidden transition-all ${
                    sortBy === 'recommended'
                      ? 'bg-primary/10 border border-primary text-primary'
                      : 'bg-base-100 border border-base-200 text-base-content hover:border-primary/50'
                  }`}
                >
                  {sortBy === 'recommended' && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-content text-[10px] px-2 py-0.5 rounded-bl">
                      Selected
                    </div>
                  )}
                  <div className="font-bold">Recommended</div>
                  <div className="text-sm font-semibold opacity-80 decoration-inherit">
                    Best Value
                  </div>
                </div>
              </div>

              {/* List */}
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="bg-base-100 rounded-2xl shadow border border-base-300 transition-all hover:shadow-md"
                  >
                    <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                      {/* Airline Info */}
                      <div className="flex items-center gap-4 md:w-1/4">
                        <div className="bg-white w-16 h-16 flex items-center justify-center bg-base-200 rounded p-2">
                          <img
                            src={flight.logo}
                            alt={flight.airline}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <span className="font-bold text-base-content">
                          {flight.airline}
                        </span>
                      </div>

                      {/* Flight Connectors */}
                      <div className="flex-1 text-center md:text-left flex flex-col md:flex-row items-center justify-center gap-8">
                        <div>
                          <div className="text-xl font-bold text-base-content">
                            {flight.departure}
                          </div>
                          <div className="text-sm text-base-content/60">
                            DXB
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-base-content/60">
                            {flight.duration}
                          </span>
                          <div className="w-24 h-[2px] bg-base-300 my-1 relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-200 px-1">
                              <Plane
                                size={14}
                                className="text-base-content/40 rotate-90"
                              />
                            </div>
                          </div>
                          <span className="text-xs text-primary font-medium">
                            {flight.stops}
                          </span>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-base-content">
                            {flight.arrival}
                          </div>
                          <div className="text-sm text-base-content/60">
                            LHR
                          </div>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="md:w-1/5 text-center md:text-right">
                        <div className="text-2xl font-bold text-accent mb-2">
                          {flight.price}
                        </div>
                        <button 
                          onClick={() => setSelectedFlight(flight)} 
                          className="bg-primary hover:bg-primary/90 text-primary-content px-6 py-2 rounded-full w-full font-semibold transition-colors mb-2"
                        >
                          Book
                        </button>
                        <button
                          onClick={() =>
                            setExpandedFlightId(
                              expandedFlightId === flight.id ? null : flight.id,
                            )
                          }
                          className="text-xs text-primary font-bold flex items-center justify-end gap-1 w-full hover:underline"
                        >
                          {expandedFlightId === flight.id
                            ? 'Hide Details'
                            : 'Flight Details'}
                          {expandedFlightId === flight.id ? (
                            <ChevronUp size={12} />
                          ) : (
                            <ChevronDown size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedFlightId === flight.id && (
                      <div className="border-t border-base-200 bg-base-100 p-6 animation-fade-in cursor-default rounded-2xl">
                        <div className="flex flex-col xl:flex-row gap-8">
                          {/* Outbound Column */}
                          <div className="flex-1">
                            {/* Header */}
                            <div className="flex justify-between items-baseline mb-6 border-b border-base-200 pb-2">
                              <h4 className="font-bold text-lg text-base-content">
                                {flight.from} to {flight.to},{' '}
                                <span className="font-normal text-base-content/70">
                                  {new Date(flight.date).toLocaleDateString(
                                    'en-US',
                                    { day: '2-digit', month: 'short' },
                                  )}
                                </span>
                              </h4>
                              <span className="font-bold text-base-content text-sm">
                                Outbound
                              </span>
                            </div>

                            {flight.segments.map((segment, index) => (
                              <div
                                key={segment.id}
                                className="mb-6 last:mb-0 relative"
                              >
                                {/* Connecting Flight Badge */}
                                {index > 0 && (
                                  <span className="absolute -top-3 right-0 bg-base-200 text-base-content/60 text-[10px] font-bold px-2 py-1 rounded">
                                    Connecting Flight
                                  </span>
                                )}

                                {/* Layover Bar */}
                                {index > 0 && flight.layovers[index - 1] && (
                                  <div className="bg-info/10 text-info-content text-xs font-bold py-2 px-4 rounded mb-6 flex justify-between items-center">
                                    <span>
                                      Change of planes • Layover in{' '}
                                      {flight.layovers[index - 1].city}
                                    </span>
                                    <span>
                                      {flight.layovers[index - 1].duration}
                                    </span>
                                  </div>
                                )}

                                {/* Segment Content */}
                                <div className="space-y-6">
                                  {/* Airline Header */}
                                  <div className="flex items-center gap-3">
                                    <div className="bg-white w-8 h-8 flex items-center justify-center rounded-2xl p-1">
                                         <img
                                      src={flight.logo}
                                      alt={segment.airline}
                                      className="h-6 w-auto object-contain"
                                    />
                                    </div>
                                   
                                    <span className="font-bold text-base-content text-sm">
                                      {segment.airline}
                                    </span>
                                  </div>

                                  {/* Flight Times & Duration */}
                                  <div className="flex justify-between items-center">
                                    {/* Departure */}
                                    <div className="text-left">
                                      <div className="text-2xl font-bold text-base-content">
                                        {segment.departure}
                                      </div>
                                      <div className="font-medium text-base-content/80 mb-1">
                                        {segment.from}
                                      </div>
                                      <div className="text-xs text-base-content/50 max-w-[120px] leading-tight">
                                        {segment.from === 'DXB'
                                          ? 'Dubai International Airport (DXB)'
                                          : segment.from === 'LHR'
                                            ? 'London Heathrow (LHR)'
                                            : `${segment.from} International Airport`}
                                      </div>
                                    </div>

                                    {/* Center Duration */}
                                    <div className="flex flex-col items-center px-4 flex-1">
                                      <span className="text-xs text-base-content/60 mb-1">
                                        {segment.duration}
                                      </span>
                                      <div className="w-full h-[2px] bg-primary/20 relative flex items-center justify-center">
                                        <span className="absolute bg-base-100 px-2 text-[10px] text-base-content/40 font-medium">
                                          Non stop
                                        </span>
                                      </div>
                                    </div>

                                    {/* Arrival */}
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-base-content">
                                        {segment.arrival}
                                      </div>
                                      <div className="font-medium text-base-content/80 mb-1">
                                        {segment.to}
                                      </div>
                                      <div className="text-xs text-base-content/50 max-w-[120px] leading-tight ml-auto">
                                        {segment.to === 'DXB'
                                          ? 'Dubai International Airport (DXB)'
                                          : segment.to === 'LHR'
                                            ? 'London Heathrow (LHR)'
                                            : `${segment.to} International Airport`}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Footer Info */}
                                  <div className="flex justify-between items-end text-sm pt-2">
                                    <div>
                                      <div className="font-bold text-base-content mb-1">
                                        Baggage
                                      </div>
                                      <div className="text-base-content/70 text-xs">
                                        2 x 23kg
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-bold text-base-content mb-1">
                                        Airline
                                      </div>
                                      <div className="text-base-content/70 text-xs">
                                        {segment.airline} -{' '}
                                        {segment.flightNumber.split(' ')[1]} -{' '}
                                        <span className="font-bold">
                                          Economy
                                        </span>{' '}
                                        - Class V
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Divider if not last */}
                                {index < flight.segments.length - 1 && (
                                  <div className="border-b border-dashed border-base-300 my-6"></div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Inbound Column */}
                          {flight.inbound && (
                            <div className="flex-1 border-t xl:border-t-0 xl:border-l border-base-200 pt-8 xl:pt-0 xl:pl-8">
                              {/* Header */}
                              <div className="flex justify-between items-baseline mb-6 border-b border-base-200 pb-2">
                                <h4 className="font-bold text-lg text-base-content">
                                  {flight.inbound.from} to {flight.inbound.to},{' '}
                                  <span className="font-normal text-base-content/70">
                                    {new Date(
                                      flight.inbound.date,
                                    ).toLocaleDateString('en-US', {
                                      day: '2-digit',
                                      month: 'short',
                                    })}
                                  </span>
                                </h4>
                                <span className="font-bold text-base-content text-sm">
                                  Inbound
                                </span>
                              </div>

                              {flight.inbound.segments.map((segment, index) => (
                                <div
                                  key={segment.id}
                                  className="mb-6 last:mb-0 relative"
                                >
                                  {/* Connecting Flight Badge */}
                                  {index > 0 && (
                                    <span className="absolute -top-3 right-0 bg-base-200 text-base-content/60 text-[10px] font-bold px-2 py-1 rounded">
                                      Connecting Flight
                                    </span>
                                  )}

                                  {/* Layover Bar */}
                                  {index > 0 &&
                                    flight.inbound.layovers[index - 1] && (
                                      <div className="bg-info/10 text-info-content text-xs font-bold py-2 px-4 rounded mb-6 flex justify-between items-center">
                                        <span>
                                          Change of planes • Layover in{' '}
                                          {
                                            flight.inbound.layovers[index - 1]
                                              .city
                                          }
                                        </span>
                                        <span>
                                          {
                                            flight.inbound.layovers[index - 1]
                                              .duration
                                          }
                                        </span>
                                      </div>
                                    )}

                                  {/* Segment Content */}
                                  <div className="space-y-6">
                                    {/* Airline Header */}
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={flight.inbound.logo}
                                        alt={segment.airline}
                                        className="h-6 w-auto object-contain"
                                      />
                                      <span className="font-bold text-base-content text-sm">
                                        {segment.airline}
                                      </span>
                                    </div>

                                    {/* Flight Times & Duration */}
                                    <div className="flex justify-between items-center">
                                      {/* Departure */}
                                      <div className="text-left">
                                        <div className="text-2xl font-bold text-base-content">
                                          {segment.departure}
                                        </div>
                                        <div className="font-medium text-base-content/80 mb-1">
                                          {segment.from}
                                        </div>
                                        <div className="text-xs text-base-content/50 max-w-[120px] leading-tight">
                                          {segment.from === 'DXB'
                                            ? 'Dubai International Airport (DXB)'
                                            : segment.from === 'LHR'
                                              ? 'London Heathrow (LHR)'
                                              : `${segment.from} International Airport`}
                                        </div>
                                      </div>

                                      {/* Center Duration */}
                                      <div className="flex flex-col items-center px-4 flex-1">
                                        <span className="text-xs text-base-content/60 mb-1">
                                          {segment.duration}
                                        </span>
                                        <div className="w-full h-[2px] bg-primary/20 relative flex items-center justify-center">
                                          <span className="absolute bg-base-100 px-2 text-[10px] text-base-content/40 font-medium">
                                            Non stop
                                          </span>
                                        </div>
                                      </div>

                                      {/* Arrival */}
                                      <div className="text-right">
                                        <div className="text-2xl font-bold text-base-content">
                                          {segment.arrival}
                                        </div>
                                        <div className="font-medium text-base-content/80 mb-1">
                                          {segment.to}
                                        </div>
                                        <div className="text-xs text-base-content/50 max-w-[120px] leading-tight ml-auto">
                                          {segment.to === 'DXB'
                                            ? 'Dubai International Airport (DXB)'
                                            : segment.to === 'LHR'
                                              ? 'London Heathrow (LHR)'
                                              : `${segment.to} International Airport`}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex justify-between items-end text-sm pt-2">
                                      <div>
                                        <div className="font-bold text-base-content mb-1">
                                          Baggage
                                        </div>
                                        <div className="text-base-content/70 text-xs">
                                          2 x 23kg
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-base-content mb-1">
                                          Airline
                                        </div>
                                        <div className="text-base-content/70 text-xs">
                                          {segment.airline} -{' '}
                                          {segment.flightNumber.split(' ')[1]} -{' '}
                                          <span className="font-bold">
                                            Economy
                                          </span>{' '}
                                          - Class V
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Divider if not last */}
                                  {index <
                                    flight.inbound.segments.length - 1 && (
                                    <div className="border-b border-dashed border-base-300 my-6"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-base-100 rounded-lg shadow-sm border border-base-200">
                  <p className="text-base-content/60">
                    No flights found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        stops: new Set(),
                        times: new Set(),
                        arrivalTimes: new Set(),
                        airlines: new Set(),
                      });
                    }}
                    className="btn btn-link btn-sm mt-2"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-base-content/40">
            <Plane size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl">
              Enter your travel details to see flight options.
            </p>
          </div>
        )}
      </div>
      
      <BookingModal 
        isOpen={!!selectedFlight} 
        onClose={() => setSelectedFlight(null)} 
        itemDetails={selectedFlight}
      />
    </div>
  );
};
export default Flights;
