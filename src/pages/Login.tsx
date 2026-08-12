import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Key, Mail, Shield, Zap, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Manual protocol currently offline. Please use Google Authorization.');
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await login();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Authentication aborted: Secure popup closed by user.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Connection failure: Check your network interface.');
      } else {
        setError('Authentication failure: Unspecified protocol error.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-bg-base relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-border-dim rounded-2xl shadow-2xl p-8 sm:p-12 space-y-10 relative z-10"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="text-3xl font-extrabold tracking-tighter text-brand flex items-center justify-center gap-3 group">
            <div className="w-10 h-10 bg-brand flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-6 transition-transform shadow-xl shadow-brand/20">
              <span className="text-text-main font-black text-2xl italic tracking-tighter">X</span>
            </div>
            NEOSTOREX
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl font-sans font-black tracking-tighter text-text-main uppercase">Agent Authentication</h1>
            <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest italic leading-relaxed">Secure terminal entry. Access restricted assets.</p>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3"
              >
                <AlertCircle className="text-red-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-tight">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleGoogleLogin}
            className="w-full group flex items-center justify-center space-x-3 bg-white border-2 border-border-dim py-4 rounded-xl hover:border-brand hover:bg-bg-base transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-main group-hover:text-brand transition-colors">Authorize via Google</span>
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-border-dim"></div>
            <span className="flex-shrink-0 px-4 text-[9px] font-black uppercase tracking-widest text-text-muted">OR USE PROTOCOL</span>
            <div className="flex-grow border-t border-border-dim"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 ml-1 text-text-muted">
                  <Mail size={10} />
                  <label className="text-[10px] uppercase font-black">Identity Token (Email)</label>
                </div>
                <input
                  type="email"
                  placeholder="agent@sector.net"
                  className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-4 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <div className="flex items-center space-x-2 text-text-muted">
                    <Key size={10} />
                    <label className="text-[10px] uppercase font-black">Passkey</label>
                  </div>
                  <Link to="#" className="text-[9px] uppercase font-bold text-brand hover:underline">Reset Required</Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-bg-base border border-border-dim rounded-lg px-4 py-4 text-xs focus:ring-1 focus:ring-brand outline-none transition-colors font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-brand/20 hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              <Zap size={14} className="fill-white" />
              <span>Execute Login</span>
            </button>
          </form>
        </div>

        <div className="pt-8 border-t border-border-dim text-center space-y-4">
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest leading-relaxed">
            New Operator? <Link to="/signup" className="text-brand hover:underline">Initialize Registration</Link>
          </p>
          <div className="flex justify-center space-x-6 text-[10px] font-black uppercase tracking-widest text-text-muted/50">
            <span className="hover:text-brand cursor-help">TOS</span>
            <span className="hover:text-brand cursor-help">Privacy Protocol</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
