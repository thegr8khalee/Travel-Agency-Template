import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
      <div className="bg-base-200 min-h-screen py-12">
        <div className="container mx-auto px-4">
            {/* <h1 className="text-3xl font-bold text-center mb-12 text-base-content">Get in Touch</h1> */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-16">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex items-start gap-4">
                        <div className="bg-info/10 p-3 rounded-full text-info">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1 text-base-content">Call Us</h3>
                            <p className="text-base-content/70">+123 456 7890</p>
                            <p className="text-base-content/70">+123 987 6543</p>
                        </div>
                    </div>
                    
                    <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex items-start gap-4">
                        <div className="bg-warning/10 p-3 rounded-full text-warning">
                             <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1 text-base-content">Email Us</h3>
                            <p className="text-base-content/70">info@abjandhtravels.com</p>
                            <p className="text-base-content/70">support@abjandhtravels.com</p>
                        </div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex items-start gap-4">
                         <div className="bg-success/10 p-3 rounded-full text-success">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1 text-base-content">WhatsApp</h3>
                            <p className="text-base-content/70">Chat with us directly</p>
                            <button className="text-success font-semibold mt-1">Start Chat &rarr;</button>
                        </div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex items-start gap-4">
                         <div className="bg-base-200 p-3 rounded-full text-base-content/70">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1 text-base-content">Visit Us</h3>
                            <p className="text-base-content/70">123 Travel Street, Victoria Island, Lagos, Nigeria.</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2 bg-base-100 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-base-content">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-base-content/80">First Name</label>
                                <input type="text" className="w-full border border-base-300 p-3 rounded-2xl bg-base-200 focus:bg-base-100 focus:ring-2 focus:ring-primary outline-none transition-colors text-base-content" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-base-content/80">Last Name</label>
                                <input type="text" className="w-full border border-base-300 p-3 rounded-2xl bg-base-200 focus:bg-base-100 focus:ring-2 focus:ring-primary outline-none transition-colors text-base-content" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content/80">Email Address</label>
                            <input type="email" className="w-full border border-base-300 p-3 rounded-2xl bg-base-200 focus:bg-base-100 focus:ring-2 focus:ring-primary outline-none transition-colors text-base-content" />
                        </div>
                         <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content/80">Subject</label>
                             <select className="w-full border border-base-300 p-3 rounded-2xl bg-base-200 focus:bg-base-100 focus:ring-2 focus:ring-primary outline-none transition-colors text-base-content">
                                <option>General Inquiry</option>
                                <option>Flight Booking</option>
                                <option>Visa Assistance</option>
                                <option>Complaint</option>
                             </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content/80">Message</label>
                            <textarea className="w-full border border-base-300 p-3 rounded-2xl bg-base-200 focus:bg-base-100 h-40 focus:ring-2 focus:ring-primary outline-none transition-colors text-base-content"></textarea>
                        </div>
                        <button type="button" className="bg-primary rounded-full hover:bg-primary/90 text-primary-content font-bold py-4 px-8 transition-colors w-full md:w-auto">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    );
  };
  export default Contact;