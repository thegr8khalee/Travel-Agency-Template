import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Users,
  Plus,
  Search,
  X,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminUsers() {
  const { adminUsers, addAdminUser, updateAdminUser, deleteAdminUser } = useAdmin();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'agent',
    password: '',
    status: 'active',
    permissions: []
  });

  const allPermissions = [
    { id: 'bookings', label: 'Manage Bookings' },
    { id: 'customers', label: 'Manage Customers' },
    { id: 'packages', label: 'Manage Packages' },
    { id: 'payments', label: 'View Payments' },
    { id: 'reports', label: 'View Reports' },
    { id: 'cms', label: 'Manage CMS' },
    { id: 'users', label: 'Manage Users' },
    { id: 'settings', label: 'System Settings' }
  ];

  const rolePermissions = {
    admin: allPermissions.map(p => p.id),
    manager: ['bookings', 'customers', 'packages', 'payments', 'reports'],
    agent: ['bookings', 'customers']
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <ShieldAlert size={16} className="text-red-500 dark:text-red-400" />;
      case 'manager': return <ShieldCheck size={16} className="text-blue-500 dark:text-blue-400" />;
      default: return <Shield size={16} className="text-base-content/60" />;
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'badge-error',
      manager: 'badge-info',
      agent: 'badge-ghost'
    };
    return colors[role] || 'badge-ghost';
  };

  const filteredUsers = adminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        password: '',
        status: user.status,
        permissions: user.permissions || rolePermissions[user.role] || []
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'agent',
        password: '',
        status: 'active',
        permissions: rolePermissions['agent']
      });
    }
    setShowPassword(false);
    setShowModal(true);
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
      permissions: rolePermissions[role] || []
    });
  };

  const togglePermission = (permissionId) => {
    const newPermissions = formData.permissions.includes(permissionId)
      ? formData.permissions.filter(p => p !== permissionId)
      : [...formData.permissions, permissionId];
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      ...(editingUser ? {} : { password: formData.password }),
      ...(formData.password && editingUser ? { password: formData.password } : {})
    };
    
    if (editingUser) {
      updateAdminUser(editingUser.id, userData);
    } else {
      addAdminUser(userData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteAdminUser(id);
    }
  };

  const toggleStatus = (user) => {
    updateAdminUser(user.id, {
      status: user.status === 'active' ? 'inactive' : 'active'
    });
  };

  // Stats
  const totalUsers = adminUsers.length;
  const activeUsers = adminUsers.filter(u => u.status === 'active').length;
  const adminCount = adminUsers.filter(u => u.role === 'admin').length;
  const managerCount = adminUsers.filter(u => u.role === 'manager').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Users & Roles</h1>
          <p className="text-base-content/60">Manage admin users and their permissions</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary gap-2">
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{totalUsers}</p>
              <p className="text-xs text-base-content/60">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{activeUsers}</p>
              <p className="text-xs text-base-content/60">Active Users</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <ShieldAlert size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{adminCount}</p>
              <p className="text-xs text-base-content/60">Administrators</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{managerCount}</p>
              <p className="text-xs text-base-content/60">Managers</p>
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
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="agent">Agent</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-base-200">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-base-content">{user.name}</p>
                          <p className="text-sm text-base-content/60">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className={`badge ${getRoleBadge(user.role)} capitalize`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-sm">
                        <span className="flex items-center gap-1 text-base-content/60">
                          <Mail size={12} /> {user.email}
                        </span>
                        {user.phone && (
                          <span className="flex items-center gap-1 text-base-content/60">
                            <Phone size={12} /> {user.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(user)}
                        className={`badge gap-1 cursor-pointer ${
                          user.status === 'active' ? 'badge-success' : 'badge-error'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <><CheckCircle size={12} /> Active</>
                        ) : (
                          <><XCircle size={12} /> Inactive</>
                        )}
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-sm text-base-content/60">
                        <Calendar size={12} />
                        {user.lastActive || 'Never'}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-ghost btn-sm btn-square text-red-500"
                          title="Delete"
                          disabled={user.role === 'admin' && adminCount <= 1}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-base-content/60">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Full Name *</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Email *</span></label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Phone</span></label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Role *</span></label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="agent">Agent</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      {editingUser ? 'New Password (leave blank to keep)' : 'Password *'}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input input-bordered w-full pr-10"
                      required={!editingUser}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Status</span></label>
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

              {/* Permissions */}
              <div>
                <label className="label"><span className="label-text font-medium">Permissions</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-base-200 rounded-xl">
                  {allPermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="checkbox checkbox-primary checkbox-sm"
                      />
                      <span className="text-sm text-base-content/70">{permission.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-base-content/60 mt-2">
                  Permissions are automatically set based on role but can be customized
                </p>
              </div>

              <div className="modal-action">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowModal(false)}></div>
        </div>
      )}
    </div>
  );
}
