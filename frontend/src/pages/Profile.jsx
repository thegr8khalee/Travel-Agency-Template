import { User, Mail, Phone, MapPin, CreditCard, Shield, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="bg-base-200 min-h-screen py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/3">
                        <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-6">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User size={40} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-medium text-base-content">John Doe</h2>
                                <p className="text-base-content/60">Travel Enthusiast</p>
                            </div>
                            
                            <div className="space-y-2">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-2xl font-medium">
                                    <User size={20} /> My Profile
                                </Link>
                                <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-3 text-base-content/70 hover:bg-base-200 rounded-2xl transition-colors">
                                    <CreditCard size={20} /> My Bookings
                                </Link>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-2xl transition-colors text-left">
                                    <Shield size={20} /> Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="bg-primary text-primary-content rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-medium mb-2">Travel Points</h3>
                            <div className="text-3xl font-medium mb-1">2,450</div>
                            <p className="text-sm opacity-80 mb-4">Silver Member Status</p>
                            <div className="w-full bg-primary-content/20 rounded-full h-2 mb-2">
                                <div className="bg-white h-2 rounded-full w-2/3"></div>
                            </div>
                            <p className="text-xs opacity-70">550 points to Gold</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-2/3">
                        <div className="bg-base-100 rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-2xl font-medium text-base-content">Profile Settings</h1>
                                <button className="btn btn-primary-custom gap-2">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">First Name</span>
                                        </label>
                                        <div className="relative">
                                            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-base-content/40" />
                                            </div> */}
                                            <input type="text" defaultValue="John" className="input input-bordered w-full rounded-2xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Last Name</span>
                                        </label>
                                        <div className="relative">
                                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-base-content/40" />
                                                </div> */}
                                            <input type="text" defaultValue="Doe" className="input input-bordered w-full rounded-2xl" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Email Address</span>
                                        </label>
                                        <div className="relative">
                                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-base-content/40" />
                                                </div> */}
                                            <input type="email" defaultValue="john.doe@example.com" className="input input-bordered w-full rounded-2xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Phone Number</span>
                                        </label>
                                        <div className="relative">
                                            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-base-content/40" />
                                            </div> */}
                                            <input type="tel" defaultValue="+234 800 123 4567" className="input input-bordered w-full rounded-2xl" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">Address</span>
                                    </label>
                                    <div className="relative">
                                        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-base-content/40" />
                                        </div> */}
                                        <input type="text" defaultValue="123 Victoria Island, Lagos, Nigeria" className="input input-bordered w-full rounded-2xl   " />
                                    </div>
                                </div>

                                <div className="divider">Passport Details</div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Passport Number</span>
                                        </label>
                                        <input type="text" defaultValue="A01234567" className="input input-bordered rounded-2xl w-full" />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Nationality</span>
                                        </label>
                                        <select className="select select-bordered rounded-2xl w-full">
                                            <option selected>Nigeria</option>
                                            <option>Ghana</option>
                                            <option>United Kingdom</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
