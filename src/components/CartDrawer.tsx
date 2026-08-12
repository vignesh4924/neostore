import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, isDrawerOpen, setIsDrawerOpen } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              opacity: { duration: 0.3 }
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-dim flex items-center justify-between bg-bg-base">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-brand" size={20} />
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-text-main">Deployment Bag</h2>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter italic">{cartCount} items secure</p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-colors border border-border-dim"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center opacity-40">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest">No gear detected</p>
                    <p className="text-[10px] font-medium">Initialize search for assets</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 p-3 bg-bg-base rounded-xl border border-border-dim group hover:border-brand/30 transition-all shadow-sm"
                  >
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden border border-border-dim p-1 flex-shrink-0">
                      {item.image.endsWith('.mp4') ? (
                        <video src={item.image} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                      ) : (
                        <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <h3 className="text-[11px] font-black text-text-main uppercase leading-tight line-clamp-1">{item.name}</h3>
                          <p className="text-[9px] text-text-muted font-bold uppercase tracking-tighter opacity-70 italic">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-text-muted hover:text-brand transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center border border-border-dim rounded-md bg-white overflow-hidden h-6 scale-90 -ml-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 hover:bg-bg-base transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-[10px] font-black">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 hover:bg-bg-base transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-text-main">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border-dim space-y-4 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    <span>Subtotal Protocol</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-green-600 uppercase tracking-widest">
                    <span>Logistics Savings</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-xs font-black uppercase text-text-main">Final Cost</span>
                    <span className="text-2xl font-sans font-black text-text-main leading-none tracking-tighter">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/checkout"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-center space-x-3 w-full bg-brand text-text-main py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-brand/20 hover:brightness-110 transition-all active:scale-[0.98]"
                  >
                    <span>Authorize Deployment</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <p className="text-[8px] text-center text-text-muted font-bold uppercase tracking-widest opacity-40 italic">
                  * All transactions secured by 256-bit encryption
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
