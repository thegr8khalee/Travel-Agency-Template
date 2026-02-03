import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookingModal from './BookingModal';

const deals = [
  {
    id: 1,
    title: "Bumper Deals on United Nigeria",
    airline: "United Nigeria",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80", 
    gradient: "from-green-600 to-green-900",
    cta: "Book Now"
  },
  {
    id: 2,
    title: "Have an adventure with Qatar",
    airline: "Qatar Airways",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80", 
    gradient: "from-[#5C0632] to-[#3A041F]",
    cta: "Book Now"
  },
  {
    id: 3,
    title: "Luxury Airport Services",
    airline: "Airport Services",
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80", 
    gradient: "from-blue-600 to-indigo-900",
    cta: "Learn More"
  },
   {
    id: 4,
    title: "Fly to Dubai with Emirates",
    airline: "Emirates",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&q=80", 
    gradient: "from-red-600 to-red-900",
    cta: "Book Now"
  }
];

const PromotionalDeals = () => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    const scroll = () => {
      if (!isPaused) {
        // If we've scrolled past the first set of items (half the scroll width), reset to 0
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const scrollManual = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 350; 
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Duplicate deals to create seamless loop effect
  const displayDeals = [...deals, ...deals, ...deals];

  return (
    <div className=" py-8 relative">
        <div 
            className="container mx-auto px-4 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
        >
            
            {/* Left Arrow */}
            <button 
                onClick={() => scrollManual('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-base-100 text-base-content p-2 rounded-full shadow-lg hover:bg-base-200 focus:outline-none hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scrollable Container */}
            <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-1"
                style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none' 
                }}
            >
                {displayDeals.map((deal, index) => (
                    <div 
                        key={`${deal.id}-${index}`} 
                        className="
                            min-w-[300px] md:min-w-[400px] lg:min-w-[500px] 
                            h-[250px] rounded-2xl shadow-xl relative overflow-hidden flex-shrink-0
                            group/card cursor-pointer transition-transform duration-300 hover:scale-[1.02]
                        "
                        onClick={() => setSelectedDeal(deal)}
                    >
                         {/* Background Image */}
                         <img 
                            src={deal.image} 
                            alt={deal.airline} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${deal.gradient} mix-blend-multiply opacity-90`} />

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-white inline-block"></span>
                                    {deal.airline}
                                </p>
                                <h3 className="text-3xl font-bold leading-tight max-w-[90%] drop-shadow-md">
                                    {deal.title}
                                </h3>
                            </div>
                            
                            <button 
                              className="btn btn-primary w-fit rounded-full border-none shadow-none bg-white text-primary">
                                {deal.cta}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

             {/* Right Arrow */}
             <button 
                onClick={() => scrollManual('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-base-100 text-base-content p-2 rounded-full shadow-lg hover:bg-base-200 focus:outline-none hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>

      <BookingModal 
        isOpen={!!selectedDeal} 
        onClose={() => setSelectedDeal(null)} 
        itemDetails={selectedDeal}
      />
    </div>
  );
};

export default PromotionalDeals;
