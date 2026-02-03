import { Link } from 'react-router-dom';
import { Menu, X, Globe, Phone, Plane, User, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="bg-transparent fixed top-0 z-50 w-full p-2">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="text-lg sm:text-2xl font-medium flex items-center gap-2 text-white">
            <img src="https://abjandhtravels.com/wp-content/uploads/2025/10/cropped-cropped-cropped-cropped-ABJ-H-LOGO-Cropped-Semi-Final-1-300x276.png" alt="" 
            className='w-15 h-15 rounded-full shadow-lg'
            />
            <span className="hidden md:inline">ABJ & H Travels</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 bg-base-100 rounded-full p-3 xl:p-4 px-4 xl:px-6 border-b border-base-200 shadow-lg">
            <Link to="/flights" className="text-sm xl:text-base hover:text-primary transition-colors">Flights</Link>
            <Link to="/hotels" className="text-sm xl:text-base hover:text-primary transition-colors">Hotels</Link>
            <Link to="/visa" className="text-sm xl:text-base hover:text-primary transition-colors">Visa</Link>
            <Link to="/holidays" className="text-sm xl:text-base hover:text-primary transition-colors">Holidays</Link>
            <Link to="/study-abroad" className="text-sm xl:text-base hover:text-primary transition-colors whitespace-nowrap">Study Abroad</Link>
            <Link to="/contact" className="text-sm xl:text-base hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
             <button onClick={toggleTheme} className="flex items-center gap-1 text-sm bg-base-100 p-3 xl:p-4 hover:bg-base-200 shadow-lg transition-colors rounded-full">
                {theme === 'light' ? <Moon className="size-4 xl:size-5" /> : <Sun className="size-4 xl:size-5" />}
             </button>
             <Link to="/my-bookings" className="flex items-center gap-1 shadow-lg text-sm bg-base-100 p-3 xl:p-4 rounded-full">
                <Plane className="size-4 xl:size-5" />
             </Link>
             <Link to="/login" className="flex items-center gap-1 text-sm bg-base-100 p-3 xl:p-4 hover:bg-base-200 shadow-lg transition-colors rounded-full">
                <User className="size-4 xl:size-5" />
             </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="flex items-center bg-base-100 backdrop-blur-sm p-2 rounded-full shadow-lg">
              {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </button>
            <Link to="/login" className="flex items-center bg-base-100 shadow-lg backdrop-blur-sm p-2 rounded-full">
              <User className="size-5" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none shadow-lg  bg-base-100 p-2 rounded-full">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-base-100 rounded-2xl mt-2 p-4 shadow-xl border border-base-200">
            <div className="flex flex-col space-y-1">
              <Link to="/flights" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Flights</Link>
              <Link to="/hotels" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Hotels</Link>
              <Link to="/visa" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Visa</Link>
              <Link to="/holidays" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Holidays</Link>
              <Link to="/study-abroad" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Study Abroad</Link>
              <Link to="/hajj-umrah" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Hajj & Umrah</Link>
              <Link to="/corporate" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Corporate</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-base-200 transition-colors">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
