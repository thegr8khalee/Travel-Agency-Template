import React, { useState } from 'react';
import { ArrowRight, Tag, Globe, Calendar, Plane, Moon, Hotel } from 'lucide-react';
import BookingModal from './BookingModal';

const offersData = [
  // --- HOTELS ---
  {
    id: 1,
    category: 'Hotels',
    title: "Maldives Summer Escape",
    description: "Enjoy up to 30% off on beach resorts in Maldives.",
    price: "₦898,500",
    originalPrice: "₦1,275,000",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
    badge: { text: "FLASH SALE", icon: Tag, color: "bg-orange-500" },
    cta: "Book Now",
    type: "card",
    layoutClass: ""
  },
  {
    id: 6,
    category: 'Hotels',
    title: "Luxury Dubai Stay",
    description: "5-star experience at Atlantis The Palm.",
    price: "₦1,800,000",
    originalPrice: "₦2,700,000",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    badge: { text: "LUXURY", icon: Hotel, color: "bg-purple-500" },
    cta: "View Rooms",
    type: "card",
    layoutClass: ""
  },
  {
    id: 7,
    category: 'Hotels',
    title: "Santorini Sunset Villa",
    description: "Breathtaking views and private pools in Greece.",
    price: "₦1,200,000",
    originalPrice: "₦1,500,000",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    badge: { text: "ROMANTIC", icon: Tag, color: "bg-pink-500" },
    cta: "Book Now",
    type: "card",
    layoutClass: ""
  },
  {
    id: 8,
    category: 'Hotels',
    title: "Paris City Center",
    description: "Stay near the Eiffel Tower with breakfast included.",
    price: "₦950,000",
    originalPrice: "₦1,100,000",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    badge: { text: "CITY BREAK", icon: Hotel, color: "bg-blue-600" },
    cta: "View Deal",
    type: "card",
    layoutClass: ""
  },
  {
    id: 9,
    category: 'Hotels',
    title: "Bali Jungle Resort",
    description: "Immersive nature experience in Ubud.",
    price: "₦750,000",
    originalPrice: "₦950,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    badge: { text: "NATURE", icon: Hotel, color: "bg-green-600" },
    cta: "Explore",
    type: "card",
    layoutClass: ""
  },
  {
    id: 10,
    category: 'Hotels',
    title: "New York Times Square",
    description: "Right in the heart of the action.",
    price: "₦1,100,000",
    originalPrice: "₦1,400,000",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0d665a?auto=format&fit=crop&w=800&q=80",
    badge: { text: "POPULAR", icon: Tag, color: "bg-red-500" },
    cta: "Book Now",
    type: "card",
    layoutClass: ""
  },

  // --- VISA ---
  {
    id: 2,
    category: 'Visa',
    title: "UK & USA Visa Assist",
    description: "Expert guidance for your visa applications.",
    price: "₦225,000",
    originalPrice: "₦375,000",
    image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=800&q=80",
    badge: { text: "VISA SERVICES", icon: Globe, color: "bg-blue-500" },
    cta: "Start Application",
    type: "wide",
    layoutClass: "lg:col-span-2 md:col-span-1"
  },
  {
    id: 11,
    category: 'Visa',
    title: "Schengen Visa",
    description: "Travel across Europe with a single visa.",
    price: "₦180,000",
    originalPrice: "₦250,000",
    image: "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=800&q=80",
    badge: { text: "EUROPE", icon: Globe, color: "bg-indigo-500" },
    cta: "Apply Now",
    type: "card",
    layoutClass: ""
  },
  {
    id: 12,
    category: 'Visa',
    title: "Canada Study Permit",
    description: "Assistance for students worldwide.",
    price: "₦300,000",
    originalPrice: "₦400,000",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
    badge: { text: "STUDENT", icon: Globe, color: "bg-red-600" },
    cta: "Learn More",
    type: "card",
    layoutClass: ""
  },
  {
    id: 13,
    category: 'Visa',
    title: "Dubai Tourist Visa",
    description: "30 and 60 days tourist visas available.",
    price: "₦80,000",
    originalPrice: "₦100,000",
    image: "https://images.unsplash.com/photo-1512453979798-5ea932a235c9?auto=format&fit=crop&w=800&q=80",
    badge: { text: "FAST TRACK", icon: Tag, color: "bg-yellow-500" },
    cta: "Get Visa",
    type: "card",
    layoutClass: ""
  },
  {
    id: 14,
    category: 'Visa',
    title: "Australia Work Visa",
    description: "Move to Australia with our job seeker support.",
    price: "₦500,000",
    originalPrice: "₦650,000",
    image: "https://images.unsplash.com/photo-1523482580672-01e6f06378c5?auto=format&fit=crop&w=800&q=80",
    badge: { text: "WORK", icon: Globe, color: "bg-green-500" },
    cta: "Consult",
    type: "card",
    layoutClass: ""
  },
  {
    id: 15,
    category: 'Visa',
    title: "China Business Visa",
    description: "Streamlined process for business travelers.",
    price: "₦350,000",
    originalPrice: "₦450,000",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80",
    badge: { text: "BUSINESS", icon: Tag, color: "bg-slate-600" },
    cta: "Apply",
    type: "card",
    layoutClass: ""
  },

  // --- FLIGHTS ---
  {
    id: 3,
    category: 'Flights',
    title: "Early Bird 2026",
    description: "Plan your 2026 trip now and get zero cancellation fees.",
    price: "₦675,000",
    originalPrice: "₦900,000",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    badge: { text: "EARLY BIRD", icon: Calendar, color: "bg-green-500" },
    cta: "Search Flights",
    type: "card",
    layoutClass: "md:col-span-2 lg:col-span-1"
  },
  {
    id: 5,
    category: 'Flights',
    title: "Lagos to London",
    description: "Direct flights on Virgin Atlantic & BA.",
    price: "₦1,275,000",
    originalPrice: "₦1,650,000",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    badge: { text: "BEST SELLER", icon: Plane, color: "bg-red-500" },
    cta: "Book Seat",
    type: "card",
    layoutClass: ""
  },
  {
    id: 16,
    category: 'Flights',
    title: "Abuja to New York",
    description: "Connect via major European hubs.",
    price: "₦1,500,000",
    originalPrice: "₦1,800,000",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    badge: { text: "USA", icon: Plane, color: "bg-blue-800" },
    cta: "Check Price",
    type: "card",
    layoutClass: ""
  },
  {
    id: 17,
    category: 'Flights',
    title: "Kano to Jeddah",
    description: "Specials for Umrah season.",
    price: "₦900,000",
    originalPrice: "₦1,100,000",
    image: "https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?auto=format&fit=crop&w=800&q=80",
    badge: { text: "RELIGIOUS", icon: Moon, color: "bg-emerald-600" },
    cta: "Book Now",
    type: "card",
    layoutClass: ""
  },
  {
    id: 18,
    category: 'Flights',
    title: "Lagos to Toronto",
    description: "Student specials available.",
    price: "₦1,400,000",
    originalPrice: "₦1,700,000",
    image: "https://images.unsplash.com/photo-1507992781348-3102690e34b9?auto=format&fit=crop&w=800&q=80",
    badge: { text: "CANADA", icon: Plane, color: "bg-red-600" },
    cta: "View Deal",
    type: "card",
    layoutClass: ""
  },
  {
    id: 19,
    category: 'Flights',
    title: "Business Class Upgrade",
    description: "Upgrade to business class for less.",
    price: "₦2,500,000",
    originalPrice: "₦3,800,000",
    image: "https://images.unsplash.com/photo-1540339832862-437f86c8f921?auto=format&fit=crop&w=800&q=80",
    badge: { text: "PREMIUM", icon: Tag, color: "bg-purple-600" },
    cta: "Upgrade",
    type: "card",
    layoutClass: ""
  },

  // --- HAJJ & UMRAH ---
  {
    id: 4,
    category: 'Hajj',
    title: "Hajj 2026 Standard",
    description: "Complete package including visa and accommodation.",
    price: "₦5,250,000",
    originalPrice: "₦6,300,000",
    image: "https://images.unsplash.com/photo-1565552684305-7e4348982638?auto=format&fit=crop&w=800&q=80",
    badge: { text: "HAJJ 2026", icon: Moon, color: "bg-gray-800" },
    cta: "View Packages",
    type: "card",
    layoutClass: ""
  },
  {
    id: 20,
    category: 'Hajj',
    title: "Ramadan Umrah",
    description: "Last 10 days of Ramadan in Makkah.",
    price: "₦3,500,000",
    originalPrice: "₦4,000,000",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    badge: { text: "RAMADAN", icon: Moon, color: "bg-emerald-700" },
    cta: "Book Now",
    type: "card",
    layoutClass: ""
  },
  {
    id: 21,
    category: 'Hajj',
    title: "VIP Hajj Package",
    description: "5-star hotels facing the Haram.",
    price: "₦8,500,000",
    originalPrice: "₦10,000,000",
    image: "https://images.unsplash.com/photo-1537207604310-8f643ee1f107?auto=format&fit=crop&w=800&q=80",
    badge: { text: "VIP", icon: Tag, color: "bg-yellow-600" },
    cta: "Inquire",
    type: "card",
    layoutClass: ""
  },
  {
    id: 22,
    category: 'Hajj',
    title: "Family Umrah",
    description: "Special group rates for families.",
    price: "₦1,200,000",
    originalPrice: "₦1,500,000",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c4f7ceb?auto=format&fit=crop&w=800&q=80",
    badge: { text: "FAMILY", icon: Plane, color: "bg-blue-500" },
    cta: "Get Quote",
    type: "card",
    layoutClass: ""
  },
  {
    id: 23,
    category: 'Hajj',
    title: "Post-Hajj Tour",
    description: "Visit historical Islamic sites.",
    price: "₦400,000",
    originalPrice: "₦550,000",
    image: "https://images.unsplash.com/photo-1551041777-ed02d7ef1415?auto=format&fit=crop&w=800&q=80",
    badge: { text: "TOUR", icon: Globe, color: "bg-orange-600" },
    cta: "View Itinerary",
    type: "card",
    layoutClass: ""
  },
  {
    id: 24,
    category: 'Hajj',
    title: "Economy Umrah",
    description: "Budget-friendly spiritual journey.",
    price: "₦950,000",
    originalPrice: "₦1,200,000",
    image: "https://images.unsplash.com/photo-1519817650394-63020a6f1ac5?auto=format&fit=crop&w=800&q=80",
    badge: { text: "SAVER", icon: Tag, color: "bg-green-600" },
    cta: "Check Dates",
    type: "card",
    layoutClass: ""
  }
];

const SpecialOffers = () => {
  const [activeTab, setActiveTab] = useState('All Offers');
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  const tabs = [
    { id: 'All Offers', label: 'All Offers' },
    { id: 'Flights', label: 'Flights' },
    { id: 'Hotels', label: 'Hotels' },
    { id: 'Visa', label: 'Visa' },
    { id: 'Hajj', label: 'Hajj & Umrah' }
  ];

  // Logic: 
  // If 'All Offers' -> Show specifically items 1-4 in the bento layout. 
  // If Filtered -> Show all items matching category in a grid.
  
  const displayedOffers = activeTab === 'All Offers' 
    ? offersData.slice(0, 6) // Keep the first 6 for the main view
    : offersData.filter(offer => 
        activeTab === 'Hajj' ? offer.category === 'Hajj' : offer.category === activeTab
      );

  return (
    <div className="py-12 container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
        <div>
           <h2 className="text-3xl md:text-5xl font-extralight text-base-content">Exclusive Offers</h2>
           <p className="text-base-content/60 mt-2">Hand-picked deals for your next adventure</p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        px-4 py-2 rounded-full text-sm font-semibold transition-all
                        ${activeTab === tab.id 
                            ? 'bg-primary text-white' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedOffers.map((offer) => (
            <div 
                key={offer.id}
                className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
            >
                <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                    <span className={`${offer.badge.color} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                        <offer.badge.icon className="w-3 h-3" /> {offer.badge.text}
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-white text-2xl font-bold mb-1">
                        {offer.title}
                    </h3>
                    
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                        {offer.description}
                    </p>

                    {offer.price ? (
                         <div className="flex items-center justify-between">
                            <span className="text-white font-bold text-lg">{offer.price} <span className="text-sm font-normal text-white/70 line-through">{offer.originalPrice}</span></span>
                            <button 
                                onClick={() => setSelectedOffer(offer)}
                                className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                                {offer.cta}
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setSelectedOffer(offer)}
                            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                            {offer.cta}
                        </button>
                    )}
                </div>
            </div>
        ))}
      </div>
      
      {activeTab !== 'All Offers' && displayedOffers.length === 0 && (
          <div className="text-center py-12 text-gray-400">
              No special offers found for this category at the moment.
          </div>
      )}

      <div className="mt-8 text-center md:text-right md:hidden">
         <button className="text-primary font-semibold flex items-center justify-center gap-2 hover:gap-3 transition-all w-full md:w-auto">
            View All Offers <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <BookingModal 
        isOpen={!!selectedOffer} 
        onClose={() => setSelectedOffer(null)} 
        itemDetails={selectedOffer}
      />
    </div>
  );
};

export default SpecialOffers;
