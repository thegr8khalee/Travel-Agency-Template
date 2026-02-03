import { useState } from 'react';
import {
  Plane,
  Plus,
  Search,
  X,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter
} from 'lucide-react';

export default function AdminFlights() {
  const [flights, setFlights] = useState([
    { id: 1, airline: 'Emirates', flightNo: 'EK785', from: 'Lagos (LOS)', to: 'Dubai (DXB)', departure: '2024-02-15 14:30', arrival: '2024-02-16 01:45', price: 850000, seats: 45, class: 'Economy', status: 'available' },
    { id: 2, airline: 'Qatar Airways', flightNo: 'QR1408', from: 'Lagos (LOS)', to: 'London (LHR)', departure: '2024-02-16 08:00', arrival: '2024-02-16 14:30', price: 1200000, seats: 32, class: 'Business', status: 'available' },
    { id: 3, airline: 'Turkish Airlines', flightNo: 'TK626', from: 'Abuja (ABV)', to: 'Istanbul (IST)', departure: '2024-02-17 22:15', arrival: '2024-02-18 06:45', price: 650000, seats: 0, class: 'Economy', status: 'sold-out' },
    { id: 4, airline: 'British Airways', flightNo: 'BA75', from: 'Lagos (LOS)', to: 'London (LHR)', departure: '2024-02-18 23:00', arrival: '2024-02-19 05:30', price: 980000, seats: 12, class: 'Economy', status: 'available' },
    { id: 5, airline: 'Air France', flightNo: 'AF149', from: 'Lagos (LOS)', to: 'Paris (CDG)', departure: '2024-02-20 01:30', arrival: '2024-02-20 07:15', price: 875000, seats: 28, class: 'Economy', status: 'available' }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [viewingFlight, setViewingFlight] = useState(null);
  const [formData, setFormData] = useState({
    airline: '',
    flightNo: '',
    from: '',
    to: '',
    departure: '',
    arrival: '',
    price: '',
    seats: '',
    class: 'Economy',
    status: 'available'
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const filteredFlights = flights.filter(flight => {
    const matchesSearch = flight.airline.toLowerCase().includes(search.toLowerCase()) ||
                         flight.flightNo.toLowerCase().includes(search.toLowerCase()) ||
                         flight.from.toLowerCase().includes(search.toLowerCase()) ||
                         flight.to.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || flight.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (flight = null) => {
    if (flight) {
      setEditingFlight(flight);
      setFormData({
        airline: flight.airline,
        flightNo: flight.flightNo,
        from: flight.from,
        to: flight.to,
        departure: flight.departure,
        arrival: flight.arrival,
        price: flight.price,
        seats: flight.seats,
        class: flight.class,
        status: flight.status
      });
    } else {
      setEditingFlight(null);
      setFormData({
        airline: '',
        flightNo: '',
        from: '',
        to: '',
        departure: '',
        arrival: '',
        price: '',
        seats: '',
        class: 'Economy',
        status: 'available'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const flightData = {
      ...formData,
      price: Number(formData.price),
      seats: Number(formData.seats)
    };

    if (editingFlight) {
      setFlights(flights.map(f => f.id === editingFlight.id ? { ...f, ...flightData } : f));
    } else {
      setFlights([...flights, { id: Date.now(), ...flightData }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      setFlights(flights.filter(f => f.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'available': 'badge-success',
      'sold-out': 'badge-error',
      'cancelled': 'badge-warning'
    };
    return badges[status] || 'badge-ghost';
  };

  // Stats
  const totalFlights = flights.length;
  const availableFlights = flights.filter(f => f.status === 'available').length;
  const totalSeats = flights.reduce((sum, f) => sum + f.seats, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Flight Inventory</h1>
          <p className="text-base-content/60">Manage available flights and schedules</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary gap-2">
          <Plus size={18} /> Add Flight
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Plane size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{totalFlights}</p>
              <p className="text-xs text-base-content/60">Total Flights</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Plane size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{availableFlights}</p>
              <p className="text-xs text-base-content/60">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{totalSeats}</p>
              <p className="text-xs text-base-content/60">Available Seats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 z-10" />
            <input
              type="text"
              placeholder="Search by airline, flight no, or destination..."
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
            <option value="sold-out">Sold Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Flights Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Flight</th>
                <th>Route</th>
                <th>Schedule</th>
                <th>Class</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-base-200">
                    <td>
                      <div>
                        <p className="font-semibold text-base-content">{flight.airline}</p>
                        <p className="text-sm text-base-content/60">{flight.flightNo}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          <p className="font-medium">{flight.from}</p>
                          <p className="text-base-content/60">to {flight.to}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <p className="flex items-center gap-1">
                          <Calendar size={12} /> {formatDateTime(flight.departure)}
                        </p>
                        <p className="text-base-content/60 flex items-center gap-1">
                          <Clock size={12} /> {formatDateTime(flight.arrival)}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="badge border-base-300 badge-outline">{flight.class}</span>
                    </td>
                    <td className="font-semibold text-primary">{formatCurrency(flight.price)}</td>
                    <td>
                      <span className={flight.seats === 0 ? 'text-red-500 dark:text-red-400' : 'text-base-content'}>
                        {flight.seats}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(flight.status)} capitalize`}>
                        {flight.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setViewingFlight(flight)}
                          className="btn btn-ghost btn-sm btn-square"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(flight)}
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(flight.id)}
                          className="btn btn-ghost btn-sm btn-square text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-base-content/60">
                    No flights found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Flight Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-4">
              {editingFlight ? 'Edit Flight' : 'Add New Flight'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Airline *</span></label>
                  <input
                    type="text"
                    value={formData.airline}
                    onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Flight Number *</span></label>
                  <input
                    type="text"
                    value={formData.flightNo}
                    onChange={(e) => setFormData({ ...formData, flightNo: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">From *</span></label>
                  <input
                    type="text"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Lagos (LOS)"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">To *</span></label>
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Dubai (DXB)"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Departure *</span></label>
                  <input
                    type="datetime-local"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Arrival *</span></label>
                  <input
                    type="datetime-local"
                    value={formData.arrival}
                    onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Price (NGN) *</span></label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Available Seats *</span></label>
                  <input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Class</span></label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                  </select>
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Status</span></label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="available">Available</option>
                    <option value="sold-out">Sold Out</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingFlight ? 'Update Flight' : 'Add Flight'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowModal(false)}></div>
        </div>
      )}

      {/* View Flight Modal */}
      {viewingFlight && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button onClick={() => setViewingFlight(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-4">Flight Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl">
                <Plane size={32} className="text-primary" />
                <div>
                  <p className="text-xl font-bold">{viewingFlight.airline}</p>
                  <p className="text-base-content/60">{viewingFlight.flightNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-base-content/60">From</p>
                  <p className="font-semibold">{viewingFlight.from}</p>
                  <p className="text-sm text-base-content/60">{formatDateTime(viewingFlight.departure)}</p>
                </div>
                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-base-content/60">To</p>
                  <p className="font-semibold">{viewingFlight.to}</p>
                  <p className="text-sm text-base-content/60">{formatDateTime(viewingFlight.arrival)}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-base-content/60">Class</p>
                  <p className="font-semibold">{viewingFlight.class}</p>
                </div>
                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-base-content/60">Price</p>
                  <p className="font-semibold text-primary">{formatCurrency(viewingFlight.price)}</p>
                </div>
                <div className="p-3 bg-base-200 rounded-lg">
                  <p className="text-xs text-base-content/60">Seats</p>
                  <p className="font-semibold">{viewingFlight.seats}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <span className={`badge ${getStatusBadge(viewingFlight.status)} capitalize`}>
                  {viewingFlight.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setViewingFlight(null)} className="btn">Close</button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setViewingFlight(null)}></div>
        </div>
      )}
    </div>
  );
}
