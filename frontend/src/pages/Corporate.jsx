import { Briefcase, Building, Users, Globe } from 'lucide-react';

const Corporate = () => {
    return (
      <div className="bg-base-200 min-h-screen">
        <div className="bg-neutral text-neutral-content py-20">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                   <h1 className="text-4xl md:text-5xl font-bold mb-6">Simplifying Corporate Travel</h1>
                   <p className="text-lg text-neutral-content/70 mb-8">
                       Streamline your business trips with our exclusive corporate travel management solutions. Cost-effective, efficient, and reliable.
                   </p>
                   <button className="bg-primary hover:bg-primary/90 px-8 py-3 rounded text-lg font-semibold text-primary-content transition-colors">
                       Request a Demo
                   </button>
                </div>
                <div className="hidden md:block">
                     <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Corporate" className="rounded-lg shadow-2xl opacity-80" />
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-16 text-base-content">Why Partner With Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <Feature icon={Users} title="Dedicated Account Manager" desc="A personal expert assigned to handle all your company's travel needs." />
                <Feature icon={Globe} title="Global Inventory" desc="Access to exclusive corporate rates for flights and hotels worldwide." />
                <Feature icon={Briefcase} title="Management & Reporting" desc="Easy invoicing and expense tracking for your finance team." />
            </div>

            <div className="mt-20 bg-base-100 p-8 md:p-12 rounded-2xl shadow-lg border border-base-200 text-center max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-base-content">Request a Corporate Quote</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-base-content">Company Name</label>
                        <input type="text" className="w-full border border-base-300 bg-base-100 p-3 rounded text-base-content" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-base-content">Contact Person</label>
                        <input type="text" className="w-full border border-base-300 bg-base-100 p-3 rounded text-base-content" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-base-content">Email Address</label>
                        <input type="email" className="w-full border border-base-300 bg-base-100 p-3 rounded text-base-content" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-base-content">Phone Number</label>
                        <input type="tel" className="w-full border border-base-300 bg-base-100 p-3 rounded text-base-content" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1 text-base-content">Travel Requirements</label>
                        <textarea className="w-full border border-base-300 bg-base-100 p-3 rounded h-32 text-base-content"></textarea>
                    </div>
                    <button type="button" className="md:col-span-2 bg-primary hover:bg-primary/90 text-primary-content font-bold py-4 rounded text-lg transition-colors">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
      </div>
    );
  };

  const Feature = ({ icon: Icon, title, desc }) => (
      <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-base-content">{title}</h3>
          <p className="text-base-content/70 leading-relaxed">{desc}</p>
      </div>
  );

  export default Corporate;