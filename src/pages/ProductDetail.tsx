import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../lib/firestore';
import { useCart } from '../context/CartContext';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Truck, ShieldCheck, Minus, Plus, Heart, Share2, ChevronRight, ShoppingBag, BadgePercent, Zap, RefreshCcw, HandCoins, ShoppingCart, Search, Award } from 'lucide-react';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const detailsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const prod = await getProductById(id);
        const others = await getProducts();
        setProduct(prod as Product);
        setAllProducts(others as Product[]);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveIndex(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  const scrollToDetails = () => {
    setActiveTab('details');
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Fetching Asset Data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
        <h2 className="text-4xl font-serif">Product Not Found</h2>
        <Link to="/shop" className="inline-block bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black">
          Back to Shop
        </Link>
      </div>
    );
  }

  const galleryImages = product.images || [product.image];
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-text-muted mb-12">
        <Link to="/" className="hover:text-brand">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-brand">Inventory</Link>
        <ChevronRight size={10} />
        <span className="text-text-main">Asset {id}</span>
      </nav>

      {/* Tactical Trust Marquee */}
      <section className="mb-16 bg-white py-6 border-y border-border-dim overflow-hidden rounded-2xl">
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap space-x-20 items-center pr-20"
          >
            {[1, 2, 3].map((group) => (
              <div key={group} className="flex space-x-20 items-center">
                <div className="flex items-center space-x-4">
                  <Truck size={18} className="text-brand" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-main">Global Logistics Deployment</span>
                </div>
                <div className="flex items-center space-x-4">
                  <ShieldCheck size={18} className="text-brand" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-main">Encrypted Asset Protection</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Award size={18} className="text-brand" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-main">Vetted Industrial Standards</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Image Gallery - Sticky Position */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="relative aspect-[4/5] bg-white rounded-sm overflow-hidden border border-border-dim group bg-gray-50 shadow-2xl transition-shadow hover:shadow-brand/10 cursor-crosshair">
            {/* Main Slider Area */}
            <div className="w-full h-full flex overflow-hidden">
              <motion.div 
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex w-full h-full"
              >
                {galleryImages.map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-full h-full flex items-center justify-center relative">
                    {img.endsWith('.mp4') ? (
                      <video
                        src={img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full group/zoom">
                        <img
                          src={img}
                          alt={`${product.name} view ${i + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/zoom:scale-[1.8] origin-center"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                          }}
                        />
                         <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                           <Search size={14} />
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 border border-border-dim rounded-full shadow-lg hover:bg-brand hover:text-white transition-all z-10 ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <ChevronRight className="rotate-180" size={20} />
                </button>
                <button 
                  onClick={() => setActiveIndex(prev => Math.min(galleryImages.length - 1, prev + 1))}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 border border-border-dim rounded-full shadow-lg hover:bg-brand hover:text-white transition-all z-10 ${activeIndex === galleryImages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {galleryImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 transition-all rounded-full ${activeIndex === i ? 'w-6 bg-brand' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-3">
             {galleryImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveIndex(i)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer transition-all border flex items-center justify-center ${activeIndex === i ? 'border-brand ring-2 ring-brand/20' : 'border-border-dim hover:border-brand/40 shadow-sm'}`}
                >
                   {img.endsWith('.mp4') ? (
                     <video src={img} muted className={`w-full h-full object-cover ${activeIndex === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`} />
                   ) : (
                     <img 
                       src={img} 
                       alt={`${product.name} thumbnail ${i + 1}`} 
                       referrerPolicy="no-referrer" 
                       className={`w-full h-full object-cover ${activeIndex === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`} 
                     />
                   )}
                </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brand text-[10px] uppercase tracking-[0.2em] font-black bg-brand/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-text-main uppercase leading-tight">
              {product.name}
            </h1>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center space-x-1">
                  <span>{product.rating}</span>
                  <Zap size={8} className="fill-current" />
                </div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">({product.reviews.toLocaleString()} Deployments)</span>
              </div>
              <div className="flex items-baseline space-x-3">
                <p className="text-3xl md:text-4xl font-sans font-black text-brand">₹{product.price.toLocaleString('en-IN')}</p>
                {product.originalPrice && (
                  <p className="text-lg text-text-muted line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
                )}
                <p className="text-sm font-black text-green-600">
                  {discount || 15}% OFF 
                  <span className="text-[9px] text-text-muted ml-2 font-bold uppercase tracking-tighter">(Legacy Status Price)</span>
                </p>
              </div>
            </div>

            {product.detailImages && product.detailImages.length > 0 && (
              <button 
                onClick={scrollToDetails}
                className="group flex items-center space-x-2 bg-brand/5 hover:bg-brand/10 text-brand px-3 py-1.5 rounded-full transition-all border border-brand/20 active:scale-95 w-fit"
              >
                <div className="bg-brand rounded-full p-1 group-hover:rotate-12 transition-transform shadow-lg shadow-brand/20">
                  <Zap size={10} className="text-white fill-current" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-black">Open Tech Schematics</span>
                <ChevronRight size={12} className="opacity-50 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="space-y-4 pt-10 border-t border-border-dim border-dashed">
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-white border border-border-dim flex items-center justify-center group-hover:border-brand transition-colors">
                <Truck size={14} className="text-text-muted group-hover:text-brand" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-tighter text-text-main">Global Logistics</span>
                <span className="text-[8px] font-medium text-text-muted">Expedited Deployment</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-white border border-border-dim flex items-center justify-center group-hover:border-brand transition-colors">
                <ShieldCheck size={14} className="text-text-muted group-hover:text-brand" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-tighter text-text-main">Protocol Shield</span>
                <span className="text-[8px] font-medium text-text-muted">2-Year Integrity Warranty</span>
              </div>
            </div>
          </div>

          {/* Flipkart-style Bank Offers */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-text-main flex items-center">
              <BadgePercent size={14} className="mr-2 text-brand" /> Exclusive Rewards & Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'NEO-CARD Offer', desc: 'Flat ₹2000 off on first deployment cycle.' },
                { title: 'Bank of Matrix', desc: '10% Instant Discount on System Upgrades.' },
                { title: 'No Cost EMI', desc: 'Available for 6-12 standard cycles.' },
                { title: 'Exchange Bonus', desc: 'Up to ₹5000 off on legacy gear trade.' },
              ].map((offer, i) => (
                <div key={i} className="p-4 border border-border-dim rounded-xl bg-bg-base/30 hover:border-brand/40 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap size={10} className="text-brand fill-brand" />
                    <span className="text-[9px] font-black text-text-main uppercase tracking-widest">{offer.title}</span>
                  </div>
                  <p className="text-[10px] font-medium text-text-muted group-hover:text-text-main transition-colors">{offer.desc}</p>
                </div>
              ))}
            </div>
            <button className="text-[9px] font-black text-brand uppercase tracking-widest hover:underline">+ View 12 more offers</button>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-text-main">Chassis & Core Specs</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 bg-white p-6 border border-border-dim rounded-2xl">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start text-xs font-bold text-text-muted">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full mr-3 mt-1.5 flex-shrink-0" />
                    <span className="leading-tight">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-text-muted text-sm font-medium leading-relaxed max-w-lg italic">
            "{product.description}"
          </p>

          {/* Services/Policies */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border-dim">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 bg-brand/5 rounded-full text-brand">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-text-main">Warranty</p>
                <p className="text-[9px] font-bold text-text-muted">{product.warranty?.split(' ').slice(0, 2).join(' ') || '1 Year'}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 bg-brand/5 rounded-full text-brand">
                <RefreshCcw size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-text-main">Replacement</p>
                <p className="text-[9px] font-bold text-text-muted">{product.replacement || '7 Days'}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 bg-brand/5 rounded-full text-brand">
                <HandCoins size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-text-main">Payment</p>
                <p className="text-[9px] font-bold text-text-muted">{product.cod ? 'COD Available' : 'Digital Only'}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 bg-brand/5 rounded-full text-brand">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-text-main">Delivery</p>
                <p className="text-[9px] font-bold text-text-muted">Free Shipping</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
          </div>

          <div className="space-y-8 pt-6">
            {/* Pin Code Check */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-widest font-black text-text-main">Deployment Feasibility</h3>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Enter Pin Code"
                  className="bg-bg-base/50 border border-border-dim rounded-lg px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 w-40"
                  maxLength={6}
                />
                <button className="text-[10px] uppercase font-black text-brand px-4 py-2.5 border border-brand/20 rounded-lg hover:bg-brand/5 transition-all">
                  Check
                </button>
              </div>
              <p className="text-[9px] text-text-muted font-bold flex items-center">
                <Truck size={12} className="mr-2" /> Usually delivered in 3-5 standard deployment cycles.
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-widest font-black text-text-main">Deployment Units</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-border-dim rounded-lg bg-bg-base overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-xs font-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p className="text-[10px] uppercase font-bold text-text-muted italic">
                  {product.stock > 0 ? `Inventory: ${product.stock} units legacy status` : 'Depleted Status - Resupply Pending'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
                className={`flex-1 text-xs font-black uppercase tracking-[0.2em] py-5 rounded-xl transition-all flex items-center justify-center space-x-3 ${
                  product.stock === 0 
                    ? 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed' 
                    : 'bg-white text-brand border-2 border-brand hover:bg-brand/5 active:scale-[0.98]'
                }`}
              >
                <ShoppingCart size={18} strokeWidth={2.5} />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={() => {
                  if (product.stock > 0) {
                    addToCart(product, quantity);
                    setIsDrawerOpen(false);
                    navigate('/checkout');
                  }
                }}
                disabled={product.stock === 0}
                className={`flex-1 text-xs font-black uppercase tracking-[0.2em] py-5 rounded-xl shadow-xl transition-all flex items-center justify-center space-x-3 ${
                  product.stock === 0 
                    ? 'bg-gray-300 text-gray-500 shadow-none cursor-not-allowed' 
                    : 'bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <ShoppingBag size={18} strokeWidth={2.5} />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Buy Now'}</span>
              </button>
              <div className="flex gap-2">
                <button className="p-5 border border-border-dim rounded-xl hover:bg-bg-base transition-colors group">
                  <Heart size={20} className="text-text-muted group-hover:text-red-500 transition-colors" />
                </button>
                <button className="p-5 border border-border-dim rounded-xl hover:bg-bg-base transition-colors group">
                  <Share2 size={20} className="text-text-muted group-hover:text-brand transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-border-dim">
            {product.warranty && (
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-bg-base/30 border border-border-dim/50">
                <ShieldCheck size={20} className="text-brand" />
                <span className="text-[9px] font-black uppercase tracking-tighter leading-tight max-w-[80px]">{product.warranty}</span>
              </div>
            )}
            {product.replacement && (
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-bg-base/30 border border-border-dim/50">
                <RefreshCcw size={20} className="text-brand" />
                <span className="text-[9px] font-black uppercase tracking-tighter leading-tight max-w-[80px]">{product.replacement}</span>
              </div>
            )}
            {product.cod && (
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-bg-base/30 border border-border-dim/50">
                <HandCoins size={20} className="text-brand" />
                <span className="text-[9px] font-black uppercase tracking-tighter leading-tight max-w-[80px]">COD Available</span>
              </div>
            )}
            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-bg-base/30 border border-border-dim/50">
              <Truck size={20} className="text-brand" />
              <span className="text-[9px] font-black uppercase tracking-tighter leading-tight max-w-[80px]">Free Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-24 border-t border-border-dim pt-20">
        <div className="flex justify-center space-x-12 mb-16 uppercase text-[11px] font-black tracking-[0.2em] text-text-muted">
          {['details', 'logistics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 transition-all ${activeTab === tab ? 'border-brand text-text-main' : 'border-transparent hover:text-text-main'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div ref={detailsRef} className="max-w-3xl mx-auto text-center">
            {activeTab === 'details' && (
             <div className="space-y-12">
                <div className="space-y-8">
                  <h3 className="text-2xl font-sans font-black uppercase tracking-tighter text-left">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border-t border-border-dim pt-6">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-3 border-b border-border-dim/30">
                          <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">{key}</span>
                          <span className="text-xs font-black text-text-main">{value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-text-muted leading-loose italic col-span-full text-center">
                        Standard issue {product.category.toLowerCase()} asset designed for high-performance operational environments. Every component is rigorously tested for reliability and long-term durability.
                      </p>
                    )}
                  </div>
                </div>
                
                {product.detailImages && product.detailImages.length > 0 && (
                  <div className="space-y-12 pt-12 border-t border-border-dim/50">
                    <div className="flex items-center justify-center space-x-4 mb-16">
                      <div className="h-px bg-brand/20 flex-1"></div>
                      <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-brand flex items-center px-4">
                        <Zap size={14} className="mr-3 fill-brand animate-pulse" />
                        Technological Narrative
                      </h3>
                      <div className="h-px bg-brand/20 flex-1"></div>
                    </div>
                    
                    <div className="space-y-0">
                      {product.detailImages.map((img, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="relative"
                        >
                          <img 
                            src={img} 
                            alt={`System Analysis ${i + 1}`} 
                            className="w-full h-auto block"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
             </div>
           )}
           {activeTab === 'logistics' && (
             <div className="space-y-6">
                <h3 className="text-2xl font-sans font-black uppercase tracking-tighter">Logistics Protocol</h3>
                <p className="text-text-muted leading-loose italic">
                  Deployment managed by decentralized network protocols. Estimated arrival within 48-72 hours post-verification. All assets are tracked via encrypted real-time telemetry.
                </p>
             </div>
           )}
        </div>
      </div>

      {/* Suggested Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <div className="flex justify-between items-end mb-12 border-b border-border-dim pb-6">
            <div className="space-y-1">
              <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold">Related Assets</span>
              <h2 className="text-3xl font-sans font-black tracking-tighter uppercase text-text-main">Complete the Loadout</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section - Marketplace Style */}
      <section className="mt-32 border-t border-border-dim pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-sans font-black tracking-tighter uppercase text-text-main">Operative Feedback</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Zap key={star} size={18} className={star <= Math.round(product.rating) ? "text-brand fill-brand" : "text-border-dim"} />
                  ))}
                </div>
                <span className="text-xl font-black text-text-main">{product.rating} out of 5</span>
              </div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Based on {product.reviews.toLocaleString()} verified deployments</p>
            </div>
            <button className="bg-text-main text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-brand hover:text-text-main transition-all">
              Submit Log Report
            </button>
          </div>

          <div className="space-y-12">
            {[
              { author: "Kaelen V.", date: "2 cycles ago", rating: 5, comment: "The modular interface is flawlessly integrated. Deployed this for a high-intensity studio shoot and the data throughput was exceptional.", verified: true },
              { author: "Jaya R.", date: "5 cycles ago", rating: 4, comment: "Sturdy build. The haptic feedback on the controls could be slightly more pronounced, but overall a top-tier asset.", verified: true },
              { author: "Marcus T.", date: "12 cycles ago", rating: 5, comment: "Exceeded all baseline expectations. The aesthetic fits perfectly with my existing matrix setup. Global logistics was fast too.", verified: true },
            ].map((review, i) => (
              <div key={i} className="space-y-4 border-b border-border-dim pb-12 last:border-0 hover:bg-bg-base/20 transition-colors p-4 -mx-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-full flex items-center justify-center text-brand font-black text-xs">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-text-main uppercase tracking-widest">{review.author}</p>
                      <p className="text-[10px] font-bold text-text-muted">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <ShieldCheck size={12} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Verified Operative</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Zap key={star} size={12} className={star <= review.rating ? "text-brand fill-brand" : "text-border-dim"} />
                  ))}
                </div>
                <p className="text-sm font-medium text-text-muted leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-12 py-6 border-2 border-dashed border-border-dim rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-brand hover:border-brand/40 transition-all">
            Load More Encrypted Logs
          </button>
        </div>
      </section>
    </div>
  );
}
