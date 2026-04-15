import { useState, useEffect, useRef } from 'react';
import { MapPin, Plane, Building2, Loader2 } from 'lucide-react';
import { useAmadeusSearch } from '../hooks/useAmadeusSearch';

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = 'Search city or airport...',
  label,
  required = false,
  disabled = false,
  className = ''
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const { getLocationSuggestions } = useAmadeusSearch();

  // Debounced search for locations
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const results = await getLocationSuggestions(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setHighlightedIndex(-1);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, getLocationSuggestions]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle selection
  const handleSelect = (location) => {
    onChange({
      code: location.code,
      name: location.displayName,
      cityName: location.cityName,
      countryCode: location.countryCode,
      type: location.type
    });
    setQuery(location.displayName);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (!newValue) {
      onChange(null);
    }
  };

  // Display value
  const displayValue = query || value?.name || '';

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
      )}

      <div className="relative">
        <MapPin
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="input input-bordered w-full pl-10 pr-10"
          required={required}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 animate-spin"
          />
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-xl shadow-lg max-h-60 overflow-auto">
          {suggestions.map((location, index) => (
            <li key={`${location.code}-${index}`}>
              <button
                type="button"
                onClick={() => handleSelect(location)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                  highlightedIndex === index
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-base-200'
                }`}
              >
                {location.type === 'AIRPORT' ? (
                  <Plane size={18} className="text-primary shrink-0" />
                ) : (
                  <Building2 size={18} className="text-secondary shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium truncate">{location.displayName}</p>
                  <p className="text-sm text-base-content/60 truncate">
                    {location.cityName}
                    {location.countryCode && `, ${location.countryCode}`}
                    <span className="ml-2 text-xs opacity-60">
                      {location.type === 'AIRPORT' ? 'Airport' : 'City'}
                    </span>
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-xl shadow-lg p-4 text-center text-base-content/60">
          No locations found for "{query}"
        </div>
      )}
    </div>
  );
}
