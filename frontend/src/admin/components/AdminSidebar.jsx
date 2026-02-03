import { NavLink } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileText,
  Package,
  Settings,
  Plane,
  Building2,
  CreditCard,
  BarChart3,
  FileEdit,
  UserCog,
  LogOut,
  ChevronDown,
  ChevronRight,
  Globe,
  GraduationCap,
  Briefcase,
  Moon,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminSidebar() {
  const { logout, currentUser, getStats } = useAdmin();
  const stats = getStats();
  const [expandedMenus, setExpandedMenus] = useState(['services']);

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu],
    );
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      badge: null,
    },
    {
      path: '/admin/customers',
      icon: Users,
      label: 'Customers',
      badge: null,
    },
    {
      path: '/admin/bookings',
      icon: CalendarCheck,
      label: 'Bookings',
      badge: stats.pendingBookings > 0 ? stats.pendingBookings : null,
      badgeColor: 'badge-warning',
    },
    {
      id: 'services',
      icon: FileText,
      label: 'Service Requests',
      badge: stats.newLeads > 0 ? stats.newLeads : null,
      badgeColor: 'badge-info',
      children: [
        {
          path: '/admin/service-requests',
          icon: FileText,
          label: 'All Requests',
        },
        {
          path: '/admin/service-requests/visa',
          icon: Globe,
          label: 'Visa Services',
        },
        {
          path: '/admin/service-requests/study-abroad',
          icon: GraduationCap,
          label: 'Study Abroad',
        },
        {
          path: '/admin/service-requests/hajj',
          icon: Moon,
          label: 'Hajj & Umrah',
        },
        {
          path: '/admin/service-requests/corporate',
          icon: Briefcase,
          label: 'Corporate',
        },
      ],
    },
    {
      path: '/admin/packages',
      icon: Package,
      label: 'Packages',
      badge: null,
    },
    {
      path: '/admin/flights',
      icon: Plane,
      label: 'Flights',
      badge: null,
    },
    {
      path: '/admin/hotels',
      icon: Building2,
      label: 'Hotels',
      badge: null,
    },
    {
      path: '/admin/payments',
      icon: CreditCard,
      label: 'Payments',
      badge: null,
    },
    {
      path: '/admin/reports',
      icon: BarChart3,
      label: 'Reports',
      badge: null,
    },
    {
      path: '/admin/cms',
      icon: FileEdit,
      label: 'CMS',
      badge: null,
    },
    {
      path: '/admin/users',
      icon: UserCog,
      label: 'Users & Roles',
      badge: null,
    },
    {
      path: '/admin/settings',
      icon: Settings,
      label: 'Settings',
      badge: null,
    },
  ];

  const renderNavItem = (item) => {
    if (item.children) {
      const isExpanded = expandedMenus.includes(item.id);
      const Icon = item.icon;

      return (
        <li key={item.id}>
          <button
            onClick={() => toggleMenu(item.id)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`badge badge-sm ${item.badgeColor || 'badge-primary'}`}
                >
                  {item.badge}
                </span>
              )}
            </div>
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
          {isExpanded && (
            <ul className="ml-4 mt-1 space-y-1 border-l border-slate-600 pl-4">
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                return (
                  <li key={child.path}>
                    <NavLink
                      to={child.path}
                      end={child.path === '/admin/service-requests'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary/20 text-primary'
                            : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
                        }`
                      }
                    >
                      <ChildIcon size={16} />
                      <span className="text-sm">{child.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    const Icon = item.icon;
    return (
      <li key={item.path}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
            }`
          }
        >
          <Icon size={20} />
          <span>{item.label}</span>
          {item.badge && (
            <span
              className={`badge badge-sm ml-auto ${item.badgeColor || 'badge-primary'}`}
            >
              {item.badge}
            </span>
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <aside className="w-64 h-screen bg-slate-800 text-white flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="https://abjandhtravels.com/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-ABJ-H-LOGO-Cropped-Semi-Final-1-300x276.png"
            alt=""
            className="w-10 h-10 rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-lg font-medium ">
              ABJ & H Travel
            </h1>
            <p className="text-xs text-gray-400">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">{navItems.map(renderNavItem)}</ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentUser?.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-400 truncate capitalize">
              {currentUser?.role || 'Administrator'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
