import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ABJ & H Travels</h3>
            <p className="text-sm">
              Your one-stop destination for flights, hotels, visa assistance, and holiday packages. Trusted by thousands of travelers.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook size={20} className="hover:text-blue-500 cursor-pointer" />
              <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
              <Instagram size={20} className="hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/flights" className="hover:text-white">Book Flights</Link></li>
              <li><Link to="/hotels" className="hover:text-white">Hotel Reservations</Link></li>
              <li><Link to="/visa" className="hover:text-white">Visa Assistance</Link></li>
              <li><Link to="/holidays" className="hover:text-white">Holiday Packages</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Special Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/study-abroad" className="hover:text-white">Study Abroad</Link></li>
              <li><Link to="/hajj-umrah" className="hover:text-white">Hajj & Umrah</Link></li>
              <li><Link to="/corporate" className="hover:text-white">Corporate Travel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +123 456 7890
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@travelpro.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> 123 Travel Street, Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} TravelPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
