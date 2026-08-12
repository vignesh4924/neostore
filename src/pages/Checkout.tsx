import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      clearCart();
      navigate('/order-success', { state: { orderId } });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center space-y-6">
        <h2 className="text-4xl font-sans font-black tracking-tighter uppercase text-text-main">Checkout Nullified</h2>
        <p className="text-text-muted italic">Your procurement bag is currently empty.</p>
        <Link to="/shop" className="inline-block bg-brand text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black rounded-lg">
          Return to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center space-x-4 mb-12 border-b border-border-dim pb-8">
        <h1 className="text-4xl font-sans font-black tracking-tighter text-text-main uppercase leading-tight">Checkout</h1>
        <div className="h-2 w-2 rounded-full bg-brand animate-pulse"></div>
        <p className="text-[10px] uppercase font-black text-brand tracking-widest">Protocol Sync in Progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Forms */}
        <div className="lg:col-span-8 space-y-12">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            {/* Shipping Address */}
            <section className="space-y-8">
              <div className="flex items-center space-x-3">
                 <div className="h-8 w-8 rounded-lg bg-bg-base flex items-center justify-center border border-border-dim text-brand font-black text-xs">01</div>
                 <h2 className="text-[11px] uppercase tracking-[0.2em] font-black text-text-main">Deployment Coordinates</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white border border-border-dim rounded-2xl">
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] uppercase font-black text-text-muted ml-1">Agent Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] uppercase font-black text-text-muted ml-1">Contact Protocol</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase font-black text-text-muted ml-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="Address Line"
                    className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-text-muted ml-1">City / Sector</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-text-muted ml-1">State</label>
                    <input
                      type="text"
                      placeholder="ST"
                      className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-text-muted ml-1">Zip Code</label>
                    <input
                      type="text"
                      placeholder="Zip"
                      className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="space-y-8">
              <div className="flex items-center space-x-3">
                 <div className="h-8 w-8 rounded-lg bg-bg-base flex items-center justify-center border border-border-dim text-brand font-black text-xs">02</div>
                 <h2 className="text-[11px] uppercase tracking-[0.2em] font-black text-text-main">Credit Authorization</h2>
              </div>
              
              <div className="p-8 bg-white border border-border-dim rounded-2xl space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-text-muted ml-1">Card Token</label>
                   <div className="relative">
                     <input
                       type="text"
                       placeholder="0000 0000 0000 0000"
                       className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-4 text-xs font-mono focus:ring-1 focus:ring-brand outline-none transition-colors"
                       required
                     />
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                        <div className="w-8 h-5 bg-slate-200 rounded-sm"></div>
                        <div className="w-8 h-5 bg-slate-200 rounded-sm"></div>
                     </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-text-muted ml-1">Expiry</label>
                     <input
                       type="text"
                       placeholder="MM/YY"
                       className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                       required
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black text-text-muted ml-1">CVV</label>
                     <input
                       type="text"
                       placeholder="***"
                       className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-3 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                       required
                     />
                   </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 max-w-sm mx-auto">
          <div className="sticky top-24 space-y-6">
            <div className="bg-text-main text-white rounded-2xl p-8 space-y-8 shadow-2xl">
              <div className="space-y-2">
                 <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Transmission Summary</h3>
                 <div className="h-1 w-12 bg-brand rounded-full"></div>
              </div>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-white flex-shrink-0 overflow-hidden p-1 flex items-center justify-center">
                      <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[11px] font-black uppercase truncate">{item.name}</p>
                      <p className="text-[10px] text-white/40 italic">QTY: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-xs font-medium text-white/60">
                   <span className="uppercase tracking-widest">Base Assets</span>
                   <span className="font-mono">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-white/60">
                   <span className="uppercase tracking-widest">Logistics Route</span>
                   <span className="font-mono">₹1,000</span>
                </div>
                <div className="flex justify-between pt-4">
                   <span className="text-sm uppercase font-black tracking-widest">Grand Total</span>
                   <span className="text-2xl font-sans font-black text-brand">₹{(cartTotal + 1000).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className={`w-full py-5 rounded-xl text-white bg-brand text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Protocol</span>
                  </>
                ) : (
                  <>
                    <Lock size={14} strokeWidth={2.5} />
                    <span>Authorize Assets</span>
                  </>
                )}
              </button>
              
              <div className="text-[9px] text-center text-white/30 uppercase font-black tracking-widest pt-2">
                 AES-256 Bit Encryption Protocol
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
