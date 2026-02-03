import { useState } from 'react';
import {
  Hotel,
  Plus,
  Search,
  X,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Bed,
  Users,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves
} from 'lucide-react';

export default function AdminHotels() {
  const [hotels, setHotels] = useState([
    { id: 1, name: 'Burj Al Arab', location: 'Dubai, UAE', rating: 5, rooms: 24, pricePerNight: 450000, amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'parking'], status: 'available', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400' },
    { id: 2, name: 'The Ritz London', location: 'London, UK', rating: 5, rooms: 15, pricePerNight: 380000, amenities: ['wifi', 'spa', 'gym', 'restaurant'], status: 'available', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    { id: 3, name: 'Eko Hotels', location: 'Lagos, Nigeria', rating: 4, rooms: 45, pricePerNight: 85000, amenities: ['wifi', 'pool', 'gym', 'restaurant', 'parking'], status: 'available', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' },
    { id: 4, name: 'Transcorp Hilton', location: 'Abuja, Nigeria', rating: 5, rooms: 0, pricePerNight: 120000, amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'parking'], status: 'fully-booked', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
    { id: 5, name: 'Radisson Blu', location: 'Istanbul, Turkey', rating: 4, rooms: 32, pricePerNight: 95000, amenities: ['wifi', 'gym', 'restaurant', 'parking'], status: 'available', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400' }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [viewingHotel, setViewingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 4,
    rooms: '',
    pricePerNight: '',
    amenities: [],
    status: 'available',
    image: ''
  });

  const allAmenities = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'pool', label: 'Swimming Pool', icon: Waves },
    { id: 'spa', label: 'Spa', icon: Coffee },
    { id: 'gym', label: 'Fitness Center', icon: Dumbbell },
    { id: 'restaurant', label: 'Restaurant', icon: Coffee },
    { id: 'parking', label: 'Free Parking', icon: Car }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || hotel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (hotel = null) => {
    if (hotel) {
      setEditingHotel(hotel);
      setFormData({
        name: hotel.name,
        location: hotel.location,
        rating: hotel.rating,
        rooms: hotel.rooms,
        pricePerNight: hotel.pricePerNight,
        amenities: hotel.amenities,
        status: hotel.status,
        image: hotel.image || ''
      });
    } else {
      setEditingHotel(null);
      setFormData({
        name: '',
        location: '',
        rating: 4,
        rooms: '',
        pricePerNight: '',
        amenities: [],
        status: 'available',
        image: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hotelData = {
      ...formData,
      rating: Number(formData.rating),
      rooms: Number(formData.rooms),
      pricePerNight: Number(formData.pricePerNight)
    };

    if (editingHotel) {
      setHotels(hotels.map(h => h.id === editingHotel.id ? { ...h, ...hotelData } : h));
    } else {
      setHotels([...hotels, { id: Date.now(), ...hotelData }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      setHotels(hotels.filter(h => h.id !== id));
    }
  };

  const toggleAmenity = (amenityId) => {
    const newAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter(a => a !== amenityId)
      : [...formData.amenities, amenityId];
    setFormData({ ...formData, amenities: newAmenities });
  };

  const getStatusBadge = (status) => {
    const badges = {
      'available': 'badge-success',
      'fully-booked': 'badge-error',
      'maintenance': 'badge-warning'
    };
    return badges[status] || 'badge-ghost';
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const getAmenityIcon = (amenityId) => {
    const amenity = allAmenities.find(a => a.id === amenityId);
    if (amenity) {
      const Icon = amenity.icon;
      return <Icon size={14} />;
    }
    return null;
  };

  // Stats
  const totalHotels = hotels.length;
  const availableHotels = hotels.filter(h => h.status === 'available').length;
  const totalRooms = hotels.reduce((sum, h) => sum + h.rooms, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Hotel Inventory</h1>
          <p className="text-base-content/60">Manage partner hotels and accommodations</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary-custom gap-2">
          <Plus size={18} /> Add Hotel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Hotel size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{totalHotels}</p>
              <p className="text-xs text-base-content/60">Total Hotels</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
              <Hotel size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{availableHotels}</p>
              <p className="text-xs text-base-content/60">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
              <Bed size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{totalRooms}</p>
              <p className="text-xs text-base-content/60">Available Rooms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search by hotel name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="fully-booked">Fully Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img
                  src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 right-3 badge ${getStatusBadge(hotel.status)} capitalize`}>
                  {hotel.status.replace('-', ' ')}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-base-content">{hotel.name}</h3>
                    <p className="text-sm text-base-content/60 flex items-center gap-1">
                      <MapPin size={12} /> {hotel.location}
                    </p>
                  </div>
                  <div className="flex">{renderStars(hotel.rating)}</div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {hotel.amenities.slice(0, 4).map((amenity) => (
                    <span key={amenity} className="badge badge-ghost badge-sm gap-1">
                      {getAmenityIcon(amenity)}
                      {allAmenities.find(a => a.id === amenity)?.label}
                    </span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className="badge badge-ghost badge-sm">+{hotel.amenities.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-base-300">
                  <div>
                    <p className="text-lg font-bold text-primary">{formatCurrency(hotel.pricePerNight)}</p>
                    <p className="text-xs text-base-content/60">per night • {hotel.rooms} rooms</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setViewingHotel(hotel)}
                      className="btn btn-ghost btn-sm btn-square"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenModal(hotel)}
                      className="btn btn-ghost btn-sm btn-square"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.id)}
                      className="btn btn-ghost btn-sm btn-square text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-base-content/60">
            No hotels found
          </div>
        )}
      </div>

      {/* Add/Edit Hotel Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-4">
              {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Hotel Name *</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Location *</span></label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="City, Country"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Star Rating</span></label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Available Rooms *</span></label>
                  <input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Price Per Night (NGN) *</span></label>
                  <input
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Status</span></label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="available">Available</option>
                    <option value="fully-booked">Fully Booked</option>
                    <option value="maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label"><span className="label-text font-medium">Image URL</span></label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="label"><span className="label-text font-medium">Amenities</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-base-200 rounded-xl">
                  {allAmenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <label key={amenity.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity.id)}
                          onChange={() => toggleAmenity(amenity.id)}
                          className="checkbox checkbox-primary checkbox-sm"
                        />
                        <Icon size={16} className="text-base-content/60" />
                        <span className="text-sm text-base-content">{amenity.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="modal-action">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingHotel ? 'Update Hotel' : 'Add Hotel'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowModal(false)}></div>
        </div>
      )}

      {/* View Hotel Modal */}
      {viewingHotel && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <button onClick={() => setViewingHotel(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            
            <img
              src={viewingHotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
              alt={viewingHotel.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-base-content">{viewingHotel.name}</h3>
                  <p className="text-base-content/60 flex items-center gap-1">
                    <MapPin size={14} /> {viewingHotel.location}
                  </p>
                </div>
                <div className="flex">{renderStars(viewingHotel.rating)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-base-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{formatCurrency(viewingHotel.pricePerNight)}</p>
                  <p className="text-xs text-base-content/60">per night</p>
                </div>
                <div className="p-3 bg-base-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-base-content">{viewingHotel.rooms}</p>
                  <p className="text-xs text-base-content/60">available rooms</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-base-content mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {viewingHotel.amenities.map((amenity) => {
                    const amenityData = allAmenities.find(a => a.id === amenity);
                    if (amenityData) {
                      const Icon = amenityData.icon;
                      return (
                        <span key={amenity} className="badge badge-outline gap-1">
                          <Icon size={12} /> {amenityData.label}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                <span className={`badge ${getStatusBadge(viewingHotel.status)} capitalize`}>
                  {viewingHotel.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setViewingHotel(null)} className="btn">Close</button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setViewingHotel(null)}></div>
        </div>
      )}
    </div>
  );
}
