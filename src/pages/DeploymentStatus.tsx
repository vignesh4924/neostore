import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Truck, Package, CheckCircle2, Clock, Terminal, Activity } from 'lucide-react';

const STATUS_STEPS = [
  { id: 'AUTH', label: 'Protocol Authorized', time: '14:22:01', status: 'completed' },
  { id: 'LOGS', label: 'Logistics Queue', time: '14:45:12', status: 'completed' },
  { id: 'DEP', label: 'Asset Deployment', time: 'ACTIVE', status: 'current' },
  { id: 'TRANS', label: 'Terminal Transit', time: 'PENDING', status: 'pending' },
  { id: 'TERM', label: 'Final Handover', time: 'PENDING', status: 'pending' },
];

export default function DeploymentStatus() {
  return (
    <div className="bg-bg-base min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-[2px] bg-brand animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-brand">Real-Time Logistics</span>
            <div className="w-12 h-[2px] bg-brand animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tighter uppercase">
            Deployment <span className="text-text-muted">Status</span>
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-white border border-border-dim px-4 py-2 rounded-lg">
              <Terminal size={14} className="text-brand" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-main">ID: #PX-9921-X</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-green-600">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Active Signal</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="bg-white border border-border-dim rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {STATUS_STEPS.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-4 z-10 transition-all ${
                  step.status === 'completed' ? 'bg-brand border-brand text-white shadow-[0_0_15px_rgba(var(--brand-rgb),0.4)]' :
                  step.status === 'current' ? 'bg-white border-brand text-brand animate-pulse' :
                  'bg-white border-border-dim text-text-muted'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 size={18} /> : 
                   step.status === 'current' ? <Zap size={18} className="fill-brand" /> : 
                   <Clock size={18} />}
                </div>
                
                {idx < STATUS_STEPS.length - 1 && (
                  <div className={`hidden md:block absolute top-5 left-1/2 w-full h-[2px] -z-0 ${
                    step.status === 'completed' ? 'bg-brand' : 'bg-border-dim'
                  }`}></div>
                )}

                <div className="text-center space-y-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest block ${step.status === 'pending' ? 'text-text-muted' : 'text-text-main'}`}>
                    {step.label}
                  </span>
                  <span className="text-[9px] font-bold text-text-muted/60 uppercase font-mono">
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center space-x-2">
              <Activity size={14} />
              <span>Operational Logistics Feed</span>
            </h3>
            
            <div className="space-y-4">
              {[
                { time: '14:45:12', msg: 'ASSET RELEASED FROM SECTOR-H WAREHOUSE', location: 'BANGALORE_DIST' },
                { time: '14:22:01', msg: 'AUTHENTICATION HASH VERIFIED', location: 'MAIN_SERVER' },
                { time: '14:15:55', msg: 'INITIAL DEPLOYMENT PROTOCOL TRIGGERED', location: 'USER_INTERFACE' },
              ].map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white border border-border-dim p-4 rounded-xl flex items-start justify-between group hover:border-brand transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-bg-base border border-border-dim rounded-lg group-hover:bg-brand/5 transition-colors">
                      <Terminal size={14} className="text-text-muted group-hover:text-brand" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-main">{log.msg}</p>
                      <p className="text-[9px] font-bold text-text-muted">LOCATION: {log.location}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-muted/50">{log.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-text-main text-white p-6 rounded-2xl space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Truck size={64} />
               </div>
               <div className="space-y-1 relative z-10">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Estimated Deployment</h4>
                 <p className="text-3xl font-black italic tracking-tighter uppercase">48 Hours</p>
               </div>
               <button className="w-full bg-brand text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-text-main transition-all">
                 Expedite Protocol
               </button>
            </div>

            <div className="bg-white border border-border-dim p-6 rounded-2xl space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Support Interface</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-border-dim rounded-xl hover:border-brand transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest">Connect to Agent</span>
                  <Activity size={14} className="text-text-muted group-hover:text-brand" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-border-dim rounded-xl hover:border-brand transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest">Help Desk Archives</span>
                  <Terminal size={14} className="text-text-muted group-hover:text-brand" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
