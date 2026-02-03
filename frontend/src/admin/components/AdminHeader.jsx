import { Bell, Search, Menu, X, CheckCheck, Calendar, DollarSign, FileText, AlertTriangle, Sun, Moon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader({ onMenuToggle, isMobileMenuOpen }) {
  const { notifications, markNotificationRead, markAllNotificationsRead, currentUser } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Apply theme on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  const notificationRef = useRef(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return <Calendar size={18} />;
      case 'payment': return <DollarSign size={18} />;
      case 'lead': return <FileText size={18} />;
      case 'alert': return <AlertTriangle size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking': return 'bg-blue-500/20 text-blue-400';
      case 'payment': return 'bg-green-500/20 text-green-400';
      case 'lead': return 'bg-purple-500/20 text-purple-400';
      case 'alert': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <header className="bg-white dark:bg-base-200 border-b border-gray-200 dark:border-base-300 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-base-300 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search bookings, customers, packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-base-300 border border-gray-200 dark:border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base-content"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 mr-4">
            <div className="text-right">
              <p className="text-xs text-base-content/60">Today's Bookings</p>
              <p className="text-lg font-semibold text-base-content">12</p>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-base-300"></div>
            <div className="text-right">
              <p className="text-xs text-base-content/60">Pending Actions</p>
              <p className="text-lg font-semibold text-orange-500">5</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-gray-50 dark:bg-base-300 hover:bg-gray-100 dark:hover:bg-base-300/80 transition-colors"
            >
              <Bell size={22} className="text-base-content/70" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-base-200 rounded-2xl shadow-2xl border border-gray-100 dark:border-base-300 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 dark:border-base-300 flex items-center justify-between">
                  <h3 className="font-semibold text-base-content">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <CheckCheck size={16} />
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-base-content/50">
                      <Bell size={40} className="mx-auto mb-2 opacity-20" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationRead(notification.id)}
                        className={`p-4 border-b border-gray-50 dark:border-base-300 hover:bg-gray-50 dark:hover:bg-base-300 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-primary/10' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm ${!notification.read ? 'font-semibold text-base-content' : 'text-base-content/80'}`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                              )}
                            </div>
                            <p className="text-sm text-base-content/60 truncate">{notification.message}</p>
                            <p className="text-xs text-base-content/40 mt-1">{notification.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 10 && (
                  <Link
                    to="/admin/notifications"
                    className="block p-3 text-center text-sm text-primary hover:bg-gray-50 dark:hover:bg-base-300 transition-colors"
                  >
                    View all notifications
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-base-300 hover:bg-gray-100 dark:hover:bg-base-300/80 transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon size={22} className="text-base-content/70" />
            ) : (
              <Sun size={22} className="text-yellow-400" />
            )}
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-base-300">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-base-content">{currentUser?.name || 'Admin'}</p>
              <p className="text-xs text-base-content/60 capitalize">{currentUser?.role || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-semibold shadow-lg shadow-primary/25">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
