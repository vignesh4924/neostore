import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, ChevronDown, LogOut, Home, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cartCount, setIsDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-dim h-16">
      <nav className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-brand flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-6 transition-transform shadow-lg shadow-brand/20">
              <span className="text-text-main font-black text-xl italic tracking-tighter">X</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-brand">NEOSTOREX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <Link to="/" className="hover:text-brand transition-colors duration-200">Home</Link>
            <Link to="/shop" className="hover:text-brand transition-colors duration-200">Inventory</Link>
            <Link to="/deployment-status" className="hover:text-brand transition-colors duration-200">Status</Link>
            <Link to="/help-desk" className="hover:text-brand transition-colors duration-200">Support</Link>
            <Link to="/admin" className="text-brand border border-brand/20 px-2 py-0.5 rounded hover:bg-brand hover:text-text-main transition-all">Terminal</Link>
          </div>

          {/* Search Bar - More Central like Amazon */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors">
                 <Search size={16} strokeWidth={2.5} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search assets, gear, or systems..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-bg-base border border-border-dim rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/50 transition-all placeholder:text-text-muted/40"
               />
               <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand text-text-main px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
                 Search
               </button>
            </form>
          </div>

          {/* Icons & User Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-text-muted hover:text-brand transition-colors"
            >
              <Search size={22} strokeWidth={2} />
            </button>
            
            <div 
              onClick={() => user ? logout() : navigate('/login')}
              className="hidden md:flex flex-col items-start -space-y-1 cursor-pointer group px-2"
            >
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">
                {user ? `Welcome, ${user.displayName?.split(' ')[0] || 'Operative'}` : 'Guest Access'}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-black text-text-main group-hover:text-brand transition-colors">
                  {user ? 'Terminate Session' : 'Authenticate'}
                </span>
                {user ? (
                  <LogOut size={12} className="text-text-muted group-hover:text-brand transition-all" />
                ) : (
                  <ChevronDown size={12} className="text-text-muted group-hover:text-brand transition-all" />
                )}
              </div>
            </div>

            <Link to="/shop" className="relative p-2 text-text-muted hover:text-brand transition-colors hidden sm:block">
              <Heart size={22} strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 rounded-full h-2 w-2 border-2 border-white animate-pulse" />
              )}
            </Link>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-text-muted hover:text-brand transition-colors focus:outline-none"
            >
              <div className="relative group">
                <ShoppingCart size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand text-text-main text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-muted hover:text-brand transition-colors"
            >
              {isMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay (Mobile) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 bg-white border-b border-border-dim px-4 py-4 z-40 lg:hidden"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search gear..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-bg-base border border-border-dim rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand outline-none"
              />
              <button type="submit" className="p-2 text-brand">
                <Search size={20} strokeWidth={2} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border-dim overflow-hidden shadow-lg"
          >
            <div className="px-6 pt-4 pb-8 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-black uppercase tracking-widest text-text-main">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-black uppercase tracking-widest text-text-main">Inventory</Link>
              <div className="pt-2 pb-1 border-t border-border-dim">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Collections</span>
              </div>
              <Link to="/shop?category=Assets" onClick={() => setIsMenuOpen(false)} className="block py-1 text-xs font-bold text-text-main">Assets</Link>
              <Link to="/shop?category=Studio" onClick={() => setIsMenuOpen(false)} className="block py-1 text-xs font-bold text-text-main">Studio</Link>
              <Link to="/shop?category=Apparel" onClick={() => setIsMenuOpen(false)} className="block py-1 text-xs font-bold text-text-main">Apparel</Link>
              <Link to="/shop?category=Shoes" onClick={() => setIsMenuOpen(false)} className="block py-1 text-xs font-bold text-text-main">Shoes</Link>
              <Link to="/shop?category=Watches" onClick={() => setIsMenuOpen(false)} className="block py-1 text-xs font-bold text-text-main">Watches</Link>
              <Link to="/shop?category=Essentials" onClick={() => setIsMenuOpen(false)} className="block py-1 text-xs font-bold text-text-main">Essentials</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-dim px-6 py-3 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link to="/" className="flex flex-col items-center space-y-1 text-text-muted hover:text-brand transition-colors">
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center space-y-1 text-text-muted hover:text-brand transition-colors">
          <Package size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Stock</span>
        </Link>
        <Link to={user ? "/deployment-status" : "/login"} className="flex flex-col items-center space-y-1 text-text-muted hover:text-brand transition-colors">
          <User size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{user ? 'Account' : 'Login'}</span>
        </Link>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center space-y-1 text-text-muted hover:text-brand transition-colors relative"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 translate-x-1/2 -translate-y-1/2 bg-brand text-text-main text-[8px] font-black h-3 w-3 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-tighter">Cart</span>
        </button>
      </div>
    </header>
  );
}
