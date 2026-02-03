import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Users,
  CalendarCheck,
  DollarSign,
  FileText,
  Package,
  Plane,
  Building2,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    bookings,
    customers,
    serviceRequests,
    packages,
    payments,
    formatCurrency,
    getStats,
  } = useAdmin();
  const stats = getStats();

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-500',
      link: '/admin/payments',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      subValue: `${stats.weekBookings} this week`,
      change: '+8.2%',
      trend: 'up',
      icon: CalendarCheck,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-500',
      link: '/admin/bookings',
    },
    {
      title: 'Active Customers',
      value: stats.activeCustomers,
      subValue: `${stats.newCustomersThisMonth} new this month`,
      change: '+5.1%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-500',
      link: '/admin/customers',
    },
    {
      title: 'Pending Actions',
      value: stats.pendingBookings + stats.newLeads,
      subValue: `${stats.pendingBookings} bookings, ${stats.newLeads} leads`,
      change: '-3.2%',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-500',
      link: '/admin/bookings',
    },
  ];

  const serviceStats = [
    {
      label: 'Visa Requests',
      value: stats.visaRequests,
      icon: FileText,
      color: 'text-blue-500',
    },
    {
      label: 'Study Abroad',
      value: stats.studyRequests,
      icon: FileText,
      color: 'text-green-500',
    },
    {
      label: 'Hajj & Umrah',
      value: stats.hajjRequests,
      icon: FileText,
      color: 'text-purple-500',
    },
    {
      label: 'Corporate',
      value: stats.corporateRequests,
      icon: FileText,
      color: 'text-orange-500',
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-green-500/30 text-green-500',
      ticketed: 'bg-blue-500/30 text-blue-500',
      pending: 'bg-yellow-500/30 text-yellow-500',
      cancelled: 'bg-red-500/30 text-red-500',
    };
    return styles[status] || 'badge-ghost';
  };

  const getPaymentBadge = (status) => {
    const styles = {
      paid: { class: 'text-green-600 bg-green-50', icon: CheckCircle2 },
      partial: { class: 'text-yellow-600 bg-yellow-50', icon: Clock },
      unpaid: { class: 'text-red-600 bg-red-50', icon: XCircle },
    };
    return styles[status] || styles.unpaid;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Dashboard</h1>
          <p className="text-base-content/60">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <select className="select select-bordered select-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>This year</option>
          </select>
          <Link to="/admin/reports" className="btn btn-primary btn-sm gap-2">
            <TrendingUp size={16} />
            View Reports
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-base-300 group"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl `}>
                  <Icon size={24} className={stat.textColor} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-base-content">
                  {stat.value}
                </h3>
                <p className="text-base-content/60 text-sm">{stat.title}</p>
                {stat.subValue && (
                  <p className="text-xs text-base-content/40 mt-1">
                    {stat.subValue}
                  </p>
                )}
              </div>
              {/* <div className="mt-3 flex items-center text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                View details <ArrowRight size={16} className="ml-1" />
              </div> */}
            </Link>
          );
        })}
      </div>

      {/* Service Requests Overview */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-base-content">
            Service Requests Overview
          </h2>
          <Link
            to="/admin/service-requests"
            className="text-primary text-sm hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceStats.map((service, index) => (
            <div key={index} className="p-4 bg-base-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-base-100 ${service.color}`}>
                  <service.icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-base-content">
                    {service.value}
                  </p>
                  <p className="text-sm text-base-content/60">
                    {service.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-base-content">
              Recent Bookings
            </h2>
            <Link
              to="/admin/bookings"
              className="text-primary text-sm hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => {
              const paymentStyle = getPaymentBadge(booking.paymentStatus);
              const PaymentIcon = paymentStyle.icon;
              return (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      booking.type === 'flight'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : booking.type === 'hotel'
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {booking.type === 'flight' ? (
                      <Plane size={20} />
                    ) : booking.type === 'hotel' ? (
                      <Building2 size={20} />
                    ) : (
                      <Package size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-base-content truncate">
                      {booking.customerName}
                    </p>
                    <p className="text-sm text-base-content/60 truncate">
                      {booking.details}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span
                        className={`badge badge-sm ${getStatusBadge(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="font-semibold text-base-content">
                      {formatCurrency(booking.amount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-base-content">
              Pending Payments
            </h2>
            <Link
              to="/admin/payments"
              className="text-primary text-sm hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {payments
              .filter((p) => p.status !== 'completed')
              .slice(0, 5)
              .map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center">
                    <AlertCircle size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-base-content truncate">
                      {payment.customerName}
                    </p>
                    <p className="text-sm text-base-content/60">
                      {payment.invoiceNo} • Due: {payment.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(payment.balance)}
                    </p>
                    <p className="text-xs text-base-content/40">Balance</p>
                  </div>
                </div>
              ))}
            {payments.filter((p) => p.status !== 'completed').length === 0 && (
              <div className="text-center py-8 text-base-content/50">
                <CheckCircle2 size={40} className="mx-auto mb-2 opacity-30" />
                <p>All payments are up to date!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Packages */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-base-content">
            Top Performing Packages
          </h2>
          <Link
            to="/admin/packages"
            className="text-primary text-sm hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.topPackages.slice(0, 4).map((pkg, index) => (
            <div
              key={pkg.id}
              className="relative rounded-xl overflow-hidden group"
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-semibold text-white">{pkg.name}</p>
                <p className="text-sm text-gray-300">{pkg.destination}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white font-bold">
                    {formatCurrency(pkg.price)}
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                    {pkg.bookings} bookings
                  </span>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <CalendarCheck size={24} />
            <span className="font-medium">New Booking</span>
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Users size={24} />
            <span className="font-medium">Add Customer</span>
          </Link>
          <Link
            to="/admin/packages"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Package size={24} />
            <span className="font-medium">Create Package</span>
          </Link>
          <Link
            to="/admin/payments"
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <DollarSign size={24} />
            <span className="font-medium">Record Payment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
