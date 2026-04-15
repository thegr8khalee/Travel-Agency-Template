import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { hotelResults as mockHotelResults } from '../data/mockData';
import { useAmadeusSearch } from '../hooks/useAmadeusSearch';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { Hotel, MapPin, Star, ChevronDown, Loader2 } from 'lucide-react';

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

const Hotels = () => {
    const navigate = useNavigate();
    const { searchHotels: searchAmadeusHotels, loading: amadeusLoading, error: amadeusError } = useAmadeusSearch();
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [searched, setSearched] = useState(false);
    const [destination, setDestination] = useState(null);
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    const [liveHotels, setLiveHotels] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLiveHotels([]);

        // Try Amadeus API if we have a valid city code
        const cityCode = destination?.code;
        if (cityCode && cityCode.length === 3) {
          const result = await searchAmadeusHotels({
            cityCode,
            checkInDate,
            checkOutDate,
            adults: 2,
            roomQuantity: 1,
          });

          if (result?.hotels?.length > 0) {
            const transformed = result.hotels.map((hotel) => {
              const offer = hotel.offers?.[0];
              const priceNGN = offer ? Math.round(offer.price.total * 1600) : 0;
              return {
                id: hotel.id,
                name: hotel.name,
                location: hotel.location?.address?.cityName || destination?.cityName || cityCode,
                rating: hotel.rating || '4.0',
                price: offer ? `₦${priceNGN.toLocaleString()}` : 'Contact us',
                priceVal: priceNGN,
                image: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80`,
                isLive: true,
                checkIn: offer?.checkIn,
                checkOut: offer?.checkOut,
                roomType: offer?.room?.description || offer?.room?.type,
              };
            });
            setLiveHotels(transformed);
          }
        }

        setSearched(true);
    };

    return (
      <div className="bg-base-200 min-h-screen pb-12">
        {/* Header / Search Section */}
        <div className="bg-neutral py-12 text-neutral-content pt-20">
            <div className="container mx-auto px-4">
                {/* <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Hotel /> Hotel Reservations
                </h1> */}
                
                <form onSubmit={handleSearch} className="bg-base-100 p-6 rounded-2xl shadow-lg text-base-content">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border border-base-200 rounded-xl p-2 bg-base-200/50">
                        {/* Destination Field */}
                        <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                            <LocationAutocomplete
                              value={destination}
                              onChange={(loc) => setDestination(loc)}
                              placeholder="Where are you going?"
                              label="City or Destination"
                            />
                        </div>

                         {/* Check-in Field */}
                        <DatePickerField 
                            label="Check-in" 
                            value={checkInDate} 
                            onChange={setCheckInDate} 
                            minDate={new Date().toISOString().split('T')[0]} 
                        />

                         {/* Check-out Field */}
                        <DatePickerField 
                            label="Check-out" 
                            value={checkOutDate} 
                            onChange={setCheckOutDate} 
                            minDate={checkInDate} 
                        />

                        {/* Guests Field */}
                        <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                            <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">Guests</label>
                             <select className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none cursor-pointer">
                                <option>2 Adults, 0 Children</option>
                                <option>1 Adult</option>
                                <option>Family</option>
                            </select>
                             <div className="text-xs text-base-content/50 mt-1">Room details</div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="btn btn-primary-custom" disabled={amadeusLoading}>
                            {amadeusLoading ? (
                              <><Loader2 size={18} className="animate-spin" /> Searching...</>
                            ) : (
                              'Find Hotels'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 mt-8">
            {searched ? (
                <div className="space-y-6">
                    {liveHotels.length > 0 && (
                      <>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-semibold text-base-content">Live Results</h2>
                          <span className="badge badge-sm badge-success">Amadeus</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {liveHotels.map((hotel) => (
                            <div key={hotel.id} className="bg-base-100 rounded-2xl p-1 shadow overflow-hidden hover:shadow-lg transition-shadow border border-primary/20">
                                <img src={hotel.image} alt={hotel.name} className="w-full rounded-xl h-68 object-cover" />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-base-content">{hotel.name}</h3>
                                            <div className="flex items-center text-base-content/60 text-sm mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                {hotel.location}
                                            </div>
                                        </div>
                                        <div className="text-primary text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                            <Star size={12} fill="currentColor" /> {hotel.rating}
                                        </div>
                                    </div>
                                    {hotel.roomType && (
                                      <p className="text-xs text-base-content/50 mb-2 line-clamp-1">{hotel.roomType}</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xl font-bold text-secondary">{hotel.price}</div>
                                        </div>
                                        <button onClick={() => setSelectedHotel(hotel)} className="btn btn-primary-custom">
                                            View Deal
                                        </button>
                                    </div>
                                </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <h2 className="text-xl font-semibold mb-4 text-base-content">Top Hotels for You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockHotelResults.map((hotel) => (
                            <div key={hotel.id} className="bg-base-100 rounded-2xl p-1 shadow overflow-hidden hover:shadow-lg transition-shadow border border-base-200">
                                <img src={hotel.image} alt={hotel.name} className="w-full rounded-xl h-68 object-cover" />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-base-content">{hotel.name}</h3>
                                            <div className="flex items-center text-base-content/60 text-sm mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                {hotel.location}
                                            </div>
                                        </div>
                                        <div className="text-primary text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                            <Star size={12} fill="currentColor" /> {hotel.rating}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xl font-bold text-secondary">{hotel.price}</div>
                                        </div>
                                        <button onClick={() => setSelectedHotel(hotel)} className="btn btn-primary-custom">
                                            View Deal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                 <div className="text-center py-20 text-base-content/40">
                    <Hotel size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-xl">Search for hotels to see available options.</p>
                </div>
            )}
        </div>
      
      <BookingModal 
        isOpen={!!selectedHotel} 
        onClose={() => setSelectedHotel(null)} 
        itemDetails={selectedHotel}
      />
      </div>
    );
  };
  export default Hotels;