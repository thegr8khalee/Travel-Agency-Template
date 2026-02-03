import { useState, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  DollarSign,
  Users,
  Package,
  Plane,
  Hotel,
  FileText,
  PieChart,
} from 'lucide-react';

export default function AdminReports() {
  const { getStats, formatCurrency } = useAdmin();
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const stats = getStats();

  // Calculate date-filtered data (mock implementation)
  const filteredData = useMemo(() => {
    // In real app, filter by date range
    return {
      ...stats,
      pendingAmount: stats.pendingPayments,
    };
  }, [stats, dateRange]);

  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 125000, bookings: 45 },
    { month: 'Feb', revenue: 148000, bookings: 52 },
    { month: 'Mar', revenue: 167000, bookings: 61 },
    { month: 'Apr', revenue: 189000, bookings: 58 },
    { month: 'May', revenue: 210000, bookings: 72 },
    { month: 'Jun', revenue: 234000, bookings: 85 },
  ];

  const bookingsByType = [
    { type: 'Flights', count: 156, revenue: 450000, color: 'bg-blue-500' },
    { type: 'Hotels', count: 98, revenue: 320000, color: 'bg-green-500' },
    { type: 'Packages', count: 67, revenue: 580000, color: 'bg-purple-500' },
    { type: 'Visa', count: 45, revenue: 85000, color: 'bg-yellow-500' },
    { type: 'Hajj/Umrah', count: 23, revenue: 290000, color: 'bg-red-500' },
  ];

  const topDestinations = [
    { destination: 'Dubai, UAE', bookings: 89, revenue: 245000 },
    { destination: 'London, UK', bookings: 67, revenue: 198000 },
    { destination: 'Paris, France', bookings: 54, revenue: 167000 },
    { destination: 'Makkah, KSA', bookings: 45, revenue: 340000 },
    { destination: 'Istanbul, Turkey', bookings: 38, revenue: 98000 },
  ];

  const customerStats = {
    totalCustomers: 1250,
    newThisMonth: 89,
    repeatCustomers: 456,
    averageBookingValue: 125000,
  };

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));
  const totalBookingsByType = bookingsByType.reduce(
    (sum, b) => sum + b.count,
    0,
  );

  const exportReport = () => {
    // Mock export functionality
    alert('Report exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">
            Reports & Analytics
          </h1>
          <p className="text-base-content/60">
            Business insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="select select-bordered"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button onClick={exportReport} className="btn btn-primary gap-2">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'bookings', label: 'Bookings', icon: FileText },
          { id: 'revenue', label: 'Revenue', icon: DollarSign },
          { id: 'customers', label: 'Customers', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              className={`btn rounded-full shadow-none border-none gap-2 ${reportType === tab.id ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-base-content">
                {formatCurrency(filteredData.totalRevenue)}
              </p>
              <p className="text-sm text-green-500 dark:text-green-400 flex items-center gap-1 mt-1">
                <TrendingUp size={14} /> +12.5% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl  dark:bg-green-900/30 flex items-center justify-center">
              <DollarSign
                size={24}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-base-content">
                {filteredData.totalBookings}
              </p>
              <p className="text-sm text-green-500  flex items-center gap-1 mt-1">
                <TrendingUp size={14} /> +8.3% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl   flex items-center justify-center">
              <FileText
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60 text-sm">New Customers</p>
              <p className="text-2xl font-bold text-base-content">
                {customerStats.newThisMonth}
              </p>
              <p className="text-sm text-red-500  flex items-center gap-1 mt-1">
                <TrendingDown size={14} /> -2.1% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl   flex items-center justify-center">
              <Users
                size={24}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base-content/60 text-sm">Avg. Booking Value</p>
              <p className="text-2xl font-bold text-base-content">
                {formatCurrency(customerStats.averageBookingValue)}
              </p>
              <p className="text-sm text-green-500  flex items-center gap-1 mt-1">
                <TrendingUp size={14} /> +5.7% vs last period
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl   flex items-center justify-center">
              <Package
                size={24}
                className="text-orange-600 dark:text-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <h3 className="font-semibold text-base-content mb-4">
            Monthly Revenue
          </h3>
          <div className="space-y-3">
            {monthlyRevenue.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <span className="w-10 text-sm text-base-content/60">
                  {month.month}
                </span>
                <div className="flex-1 h-8 bg-base-200 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-lg transition-all duration-500"
                    style={{ width: `${(month.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-base-content/70 w-24 text-right">
                  {formatCurrency(month.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings by Type */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <h3 className="font-semibold text-base-content mb-4">
            Bookings by Type
          </h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                {
                  bookingsByType.reduce(
                    (acc, type, index) => {
                      const percentage =
                        (type.count / totalBookingsByType) * 100;
                      const previousPercentages = acc.totalPercentage;
                      const dashArray = `${percentage} ${100 - percentage}`;
                      const dashOffset = -previousPercentages;
                      const colors = [
                        '#3B82F6',
                        '#10B981',
                        '#8B5CF6',
                        '#F59E0B',
                        '#EF4444',
                      ];

                      acc.elements.push(
                        <circle
                          key={type.type}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={colors[index]}
                          strokeWidth="20"
                          strokeDasharray={dashArray}
                          strokeDashoffset={dashOffset}
                          className="transition-all duration-500"
                        />,
                      );
                      acc.totalPercentage += percentage;
                      return acc;
                    },
                    { elements: [], totalPercentage: 0 },
                  ).elements
                }
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-base-content">
                    {totalBookingsByType}
                  </p>
                  <p className="text-xs text-base-content/60">Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {bookingsByType.map((type) => (
              <div key={type.type} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${type.color}`} />
                <span className="text-base-content/60">{type.type}</span>
                <span className="text-base-content font-medium ml-auto">
                  {type.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <h3 className="font-semibold text-base-content mb-4">
            Top Destinations
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Destination</th>
                  <th>Bookings</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topDestinations.map((dest, index) => (
                  <tr key={dest.destination}>
                    <td className="font-medium text-base-content/60">
                      {index + 1}
                    </td>
                    <td className="font-medium text-base-content">
                      {dest.destination}
                    </td>
                    <td>{dest.bookings}</td>
                    <td className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(dest.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Service Type */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          <h3 className="font-semibold text-base-content mb-4">
            Revenue by Service
          </h3>
          <div className="space-y-4">
            {bookingsByType.map((type) => {
              const maxTypeRevenue = Math.max(
                ...bookingsByType.map((b) => b.revenue),
              );
              const percentage = (type.revenue / maxTypeRevenue) * 100;
              return (
                <div key={type.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-base-content/60">{type.type}</span>
                    <span className="font-medium text-base-content">
                      {formatCurrency(type.revenue)}
                    </span>
                  </div>
                  <div className="h-3 bg-base-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${type.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
        <h3 className="font-semibold text-base-content mb-4">
          Customer Insights
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-base-200 rounded-xl">
            <p className="text-3xl font-bold text-base-content">
              {customerStats.totalCustomers}
            </p>
            <p className="text-sm text-base-content/60">Total Customers</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {customerStats.newThisMonth}
            </p>
            <p className="text-sm text-base-content/60">New This Month</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {customerStats.repeatCustomers}
            </p>
            <p className="text-sm text-base-content/60">Repeat Customers</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {(
                (customerStats.repeatCustomers / customerStats.totalCustomers) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="text-sm text-base-content/60">Retention Rate</p>
          </div>
        </div>
      </div>

      {/* Pending Payments Summary */}
      <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base-content">Payment Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-sm text-base-content/60">Collected</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(filteredData.totalRevenue * 0.85)}
            </p>
            <p className="text-xs text-base-content/60 mt-1">85% of total</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <p className="text-sm text-base-content/60">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {formatCurrency(filteredData.pendingAmount)}
            </p>
            <p className="text-xs text-base-content/60 mt-1">12% of total</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-sm text-base-content/60">Overdue</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(filteredData.totalRevenue * 0.03)}
            </p>
            <p className="text-xs text-base-content/60 mt-1">3% of total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
