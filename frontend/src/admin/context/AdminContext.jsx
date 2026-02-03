import { createContext, useContext, useState, useEffect } from 'react';
import { flightResults, hotelResults, popularDestinations } from '../../data/mockData';

const AdminContext = createContext();

// Mock customers data
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 803 123 4567',
    address: 'Lagos, Nigeria',
    status: 'active',
    tags: ['VIP', 'Frequent'],
    notes: 'Prefers business class. Always books last minute.',
    totalBookings: 12,
    totalSpent: 15450000,
    createdAt: '2025-06-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 805 987 6543',
    address: 'Abuja, Nigeria',
    status: 'active',
    tags: ['New'],
    notes: 'First-time customer. Interested in study abroad.',
    totalBookings: 2,
    totalSpent: 2025000,
    createdAt: '2026-01-10'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 807 456 7890',
    address: 'Port Harcourt, Nigeria',
    status: 'inactive',
    tags: ['Corporate'],
    notes: 'Works with Shell. Corporate account pending.',
    totalBookings: 5,
    totalSpent: 8200000,
    createdAt: '2025-09-20'
  },
  {
    id: 4,
    name: 'Amina Ibrahim',
    email: 'amina@example.com',
    phone: '+234 809 111 2222',
    address: 'Kano, Nigeria',
    status: 'active',
    tags: ['Hajj', 'Frequent'],
    notes: 'Books Hajj/Umrah every year. Family of 6.',
    totalBookings: 8,
    totalSpent: 22000000,
    createdAt: '2024-03-12'
  },
  {
    id: 5,
    name: 'Chidi Okoro',
    email: 'chidi@example.com',
    phone: '+234 803 555 6666',
    address: 'Enugu, Nigeria',
    status: 'active',
    tags: ['New'],
    notes: 'Family vacation planning.',
    totalBookings: 1,
    totalSpent: 890000,
    createdAt: '2026-01-20'
  }
];

// Mock bookings data
const initialBookings = [
  {
    id: 1,
    type: 'flight',
    customerId: 1,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    route: 'Lagos → Dubai',
    airline: 'Emirates',
    details: 'Lagos → Dubai, Emirates, Business Class',
    date: '2026-02-15',
    passengers: 2,
    amount: 2550000,
    status: 'confirmed',
    paymentStatus: 'paid',
    pnr: 'EK7842',
    assignedAgent: 'Sarah Admin',
    createdAt: '2026-01-28'
  },
  {
    id: 2,
    type: 'hotel',
    customerId: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    hotelName: 'The Ritz-Carlton',
    location: 'Dubai, UAE',
    details: 'The Ritz-Carlton, Dubai - 3 nights',
    checkIn: '2026-02-20',
    checkOut: '2026-02-23',
    guests: 2,
    rooms: 1,
    amount: 2025000,
    status: 'pending',
    paymentStatus: 'partial',
    assignedAgent: 'Admin',
    createdAt: '2026-01-30'
  },
  {
    id: 3,
    type: 'flight',
    customerId: 3,
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    route: 'Lagos → London',
    airline: 'British Airways',
    details: 'Lagos → London, British Airways',
    date: '2026-03-01',
    passengers: 1,
    amount: 1380000,
    status: 'pending',
    paymentStatus: 'unpaid',
    pnr: 'BA2391',
    assignedAgent: 'Sarah Admin',
    createdAt: '2026-02-01'
  },
  {
    id: 4,
    type: 'flight',
    customerId: 4,
    customerName: 'Amina Ibrahim',
    customerEmail: 'amina@example.com',
    route: 'Kano → Jeddah',
    airline: 'Saudi Airlines',
    details: 'Kano → Jeddah, Saudi Airlines, Umrah Package',
    date: '2026-03-10',
    passengers: 6,
    amount: 8400000,
    status: 'ticketed',
    paymentStatus: 'paid',
    pnr: 'SV1847',
    assignedAgent: 'Admin',
    createdAt: '2026-01-15'
  },
  {
    id: 5,
    type: 'package',
    customerId: 5,
    customerName: 'Chidi Okoro',
    customerEmail: 'chidi@example.com',
    packageName: 'Istanbul Discovery',
    details: 'Istanbul Discovery - 4 Days / 3 Nights',
    date: '2026-04-05',
    travelers: 4,
    amount: 3560000,
    status: 'confirmed',
    paymentStatus: 'partial',
    assignedAgent: 'David Manager',
    createdAt: '2026-02-02'
  }
];

// Mock service requests/leads
const initialServiceRequests = [
  {
    id: 1,
    type: 'visa',
    customerId: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+234 805 987 6543',
    country: 'United Kingdom',
    visaType: 'Student Visa',
    notes: 'Masters in Business Administration at Manchester University',
    documents: ['Passport', 'Admission Letter', 'Bank Statement'],
    assignedAgent: 'Sarah Admin',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-01-25'
  },
  {
    id: 2,
    type: 'study-abroad',
    customerId: null,
    customerName: 'Emmanuel Obi',
    customerEmail: 'emma@example.com',
    customerPhone: '+234 812 333 4444',
    country: 'Canada',
    program: 'Computer Science',
    university: 'University of Toronto',
    intake: 'Fall 2026',
    notes: 'Needs admission letter and visa processing',
    assignedAgent: 'Admin',
    status: 'new',
    priority: 'medium',
    createdAt: '2026-02-01'
  },
  {
    id: 3,
    type: 'hajj',
    customerId: 4,
    customerName: 'Amina Ibrahim',
    customerEmail: 'amina@example.com',
    customerPhone: '+234 809 111 2222',
    packageType: 'Hajj 2026 - Premium',
    persons: 6,
    roomType: '5-Star Near Haram',
    notes: 'Full family package. Requires rooms close to Haram.',
    assignedAgent: 'Admin',
    status: 'confirmed',
    priority: 'high',
    createdAt: '2026-01-10'
  },
  {
    id: 4,
    type: 'corporate',
    customerId: 3,
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+234 807 456 7890',
    companyName: 'Shell Nigeria',
    requestType: 'Corporate Account Setup',
    employeeCount: 15,
    estimatedMonthlyTravel: 5000000,
    notes: 'Monthly travel for 15 executives. Need corporate rates.',
    assignedAgent: 'Sarah Admin',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-01-20'
  },
  {
    id: 5,
    type: 'visa',
    customerId: 5,
    customerName: 'Chidi Okoro',
    customerEmail: 'chidi@example.com',
    customerPhone: '+234 803 555 6666',
    country: 'United States',
    visaType: 'Tourist Visa (B1/B2)',
    notes: 'Family vacation to Florida. 4 persons.',
    documents: [],
    assignedAgent: 'Admin',
    status: 'pending-docs',
    priority: 'medium',
    createdAt: '2026-02-02'
  }
];

// Mock packages
const initialPackages = [
  {
    id: 1,
    name: 'Dubai Explorer',
    destination: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    price: 1250000,
    originalPrice: 1500000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904acfb5a?w=800',
    description: 'Experience the magic of Dubai with visits to Burj Khalifa, Desert Safari, and more.',
    inclusions: ['Return Flights', '4-Star Hotel', 'Daily Breakfast', 'City Tour', 'Desert Safari'],
    itinerary: ['Day 1: Arrival & City Tour', 'Day 2: Burj Khalifa & Dubai Mall', 'Day 3: Desert Safari', 'Day 4: Beach & Shopping', 'Day 5: Departure'],
    status: 'active',
    featured: true,
    bookings: 24,
    createdAt: '2025-12-01'
  },
  {
    id: 2,
    name: 'London Getaway',
    destination: 'London, UK',
    duration: '7 Days / 6 Nights',
    price: 2100000,
    originalPrice: 2400000,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    description: 'Discover London\'s iconic landmarks, from Big Ben to Buckingham Palace.',
    inclusions: ['Return Flights', '4-Star Hotel', 'Daily Breakfast', 'London Eye', 'Thames Cruise'],
    itinerary: ['Day 1: Arrival', 'Day 2: Westminster Tour', 'Day 3: Tower of London', 'Day 4: British Museum', 'Day 5: Shopping', 'Day 6: Free Day', 'Day 7: Departure'],
    status: 'active',
    featured: true,
    bookings: 18,
    createdAt: '2025-11-15'
  },
  {
    id: 3,
    name: 'Umrah Special',
    destination: 'Mecca & Medina',
    duration: '10 Days / 9 Nights',
    price: 2800000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1565552632288-7e5d8041a87b?w=800',
    description: 'Complete Umrah package with 5-star hotels near Haram.',
    inclusions: ['Return Flights', '5-Star Hotels', 'All Meals', 'Ziyarah Tours', 'Visa Processing'],
    itinerary: ['Day 1-4: Mecca', 'Day 5: Travel to Medina', 'Day 6-9: Medina', 'Day 10: Departure'],
    status: 'active',
    featured: true,
    bookings: 45,
    createdAt: '2025-10-01'
  },
  {
    id: 4,
    name: 'Istanbul Discovery',
    destination: 'Istanbul, Turkey',
    duration: '4 Days / 3 Nights',
    price: 890000,
    originalPrice: 1000000,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    description: 'Explore the crossroads of Europe and Asia in beautiful Istanbul.',
    inclusions: ['Return Flights', '4-Star Hotel', 'Daily Breakfast', 'Bosphorus Cruise', 'City Tour'],
    itinerary: ['Day 1: Arrival & Sultanahmet', 'Day 2: Bosphorus Cruise', 'Day 3: Grand Bazaar', 'Day 4: Departure'],
    status: 'draft',
    featured: false,
    bookings: 8,
    createdAt: '2026-01-05'
  },
  {
    id: 5,
    name: 'Zanzibar Beach Escape',
    destination: 'Zanzibar, Tanzania',
    duration: '6 Days / 5 Nights',
    price: 1450000,
    originalPrice: 1600000,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    description: 'Relax on pristine beaches and explore Stone Town\'s rich history.',
    inclusions: ['Return Flights', 'Beach Resort', 'Half Board', 'Stone Town Tour', 'Spice Tour'],
    itinerary: ['Day 1: Arrival', 'Day 2: Stone Town', 'Day 3-4: Beach', 'Day 5: Spice Tour', 'Day 6: Departure'],
    status: 'active',
    featured: false,
    bookings: 12,
    createdAt: '2025-12-20'
  }
];

// Mock CMS content
const initialCmsContent = {
  hero: {
    title: 'Your Journey Begins Here',
    subtitle: 'Book Flights, Hotels, Visas & Tours — All in One Place',
    ctaText: 'Start Exploring',
    backgroundImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920'
  },
  about: {
    title: 'About Our Agency',
    text: 'We are Nigeria\'s leading travel agency with over 10 years of experience helping travelers explore the world. Our expert team provides personalized service for flights, hotels, visas, and complete tour packages.',
    mission: 'To make world-class travel accessible to every Nigerian.',
    vision: 'To be Africa\'s most trusted travel partner.'
  },
  contact: {
    phone: '+234 803 123 4567',
    email: 'info@travelagency.com',
    address: '15 Marina Street, Victoria Island, Lagos, Nigeria',
    whatsapp: '+234 803 123 4567',
    workingHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
  },
  social: {
    facebook: 'https://facebook.com/travelagency',
    instagram: 'https://instagram.com/travelagency',
    twitter: 'https://twitter.com/travelagency',
    linkedin: 'https://linkedin.com/company/travelagency'
  },
  faqs: [
    { id: 1, question: 'How do I book a flight?', answer: 'You can book through our website, call us, or visit our office. Our agents are available 24/7 to assist you.' },
    { id: 2, question: 'What documents do I need for visa?', answer: 'Requirements vary by country. Generally you need a valid passport, photos, bank statements, and invitation letters. Contact us for specific requirements.' },
    { id: 3, question: 'Can I pay in installments?', answer: 'Yes, we offer flexible payment plans for packages above ₦500,000. You can pay 50% upfront and the balance before travel date.' },
    { id: 4, question: 'Do you process Hajj and Umrah visas?', answer: 'Yes, we are an authorized Hajj and Umrah operator with complete visa processing and travel arrangements.' }
  ],
  announcements: [
    { id: 1, text: 'Early Bird Hajj 2026 bookings now open! Save 10%', active: true },
    { id: 2, text: 'Dubai Expo Special - Book now and get free desert safari', active: false }
  ]
};

// Mock admin users
const initialAdminUsers = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'admin@travelagency.com',
    role: 'admin',
    permissions: ['all'],
    status: 'active',
    avatar: null,
    lastLogin: '2026-02-03 09:30',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@travelagency.com',
    role: 'agent',
    permissions: ['bookings', 'customers', 'service-requests'],
    status: 'active',
    avatar: null,
    lastLogin: '2026-02-03 08:15',
    createdAt: '2025-03-15'
  },
  {
    id: 3,
    name: 'David Okonkwo',
    email: 'david@travelagency.com',
    role: 'manager',
    permissions: ['bookings', 'customers', 'service-requests', 'packages', 'reports'],
    status: 'active',
    avatar: null,
    lastLogin: '2026-02-02 17:45',
    createdAt: '2025-06-20'
  },
  {
    id: 4,
    name: 'Grace Adeyemi',
    email: 'grace@travelagency.com',
    role: 'agent',
    permissions: ['bookings', 'customers'],
    status: 'inactive',
    avatar: null,
    lastLogin: '2026-01-15 14:20',
    createdAt: '2025-08-10'
  }
];

// Role definitions
const roles = {
  admin: { name: 'Administrator', description: 'Full access to all features', color: 'red' },
  manager: { name: 'Manager', description: 'Access to operations and reports', color: 'purple' },
  agent: { name: 'Travel Agent', description: 'Access to bookings and customers', color: 'blue' }
};

// Mock payments
const initialPayments = [
  {
    id: 1,
    invoiceNo: 'INV-2026-001',
    bookingId: 1,
    customerId: 1,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    amount: 2550000,
    paidAmount: 2550000,
    balance: 0,
    method: 'Bank Transfer',
    reference: 'TRF-78456123',
    status: 'completed',
    date: '2026-01-28',
    dueDate: '2026-02-10',
    notes: 'Full payment received'
  },
  {
    id: 2,
    invoiceNo: 'INV-2026-002',
    bookingId: 2,
    customerId: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    amount: 2025000,
    paidAmount: 1000000,
    balance: 1025000,
    method: 'Card',
    reference: 'CARD-92847561',
    status: 'partial',
    date: '2026-01-30',
    dueDate: '2026-02-15',
    notes: 'Partial payment - 50%'
  },
  {
    id: 3,
    invoiceNo: 'INV-2026-003',
    bookingId: 4,
    customerId: 4,
    customerName: 'Amina Ibrahim',
    customerEmail: 'amina@example.com',
    amount: 8400000,
    paidAmount: 8400000,
    balance: 0,
    method: 'Bank Transfer',
    reference: 'TRF-12345678',
    status: 'completed',
    date: '2026-01-16',
    dueDate: '2026-01-20',
    notes: 'Hajj package - Full payment'
  },
  {
    id: 4,
    invoiceNo: 'INV-2026-004',
    bookingId: 3,
    customerId: 3,
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    amount: 1380000,
    paidAmount: 0,
    balance: 1380000,
    method: null,
    reference: null,
    status: 'pending',
    date: '2026-02-01',
    dueDate: '2026-02-20',
    notes: 'Awaiting payment'
  },
  {
    id: 5,
    invoiceNo: 'INV-2026-005',
    bookingId: 5,
    customerId: 5,
    customerName: 'Chidi Okoro',
    customerEmail: 'chidi@example.com',
    amount: 3560000,
    paidAmount: 1780000,
    balance: 1780000,
    method: 'Bank Transfer',
    reference: 'TRF-98765432',
    status: 'partial',
    date: '2026-02-02',
    dueDate: '2026-03-30',
    notes: '50% deposit paid'
  }
];

// Mock notifications
const initialNotifications = [
  {
    id: 1,
    type: 'booking',
    title: 'New Booking',
    message: 'Chidi Okoro booked Istanbul Discovery package',
    read: false,
    createdAt: '2026-02-03 10:30'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of ₦1,780,000 received from Chidi Okoro',
    read: false,
    createdAt: '2026-02-03 09:15'
  },
  {
    id: 3,
    type: 'lead',
    title: 'New Visa Request',
    message: 'Chidi Okoro submitted a US visa application',
    read: false,
    createdAt: '2026-02-02 16:45'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Payment Due',
    message: 'Mike Johnson\'s payment is due in 17 days',
    read: true,
    createdAt: '2026-02-01 11:20'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Document Pending',
    message: 'Jane Smith\'s UK visa documents are pending',
    read: true,
    createdAt: '2026-01-28 14:00'
  }
];

// Settings
const initialSettings = {
  companyName: 'TravelAgency Nigeria',
  currency: 'NGN',
  currencySymbol: '₦',
  timezone: 'Africa/Lagos',
  dateFormat: 'DD/MM/YYYY',
  emailNotifications: true,
  smsNotifications: false,
  autoAssignAgent: true,
  requirePaymentBeforeTicketing: true,
  allowPartialPayments: true,
  minimumDeposit: 50, // percentage
  paymentMethods: ['Bank Transfer', 'Card', 'Cash', 'USSD'],
  bankDetails: {
    bankName: 'First Bank Nigeria',
    accountName: 'TravelAgency Nigeria Ltd',
    accountNumber: '1234567890'
  }
};

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Core data
  const [flights, setFlights] = useState(flightResults);
  const [hotels, setHotels] = useState(hotelResults);
  const [destinations, setDestinations] = useState(popularDestinations);
  
  // Admin data
  const [customers, setCustomers] = useState(initialCustomers);
  const [bookings, setBookings] = useState(initialBookings);
  const [serviceRequests, setServiceRequests] = useState(initialServiceRequests);
  const [packages, setPackages] = useState(initialPackages);
  const [cmsContent, setCmsContent] = useState(initialCmsContent);
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [payments, setPayments] = useState(initialPayments);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [settings, setSettings] = useState(initialSettings);

  // Persist auth state
  useEffect(() => {
    localStorage.setItem('adminAuth', isAuthenticated);
    if (currentUser) {
      localStorage.setItem('adminUser', JSON.stringify(currentUser));
    }
  }, [isAuthenticated, currentUser]);

  const login = (email, password) => {
    if (email === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setCurrentUser(initialAdminUsers[0]);
      return { success: true };
    }
    const user = adminUsers.find(u => u.email === email && u.status === 'active');
    if (user && password === 'password') {
      setIsAuthenticated(true);
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return `${settings.currencySymbol}${amount.toLocaleString()}`;
  };

  // Customer CRUD
  const addCustomer = (customer) => {
    const newCustomer = { 
      ...customer, 
      id: Date.now(), 
      totalBookings: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString().split('T')[0] 
    };
    setCustomers([...customers, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id, data) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getCustomerById = (id) => customers.find(c => c.id === id);

  // Flight CRUD
  const addFlight = (flight) => {
    const newFlight = { ...flight, id: Date.now() };
    setFlights([...flights, newFlight]);
    return newFlight;
  };

  const updateFlight = (id, updatedFlight) => {
    setFlights(flights.map(f => f.id === id ? { ...f, ...updatedFlight } : f));
  };

  const deleteFlight = (id) => {
    setFlights(flights.filter(f => f.id !== id));
  };

  // Hotel CRUD
  const addHotel = (hotel) => {
    const newHotel = { ...hotel, id: Date.now() };
    setHotels([...hotels, newHotel]);
    return newHotel;
  };

  const updateHotel = (id, updatedHotel) => {
    setHotels(hotels.map(h => h.id === id ? { ...h, ...updatedHotel } : h));
  };

  const deleteHotel = (id) => {
    setHotels(hotels.filter(h => h.id !== id));
  };

  // Booking CRUD
  const addBooking = (booking) => {
    const newBooking = { 
      ...booking, 
      id: Date.now(), 
      createdAt: new Date().toISOString().split('T')[0],
      assignedAgent: currentUser?.name || 'Admin'
    };
    setBookings([...bookings, newBooking]);
    
    // Update customer stats
    if (booking.customerId) {
      const customer = customers.find(c => c.id === booking.customerId);
      if (customer) {
        updateCustomer(booking.customerId, {
          totalBookings: customer.totalBookings + 1,
          totalSpent: customer.totalSpent + (booking.amount || 0)
        });
      }
    }
    
    addNotification({
      type: 'booking',
      title: 'New Booking',
      message: `${booking.customerName} made a new ${booking.type} booking`
    });
    
    return newBooking;
  };

  const updateBooking = (id, data) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const getBookingById = (id) => bookings.find(b => b.id === id);

  // Service Request CRUD
  const addServiceRequest = (request) => {
    const newRequest = { 
      ...request, 
      id: Date.now(), 
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      assignedAgent: currentUser?.name || 'Admin'
    };
    setServiceRequests([...serviceRequests, newRequest]);
    addNotification({
      type: 'lead',
      title: `New ${request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request`,
      message: `${request.customerName} submitted a ${request.type} request`
    });
    return newRequest;
  };

  const updateServiceRequest = (id, data) => {
    setServiceRequests(serviceRequests.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const deleteServiceRequest = (id) => {
    setServiceRequests(serviceRequests.filter(r => r.id !== id));
  };

  // Package CRUD
  const addPackage = (pkg) => {
    const newPackage = { 
      ...pkg, 
      id: Date.now(), 
      bookings: 0, 
      createdAt: new Date().toISOString().split('T')[0] 
    };
    setPackages([...packages, newPackage]);
    return newPackage;
  };

  const updatePackage = (id, data) => {
    setPackages(packages.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePackage = (id) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  // CMS
  const updateCmsContent = (section, data) => {
    setCmsContent({ ...cmsContent, [section]: { ...cmsContent[section], ...data } });
  };

  const updateCmsFaq = (id, data) => {
    setCmsContent({
      ...cmsContent,
      faqs: cmsContent.faqs.map(f => f.id === id ? { ...f, ...data } : f)
    });
  };

  const addCmsFaq = (faq) => {
    setCmsContent({
      ...cmsContent,
      faqs: [...cmsContent.faqs, { ...faq, id: Date.now() }]
    });
  };

  const deleteCmsFaq = (id) => {
    setCmsContent({
      ...cmsContent,
      faqs: cmsContent.faqs.filter(f => f.id !== id)
    });
  };

  // Admin Users CRUD
  const addAdminUser = (user) => {
    const newUser = { 
      ...user, 
      id: Date.now(), 
      createdAt: new Date().toISOString().split('T')[0], 
      lastLogin: null 
    };
    setAdminUsers([...adminUsers, newUser]);
    return newUser;
  };

  const updateAdminUser = (id, data) => {
    setAdminUsers(adminUsers.map(u => u.id === id ? { ...u, ...data } : u));
  };

  const deleteAdminUser = (id) => {
    if (id === currentUser?.id) return false;
    setAdminUsers(adminUsers.filter(u => u.id !== id));
    return true;
  };

  // Payments CRUD
  const addPayment = (payment) => {
    const invoiceNo = `INV-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`;
    const newPayment = { 
      ...payment, 
      id: Date.now(), 
      invoiceNo,
      date: new Date().toISOString().split('T')[0] 
    };
    setPayments([...payments, newPayment]);
    
    // Update booking payment status
    if (payment.bookingId) {
      const booking = bookings.find(b => b.id === payment.bookingId);
      if (booking) {
        const paymentStatus = payment.paidAmount >= payment.amount ? 'paid' : 'partial';
        updateBooking(payment.bookingId, { paymentStatus });
      }
    }
    
    addNotification({
      type: 'payment',
      title: 'Payment Received',
      message: `Payment of ${formatCurrency(payment.paidAmount)} received from ${payment.customerName}`
    });
    
    return newPayment;
  };

  const updatePayment = (id, data) => {
    setPayments(payments.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const recordPayment = (paymentId, amount, method, reference) => {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return false;
    
    const newPaidAmount = payment.paidAmount + amount;
    const newBalance = payment.amount - newPaidAmount;
    const newStatus = newBalance <= 0 ? 'completed' : 'partial';
    
    updatePayment(paymentId, {
      paidAmount: newPaidAmount,
      balance: Math.max(0, newBalance),
      status: newStatus,
      method: method || payment.method,
      reference: reference || payment.reference
    });
    
    addNotification({
      type: 'payment',
      title: 'Payment Received',
      message: `Payment of ${formatCurrency(amount)} received from ${payment.customerName}`
    });
    
    return true;
  };

  // Notifications
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
      createdAt: new Date().toLocaleString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Settings
  const updateSettings = (data) => {
    setSettings({ ...settings, ...data });
  };

  // Stats for dashboard
  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const todayBookings = bookings.filter(b => b.createdAt === today).length;
    const weekBookings = bookings.filter(b => b.createdAt >= weekAgo).length;
    const monthBookings = bookings.filter(b => b.createdAt >= monthAgo).length;
    
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'ticketed').length;
    
    const totalFlights = flights.length;
    const totalHotels = hotels.length;
    const totalPackages = packages.filter(p => p.status === 'active').length;
    
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const newCustomersThisMonth = customers.filter(c => c.createdAt >= monthAgo).length;
    
    const newLeads = serviceRequests.filter(r => r.status === 'new').length;
    const totalLeads = serviceRequests.length;
    const visaRequests = serviceRequests.filter(r => r.type === 'visa').length;
    const studyRequests = serviceRequests.filter(r => r.type === 'study-abroad').length;
    const hajjRequests = serviceRequests.filter(r => r.type === 'hajj' || r.type === 'umrah').length;
    const corporateRequests = serviceRequests.filter(r => r.type === 'corporate').length;
    
    // Revenue calculations
    const totalRevenue = payments.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
    const pendingPayments = payments.reduce((sum, p) => sum + (p.balance || 0), 0);
    const monthRevenue = payments
      .filter(p => p.date >= monthAgo)
      .reduce((sum, p) => sum + (p.paidAmount || 0), 0);

    const unreadNotifications = notifications.filter(n => !n.read).length;
    
    const topPackages = [...packages]
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);
    
    return {
      todayBookings,
      weekBookings,
      monthBookings,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalFlights,
      totalHotels,
      totalPackages,
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
      newLeads,
      totalLeads,
      visaRequests,
      studyRequests,
      hajjRequests,
      corporateRequests,
      totalRevenue,
      pendingPayments,
      monthRevenue,
      unreadNotifications,
      topPackages
    };
  };

  // Reports data
  const getReportsData = (startDate, endDate) => {
    const bookingsInRange = bookings.filter(b => b.createdAt >= startDate && b.createdAt <= endDate);
    const paymentsInRange = payments.filter(p => p.date >= startDate && p.date <= endDate);
    
    const bookingsByType = {
      flight: bookingsInRange.filter(b => b.type === 'flight').length,
      hotel: bookingsInRange.filter(b => b.type === 'hotel').length,
      package: bookingsInRange.filter(b => b.type === 'package').length
    };
    
    const revenueByType = {
      flight: bookingsInRange.filter(b => b.type === 'flight').reduce((s, b) => s + b.amount, 0),
      hotel: bookingsInRange.filter(b => b.type === 'hotel').reduce((s, b) => s + b.amount, 0),
      package: bookingsInRange.filter(b => b.type === 'package').reduce((s, b) => s + b.amount, 0)
    };
    
    const totalRevenue = paymentsInRange.reduce((s, p) => s + p.paidAmount, 0);
    const collectedRevenue = paymentsInRange.filter(p => p.status === 'completed').reduce((s, p) => s + p.paidAmount, 0);
    
    return {
      bookingsInRange,
      paymentsInRange,
      bookingsByType,
      revenueByType,
      totalRevenue,
      collectedRevenue,
      bookingsCount: bookingsInRange.length,
      averageBookingValue: bookingsInRange.length > 0 
        ? Math.round(bookingsInRange.reduce((s, b) => s + b.amount, 0) / bookingsInRange.length) 
        : 0
    };
  };

  const value = {
    // Auth
    isAuthenticated,
    currentUser,
    login,
    logout,
    roles,
    
    // Helpers
    formatCurrency,
    
    // Core data
    flights,
    addFlight,
    updateFlight,
    deleteFlight,
    hotels,
    addHotel,
    updateHotel,
    deleteHotel,
    destinations,
    
    // Customers
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    
    // Bookings
    bookings,
    addBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking,
    getBookingById,
    
    // Service Requests
    serviceRequests,
    addServiceRequest,
    updateServiceRequest,
    deleteServiceRequest,
    
    // Packages
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    
    // CMS
    cmsContent,
    updateCmsContent,
    updateCmsFaq,
    addCmsFaq,
    deleteCmsFaq,
    
    // Admin Users
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    
    // Payments
    payments,
    addPayment,
    updatePayment,
    recordPayment,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    
    // Settings
    settings,
    updateSettings,
    
    // Stats & Reports
    getStats,
    getReportsData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
