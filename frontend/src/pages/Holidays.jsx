import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { Calendar, MapPin, Check, Luggage, ChevronDown } from 'lucide-react';

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

const Holidays = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const packages = [
    {
      title: 'Escape to Maldives',
      image:
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '5 Days / 4 Nights',
      price: '₦1,800,000',
      inclusions: ['Flight', 'Resort Stay', 'All Meals',],
    },
    {
      title: 'Paris Romantic Getaway',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '7 Days / 6 Nights',
      price: '₦2,700,000',
      inclusions: ['Flight', '4-Star Hotel', 'Breakfast', ],
    },
    {
      title: 'Safari Adventure in Kenya',
      image:
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '6 Days / 5 Nights',
      price: '₦2,250,000',
      inclusions: ['Flight', 'Safari Lodge', 'Game Drives',],
    },
  ];

  return (
    <div className="bg-base-200 min-h-screen pb-12">
      {/* Header / Search Section */}
      <div className="bg-neutral py-12 text-neutral-content pt-20">
        <div className="container mx-auto px-4">
          <form className="bg-base-100 p-6 rounded-2xl shadow-lg text-base-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border border-base-200 rounded-xl p-2 bg-base-200/50">
              {/* Destination */}
              <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Dream destination"
                  className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder:text-base-content/40"
                />
                <div className="text-xs text-base-content/50 truncate mt-1">
                  Anywhere
                </div>
              </div>

              {/* Date */}
              <DatePickerField
                label="Travel Date"
                value={date}
                onChange={setDate}
                minDate={new Date().toISOString().split('T')[0]}
              />

              {/* Budget/Type */}
              <div className="bg-base-100 p-3 rounded-lg border border-transparent hover:border-base-300 transition-colors">
                <label className="text-xs text-base-content/60 font-medium mb-1 uppercase tracking-wide block">
                  Budget Range
                </label>
                <select className="w-full text-lg font-bold text-base-content bg-transparent border-none p-0 focus:ring-0 focus:outline-none cursor-pointer">
                  <option>Any Budget</option>
                  <option>₦1,500,000 - ₦3,000,000</option>
                  <option>₦3,000,000 - ₦7,500,000</option>
                  <option>₦7,500,000+</option>
                </select>
                <div className="text-xs text-base-content/50 mt-1">
                  Per person
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button type="submit" className="btn btn-primary-custom">
                Search Packages
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12">
        <h2 className="text-2xl font-bold mb-8 text-base-content">
          Popular Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-2xl p-1 shadow-md overflow-hidden flex flex-col group border border-base-200"
            >
              <div className="h-76 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full rounded-xl h-full object-cover transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-medium mb-2 text-base-content">
                  {pkg.title}
                </h3>
                <div>
                  {/* <span className="text-xs text-primary block">
                    Starting from
                  </span> */}
                  <span className="text-xl font-medium text-secondary">
                    {pkg.price}
                  </span>
                </div>
                {/* <div className="text-base-content/60 text-sm mb-4 flex items-center gap-2">
                                <Calendar size={16} /> {pkg.duration}
                            </div> */}

                <div className="pt-2 flex-1 flex items-end w-full justify-between">
                  {/* <h4 className="font-semibold text-sm text-base-content/80 mb-2">Package Includes:</h4> */}
                  <div className="grid grid-cols- gap-2 text-sm text-base-content/70">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Check size={14} className="text-success" /> {inc}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSelectedPackage(pkg)}
                    className="bg-primary hover:bg-primary/90 text-primary-content px-5 py-2 rounded-full font-semibold transition-colors">
                    View Details
                  </button>
                </div>

                {/* <div className="flex items-center justify-between pt-4"></div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        itemDetails={selectedPackage}
      />
    </div>
  );
};
export default Holidays;
