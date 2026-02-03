import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Plane, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Try admin/admin');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
          }}></div>
        </div> */}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <img
            src="https://abjandhtravels.com/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-ABJ-H-LOGO-Cropped-Semi-Final-1-300x276.png"
            alt=""
            className="w-10 h-10 rounded-full shadow-lg"
          />
            <div>
              <h1 className="text-2xl font-medium text-white">ABJ&H Travels</h1>
              <p className="text-white/80 text-sm">Management Portal</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-medium text-white mb-4 leading-tight">
            Welcome to your<br />
            <span className="">
              Travel Management Hub
            </span>
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Manage bookings, customers, packages, and more from one powerful dashboard.
          </p>

          {/* Feature Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { title: 'Bookings', value: '2,450+', desc: 'This month' },
              { title: 'Revenue', value: '₦45M', desc: 'Total earnings' },
              { title: 'Customers', value: '1,200+', desc: 'Active clients' },
              { title: 'Packages', value: '35', desc: 'Tour packages' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-2xl font-medium text-white">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.title}</p>
                <p className="text-white/40 text-xs">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2026 TravelAgency Nigeria. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-base-200">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img
            src="https://abjandhtravels.com/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-ABJ-H-LOGO-Cropped-Semi-Final-1-300x276.png"
            alt=""
            className="w-10 h-10 rounded-full shadow-lg"
          />
            <div>
              <h1 className="text-2xl font-medium text-base-content">TravelAdmin</h1>
              <p className="text-base-content/60 text-sm">Management Portal</p>
            </div>
          </div>

          <div className="bg-base-100 rounded-2xl shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-base-content">Welcome Back</h2>
              <p className="text-base-content/60 mt-2">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full pl-12 pr-4 py-3 bg-transparent text-base-content placeholder-base-content/40 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-transparent text-base-content placeholder-base-content/40 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                  <span className="text-sm text-base-content/60">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-all disabled:opacity-50 shadow-none border-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-base-200 rounded-xl">
              <p className="text-xs text-base-content/60 text-center">
                <strong>Demo Credentials:</strong> admin / admin
              </p>
            </div>
          </div>

          <p className="text-center text-base-content/60 text-sm mt-6">
            Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
