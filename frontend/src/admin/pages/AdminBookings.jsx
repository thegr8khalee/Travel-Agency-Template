import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  CalendarCheck,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Plane,
  Building2,
  Package,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';

export default function AdminBookings() {
  const { bookings, customers, updateBooking, deleteBooking, formatCurrency } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.pnr && booking.pnr.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || booking.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPayment;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane size={20} />;
      case 'hotel': return <Building2 size={20} />;
      case 'package': return <Package size={20} />;
      default: return <CalendarCheck size={20} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'flight': return 'bg-blue-100 text-blue-600';
      case 'hotel': return 'bg-purple-100 text-purple-600';
      case 'package': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'rounded-full bg-green-500/30 text-green-500',
      ticketed: 'rounded-full bg-blue-500/30 text-blue-500',
      pending: 'rounded-full bg-yellow-500/30 text-yellow-500',
      cancelled: 'rounded-full bg-red-500/30 text-red-500'
    };
    return styles[status] || 'badge-ghost';
  };

  const getPaymentBadge = (status) => {
    const styles = {
      paid: { class: 'rounded-full text-green-600 bg-green-50', icon: CheckCircle2, label: 'Paid' },
      partial: { class: 'rounded-full text-yellow-600 bg-yellow-50', icon: Clock, label: 'Partial' },
      unpaid: { class: 'rounded-full text-red-600 bg-red-50', icon: XCircle, label: 'Unpaid' }
    };
    return styles[status] || styles.unpaid;
  };

  const handleStatusChange = (id, newStatus) => {
    updateBooking(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Bookings</h1>
          <p className="text-base-content/60">Manage all customer bookings</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost p-6 btn-sm gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary-custom btn-sm gap-2">
            <Plus size={16} />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-base-content">{bookings.length}</p>
          <p className="text-sm text-base-content/60">Total Bookings</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{bookings.filter(b => b.status === 'confirmed' || b.status === 'ticketed').length}</p>
          <p className="text-sm text-base-content/60">Confirmed</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{bookings.filter(b => b.status === 'pending').length}</p>
          <p className="text-sm text-base-content/60">Pending</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{bookings.filter(b => b.type === 'flight').length}</p>
          <p className="text-sm text-base-content/60">Flights</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{bookings.filter(b => b.type === 'hotel').length}</p>
          <p className="text-sm text-base-content/60">Hotels</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl p-4 shadow-sm border border-base-300">
        <div className="flex flex-col gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
            <input
              type="text"
              placeholder="Search by customer, PNR, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-base-100 text-base-content"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Types</option>
              <option value="flight">Flights</option>
              <option value="hotel">Hotels</option>
              <option value="package">Packages</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="ticketed">Ticketed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Type</th>
                <th>Customer</th>
                <th>Details</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                const paymentStyle = getPaymentBadge(booking.paymentStatus);
                const PaymentIcon = paymentStyle.icon;
                return (
                  <tr key={booking.id} className="hover:bg-base-200">
                    <td>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(booking.type)}`}>
                        {getTypeIcon(booking.type)}
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-base-content">{booking.customerName}</p>
                        <p className="text-sm text-base-content/60">{booking.customerEmail}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-base-content">{booking.details}</p>
                        {booking.pnr && (
                          <p className="text-sm text-base-content/60">PNR: {booking.pnr}</p>
                        )}
                      </div>
                    </td>
                    <td>
                      <p className="text-sm">{booking.date || booking.checkIn}</p>
                      <p className="text-xs text-base-content/60">Booked: {booking.createdAt}</p>
                    </td>
                    <td>
                      <span className="font-semibold text-base-content">{formatCurrency(booking.amount)}</span>
                    </td>
                    <td>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${paymentStyle.class}`}>
                        <PaymentIcon size={14} />
                        {paymentStyle.label}
                      </div>
                    </td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`select select-xs ${getStatusBadge(booking.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="ticketed">Ticketed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewingBooking(booking)}
                          className="btn btn-ghost btn-sm btn-square"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="btn btn-ghost btn-sm btn-square text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="p-12 text-center">
            <CalendarCheck size={48} className="mx-auto mb-4 text-base-content/30" />
            <p className="text-base-content/60">No bookings found</p>
          </div>
        )}
      </div>

      {/* View Booking Modal */}
      {viewingBooking && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button onClick={() => setViewingBooking(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getTypeColor(viewingBooking.type)}`}>
                {getTypeIcon(viewingBooking.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-content">{viewingBooking.details}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`badge ${getStatusBadge(viewingBooking.status)}`}>
                    {viewingBooking.status}
                  </span>
                  {viewingBooking.pnr && (
                    <span className="badge badge-outline">PNR: {viewingBooking.pnr}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-base-200 rounded-xl">
                <p className="text-xs text-base-content/60 mb-1">Customer</p>
                <p className="font-medium">{viewingBooking.customerName}</p>
                <p className="text-sm text-base-content/60">{viewingBooking.customerEmail}</p>
              </div>
              <div className="p-4 bg-base-200 rounded-xl">
                <p className="text-xs text-base-content/60 mb-1">Travel Date</p>
                <p className="font-medium">{viewingBooking.date || viewingBooking.checkIn}</p>
                {viewingBooking.checkOut && (
                  <p className="text-sm text-base-content/60">to {viewingBooking.checkOut}</p>
                )}
              </div>
              <div className="p-4 bg-base-200 rounded-xl">
                <p className="text-xs text-base-content/60 mb-1">Amount</p>
                <p className="text-xl font-bold text-base-content">{formatCurrency(viewingBooking.amount)}</p>
              </div>
              <div className="p-4 bg-base-200 rounded-xl">
                <p className="text-xs text-base-content/60 mb-1">Payment Status</p>
                <div className={`flex items-center rounded-full gap-2 ${getPaymentBadge(viewingBooking.paymentStatus).class} px-2 py-1 rounded-full w-fit`}>
                  {(() => {
                    const PayIcon = getPaymentBadge(viewingBooking.paymentStatus).icon;
                    return <PayIcon size={16} />;
                  })()}
                  <span className="font-medium capitalize">{viewingBooking.paymentStatus}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-base-content/60 mb-1">Assigned Agent</p>
                <p className="text-sm">{viewingBooking.assignedAgent || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/60 mb-1">Booking Date</p>
                <p className="text-sm">{viewingBooking.createdAt}</p>
              </div>
              {viewingBooking.passengers && (
                <div>
                  <p className="text-xs text-base-content/60 mb-1">Passengers</p>
                  <p className="text-sm">{viewingBooking.passengers}</p>
                </div>
              )}
              {viewingBooking.rooms && (
                <div>
                  <p className="text-xs text-base-content/60 mb-1">Rooms</p>
                  <p className="text-sm">{viewingBooking.rooms}</p>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button onClick={() => setViewingBooking(null)} className="btn btn-ghost">
                Close
              </button>
              <button className="btn btn-primary">
                Edit Booking
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setViewingBooking(null)}></div>
        </div>
      )}
    </div>
  );
}
