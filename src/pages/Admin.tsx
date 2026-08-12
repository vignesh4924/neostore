import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Terminal, Database, ArrowRight, CheckCircle2, ListFilter } from 'lucide-react';
import { seedProducts } from '../lib/firestore';

export default function Admin() {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'complete' | 'error'>('idle');
  const [log, setLog] = useState<string[]>([]);

  const handleSeed = async () => {
    setStatus('seeding');
    setLog(prev => [...prev, '> Initializing deployment protocol...']);
    
    try {
      // Overriding console.log temporarily to capture logs
      const originalLog = console.log;
      console.log = (msg: string) => {
        setLog(prev => [...prev, `> ${msg}`]);
        originalLog(msg);
      };

      await seedProducts();
      
      console.log = originalLog;
      setStatus('complete');
      setLog(prev => [...prev, '> STØRE-SEED SUCCESSFUL. Assets deployed to Firestore.']);
    } catch (err) {
      setLog(prev => [...prev, `> ERROR: System failure durante deployment - ${err}`]);
      setStatus('error');
    }
  };

  return (
    <div className="bg-bg-base min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="text-brand" size={24} />
            <h1 className="text-4xl font-black text-text-main tracking-tighter uppercase">Admin <span className="text-brand">Terminal</span></h1>
          </div>
          <p className="text-text-muted text-xs uppercase font-bold tracking-widest leading-relaxed">Authorized access only. Level 7 security clearance required.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Action Card */}
          <div className="bg-white border border-border-dim rounded-2xl p-8 space-y-6 shadow-xl shadow-black/5">
            <div className="flex items-center space-x-3 text-text-main">
              <Database size={18} className="text-brand" />
              <h3 className="text-sm font-black uppercase tracking-widest">Catalog Management</h3>
            </div>
            
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest leading-relaxed">
              Execute this protocol to inject new product categories (Mobiles, PC, Shoes, etc.) into the Firestore database. Duplicate entries will be filtered automatically.
            </p>

            <button
              onClick={handleSeed}
              disabled={status === 'seeding'}
              className="w-full group flex items-center justify-between bg-text-main text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand hover:text-text-main transition-all disabled:opacity-50"
            >
              <span>{status === 'seeding' ? 'Deploying...' : 'Execute Seed Protocol'}</span>
              <Zap size={16} className={status === 'seeding' ? 'animate-pulse' : 'group-hover:fill-current'} />
            </button>
          </div>

          {/* System Status */}
          <div className="bg-text-main rounded-2xl p-8 space-y-6 text-white font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-brand" />
                <span className="text-[10px] font-bold uppercase tracking-widest">System Log</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 text-[9px] scrollbar-hide text-slate-400">
              {log.length === 0 ? (
                <p className="italic text-slate-600">Waiting for deployment trigger...</p>
              ) : (
                log.map((line, i) => (
                  <p key={i} className={line.includes('SUCCESS') ? 'text-green-400' : line.includes('ERROR') ? 'text-red-400' : ''}>
                    {line}
                  </p>
                ))
              )}
            </div>

            {status === 'complete' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 text-green-400 pt-2 border-t border-white/10"
              >
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">System Integrity Verified</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border border-border-dim rounded-2xl p-8">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center space-x-2">
             <ListFilter size={14} />
             <span>Active Data Streams</span>
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {['Deployments', 'Orders', 'User Logs'].map(link => (
               <button key={link} className="flex items-center justify-between p-4 border border-border-dim rounded-xl hover:border-brand transition-all group">
                 <span className="text-[10px] font-black uppercase tracking-widest">{link}</span>
                 <ArrowRight size={14} className="text-text-muted group-hover:text-brand transition-transform group-hover:translate-x-1" />
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
