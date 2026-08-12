import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-SYNC-49292';

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-white border border-border-dim rounded-2xl shadow-xl p-8 sm:p-16 text-center space-y-12"
      >
        {/* Status Icon */}
        <div className="relative inline-block">
          <div className="h-24 w-24 bg-brand/10 rounded-full flex items-center justify-center text-brand">
            <CheckCircle size={48} strokeWidth={2.5} />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-brand/20 rounded-full"
          ></motion.div>
        </div>

        <div className="space-y-4">
          <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-black italic">Transmission Successful</span>
          <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-text-main uppercase leading-tight">
            DEPLØYMENT <br /> INITIALIZED
          </h1>
          <p className="text-text-muted text-sm font-medium italic max-w-md mx-auto">
            Your asset procurement has been verified and synced with our global logistics network.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-bg-base border border-border-dim rounded-xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
           <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-text-muted">Protocol ID</span>
              <p className="text-xs font-mono font-bold text-text-main uppercase">{orderId}</p>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-text-muted">ETA (Alpha Range)</span>
              <p className="text-xs font-bold text-text-main uppercase">T+48 Hours</p>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-text-muted">Target Sector</span>
              <p className="text-xs font-bold text-text-main uppercase">Confidential Registry</p>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-text-muted">Verified At</span>
              <p className="text-xs font-bold text-text-main uppercase">{new Date().toLocaleTimeString()} UTC</p>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
           <button className="flex-grow flex items-center justify-center space-x-2 bg-text-main text-white py-4 px-6 rounded-lg text-[10px] uppercase font-black tracking-widest hover:bg-text-muted transition-colors">
              <Printer size={14} />
              <span>Print Manifest</span>
           </button>
           <button className="flex-grow flex items-center justify-center space-x-2 border border-border-dim py-4 px-6 rounded-lg text-[10px] uppercase font-black tracking-widest hover:bg-bg-base transition-colors">
              <Share2 size={14} />
              <span>Share Signal</span>
           </button>
        </div>

        <div className="pt-8 border-t border-border-dim">
           <Link to="/shop" className="text-brand text-[10px] uppercase font-black tracking-widest flex items-center justify-center space-x-2 hover:translate-x-1 transition-transform">
              <span>Return to Deployment Zone</span>
              <ArrowRight size={14} />
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
