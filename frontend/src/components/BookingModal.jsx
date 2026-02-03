import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ isOpen, onClose, title = "Complete Your Booking", itemDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create booking object with full details
    const newBooking = {
      id: `BK-${Math.floor(Math.random() * 10000)}`,
      date: formData.date,
      bookingDate: new Date().toISOString(),
      status: 'Pending',
      contact: formData,
      item: itemDetails,
      // Normalized fields
      type: itemDetails?.airline ? 'flight' : (itemDetails?.location ? 'hotel' : 'service'),
      title: itemDetails?.title || itemDetails?.name || "Booking",
      price: itemDetails?.price || "TBD",
      // Flight-specific fields
      ...(itemDetails?.airline && {
        airline: itemDetails.airline,
        logo: itemDetails.logo,
        departure: itemDetails.departure,
        arrival: itemDetails.arrival,
        duration: itemDetails.duration,
        stops: itemDetails.stops,
        departureDate: itemDetails.date,
        departureTime: itemDetails.time
      }),
      // Hotel-specific fields
      ...(itemDetails?.location && {
        hotelName: itemDetails.name,
        location: itemDetails.location,
        rating: itemDetails.rating,
        image: itemDetails.image
      })
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
    localStorage.setItem('my_bookings', JSON.stringify([newBooking, ...existingBookings]));

    console.log("Booking Saved", newBooking);
    onClose();
    navigate('/booking-success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary/10 p-4 border-b border-base-200 flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-base-200 rounded-full transition-colors"
          >
            <X size={20} className="text-base-content/70" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
            {itemDetails && (
                <div className="mb-6 p-3 bg-base-200 rounded-2xl text-sm">
                    <p className="font-semibold text-base-content/80">Booking: <span className="text-primary">{itemDetails.title || itemDetails.name || "Service"}</span></p>
                    {itemDetails.subtitle && <p className="text-xs text-base-content/60 mt-1">{itemDetails.subtitle}</p>}
                </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input 
                type="text" 
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe" 
                className="input rounded-2xl input-bordered w-full focus:input-primary" 
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className="input rounded-2xl input-bordered w-full focus:input-primary" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="label">
                    <span className="label-text">Phone</span>
                </label>
                <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234..." 
                    className="input rounded-2xl input-bordered w-full focus:input-primary" 
                />
                </div>
                <div>
                <label className="label">
                    <span className="label-text">Preferred Date</span>
                </label>
                <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="input rounded-2xl input-bordered w-full focus:input-primary" 
                />
                </div>
            </div>
            
            <div>
              <label className="label">
                <span className="label-text">Special Requests (Optional)</span>
              </label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea rounded-2xl textarea-bordered w-full h-24 focus:textarea-primary" 
                placeholder="Any specific requirements?"
              ></textarea>
            </div>

            <div className="pt-4">
                <button type="submit" className="btn btn-primary-custom w-full ">
                    Confirm Booking
                </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;
