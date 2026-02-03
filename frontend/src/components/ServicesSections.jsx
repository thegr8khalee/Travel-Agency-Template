import React, { useState } from 'react';
import { Plane, Hotel, FileCheck, Moon, GraduationCap, Luggage, Map, ArrowRight, CheckCircle2, Check } from 'lucide-react';
import BookingModal from './BookingModal';

const servicesData = [
  {
    id: 'flights',
    title: "Global Flight Bookings",
    subtitle: "Fly Anywhere, Anytime",
    description: "Experience seamless air travel with our competitive fares to over 150 destinations worldwide. Whether it's a business trip to London or a vacation in Dubai, we secure the best seats for you.",
    features: ["Best Price Guarantee", "24/7 Customer Support", "Multi-City Route Planning"],
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80",
    icon: Plane,
    color: "bg-blue-50 text-blue-600",
    cta: "Book Flight"
  },
  {
    id: 'hotels',
    title: "Premium Hotel Reservations",
    subtitle: "Stay in Comfort & Luxury",
    description: "From cozy budget inns to extravagant 5-star resorts, we handpick accommodations that suit your style and budget. Enjoy exclusive deals and upgrades when you book through us.",
    features: ["Free Cancellation Options", "Group Booking Discounts", "Verified Guest Reviews"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    icon: Hotel,
    color: "bg-orange-50 text-orange-600",
    cta: "Find Hotels"
  },
  {
    id: 'visa',
    title: "Expert Visa Assistance",
    subtitle: "Navigate Borders with Ease",
    description: "Don't let paperwork ruin your travel plans. Our visa experts provide end-to-end guidance for tourist, student, and business visas for the UK, USA, Canada, Schengen, and more.",
    features: ["98% Success Rate", "Document Verification", "Interview Preparation"],
    image: "https://images.unsplash.com/photo-1588612985876-43b9e4a3c102?auto=format&fit=crop&w=1200&q=80",
    icon: FileCheck,
    color: "bg-purple-50 text-purple-600",
    cta: "Get Visa Help"
  },
  {
    id: 'hajj',
    title: "Hajj & Umrah Packages",
    subtitle: "Spiritual Journeys, Simplified",
    description: "Embark on your sacred pilgrimage with peace of mind. Our comprehensive packages cover flights, accommodation near the Haram, visa processing, and guided tours by experienced scholars.",
    features: ["VIP & Standard Packages", "Seminars & Guidance", "Ground Handling Support"],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
    icon: Moon,
    color: "bg-green-50 text-green-600",
    cta: "View Packages"
  },
  {
    id: 'study',
    title: "Study Abroad Programs",
    subtitle: "Shape Your Future Globally",
    description: "Unlock international education opportunities. We assist students with university admissions, scholarship applications, and student visa processing for top institutions in the UK, US, and Canada.",
    features: ["Career Determination", "Admission Assistance", "Pre-Departure Briefing"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    icon: GraduationCap,
    color: "bg-red-50 text-red-600",
    cta: "Start Application"
  },
  {
    id: 'holidays',
    title: "Custom Holiday Tours",
    subtitle: "Create Memories that Last",
    description: "Whether it's a honeymoon in Maldives, a safari in Kenya, or a city tour in Paris, our travel curators design personalized itineraries that turn your dream vacation into reality.",
    features: ["Tailor-made Itineraries", "Honeymoon Specials", "Adventure Tours"],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    icon: Luggage,
    color: "bg-teal-50 text-teal-600",
    cta: "Plan Holiday"
  }
];

const ServicesSections = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="flex flex-col gap-24 py-24 overflow-x-hidden">
      {servicesData.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section key={service.id} className="container mx-auto px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-gray-900 rounded-3xl transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
                <div className={`relative h-[300px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl aspect-[4/3]`}>
                   <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                
                {/* Floating Icon Card */}
                <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-base-100 p-4 rounded-xl shadow-lg border border-base-200 flex items-center gap-3 animate-pulse-slow`}>
                    <div className={`p-3 rounded-full ${service.color}`}>
                        <service.icon className="w-6 h-6" />
                    </div>
                    <div className="pr-4">
                        <p className="text-xs text-base-content/50 font-bold uppercase tracking-wider">Service</p>
                        <p className="font-bold text-base-content">{service.title}</p>
                    </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                {/* <div className={`p-3 rounded-full inline-block mb-4 ${service.color}`}>
                    <service.icon className="w-6 h-6" />
                </div> */}
                <h4 className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{service.subtitle}</h4>
                <h2 className="text-3xl md:text-5xl font-medium text-base-content mb-4 leading-tight">{service.title}</h2>
                <p className="text-base-content/70 text-lg leading-relaxed mb-4">
                    {service.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                             <Check className="w-5 h-5 text-primary flex-shrink-0" />
                             <span className="text-base-content/80 font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>

                <button 
                  className="btn btn-primary-custom"
                  onClick={() => setSelectedService(service)}
                >
                    {service.cta}
                    {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                </button>
              </div>

            </div>
          </section>
        );
      })}

      <BookingModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        itemDetails={selectedService}
      />
    </div>
  );
};

export default ServicesSections;
