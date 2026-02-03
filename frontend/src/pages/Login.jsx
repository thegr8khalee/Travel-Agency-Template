import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/signup
    navigate('/profile');
  };

  return (
    <div className="min-h-screen pt-24 bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-medium text-base-content">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-base-content/60">
            {isLogin ? 'Sign in to access your bookings' : 'Start your journey with us today'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-base-content/70">Full Name</label>
                <div className="relative mt-1">
                  {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-base-content/40" />
                  </div> */}
                  <input
                    type="text"
                    required
                    className="input input-bordered w-full rounded-2xl"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-base-content/70">Email address</label>
              <div className="relative mt-1">
                    {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-base-content/40" />
                    </div> */}
                <input
                  type="email"
                  required
                  className="input input-bordered w-full rounded-2xl"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-base-content/70">Password</label>
              <div className="relative mt-1">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div> */}
                <input
                  type="password"
                  required
                  className="input input-bordered w-full rounded-2xl"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-base-content/70">
                Remember me
              </label>
            </div>

            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-focus">
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary-custom w-full gap-2"
            >
              {isLogin ? 'Sign in' : 'Create Account'}
              {/* <ArrowRight size={18} /> */}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-base-content/60">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary hover:text-primary-focus transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
