import { useState } from 'react';
import { FileCheck, Calendar, CheckCircle, Shield, Clock, Award, Users, ArrowRight, Phone, Mail, MapPin, Star, Globe, Briefcase, GraduationCap, Plane, ChevronRight, BadgeCheck, HeartHandshake, Sparkles, Check } from 'lucide-react';

const Visa = () => {
    const [activeCountry, setActiveCountry] = useState('uk');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', visaType: 'Tourist', country: 'uk', notes: '' });

    const countries = [
        { id: 'uk', name: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png', processingTime: '3-4 weeks', successRate: '98%', price: '₦150,000', popular: true },
        { id: 'usa', name: 'United States', flag: 'https://flagcdn.com/w80/us.png', processingTime: '4-6 weeks', successRate: '95%', price: '₦180,000', popular: true },
        { id: 'can', name: 'Canada', flag: 'https://flagcdn.com/w80/ca.png', processingTime: '4-8 weeks', successRate: '96%', price: '₦200,000', popular: true },
        { id: 'sch', name: 'Schengen', flag: 'https://flagcdn.com/w80/eu.png', processingTime: '2-3 weeks', successRate: '97%', price: '₦120,000', popular: false },
        { id: 'tur', name: 'Turkey', flag: 'https://flagcdn.com/w80/tr.png', processingTime: '1-2 weeks', successRate: '99%', price: '₦80,000', popular: false },
        { id: 'uae', name: 'UAE', flag: 'https://flagcdn.com/w80/ae.png', processingTime: '3-5 days', successRate: '99%', price: '₦60,000', popular: false },
        { id: 'aus', name: 'Australia', flag: 'https://flagcdn.com/w80/au.png', processingTime: '4-6 weeks', successRate: '94%', price: '₦220,000', popular: false },
    ];

    const visaTypes = [
        { id: 'tourist', name: 'Tourist Visa', icon: Plane, description: 'For holidays and leisure travel' },
        { id: 'business', name: 'Business Visa', icon: Briefcase, description: 'For business meetings and conferences' },
        { id: 'student', name: 'Student Visa', icon: GraduationCap, description: 'For educational purposes abroad' },
        { id: 'work', name: 'Work Visa', icon: Users, description: 'For employment opportunities' },
    ];

    const stats = [
        { value: '15,000+', label: 'Successful Applications', icon: BadgeCheck },
        { value: '98%', label: 'Success Rate', icon: Award },
        { value: '24hrs', label: 'Response Time', icon: Clock },
        { value: '10+', label: 'Years Experience', icon: Star },
    ];

    const processSteps = [
        { step: 1, title: 'Free Consultation', description: 'Book a free call to discuss your travel plans and visa requirements.' },
        { step: 2, title: 'Document Collection', description: 'We provide a personalized checklist and review all your documents.' },
        { step: 3, title: 'Application Submission', description: 'We prepare and submit your application with expert attention to detail.' },
        { step: 4, title: 'Visa Approval', description: 'Track your application status and receive your approved visa.' },
    ];

    const testimonials = [
        { name: 'Adaeze Okonkwo', country: 'UK Visa', text: 'Got my UK visa approved in just 3 weeks! The team was incredibly helpful throughout the process.', rating: 5 },
        { name: 'Emeka Nwosu', country: 'Canada Visa', text: 'After being rejected twice elsewhere, they got my Canadian study permit approved. Highly recommend!', rating: 5 },
        { name: 'Fatima Ibrahim', country: 'Schengen Visa', text: 'Seamless experience from start to finish. They handled everything professionally.', rating: 5 },
    ];

    const faqs = [
        { q: 'How long does the visa process take?', a: 'Processing times vary by country, typically ranging from 1 week (Turkey, UAE) to 8 weeks (Canada). We always aim to expedite where possible.' },
        { q: 'What documents do I need?', a: 'Requirements vary, but generally include: valid passport, photographs, bank statements, employment letter, and travel itinerary. We provide a detailed checklist for your specific visa type.' },
        { q: 'What if my visa gets rejected?', a: 'Our 98% success rate speaks for itself, but in rare cases of rejection, we offer free re-application assistance and analyze what went wrong.' },
        { q: 'Do you offer payment plans?', a: 'Yes! We offer flexible payment options including installments for most visa packages.' },
    ];

    const activeCountryData = countries.find(c => c.id === activeCountry);

    return (
      <div className="bg-base-200 min-h-screen">
         {/* Hero Section */}
         <section className="relative bg-gradient-to-br from-neutral via-neutral to-neutral/90 text-neutral-content overflow-hidden">
            {/* Background Pattern */}
            {/* <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div> */}
            
            <div className="container max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-content px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span>Nigeria's #1 Visa Consultancy</span>
                        </div> */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                            Your Visa, <br/>
                            <span className="text-primary">Our Expertise</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-content/80 mb-8 max-w-xl mx-auto lg:mx-0">
                            Over 15,000 successful visa applications. We handle the paperwork, you plan your adventure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#apply" className="btn btn-primary-custom btn-lg">
                                Start Application
                            </a>
                            <a href="#countries" className="btn rounded-full btn-outline btn-lg border-neutral-content/30 text-neutral-content hover:bg-neutral-content hover:text-neutral">
                                View Countries
                            </a>
                        </div>
                        
                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 pt-10">
                            {stats.slice(0, 3).map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-xs text-neutral-content/60">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Quick Inquiry Card */}
                    <div className="hidden lg:block">
                        <div className="bg-base-100 rounded-2xl p-6 text-base-content max-w-md ml-auto">
                            <h3 className="text-2xl font-bold mb-2">Get Free Consultation</h3>
                            <p className="text-base-content/60 text-sm mb-6">Fill in your details and we'll call you back within 24 hours.</p>
                            <form className="space-y-4">
                                <input type="text" placeholder="Full Name" className="input input-bordered rounded-2xl w-full" />
                                <input type="tel" placeholder="Phone Number (+234...)" className="input rounded-2xl input-bordered w-full" />
                                <select className="select select-bordered rounded-2xl w-full">
                                    <option disabled selected>Select Destination</option>
                                    {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <button type="button" className="btn btn-primary-custom w-full">Request Callback</button>
                            </form>
                            <p className="text-xs text-center text-base-content/40 mt-4">Your information is secure and confidential.</p>
                        </div>
                    </div>
                </div>
            </div>
         </section>

         {/* Stats Bar */}
         <section className="bg-base-100 border-b border-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <stat.icon size={24} className="text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-base-content">{stat.value}</div>
                                <div className="text-sm text-base-content/60">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </section>

         {/* Countries Section */}
         <section id="countries" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">Choose Your Destination</h2>
                    <p className="text-base-content/60 max-w-2xl mx-auto">We process visas for over 50 countries. Select your destination to see requirements and pricing.</p>
                </div>

                {/* Country Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-12">
                    {countries.map(country => (
                        <button 
                            key={country.id}
                            onClick={() => setActiveCountry(country.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all text-center group
                                ${activeCountry === country.id 
                                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                                    : 'border-base-200 bg-base-100 hover:border-primary/50 hover:shadow-md'}`}
                        >
                            {country.popular && (
                                <span className="absolute -top-2 -right-2 bg-accent text-accent-content text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>
                            )}
                            <img src={country.flag} alt={country.name} className="w-12 h-8 object-cover rounded mx-auto mb-2" />
                            <span className={`font-semibold text-sm block ${activeCountry === country.id ? 'text-primary' : 'text-base-content'}`}>
                                {country.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Selected Country Details */}
                <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 md:p-8 border-b border-base-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img src={activeCountryData?.flag} alt={activeCountryData?.name} className="w-16 h-12 object-cover rounded-lg shadow" />
                                <div>
                                    <h3 className="text-2xl font-bold text-base-content">{activeCountryData?.name} Visa</h3>
                                    <p className="text-base-content/60">Tourist, Business, Student & Work Visas</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-base-100 px-4 py-2 rounded-2xl border border-base-200">
                                    <div className="text-xs text-base-content/60">Processing Time</div>
                                    <div className="font-bold text-base-content">{activeCountryData?.processingTime}</div>
                                </div>
                                <div className="bg-base-100 px-4 py-2 rounded-2xl border border-base-200">
                                    <div className="text-xs text-base-content/60">Success Rate</div>
                                    <div className="font-bold text-success">{activeCountryData?.successRate}</div>
                                </div>
                                <div className="bg-primary text-primary-content px-4 py-2 rounded-2xl">
                                    <div className="text-xs opacity-80">Starting From</div>
                                    <div className="font-bold text-lg">{activeCountryData?.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold text-base-content mb-4 flex items-center gap-2">
                                <FileCheck size={20} className="text-primary" /> What's Included
                            </h4>
                            <ul className="space-y-3 text-sm text-base-content/80">
                                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Document verification & review</li>
                                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Application form filling</li>
                                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Appointment booking</li>
                                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Interview preparation</li>
                                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Status tracking & updates</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-base-content mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-primary" /> Basic Requirements
                            </h4>
                            <ul className="space-y-3 text-sm text-base-content/80">
                                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-primary" /> Valid international passport</li>
                                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-primary" /> Passport photographs</li>
                                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-primary" /> Bank statements (6 months)</li>
                                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-primary" /> Employment/business letter</li>
                                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-primary" /> Travel itinerary</li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="bg-base-200/50 p-4 rounded-xl mb-4">
                                <p className="text-sm text-base-content/70 mb-2"><strong>Pro Tip:</strong> Start your application at least 6 weeks before your travel date for the best chance of approval.</p>
                            </div>
                            <a href="#apply" className="btn btn-primary-custom w-full gap-2">
                                Apply for {activeCountryData?.name} Visa
                            </a>
                        </div>
                    </div>
                </div>
            </div>
         </section>

         {/* Visa Types */}
         <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">Visa Types We Process</h2>
                    <p className="text-base-content/60">Whatever your travel purpose, we've got you covered.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visaTypes.map(type => (
                        <div key={type.id} className="bg-base-200/30 border border-base-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
                            <div className="p-4 bg-primary/10 rounded-xl inline-block mb-4 group-hover:bg-primary/20 transition-colors">
                                <type.icon size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-medium text-base-content mb-2">{type.name}</h3>
                            <p className="text-base-content/60 text-sm">{type.description}</p>
                        </div>
                    ))}
                </div>
            </div>
         </section>

         {/* Process Steps */}
         {/* <section className="py-16 md:py-24 bg-gradient-to-b from-base-200 to-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">How It Works</h2>
                    <p className="text-base-content/60 max-w-xl mx-auto">A simple 4-step process to get your visa approved without the stress.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {processSteps.map((item, idx) => (
                        <div key={idx} className="relative text-center">
                            {idx < processSteps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/10"></div>
                            )}
                            <div className="relative z-10 w-20 h-20 bg-primary text-primary-content rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold text-base-content mb-2">{item.title}</h3>
                            <p className="text-base-content/60 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
         </section> */}

         {/* Testimonials */}
         <section className="py-16 bg-neutral text-neutral-content">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium mb-4">What Our Clients Say</h2>
                    <p className="text-neutral-content/70">Join thousands of satisfied travelers who trusted us with their visa applications.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-neutral-content/10 backdrop-blur-sm rounded-2xl p-6 border border-neutral-content/10">
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} className="fill-primary text-primary" />)}
                            </div>
                            <p className="text-neutral-content/90 mb-6 italic">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-lg font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold">{t.name}</div>
                                    <div className="text-sm text-neutral-content/60">{t.country}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </section>

         {/* Application Form Section */}
         <section id="apply" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-6">Ready to Start Your Visa Application?</h2>
                        <p className="text-base-content/70 mb-8">Fill out the form and our visa experts will contact you within 24 hours to discuss your requirements and guide you through the process.</p>
                        
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-success/10 rounded-xl">
                                    <Shield size={24} className="text-success" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">98% Success Rate</h4>
                                    <p className="text-sm text-base-content/60">One of the highest in the industry, backed by expert knowledge.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-warning/10 rounded-xl">
                                    <HeartHandshake size={24} className="text-warning" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">Dedicated Support</h4>
                                    <p className="text-sm text-base-content/60">A personal visa consultant assigned to your application.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-info/10 rounded-xl">
                                    <Globe size={24} className="text-info" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">50+ Countries</h4>
                                    <p className="text-sm text-base-content/60">We process visas for destinations worldwide.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-base-100 border border-base-200 rounded-2xl p-6">
                            <h4 className="font-bold text-base-content mb-4">Contact Us Directly</h4>
                            <div className="space-y-3 text-sm">
                                <a href="tel:+2348012345678" className="flex items-center gap-3 text-base-content/70 hover:text-primary transition-colors">
                                    <Phone size={18} /> +234 801 234 5678
                                </a>
                                <a href="mailto:visa@travelagency.com" className="flex items-center gap-3 text-base-content/70 hover:text-primary transition-colors">
                                    <Mail size={18} /> visa@travelagency.com
                                </a>
                                <div className="flex items-center gap-3 text-base-content/70">
                                    <MapPin size={18} /> Lagos, Nigeria
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 p-8">
                        <h3 className="text-2xl font-medium text-base-content mb-2">Apply Now</h3>
                        <p className="text-base-content/60 text-sm mb-6">Fill in your details below and we'll get back to you shortly.</p>
                        <form className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">Full Name *</label>
                                    <input type="text" className="input input-bordered rounded-2xl w-full" placeholder="Your full name" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">Phone Number *</label>
                                    <input type="tel" className="input input-bordered rounded-2xl w-full" placeholder="+234..." required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-base-content/70 mb-1.5">Email Address *</label>
                                <input type="email" className="input input-bordered rounded-2xl w-full" placeholder="your@email.com" required />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">Destination Country *</label>
                                    <select className="select select-bordered rounded-2xl w-full" value={activeCountry} onChange={(e) => setActiveCountry(e.target.value)}>
                                        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content/70 mb-1.5">Visa Type *</label>
                                    <select className="select select-bordered rounded-2xl w-full">
                                        <option>Tourist Visa</option>
                                        <option>Business Visa</option>
                                        <option>Student Visa</option>
                                        <option>Work Visa</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-base-content/70 mb-1.5">Planned Travel Date</label>
                                <input type="date" className="input input-bordered rounded-2xl w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-base-content/70 mb-1.5">Additional Information</label>
                                <textarea className="textarea textarea-bordered rounded-2xl w-full h-24" placeholder="Tell us about your travel plans or any special requirements..."></textarea>
                            </div>
                            <button type="button" className="btn btn-primary-custom w-full btn-lg">
                                Submit Application
                            </button>
                            <p className="text-xs text-center text-base-content/50">By submitting, you agree to our terms and privacy policy. No payment required at this stage.</p>
                        </form>
                    </div>
                </div>
            </div>
         </section>

         {/* FAQ Section */}
         <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium text-base-content mb-4">Frequently Asked Questions</h2>
                    <p className="text-base-content/60">Got questions? We've got answers.</p>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="collapse collapse-plus bg-base-200 rounded-2xl">
                            <input type="radio" name="faq-accordion" defaultChecked={idx === 0} />
                            <div className="collapse-title text-lg font-semibold text-base-content">
                                {faq.q}
                            </div>
                            <div className="collapse-content text-base-content/70">
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </section>

         {/* Final CTA */}
         <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-content">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Your Visa?</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Join over 15,000 satisfied clients who have successfully traveled with visas processed by us.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#apply" className="btn btn-lg p-6 border-none shadow-none rounded-full bg-white text-primary">
                        Start Application Now
                    </a>
                    <a href="tel:+2348012345678" className="btn btn-lg btn-outline border-white rounded-full  text-white rounded-full  hover:bg-primary hover:text-primary-content gap-2">
                        <Phone size={20} /> Call Us
                    </a>
                </div>
            </div>
         </section>
      </div>
    );
  };
  export default Visa;