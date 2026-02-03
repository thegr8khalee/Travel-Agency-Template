import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Visa from './pages/Visa';
import StudyAbroad from './pages/StudyAbroad';
import Holidays from './pages/Holidays';
import HajjUmrah from './pages/HajjUmrah';
import Corporate from './pages/Corporate';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import BookingSuccess from './pages/BookingSuccess';

// Admin imports
import { AdminProvider } from './admin/context/AdminContext';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminCustomers from './admin/pages/AdminCustomers';
import AdminBookings from './admin/pages/AdminBookings';
import AdminServiceRequests from './admin/pages/AdminServiceRequests';
import AdminPackages from './admin/pages/AdminPackages';
import AdminFlights from './admin/pages/AdminFlights';
import AdminHotels from './admin/pages/AdminHotels';
import AdminPayments from './admin/pages/AdminPayments';
import AdminReports from './admin/pages/AdminReports';
import AdminCMS from './admin/pages/AdminCMS';
import AdminUsers from './admin/pages/AdminUsers';
import AdminSettings from './admin/pages/AdminSettings';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="service-requests" element={<AdminServiceRequests />} />
            <Route path="service-requests/:type" element={<AdminServiceRequests />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="flights" element={<AdminFlights />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/hotels" element={<Hotels />} />
                    <Route path="/visa" element={<Visa />} />
                    <Route path="/study-abroad" element={<StudyAbroad />} />
                    <Route path="/holidays" element={<Holidays />} />
                    <Route path="/hajj-umrah" element={<HajjUmrah />} />
                    <Route path="/corporate" element={<Corporate />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route path="/booking-success" element={<BookingSuccess />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
