import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Luggage, GraduationCap, Moon, Plus, X, ChevronDown } from 'lucide-react';

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
        <span className="text-base font-medium text-base-content">{monthYear}</span>
      </div>
      <div className="text-xs text-base-content/50 mt-0.5">
        {dayName}
      </div>
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

const HeroWithSearch = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');

  // Flight Search State
  const [tripType, setTripType] = useState('oneWay');
  const [ticketClass, setTicketClass] = useState('Economy');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState(getToday());
  const [returnDate, setReturnDate] = useState(getOvermorrow());
  const [passengers, setPassengers] = useState(1);
  const [isFlexible, setIsFlexible] = useState(false);

  // Hajj/Umrah state
  const [hajjPackageType, setHajjPackageType] = useState('hajj');

  // Multi-city flights state
  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: '', to: '', date: getToday() },
    { id: 2, from: '', to: '', date: getOvermorrow() },
  ]);

  const addMultiCityFlight = () => {
    const newId = multiCityFlights.length > 0 ? Math.max(...multiCityFlights.map(f => f.id)) + 1 : 1;
    setMultiCityFlights([...multiCityFlights, { id: newId, from: '', to: '', date: '' }]);
  };

  const removeMultiCityFlight = (id) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(multiCityFlights.filter(flight => flight.id !== id));
    }
  };

  const updateMultiCityFlight = (id, field, value) => {
    setMultiCityFlights(multiCityFlights.map(flight =>
      flight.id === id ? { ...flight, [field]: value } : flight
    ));
  };

  const handleFlightSearch = () => {
    if (tripType === 'multiCity') {
      const params = new URLSearchParams({
        tripType,
        ticketClass,
        passengers: passengers.toString(),
        flexible: isFlexible.toString(),
        flights: JSON.stringify(multiCityFlights),
      });
      console.log('Searching multi-city flights with:', params.toString());
      navigate(`/flights?${params.toString()}`);
    } else {
      const params = new URLSearchParams({
        tripType,
        ticketClass,
        from: fromLocation,
        to: toLocation,
        depart: departureDate,
        ...(tripType === 'roundTrip' && { return: returnDate }),
        passengers: passengers.toString(),
        flexible: isFlexible.toString(),
      });
      console.log('Searching flights with:', params.toString());
      navigate(`/flights?${params.toString()}`);
    }
  };

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'holidays', label: 'Holidays', icon: Luggage },
    { id: 'study', label: 'Study Abroad', icon: GraduationCap },
    { id: 'hajj', label: 'Hajj & Umrah', icon: Moon },
  ];

  return (
    <div
      className="relative bg-base-300 min-h-screen flex items-start justify-center bg-cover bg-center pb-8"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 container mx-auto px-4 mt-16 md:mt-20">
        <div className="text-white p-4 md:p-6 py-0 flex flex-col lg:flex-row gap-6 lg:gap-12 w-full justify-between items-start lg:items-center">
          <div className="flex-1 flex items-center">
            <h1 className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl font-extralight leading-tight">
              Book Flights, Hotels, Visas & Tours — All in One Place
            </h1>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-base md:text-xl font-extralight max-w-md mb-4">
              Experience stunning destinations, seamless bookings, and
              unforgettable journeys with TravelPro.
            </p>
            <button className="btn px-6 rounded-full shadow-none border-none btn-primary">
              Booking
            </button>
          </div>
        </div>

        <div className="relative w-full mx-auto p-2 sm:p-4 md:p-6 ">
          {/* Search Box Container */}
          <div className="mb-2 flex w-[95%] sm:w-full max-w-3xl mx-auto bg-base-100 p-1 rounded-full shadow-md overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-full flex flex-col justify-center items-center gap-1 md:gap-2 p-2 px-6 font-medium transition-all relative min-w-[60px]
                  ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'hover:text-primary'
                  }`}
              >
                <tab.icon
                  className={`${activeTab === tab.id ? 'stroke-[2.5px]' : ''} size-5 md:size-7`}
                />
                <span className='text-[10px] md:text-xs whitespace-nowrap'>{tab.label}</span>
                {/* {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] md:h-[3px] bg-primary rounded-t-full"></div>
                )} */}
              </button>
            ))}
          </div>
          <div className="pt-6 md:pt-8 bg-base-100 w-full max-w-6xl mx-auto rounded-2xl md:rounded-3xl shadow-2xl text-base-content z-20">
            {/* Tabs */}

            {/* Search Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {activeTab === 'flights' && (
                <div className="flex flex-col gap-4 md:gap-6">
                  {/* Trip Type & Class Selection */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-4">
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

                  {/* Main Inputs Grid - One Way & Round Trip */}
                  {tripType !== 'multiCity' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 border border-base-200 rounded-xl p-2 bg-base-200/50">
                      {/* From */}
                      <div className={`sm:col-span-1 lg:col-span-3 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors group relative`}>
                        <label htmlFor="fromLocation" className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                          From
                        </label>
                        <input
                          type="text"
                          id="fromLocation"
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                          placeholder="Select City"
                          className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                        />
                        <div className="text-xs text-base-content/50 truncate mt-1">
                          Where are you flying from?
                        </div>
                      </div>

                      {/* To */}
                      <div className={`sm:col-span-1 lg:col-span-3 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors group relative`}>
                        <label htmlFor="toLocation" className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                          To
                        </label>
                        <input
                          type="text"
                          id="toLocation"
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                          placeholder="Select City"
                          className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                        />
                        <div className="text-xs text-base-content/50 truncate mt-1">
                          Where are you flying to?
                        </div>
                      </div>

                      {/* Dates - Conditional based on trip type */}
                      {tripType === 'oneWay' ? (
                        /* One Way - Single Date */
                        <div className="sm:col-span-1 lg:col-span-3">
                          <DatePickerField
                            label="Departure"
                            value={departureDate}
                            onChange={setDepartureDate}
                            minDate={getToday()}
                          />
                        </div>
                      ) : (
                        /* Round Trip - Two Dates */
                        <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-2 gap-2">
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
                            minDate={departureDate || getToday()}
                          />
                        </div>
                      )}

                      {/* Travellers */}
                      <div className="sm:col-span-2 lg:col-span-3 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors relative">
                        <label htmlFor="passengers" className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                          Travellers
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="number"
                            id="passengers"
                            min="1"
                            max="10"
                            value={passengers}
                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                            className="w-12 text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                          />
                          <span className="text-lg font-bold text-base-content">Passenger(s)</span>
                        </div>
                        <div className="text-xs text-base-content/50 mt-1">
                          {ticketClass}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Multi-City Inputs */}
                  {tripType === 'multiCity' && (
                    <div className="flex flex-col gap-4 md:gap-3">
                      {multiCityFlights.map((flight, index) => (
                        <div key={flight.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 border border-base-200 rounded-xl p-2 pt-4 bg-base-200/50 relative">
                          {/* Flight Number Badge */}
                          <div className="absolute -top-2 left-4 bg-primary text-primary-content text-xs font-bold px-2 py-0.5 rounded-full">
                            Flight {index + 1}
                          </div>

                          {/* From */}
                          <div className="sm:col-span-1 lg:col-span-4 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                            <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                              From
                            </label>
                            <input
                              type="text"
                              value={flight.from}
                              onChange={(e) => updateMultiCityFlight(flight.id, 'from', e.target.value)}
                              placeholder="Select City"
                              className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                            />
                          </div>

                          {/* To */}
                          <div className="sm:col-span-1 lg:col-span-4 bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                            <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                              To
                            </label>
                            <input
                              type="text"
                              value={flight.to}
                              onChange={(e) => updateMultiCityFlight(flight.id, 'to', e.target.value)}
                              placeholder="Select City"
                              className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                            />
                          </div>

                          {/* Date */}
                          <div className="sm:col-span-1 lg:col-span-3">
                            <DatePickerField
                              label="Departure"
                              value={flight.date}
                              onChange={(value) => updateMultiCityFlight(flight.id, 'date', value)}
                              minDate={index === 0 ? getToday() : multiCityFlights[index - 1]?.date || getToday()}
                            />
                          </div>

                          {/* Remove Button */}
                          <div className="sm:col-span-1 lg:col-span-1 flex items-center justify-center">
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

                      {/* Add Flight & Travellers Row */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-4 mt-2">
                        <button
                          type="button"
                          onClick={addMultiCityFlight}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-base-200 hover:bg-base-300 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          Add Another Flight
                        </button>

                        {/* Travellers for Multi-City */}
                        <div className="flex items-center justify-center gap-3 bg-base-200/50 border border-base-200 px-4 py-2 rounded-lg">
                          <label className="text-xs text-base-content/60 font-medium uppercase tracking-wide">
                            Travellers:
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={passengers}
                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                            className="w-12 text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                          />
                          <span className="text-sm font-medium text-base-content/70">Passenger(s)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-base-200 px-3 py-2 rounded-lg hover:bg-base-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={isFlexible}
                        onChange={(e) => setIsFlexible(e.target.checked)}
                        className="checkbox checkbox-primary checkbox-sm rounded"
                      />
                      <span className="text-sm text-base-content/70">
                        My dates are flexible (+/- 3 days)
                      </span>
                    </label>

                    <button
                      onClick={handleFlightSearch}
                      className="btn btn-primary-custom"
                    >
                      Search Flights
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 p-2 border border-base-200 rounded-xl bg-base-200/50">
                    <div className="sm:col-span-2 lg:col-span-4 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        City or Property
                      </div>
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full text-lg font-bold text-base-content bg-transparent focus:outline-none placeholder:text-base-content/30"
                      />
                      <div className="text-xs text-base-content/50 mt-1">
                        Search by city, hotel, or landmark
                      </div>
                    </div>
                    <div className="sm:col-span-1 lg:col-span-2">
                      <DatePickerField
                        label="Check-in"
                        value={departureDate}
                        onChange={setDepartureDate}
                        minDate={getToday()}
                      />
                    </div>
                    <div className="sm:col-span-1 lg:col-span-2">
                      <DatePickerField
                        label="Check-out"
                        value={returnDate}
                        onChange={setReturnDate}
                        minDate={departureDate || getToday()}
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-4 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Guests & Rooms
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            defaultValue={2}
                            className="w-10 text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                          />
                          <span className="text-sm text-base-content/70">Guests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            defaultValue={1}
                            className="w-10 text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                          />
                          <span className="text-sm text-base-content/70">Rooms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary-custom">
                      Search Hotels
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'holidays' && (
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2 border border-base-200 rounded-xl bg-base-200/50">
                    <div className="sm:col-span-2 lg:col-span-2 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Destination
                      </div>
                      <input
                        type="text"
                        placeholder="Where do you want to go?"
                        className="text-lg w-full font-bold text-base-content bg-transparent focus:outline-none placeholder:text-base-content/30"
                      />
                      <div className="text-xs text-base-content/50 mt-1">
                        Search by country or city
                      </div>
                    </div>
                    <div className="bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Duration
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Any Duration</option>
                        <option value="3">3 Days</option>
                        <option value="5">5 Days</option>
                        <option value="7">1 Week</option>
                        <option value="10">10 Days</option>
                        <option value="14">2 Weeks</option>
                        <option value="21">3 Weeks</option>
                        <option value="30">1 Month</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div className="bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Travel Month
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Any Month</option>
                        <option value="2026-02">February 2026</option>
                        <option value="2026-03">March 2026</option>
                        <option value="2026-04">April 2026</option>
                        <option value="2026-05">May 2026</option>
                        <option value="2026-06">June 2026</option>
                        <option value="2026-07">July 2026</option>
                        <option value="2026-08">August 2026</option>
                        <option value="2026-09">September 2026</option>
                        <option value="2026-10">October 2026</option>
                        <option value="2026-11">November 2026</option>
                        <option value="2026-12">December 2026</option>
                        <option value="2027-01">January 2027</option>
                        <option value="2027-02">February 2027</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary-custom">
                      Find Packages
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'study' && (
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2 border border-base-200 rounded-xl bg-base-200/50">
                    <div className="bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Country
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="NL">Netherlands</option>
                        <option value="IE">Ireland</option>
                        <option value="NZ">New Zealand</option>
                        <option value="SG">Singapore</option>
                        <option value="JP">Japan</option>
                        <option value="KR">South Korea</option>
                        <option value="CH">Switzerland</option>
                        <option value="SE">Sweden</option>
                      </select>
                      <div className="text-xs text-base-content/50 mt-1">
                        Where do you want to study?
                      </div>
                    </div>
                    <div className="bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Education Level
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Select Level</option>
                        <option value="language">Language Course</option>
                        <option value="foundation">Foundation Year</option>
                        <option value="undergraduate">Undergraduate (Bachelor's)</option>
                        <option value="graduate">Graduate (Master's)</option>
                        <option value="doctorate">Doctorate (PhD)</option>
                        <option value="postdoc">Post-Doctoral</option>
                        <option value="diploma">Diploma/Certificate</option>
                        <option value="exchange">Exchange Program</option>
                      </select>
                    </div>
                    <div className="bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Field of Study
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Select Major</option>
                        <option value="business">Business & Management</option>
                        <option value="engineering">Engineering</option>
                        <option value="cs">Computer Science & IT</option>
                        <option value="medicine">Medicine & Healthcare</option>
                        <option value="law">Law</option>
                        <option value="arts">Arts & Humanities</option>
                        <option value="science">Natural Sciences</option>
                        <option value="social">Social Sciences</option>
                        <option value="education">Education</option>
                        <option value="architecture">Architecture & Design</option>
                        <option value="media">Media & Communications</option>
                        <option value="hospitality">Hospitality & Tourism</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Intake
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Any Intake</option>
                        <option value="2026-fall">Fall 2026</option>
                        <option value="2027-spring">Spring 2027</option>
                        <option value="2027-fall">Fall 2027</option>
                        <option value="2028-spring">Spring 2028</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary-custom">
                      Find Programs
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'hajj' && (
                <div className="flex flex-col gap-4 md:gap-6">
                  {/* Package Type Toggle */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                    <span className="text-sm font-medium text-base-content/70">Package Type:</span>
                    <div className="flex bg-base-200 rounded-full p-1">
                      <button
                        type="button"
                        onClick={() => setHajjPackageType('hajj')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${hajjPackageType === 'hajj' ? 'bg-primary text-primary-content' : 'text-base-content/70 hover:text-base-content'}`}
                      >
                        Hajj
                      </button>
                      <button
                        type="button"
                        onClick={() => setHajjPackageType('umrah')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${hajjPackageType === 'umrah' ? 'bg-primary text-primary-content' : 'text-base-content/70 hover:text-base-content'}`}
                      >
                        Umrah
                      </button>
                    </div>
                    <span className="text-xs text-base-content/50">
                      {hajjPackageType === 'hajj' ? 'Fixed dates annually (Jun 4-9, 2026)' : 'Available year-round'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 p-2 border border-base-200 rounded-xl bg-base-200/50">
                    {/* Departure City */}
                    <div className="sm:col-span-1 lg:col-span-3 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Departure City
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Select City</option>
                        <option value="lagos">Lagos</option>
                        <option value="abuja">Abuja</option>
                        <option value="kano">Kano</option>
                        <option value="port-harcourt">Port Harcourt</option>
                        <option value="kaduna">Kaduna</option>
                        <option value="ibadan">Ibadan</option>
                      </select>
                      <div className="text-xs text-base-content/50 mt-1">
                        Where will you depart from?
                      </div>
                    </div>

                    {/* Travel Season */}
                    <div className="sm:col-span-1 lg:col-span-3 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Travel Season
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Select Season</option>
                        {hajjPackageType === 'hajj' ? (
                          <>
                            <option value="hajj-2026">Hajj 2026 (Jun 4-9)</option>
                            <option value="hajj-2027">Hajj 2027</option>
                          </>
                        ) : (
                          <>
                            <optgroup label="2026">
                              <option value="ramadan-2026">Ramadan 2026 (Feb-Mar)</option>
                              <option value="spring-2026">Spring 2026</option>
                              <option value="summer-2026">Summer 2026</option>
                              <option value="december-2026">December 2026</option>
                            </optgroup>
                            <optgroup label="2027">
                              <option value="ramadan-2027">Ramadan 2027</option>
                              <option value="spring-2027">Spring 2027</option>
                              <option value="summer-2027">Summer 2027</option>
                            </optgroup>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Number of Pilgrims */}
                    <div className="sm:col-span-1 lg:col-span-3 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Number of Pilgrims
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          min="1"
                          max="50"
                          defaultValue={1}
                          className="w-12 text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
                        />
                        <span className="text-base font-medium text-base-content">Pilgrim(s)</span>
                      </div>
                      <div className="text-xs text-base-content/50 mt-1">
                        Group bookings available
                      </div>
                    </div>

                    {/* Room Sharing */}
                    <div className="sm:col-span-1 lg:col-span-3 bg-base-100 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow">
                      <div className="text-xs text-base-content/60 font-medium mb-1 uppercase">
                        Room Sharing
                      </div>
                      <select className="w-full font-bold text-base-content bg-transparent border-none focus:ring-0 p-0 text-base cursor-pointer">
                        <option value="">Select Option</option>
                        <option value="quad">Quad Sharing (4 people)</option>
                        <option value="triple">Triple Sharing (3 people)</option>
                        <option value="double">Double Sharing (2 people)</option>
                        <option value="single">Single Room</option>
                      </select>
                      <div className="text-xs text-base-content/50 mt-1">
                        Affects package price
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-base-content/60">
                      All packages include visa processing, flights, accommodation & guided tours
                    </p>
                    <button className="btn btn-primary-custom ">
                      Search Packages
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithSearch;

// style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
