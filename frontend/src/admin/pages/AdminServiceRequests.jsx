import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Globe,
  GraduationCap,
  Moon,
  Briefcase,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Phone,
  Mail
} from 'lucide-react';

export default function AdminServiceRequests() {
  const { serviceRequests, customers, updateServiceRequest, deleteServiceRequest, formatCurrency } = useAdmin();
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState(typeFromUrl || 'all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);

  // Update filter when URL changes
  useState(() => {
    if (typeFromUrl) {
      setTypeFilter(typeFromUrl);
    }
  }, [typeFromUrl]);

  // Filter requests
  const filteredRequests = serviceRequests.filter(request => {
    const matchesSearch =
      request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.notes && request.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'visa': return <Globe size={20} />;
      case 'study-abroad': return <GraduationCap size={20} />;
      case 'hajj': return <Moon size={20} />;
      case 'corporate': return <Briefcase size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'visa': return 'bg-blue-100 text-blue-600';
      case 'study-abroad': return 'bg-green-100 text-green-600';
      case 'hajj': return 'bg-purple-100 text-purple-600';
      case 'corporate': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'visa': return 'Visa Service';
      case 'study-abroad': return 'Study Abroad';
      case 'hajj': return 'Hajj & Umrah';
      case 'corporate': return 'Corporate';
      default: return type;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'new': 'badge-info',
      'in-progress': 'badge-warning',
      'pending-docs': 'badge-secondary',
      'confirmed': 'badge-success',
      'completed': 'badge-success',
      'cancelled': 'badge-error'
    };
    return styles[status] || 'badge-ghost';
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      'high': 'text-red-600 bg-red-50',
      'medium': 'text-yellow-600 bg-yellow-50',
      'low': 'text-green-600 bg-green-50'
    };
    return styles[priority] || 'text-gray-600 bg-gray-50';
  };

  const handleStatusChange = (id, newStatus) => {
    updateServiceRequest(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deleteServiceRequest(id);
    }
  };

  const requestStats = {
    total: serviceRequests.length,
    new: serviceRequests.filter(r => r.status === 'new').length,
    inProgress: serviceRequests.filter(r => r.status === 'in-progress').length,
    visa: serviceRequests.filter(r => r.type === 'visa').length,
    studyAbroad: serviceRequests.filter(r => r.type === 'study-abroad').length,
    hajj: serviceRequests.filter(r => r.type === 'hajj').length,
    corporate: serviceRequests.filter(r => r.type === 'corporate').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Service Requests</h1>
          <p className="text-base-content/60">Manage visa, study abroad, Hajj, and corporate requests</p>
        </div>
        <div className="flex gap-3">
          <button className="btn p-6 btn-ghost btn-sm gap-2">
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary-custom btn-sm gap-2"
          >
            <Plus size={16} />
            New Request
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-base-content">{requestStats.total}</p>
          <p className="text-sm text-base-content/60">Total</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{requestStats.new}</p>
          <p className="text-sm text-base-content/60">New</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{requestStats.inProgress}</p>
          <p className="text-sm text-base-content/60">In Progress</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300 cursor-pointer hover:border-blue-300" onClick={() => setTypeFilter('visa')}>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{requestStats.visa}</p>
          <p className="text-sm text-base-content/60">Visa</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300 cursor-pointer hover:border-green-300" onClick={() => setTypeFilter('study-abroad')}>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{requestStats.studyAbroad}</p>
          <p className="text-sm text-base-content/60">Study Abroad</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300 cursor-pointer hover:border-purple-300" onClick={() => setTypeFilter('hajj')}>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{requestStats.hajj}</p>
          <p className="text-sm text-base-content/60">Hajj & Umrah</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300 cursor-pointer hover:border-orange-300" onClick={() => setTypeFilter('corporate')}>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{requestStats.corporate}</p>
          <p className="text-sm text-base-content/60">Corporate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl p-4 shadow-sm border border-base-300">
        <div className="flex flex-col gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
            <input
              type="text"
              placeholder="Search by customer name, email, or notes..."
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
              <option value="visa">Visa</option>
              <option value="study-abroad">Study Abroad</option>
              <option value="hajj">Hajj & Umrah</option>
              <option value="corporate">Corporate</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="pending-docs">Pending Docs</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Type</th>
                <th>Customer</th>
                <th>Details</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-base-200">
                  <td>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(request.type)}`}>
                      {getTypeIcon(request.type)}
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium text-base-content">{request.customerName}</p>
                      <p className="text-sm text-base-content/60">{request.customerEmail}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium text-base-content">
                        {request.type === 'visa' && `${request.country} - ${request.visaType}`}
                        {request.type === 'study-abroad' && `${request.country} - ${request.program}`}
                        {request.type === 'hajj' && `${request.packageType}`}
                        {request.type === 'corporate' && `${request.companyName} - ${request.requestType}`}
                      </p>
                      <p className="text-sm text-base-content/60 truncate max-w-xs">{request.notes}</p>
                    </div>
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityBadge(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm">{request.assignedAgent}</span>
                  </td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      className={`select select-xs ${getStatusBadge(request.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="pending-docs">Pending Docs</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <span className="text-sm text-base-content/60">{request.createdAt}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingRequest(request)}
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
                        onClick={() => handleDelete(request.id)}
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
        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <FileText size={48} className="mx-auto mb-4 text-base-content/30" />
            <p className="text-base-content/60">No service requests found</p>
          </div>
        )}
      </div>

      {/* View Request Modal */}
      {viewingRequest && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button onClick={() => setViewingRequest(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getTypeColor(viewingRequest.type)}`}>
                {getTypeIcon(viewingRequest.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-content">{getTypeLabel(viewingRequest.type)}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`badge ${getStatusBadge(viewingRequest.status)}`}>
                    {viewingRequest.status}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityBadge(viewingRequest.priority)}`}>
                    {viewingRequest.priority} priority
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="p-4 bg-base-200 rounded-xl mb-6">
              <h4 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                <User size={16} />
                Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-base-content/40" />
                  <span>{viewingRequest.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-base-content/40" />
                  <span>{viewingRequest.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-base-content/40" />
                  <span>{viewingRequest.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div className="p-4 bg-base-200 rounded-xl mb-6">
              <h4 className="font-semibold text-base-content mb-3">Request Details</h4>
              <div className="space-y-3">
                {viewingRequest.type === 'visa' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Country</span>
                      <span className="font-medium">{viewingRequest.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Visa Type</span>
                      <span className="font-medium">{viewingRequest.visaType}</span>
                    </div>
                    {viewingRequest.documents && viewingRequest.documents.length > 0 && (
                      <div>
                        <span className="text-base-content/60">Documents Submitted</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {viewingRequest.documents.map((doc, i) => (
                            <span key={i} className="badge badge-sm badge-outline">{doc}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {viewingRequest.type === 'study-abroad' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Country</span>
                      <span className="font-medium">{viewingRequest.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Program</span>
                      <span className="font-medium">{viewingRequest.program}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">University</span>
                      <span className="font-medium">{viewingRequest.university}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Intake</span>
                      <span className="font-medium">{viewingRequest.intake}</span>
                    </div>
                  </>
                )}
                {viewingRequest.type === 'hajj' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Package Type</span>
                      <span className="font-medium">{viewingRequest.packageType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Number of Persons</span>
                      <span className="font-medium">{viewingRequest.persons}</span>
                    </div>
                    {viewingRequest.roomType && (
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Room Type</span>
                        <span className="font-medium">{viewingRequest.roomType}</span>
                      </div>
                    )}
                  </>
                )}
                {viewingRequest.type === 'corporate' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Company</span>
                      <span className="font-medium">{viewingRequest.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Request Type</span>
                      <span className="font-medium">{viewingRequest.requestType}</span>
                    </div>
                    {viewingRequest.employeeCount && (
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Employee Count</span>
                        <span className="font-medium">{viewingRequest.employeeCount}</span>
                      </div>
                    )}
                    {viewingRequest.estimatedMonthlyTravel && (
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Est. Monthly Travel</span>
                        <span className="font-medium">{formatCurrency(viewingRequest.estimatedMonthlyTravel)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Notes */}
            {viewingRequest.notes && (
              <div className="p-4 bg-yellow-50 rounded-xl mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Notes</h4>
                <p className="text-sm text-yellow-700">{viewingRequest.notes}</p>
              </div>
            )}

            <div className="flex justify-between text-sm text-base-content/60">
              <span>Assigned to: {viewingRequest.assignedAgent}</span>
              <span>Created: {viewingRequest.createdAt}</span>
            </div>

            <div className="modal-action">
              <button onClick={() => setViewingRequest(null)} className="btn btn-ghost">
                Close
              </button>
              <button className="btn btn-primary">
                Edit Request
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setViewingRequest(null)}></div>
        </div>
      )}
    </div>
  );
}
