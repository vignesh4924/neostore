import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, MessageSquare, Terminal, Shield, Zap, Truck, CreditCard, RefreshCw, HelpCircle, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const FAQS = [
  {
    category: 'Logistics',
    icon: <Truck size={14} />,
    items: [
      { q: 'How is the deployment speed calculated?', a: 'Deployment signals are processed within 24 hours. Transit vectors depend on your sector coordinates, typically reaching final terminal within 3-5 standard cycles.' },
      { q: 'Can I re-route an active deployment?', a: 'Protocol restrictions prevent re-routing once the asset has cleared the main distribution hub. Contact technical support for emergency overrides.' }
    ]
  },
  {
    category: 'Financial',
    icon: <CreditCard size={14} />,
    items: [
      { q: 'Which payment protocols are accepted?', a: 'We accept all major credit interfaces, UPI streams, and secure net-banking channels. All transactions are encrypted via 256-bit industrial protocol.' },
      { q: 'Is there a credit reversal protocol?', a: 'Refunds follow the 7-day integrity check. Once the asset return is validated at our facility, credits are issued back to the source node within 48 hours.' }
    ]
  },
  {
    category: 'Product Integrity',
    icon: <Shield size={14} />,
    items: [
      { q: 'What is the "Protocol Shield" warranty?', a: 'Every asset is covered by a 2-year technical integrity warranty. This covers manufacturing defects and structural failures under standard operational use.' }
    ]
  }
];

export default function HelpDesk() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  return (
    <div className="bg-bg-base min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-[2px] bg-brand"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-brand text-glow">Knowledge Archives</span>
              <div className="w-12 h-[2px] bg-brand"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-text-main tracking-tighter uppercase leading-tight">
              Support <span className="text-text-muted">Terminal</span>
            </h1>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search size={20} className="text-text-muted group-focus-within:text-brand transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="QUERY SYSTEM ARCHIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-border-dim rounded-2xl px-16 py-6 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand transition-all shadow-xl shadow-black/5"
            />
            <div className="absolute inset-y-0 right-6 flex items-center">
              <kbd className="px-2 py-1 bg-bg-base border border-border-dim rounded text-[8px] font-bold text-text-muted">ENTER</kbd>
            </div>
          </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border-dim p-8 rounded-2xl space-y-6 hover:border-brand transition-all group">
            <div className="w-12 h-12 rounded-xl bg-bg-base border border-border-dim flex items-center justify-center text-text-muted group-hover:text-brand group-hover:border-brand transition-all">
              <MessageSquare size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-text-main">Live Interface</h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-tighter leading-relaxed">Connect to a tactical support agent for real-time diagnostics.</p>
            </div>
            <button className="w-full py-3 bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-all">
              Initialize Link
            </button>
          </div>

          <div className="bg-white border border-border-dim p-8 rounded-2xl space-y-6 hover:border-brand transition-all group">
            <div className="w-12 h-12 rounded-xl bg-bg-base border border-border-dim flex items-center justify-center text-text-muted group-hover:text-brand group-hover:border-brand transition-all">
              <Terminal size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-text-main">Status Signal</h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-tighter leading-relaxed">Check current operational status of the entire logistics network.</p>
            </div>
            <button className="w-full py-3 bg-white border border-border-dim text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:border-brand transition-all">
              View Node Status
            </button>
          </div>

          <div className="bg-text-main text-white p-8 rounded-2xl space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 rotate-12 opacity-10 group-hover:scale-110 transition-transform">
              <Shield size={80} />
            </div>
            <div className="space-y-2 relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand">Secure Returns</h3>
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-tighter leading-relaxed">Initiate the return protocol for compromised or suboptimal assets.</p>
            </div>
            <button className="w-full py-3 bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-text-main transition-all relative z-10">
              Trigger Return
            </button>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-12 pt-8">
          <div className="flex items-center space-x-4 border-b border-border-dim pb-6">
            <HelpCircle size={24} className="text-brand" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-text-main">Tactical FAQ Library</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
             <div className="space-y-2">
                {FAQS.map(section => (
                  <button 
                    key={section.category}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white text-text-muted hover:text-brand font-black uppercase text-[10px] tracking-widest transition-all"
                  >
                    {section.icon}
                    <span>{section.category}</span>
                  </button>
                ))}
             </div>

             <div className="lg:col-span-3 space-y-4">
                {FAQS.flatMap(section => section.items).map((item, idx) => (
                  <div key={idx} className="bg-white border border-border-dim rounded-2xl overflow-hidden transition-all">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === item.q ? null : item.q)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-text-main pr-8 leading-relaxed">
                        {item.q}
                      </h4>
                      <ChevronDown 
                        size={18} 
                        className={`text-text-muted transition-transform duration-300 ${activeFaq === item.q ? 'rotate-180 text-brand' : ''}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {activeFaq === item.q && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 border-t border-border-dim pt-4">
                            <p className="text-[10px] text-text-muted font-bold leading-relaxed uppercase tracking-widest italic">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Universal Support Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com', color: 'hover:text-pink-500', label: 'Visual Interface' },
            { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com', color: 'hover:text-blue-600', label: 'Meta Network' },
            { name: 'YouTube', icon: <Youtube size={20} />, url: 'https://youtube.com', color: 'hover:text-red-500', label: 'Visual Archive' },
            { name: 'Gmail', icon: <Mail size={20} />, url: 'mailto:support@neostorex.com', color: 'hover:text-brand', label: 'Direct Protocol' },
          ].map((app) => (
            <a 
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white border border-border-dim p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-current transition-all group ${app.color}`}
            >
              <div className="w-12 h-12 rounded-full bg-bg-base border border-border-dim flex items-center justify-center group-hover:scale-110 transition-transform">
                {app.icon}
              </div>
              <div className="text-center">
                <span className="block text-[10px] font-black uppercase tracking-widest text-text-main">{app.name}</span>
                <span className="block text-[8px] font-bold uppercase tracking-tighter text-text-muted">{app.label}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Global Logistics Section */}
        <div className="bg-white border border-border-dim rounded-2xl p-12 text-center space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="space-y-2 relative z-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Global Operation Network</h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest max-w-lg mx-auto">Our logistics terminal spans 42 regional hubs, ensuring seamless asset deployment to any global sector.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 pt-4">
              {[
                { label: 'Uptime', val: '99.9%' },
                { label: 'Support Nodes', val: '250+' },
                { label: 'Deployments', val: '1.2M' },
                { label: 'Security Grade', val: 'SSS' },
              ].map(stat => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl font-black italic text-brand tracking-tighter">{stat.val}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-text-muted">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
