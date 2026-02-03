import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Tag,
  StickyNote,
  ChevronDown,
  Download,
  Filter
} from 'lucide-react';

export default function AdminCustomers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, bookings, formatCurrency } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    tags: [],
    notes: ''
  });

  // Get all unique tags
  const allTags = [...new Set(customers.flatMap(c => c.tags || []))];

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesTag = tagFilter === 'all' || (customer.tags || []).includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    closeModal();
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
      status: customer.status,
      tags: customer.tags || [],
      notes: customer.notes || ''
    });
    setShowModal(true);
  };

  const openViewModal = (customer) => {
    setViewingCustomer(customer);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'active',
      tags: [],
      notes: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const getCustomerBookings = (customerId) => {
    return bookings.filter(b => b.customerId === customerId);
  };

  const getTagColor = (tag) => {
    const colors = {
      'VIP': 'badge-error',
      'Frequent': 'badge-primary',
      'New': 'badge-success',
      'Corporate': 'badge-warning',
      'Hajj': 'badge-secondary'
    };
    return colors[tag] || 'badge-ghost';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Customers</h1>
          <p className="text-base-content/60">Manage your customer database</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost btn-sm gap-2">
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-sm gap-2"
          >
            <Plus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-base-content">{customers.length}</p>
          <p className="text-sm text-base-content/60">Total Customers</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{customers.filter(c => c.status === 'active').length}</p>
          <p className="text-sm text-base-content/60">Active</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{customers.filter(c => c.tags?.includes('VIP')).length}</p>
          <p className="text-sm text-base-content/60">VIP Customers</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{customers.filter(c => c.tags?.includes('Corporate')).length}</p>
          <p className="text-sm text-base-content/60">Corporate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl p-4 shadow-sm border border-base-300">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-base-300  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="select select-bordered"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Customer</th>
                <th>Contact</th>
                <th>Tags</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-base-200">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-base-content">{customer.name}</p>
                        <p className="text-sm text-base-content/60">{customer.address}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Mail size={14} className="text-base-content/40" />
                        {customer.email}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone size={14} className="text-base-content/40" />
                        {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {(customer.tags || []).map(tag => (
                        <span key={tag} className={`badge badge-sm ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="font-medium">{customer.totalBookings}</span>
                  </td>
                  <td>
                    <span className="font-semibold text-base-content">{formatCurrency(customer.totalSpent)}</span>
                  </td>
                  <td>
                    <span className={`badge ${customer.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openViewModal(customer)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(customer)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="btn btn-ghost btn-sm btn-square text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto mb-4 text-base-content/30" />
            <p className="text-base-content/60">No customers found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-6">
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Phone</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="+234 803 123 4567"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Status</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Address</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Lagos, Nigeria"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Tags</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {['VIP', 'Frequent', 'New', 'Corporate', 'Hajj'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`badge badge-lg cursor-pointer ${
                        formData.tags.includes(tag) ? getTagColor(tag) : 'badge-outline'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Notes</span>
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Add any notes about this customer..."
                  rows={3}
                />
              </div>
              <div className="modal-action">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={closeModal}></div>
        </div>
      )}

      {/* View Customer Modal */}
      {showViewModal && viewingCustomer && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <button onClick={() => setShowViewModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            
            {/* Customer Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {viewingCustomer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-base-content">{viewingCustomer.name}</h3>
                  <span className={`badge ${viewingCustomer.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>
                    {viewingCustomer.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(viewingCustomer.tags || []).map(tag => (
                    <span key={tag} className={`badge badge-sm ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-base-content">{formatCurrency(viewingCustomer.totalSpent)}</p>
                <p className="text-sm text-base-content/60">Total Spent</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
                <Mail size={20} className="text-base-content/40" />
                <div>
                  <p className="text-xs text-base-content/60">Email</p>
                  <p className="text-sm font-medium">{viewingCustomer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
                <Phone size={20} className="text-base-content/40" />
                <div>
                  <p className="text-xs text-base-content/60">Phone</p>
                  <p className="text-sm font-medium">{viewingCustomer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
                <MapPin size={20} className="text-base-content/40" />
                <div>
                  <p className="text-xs text-base-content/60">Address</p>
                  <p className="text-sm font-medium">{viewingCustomer.address}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {viewingCustomer.notes && (
              <div className="p-4 bg-yellow-50 rounded-xl mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <StickyNote size={16} className="text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-800">Notes</p>
                </div>
                <p className="text-sm text-yellow-700">{viewingCustomer.notes}</p>
              </div>
            )}

            {/* Booking History */}
            <div>
              <h4 className="font-semibold text-base-content mb-4">Booking History ({viewingCustomer.totalBookings} bookings)</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {getCustomerBookings(viewingCustomer.id).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-base-200 rounded-xl">
                    <div>
                      <p className="font-medium text-base-content">{booking.details}</p>
                      <p className="text-sm text-base-content/60">{booking.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(booking.amount)}</p>
                      <span className={`badge badge-sm ${
                        booking.status === 'confirmed' || booking.status === 'ticketed' ? 'badge-success' :
                        booking.status === 'pending' ? 'badge-warning' : 'badge-ghost'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
                {getCustomerBookings(viewingCustomer.id).length === 0 && (
                  <p className="text-center text-base-content/60 py-4">No bookings yet</p>
                )}
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowViewModal(false)} className="btn btn-ghost">
                Close
              </button>
              <button onClick={() => { setShowViewModal(false); openEditModal(viewingCustomer); }} className="btn btn-primary">
                Edit Customer
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowViewModal(false)}></div>
        </div>
      )}
    </div>
  );
}
