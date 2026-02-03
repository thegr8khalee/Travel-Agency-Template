import { useState } from 'react';
import { Moon, Star, Calendar, Hotel } from 'lucide-react';

const HajjUmrah = () => {
    const [activeTab, setActiveTab] = useState('umrah');

    const packages = {
        umrah: [
            { title: 'Standard Umrah Package', duration: '10 Days', price: '₦2,250,000', type: 'Economy' },
            { title: 'VIP Umrah Experience', duration: '7 Days', price: '₦4,200,000', type: 'Luxury' },
        ],
        hajj: [
            { title: 'Full Hajj Package 2026', duration: '21 Days', price: '₦12,000,000', type: 'Premium' },
        ]
    };

    return (
      <div className="min-h-screen bg-base-200">
        <div className="bg-neutral py-16 text-center text-neutral-content">
            <h1 className="text-4xl font-serif font-bold mb-4">Hajj & Umrah Services</h1>
            <p className="opacity-90 max-w-2xl mx-auto">Embark on your spiritual journey with peace of mind. We handle all logistics so you can focus on worship.</p>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center mb-12">
                <div className="bg-base-100 rounded-full shadow-md p-1 inline-flex">
                    <button 
                        onClick={() => setActiveTab('umrah')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'umrah' ? 'bg-primary text-primary-content shadow' : 'text-base-content hover:bg-base-200'}`}
                    >
                        Umrah Packages
                    </button>
                    <button 
                        onClick={() => setActiveTab('hajj')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'hajj' ? 'bg-primary text-primary-content shadow' : 'text-base-content hover:bg-base-200'}`}
                    >
                        Hajj Packages
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages[activeTab].map((pkg, idx) => (
                    <div key={idx} className="bg-base-100 rounded-xl shadow border border-base-200 overflow-hidden">
                        <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
                             <div className="w-12 h-12 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-3 text-primary shadow-sm">
                                <Moon size={24} />
                             </div>
                             <h3 className="text-xl font-bold text-base-content">{pkg.title}</h3>
                             <span className="inline-block mt-2 bg-primary/20 text-primary-content text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                                {pkg.type}
                             </span>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4 text-sm text-base-content/70 mb-8">
                                <li className="flex items-center gap-3">
                                    <Calendar className="text-primary" size={18} /> 
                                    <span>{pkg.duration} Duration</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Hotel className="text-primary" size={18} /> 
                                    <span>3-5 Star Hotel Accommodation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Star className="text-primary" size={18} /> 
                                    <span>Visa Processing Included</span>
                                </li>
                            </ul>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-base-content">{pkg.price}</span>
                                <button className="bg-primary hover:bg-primary/90 text-primary-content px-6 py-2 rounded-full font-semibold transition-colors">
                                    Register Interest
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  };
  export default HajjUmrah;