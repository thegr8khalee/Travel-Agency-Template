import React, { useState, useEffect } from 'react';
import { Plane, Calendar, MapPin, Clock, CreditCard, User, Shield, Trash2, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('All Bookings');

    // Default mock data with enhanced details
    const defaultBookings = [
        {
            id: 'BK-7829',
            type: 'flight',
            title: 'Lagos (LOS) → London (LHR)',
            airline: 'British Airways',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/BA_logo_2014.svg',
            departure: '23:45',
            arrival: '06:15',
            duration: '7h 30m',
            stops: 'Non-stop',
            departureDate: '2026-03-15',
            date: '2026-03-15',
            status: 'Confirmed',
            price: '₦1,450,000'
        },
        {
            id: 'BK-9921',
            type: 'hotel',
            title: 'Hilton Dubai Palm Jumeirah',
            hotelName: 'Hilton Dubai Palm Jumeirah',
            location: 'Dubai, UAE',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
            checkIn: '2026-04-22',
            checkOut: '2026-04-27',
            nights: '5 Nights',
            date: '2026-04-22',
            status: 'Pending',
            price: '₦2,100,000'
        },
        {
            id: 'BK-3342',
            type: 'flight',
            title: 'Abuja (ABV) → Kigali (KGL)',
            airline: 'RwandAir',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/33/RwandAir_logo.png/220px-RwandAir_logo.png',
            departure: '14:20',
            arrival: '16:50',
            duration: '2h 30m',
            stops: 'Non-stop',
            departureDate: '2026-02-10',
            date: '2026-02-10',
            status: 'Completed',
            price: '₦850,000'
        }
    ];

    useEffect(() => {
        // Load from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
        
        // Merge stored bookings with default (mock) bookings
        // In a real app, you'd fetch from API
        setBookings([...storedBookings, ...defaultBookings]);
    }, []);

    const handleClearHistory = () => {
        if(confirm("Are you sure you want to clear your booking history? This will remove all locally saved bookings.")) {
            localStorage.removeItem('my_bookings');
            setBookings([...defaultBookings]); // Reset to defaults
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Confirmed': return 'badge-success text-white';
            case 'Pending': return 'badge-warning text-warning-content';
            case 'Completed': return 'badge-neutral';
            case 'Cancelled': return 'badge-error text-white';
            default: return 'badge-ghost';
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'All Bookings') return true;
        if (filter === 'Upcoming') return booking.status === 'Confirmed' || booking.status === 'Pending';
        return booking.status === filter;
    });

    return (
        <div className="bg-base-200 min-h-screen py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/3">
                        <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-6 sticky top-24">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User size={40} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-medium text-base-content">John Doe</h2>
                                <p className="text-base-content/60">Travel Enthusiast</p>
                            </div>
                            
                            <div className="space-y-2">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-base-content/70 hover:bg-base-200 rounded-2xl transition-colors">
                                    <User size={20} /> My Profile
                                </Link>
                                <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-2xl font-medium">
                                    <CreditCard size={20} /> My Bookings
                                </Link>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-2xl transition-colors text-left">
                                    <Shield size={20} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-2/3">
                        <div className="bg-base-100 rounded-2xl shadow-lg p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-medium text-base-content">My Bookings</h1>
                                {bookings.length > defaultBookings.length && (
                                    <button onClick={handleClearHistory} className="btn btn-ghost btn-sm text-error">
                                        <Trash2 size={16} /> Clear History
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-4 border-b border-base-200 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                {['All Bookings', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
                                    <button 
                                        key={tab}
                                        onClick={() => setFilter(tab)}
                                        className={`pb-3 border-b-2 font-medium whitespace-nowrap transition-colors ${
                                            filter === tab 
                                            ? 'border-primary text-primary' 
                                            : 'border-transparent text-base-content/60 hover:text-base-content'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {filteredBookings.length === 0 ? (
                                    <div className="text-center py-12 text-base-content/40">
                                        <Ticket size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>No bookings found in this category.</p>
                                    </div>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <div key={booking.id} className="border border-base-200 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer bg-base-100 hover:shadow-md">
                                            {/* Flight Card */}
                                            {booking.type === 'flight' ? (
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="font-medium text-lg text-base-content mb-1">{booking.title}</h3>
                                                            {booking.airline && (
                                                                <div className="flex items-center gap-2">
                                                                    <img src={booking.logo} alt={booking.airline} className="h-5 object-contain" />
                                                                    <span className="text-sm text-base-content/70">{booking.airline}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className={`badge ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                                    </div>

                                                    {/* Flight Details */}
                                                    <div className="bg-base-200 rounded-2xl p-4 mb-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="text-center">
                                                                <div className="font-medium text-lg text-base-content">{booking.departure}</div>
                                                                <div className="text-xs text-base-content/60 mt-1">LOS</div>
                                                            </div>
                                                            <div className="flex flex-col items-center flex-1 mx-4">
                                                                <div className="w-full h-px bg-base-300 mb-2 relative">
                                                                    <Plane size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-200 text-primary" />
                                                                </div>
                                                                <div className="text-xs text-base-content/60 font-medium">{booking.duration}</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="font-medium text-lg text-base-content">{booking.arrival}</div>
                                                                <div className="text-xs text-base-content/60 mt-1">LHR</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-base-content/60 text-center mt-3">{booking.stops}</div>
                                                    </div>

                                                    {/* Info Row */}
                                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-base-content/70">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar size={16} /> {formatDate(booking.departureDate)}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 font-mono text-xs opacity-70">
                                                            <CreditCard size={14} /> {booking.id}
                                                        </div>
                                                        <div className="ml-auto text-lg font-medium text-base-content">{booking.price}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Hotel Card */
                                                <>
                                                    {booking.image && (
                                                        <img src={booking.image} alt={booking.hotelName} className="w-full h-40 object-cover" />
                                                    )}
                                                    <div className="p-5">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div>
                                                                <h3 className="font-medium text-lg text-base-content mb-1">{booking.hotelName}</h3>
                                                                <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                                    <MapPin size={16} /> {booking.location}
                                                                    {booking.rating && <span className="ml-auto font-semibold text-primary">⭐ {booking.rating}</span>}
                                                                </div>
                                                            </div>
                                                            <span className={`badge ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                                        </div>

                                                        {/* Hotel Details */}
                                                        <div className="bg-base-200 rounded-2xl p-3 mb-4 text-sm text-base-content/70">
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <div className="text-xs opacity-60">Check-in</div>
                                                                    <div className="font-semibold text-base-content">{formatDate(booking.checkIn)}</div>
                                                                </div>
                                                                <div className="text-xs font-semibold text-primary text-center">{booking.nights}</div>
                                                                <div>
                                                                    <div className="text-xs opacity-60">Check-out</div>
                                                                    <div className="font-semibold text-base-content">{formatDate(booking.checkOut)}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Info Row */}
                                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-base-content/70">
                                                            <div className="flex items-center gap-1.5 font-mono text-xs opacity-70">
                                                                <CreditCard size={14} /> {booking.id}
                                                            </div>
                                                            <div className="ml-auto text-lg font-medium text-base-content">{booking.price}</div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
