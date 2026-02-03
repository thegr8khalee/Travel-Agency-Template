import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Star,
  MapPin,
  Clock,
  Users,
  Check,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminPackages() {
  const { packages, addPackage, updatePackage, deletePackage, formatCurrency } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [viewingPackage, setViewingPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    duration: '',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    inclusions: [],
    itinerary: [],
    status: 'draft',
    featured: false
  });
  const [newInclusion, setNewInclusion] = useState('');
  const [newItineraryItem, setNewItineraryItem] = useState('');

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const packageData = {
      ...formData,
      price: parseInt(formData.price.replace(/,/g, '')) || 0,
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice.replace(/,/g, '')) : null
    };
    
    if (editingPackage) {
      updatePackage(editingPackage.id, packageData);
    } else {
      addPackage(packageData);
    }
    closeModal();
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price.toString(),
      originalPrice: pkg.originalPrice ? pkg.originalPrice.toString() : '',
      image: pkg.image,
      description: pkg.description,
      inclusions: pkg.inclusions || [],
      itinerary: pkg.itinerary || [],
      status: pkg.status,
      featured: pkg.featured
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPackage(null);
    setFormData({
      name: '',
      destination: '',
      duration: '',
      price: '',
      originalPrice: '',
      image: '',
      description: '',
      inclusions: [],
      itinerary: [],
      status: 'draft',
      featured: false
    });
    setNewInclusion('');
    setNewItineraryItem('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(id);
    }
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion.trim()] });
      setNewInclusion('');
    }
  };

  const removeInclusion = (index) => {
    setFormData({ ...formData, inclusions: formData.inclusions.filter((_, i) => i !== index) });
  };

  const addItineraryItem = () => {
    if (newItineraryItem.trim()) {
      setFormData({ ...formData, itinerary: [...formData.itinerary, newItineraryItem.trim()] });
      setNewItineraryItem('');
    }
  };

  const removeItineraryItem = (index) => {
    setFormData({ ...formData, itinerary: formData.itinerary.filter((_, i) => i !== index) });
  };

  const toggleFeatured = (id, currentStatus) => {
    updatePackage(id, { featured: !currentStatus });
  };

  const toggleStatus = (id, currentStatus) => {
    updatePackage(id, { status: currentStatus === 'active' ? 'draft' : 'active' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Packages</h1>
          <p className="text-base-content/60">Manage tour and holiday packages</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary-custom btn-sm gap-2">
          <Plus size={16} />
          Create Package
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-base-content">{packages.length}</p>
          <p className="text-sm text-base-content/60">Total Packages</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{packages.filter(p => p.status === 'active').length}</p>
          <p className="text-sm text-base-content/60">Active</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{packages.filter(p => p.featured).length}</p>
          <p className="text-sm text-base-content/60">Featured</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{packages.reduce((sum, p) => sum + p.bookings, 0)}</p>
          <p className="text-sm text-base-content/60">Total Bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl p-4 shadow-sm border border-base-300">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-base-100 p-1 rounded-2xl shadow-sm border border-base-300 overflow-hidden group">
            <div className="relative h-48">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full rounded-xl h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {pkg.featured && (
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} /> Featured
                  </span>
                )}
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  pkg.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  {pkg.status}
                </span>
              </div>
              {pkg.originalPrice && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
            
            <div className="p-1">
              <h3 className="font-bold text-lg text-base-content">{pkg.name}</h3>
              <div className="flex items-center gap-1 text-base-content/60 text-sm mt-1">
                <MapPin size={14} />
                {pkg.destination}
              </div>
              <div className="flex items-center gap-1 text-base-content/60 text-sm mt-1">
                <Clock size={14} />
                {pkg.duration}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-bold text-primary">{formatCurrency(pkg.price)}</span>
                  {pkg.originalPrice && (
                    <span className="text-sm text-base-content/40 line-through ml-2">{formatCurrency(pkg.originalPrice)}</span>
                  )}
                </div>
                <span className="text-sm text-base-content/60">{pkg.bookings} bookings</span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-base-300">
                <button
                  onClick={() => setViewingPackage(pkg)}
                  className="btn btn-ghost btn-sm flex-1"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => openEditModal(pkg)}
                  className="btn btn-ghost btn-sm flex-1"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => toggleFeatured(pkg.id, pkg.featured)}
                  className={`btn btn-sm rounded-full flex-1 ${pkg.featured ? 'btn-primary' : 'btn-ghost'}`}
                >
                  <Star size={16} />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="btn btn-ghost btn-sm flex-1 text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="bg-base-100 rounded-2xl p-12 text-center shadow-sm border border-base-300">
          <Package size={48} className="mx-auto mb-4 text-base-content/30" />
          <p className="text-base-content/60">No packages found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-6">
              {editingPackage ? 'Edit Package' : 'Create New Package'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Package Name</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Dubai Explorer"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Destination</span></label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Dubai, UAE"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Duration</span></label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="5 Days / 4 Nights"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Price (₦)</span></label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="1250000"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Original Price (₦)</span></label>
                  <input
                    type="text"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="1500000 (optional)"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Status</span></label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
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
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="label"><span className="label-text font-medium">Description</span></label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Describe the package..."
                />
              </div>

              {/* Inclusions */}
              <div>
                <label className="label"><span className="label-text font-medium">Inclusions</span></label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
                    className="input input-bordered flex-1"
                    placeholder="e.g., Return Flights"
                  />
                  <button type="button" onClick={addInclusion} className="btn btn-primary">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.inclusions.map((item, index) => (
                    <span key={index} className="badge badge-lg gap-1">
                      <Check size={12} />
                      {item}
                      <button type="button" onClick={() => removeInclusion(index)} className="ml-1">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <label className="label"><span className="label-text font-medium">Itinerary</span></label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newItineraryItem}
                    onChange={(e) => setNewItineraryItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItineraryItem())}
                    className="input input-bordered flex-1"
                    placeholder="e.g., Day 1: Arrival & City Tour"
                  />
                  <button type="button" onClick={addItineraryItem} className="btn btn-primary">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.itinerary.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-base-200 rounded-lg">
                      <span className="flex-1 text-sm">{item}</span>
                      <button type="button" onClick={() => removeItineraryItem(index)} className="btn btn-ghost btn-xs">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="checkbox checkbox-primary"
                />
                <label className="label-text">Featured Package</label>
              </div>

              <div className="modal-action">
                <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary-custom">
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={closeModal}></div>
        </div>
      )}

      {/* View Package Modal */}
      {viewingPackage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <button onClick={() => setViewingPackage(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            
            <img
              src={viewingPackage.image}
              alt={viewingPackage.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-base-content">{viewingPackage.name}</h3>
                <div className="flex items-center gap-2 text-base-content/60 mt-1">
                  <MapPin size={16} />
                  {viewingPackage.destination}
                  <span className="mx-2">•</span>
                  <Clock size={16} />
                  {viewingPackage.duration}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{formatCurrency(viewingPackage.price)}</p>
                {viewingPackage.originalPrice && (
                  <p className="text-sm text-base-content/40 line-through">{formatCurrency(viewingPackage.originalPrice)}</p>
                )}
              </div>
            </div>

            <p className="text-base-content/60 mb-6">{viewingPackage.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-base-content mb-3">What's Included</h4>
                <ul className="space-y-2">
                  {viewingPackage.inclusions?.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check size={16} className="text-green-500 dark:text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-base-content mb-3">Itinerary</h4>
                <ul className="space-y-2">
                  {viewingPackage.itinerary?.map((item, i) => (
                    <li key={i} className="text-sm p-2 bg-base-200 rounded">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <span className="text-sm text-base-content/60">{viewingPackage.bookings} bookings</span>
              <div className="flex gap-2">
                {viewingPackage.featured && (
                  <span className="badge badge-warning gap-1"><Star size={12} /> Featured</span>
                )}
                <span className={`badge ${viewingPackage.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>
                  {viewingPackage.status}
                </span>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setViewingPackage(null)} className="btn btn-ghost">Close</button>
              <button onClick={() => { setViewingPackage(null); openEditModal(viewingPackage); }} className="btn btn-primary">
                Edit Package
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setViewingPackage(null)}></div>
        </div>
      )}
    </div>
  );
}
