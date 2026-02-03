import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, CreditCard, ArrowRight, Check } from 'lucide-react';

const BookingSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 pt-20">
            <div className="bg-base-100 p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-12 h-12 text-primary" />
                </div>
                
                <h1 className="text-3xl font-medium text-base-content mb-2">Booking Confirmed!</h1>
                <p className="text-base-content/60 mb-8">
                    Thank you for your booking. A confirmation email has been sent to your inbox. Your booking reference is <span className="font-bold text-base-content">#TRV-8829</span>.
                </p>

                <div className="bg-base-200 rounded-xl p-4 mb-8 text-left">
                    <h3 className="text-sm font-semibold text-base-content/50 uppercase mb-2">Next Steps</h3>
                    <ul className="space-y-2 text-sm text-base-content/80">
                        <li className="flex items-start gap-2">
                            <span className="bg-base-content/10 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mt-0.5">1</span>
                            Check your email for the e-ticket/voucher
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-base-content/10 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mt-0.5">2</span>
                            Log in to view your booking details any time
                        </li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <button 
                        onClick={() => navigate('/my-bookings')}
                        className="btn btn-primary-custom w-full gap-2"
                    >
                        <CreditCard size={18} /> View My Bookings
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn rounded-full btn-ghost w-full gap-2"
                    >
                        <Home size={18} /> Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
