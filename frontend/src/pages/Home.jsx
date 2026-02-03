import HeroWithSearch from '../components/HeroWithSearch';
import PromotionalDeals from '../components/PromotionalDeals';
import SpecialOffers from '../components/SpecialOffers';
import ServicesSections from '../components/ServicesSections';
import { ShieldCheck, Clock, Award, Users, PhoneCall, FileText } from 'lucide-react';
import { popularDestinations } from '../data/mockData';

const Home = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <HeroWithSearch />
      
      {/* Promotional Deals Section */}
      <PromotionalDeals />

      {/* Special Offers Section */}
      <SpecialOffers />
    
      {/* Detailed Services Sections */}
      <div className="bg-base-100">
        <div className="container mx-auto px-4 pt-16 pb-4">
            <h2 className="text-3xl md:text-5xl font-extralight mb-4 text-base-content">Our Premium Services</h2>
            <p className="text-base-content/60 max-w-2xl">We provide a comprehensive range of travel services designed to make your journey seamless and memorable.</p>
        </div>
        <ServicesSections />
      </div>

      {/* Why Choose Us */}
      {/* <section className="py-16 container mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">Why Choose TravelPro?</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureCard icon={ShieldCheck} title="Trusted by Travelers" text="Over 10,000 happy customers served." />
            <FeatureCard icon={Clock} title="24/7 Support" text="We are here for you anytime, anywhere." />
            <FeatureCard icon={Award} title="Best Prices" text="Guaranteed competitive rates on all bookings." />
            <FeatureCard icon={Users} title="Visa Experts" text="High success rate with visa applications." />
         </div>
      </section> */}

      {/* Popular Destinations */}
      {/* <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map(dest => (
                <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{dest.name}</h3>
                            <span className="text-orange-500 font-bold">{dest.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{dest.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section> */}

       {/* CTA Section */}
       <section className="relative py-24 text-center overflow-hidden group">
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80" 
                    alt="Travel Adventure" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[2px]"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Ready to Start Your <span className="text-orange-400">Adventure</span>?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
                    From personalized itineraries to visa assistance, we handle it all. <br className="hidden md:block"/> 
                    Get in touch with our travel experts today.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="btn btn-lg bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full px-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                        <PhoneCall className="w-5 h-5" />
                        Talk to an Expert
                    </button>
                    <button className="btn btn-lg btn-outline text-white border-2 hover:bg-white hover:text-blue-900 hover:border-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3">
                        <FileText className="w-5 h-5" />
                        Get a Free Quote
                    </button>
                </div>
            </div>
       </section>

    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, title, text }) => (
    <div className="text-center p-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{text}</p>
    </div>
);

export default Home;
