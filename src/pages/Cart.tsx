import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="h-24 w-24 bg-bg-base rounded-full flex items-center justify-center text-text-muted">
          <ShoppingBag size={48} strokeWidth={1} />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-sans font-black tracking-tighter uppercase text-text-main">Deployment Bag Empty</h2>
          <p className="text-text-muted font-medium text-lg italic">Search inventory for high-performance gear.</p>
        </div>
        <Link
          to="/shop"
          className="bg-brand text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all rounded-xl shadow-lg shadow-brand/20"
        >
          Initialize Catalog Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="flex items-center justify-between mb-12 border-b border-border-dim pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-sans font-black tracking-tighter text-text-main uppercase">Procurement Bag</h1>
          <p className="text-[10px] uppercase font-bold text-text-muted italic">Asset count: {cartCount} items ready for deployment</p>
        </div>
        <Link to="/shop" className="text-[10px] uppercase tracking-widest font-black text-brand flex items-center space-x-2 border-b border-brand/20 pb-1">
          <ArrowLeft size={12} />
          <span>Return to Inventory</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-6 p-4 bg-white border border-border-dim rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-border-dim p-2 flex items-center justify-center">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-text-main uppercase leading-tight">{item.name}</h3>
                      <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold italic">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-text-muted hover:text-brand transition-colors rounded-lg hover:bg-bg-base"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-border-dim rounded-lg bg-bg-base overflow-hidden h-8">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 hover:bg-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 hover:bg-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-base font-bold text-text-main">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary - Marketplace Style */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white border border-border-dim rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted border-b border-border-dim pb-4">Procurement Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-text-muted">
                  <span className="uppercase tracking-widest">Total Asset MRP</span>
                  <span>₹{(cartTotal * 1.15).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-green-600">
                  <span className="uppercase tracking-widest">Marketplace Discount</span>
                  <span>-₹{(cartTotal * 0.15).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-text-muted">
                  <span className="uppercase tracking-widest">Shipment & Logistics</span>
                  <div className="flex items-center space-x-2">
                    <span className="line-through text-[10px]">₹1,000</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-bold text-text-muted">
                  <span className="uppercase tracking-widest">Protocol Handling Fee</span>
                  <span>₹99.00</span>
                </div>
              </div>

              {/* Protection Plan - Flipkart Style */}
              <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 space-y-3">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                       <ShieldCheck size={14} className="text-brand" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-text-main text-brand">NEO-Guard Protection</span>
                    </div>
                    <span className="text-[10px] font-black text-text-main">₹499</span>
                 </div>
                 <p className="text-[9px] font-medium text-text-muted leading-tight">Total device coverage against operational failures and chassis damage.</p>
                 <button className="w-full py-1.5 bg-brand text-text-main text-[8px] font-black uppercase tracking-widest rounded-lg">Add to Deployment</button>
              </div>

              <div className="pt-6 border-t border-border-dim space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase font-black text-text-main">Final Deployment Cost</span>
                    <div className="text-right">
                       <span className="block text-3xl font-sans font-black text-text-main leading-none">
                          ₹{(cartTotal + 99).toLocaleString('en-IN')}
                       </span>
                       <p className="text-[9px] font-bold text-green-600 mt-1 uppercase tracking-tighter">You save ₹{(cartTotal * 0.15 + 1000).toLocaleString('en-IN')} on this order</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="relative group">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand">
                      <ShoppingBag size={12} />
                   </div>
                   <input
                     type="text"
                     placeholder="Enter Deployment Code"
                     className="w-full bg-bg-base border border-border-dim rounded-lg pl-9 pr-4 py-3 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-brand outline-none transition-colors"
                   />
                   <button className="absolute right-3 top-1/2 -translate-y-1/2 text-brand font-black text-[10px] uppercase tracking-widest">Apply</button>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-brand text-white text-center py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all active:scale-[0.98]"
                >
                  Confirm Sec-Checkout
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-text-muted font-bold uppercase tracking-widest opacity-60">
                 <ShieldCheck size={12} />
                 <span>256-bit Encrypted Transaction</span>
              </div>
            </div>

            {/* Help info */}
            <div className="bg-bg-base border border-border-dim rounded-xl p-4 text-[10px] font-medium text-text-muted italic leading-relaxed">
               Notes: All acquisition shipments are insured up to ₹4,00,000. Returns must be initiated within 30 solar days of delivery.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
