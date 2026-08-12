import { Link } from 'react-router-dom';
import { getProducts } from '../lib/firestore';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Tag, ArrowRight, Play, Award, Truck, ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 22, seconds: 15 });
  const featuredProducts = products.filter(p => p.featured);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as Product[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              // Reset if zero or just stop
              hours = 4;
              minutes = 22;
              seconds = 15;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-64px)] scroll-smooth overflow-x-hidden">
      {/* Floating Offer Icon */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] hidden md:block"
      >
        <button className="bg-brand text-text-main flex flex-col items-center py-4 px-2 space-y-2 rounded-l-xl shadow-2xl border-l border-y border-white/20 group hover:pr-4 transition-all overflow-hidden group">
          <Tag size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-black [writing-mode:vertical-lr] rotate-180 uppercase tracking-widest">Offers Area</span>
        </button>
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-1 bg-brand z-50 origin-left hidden md:block"
        style={{ scaleX }}
      />

      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-bg-base">
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ 
              y: useTransform(scrollYProgress, [0, 0.2], [0, 100]),
              scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
            }}
            className="w-full h-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://framerusercontent.com/images/3pFXWSSTcYIZeraa3CNLvDPu7uI.mp4" type="video/mp4" />
            </video>
          </motion.div>
          
          {/* Industrial Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-bg-base via-bg-base/90 md:via-bg-base/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-6 md:space-y-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full">
                <div className="h-1.5 w-1.5 bg-brand rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black tracking-[0.2em] text-brand uppercase">Live Deployment Gear</span>
              </div>
              <h1 
                className="text-5xl sm:text-6xl md:text-8xl font-sans font-black text-text-main leading-[0.95] md:leading-[0.9] tracking-tighter uppercase"
              >
                ELEVATED <br className="hidden sm:block" /> <span className="text-brand">EQUIPMENT</span> <br /> FOR MODERN RETAIL.
              </h1>
            </div>
            <p className="text-text-muted text-base md:text-xl font-medium leading-relaxed max-w-lg border-l-2 border-brand/30 pl-4 md:pl-6">
              Authorized distributor of premium technical assets, modular hardware, and high-performance industrial gear.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
              <Link
                to="/shop"
                className="bg-text-main text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.25em] rounded-sm shadow-2xl shadow-text-main/20 hover:bg-brand hover:text-text-main transition-all duration-500 text-center"
              >
                Launch Catalog
              </Link>
              <button 
                onClick={() => document.getElementById('category-spotlight')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center space-x-4 text-text-main uppercase tracking-[0.2em] text-[10px] font-black px-8 py-5 rounded-sm bg-transparent border-2 border-text-main/10 hover:border-brand transition-all group"
              >
                <Play size={16} className="fill-current text-brand group-hover:scale-110 transition-transform" />
                <span>The Manifest</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={() => document.getElementById('category-spotlight')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 hidden md:flex hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>
      </section>

      {/* Mobile Quick Categories - Flickr Style Bubbles */}
      <section className="md:hidden bg-white border-b border-border-dim px-4 py-6 scrollbar-hide overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-6">
          {[
            { name: 'Assets', icon: '📱', slug: 'Assets' },
            { name: 'Studio', icon: '🖥️', slug: 'Studio' },
            { name: 'Apparel', icon: '👕', slug: 'Apparel' },
            { name: 'Shoes', icon: '👟', slug: 'Shoes' },
            { name: 'Watches', icon: '⌚', slug: 'Watches' },
            { name: 'Essentials', icon: '🧴', slug: 'Essentials' },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center flex-shrink-0 group"
            >
              <div className="w-14 h-14 bg-bg-base border border-border-dim rounded-full flex items-center justify-center mb-2 group-active:scale-90 transition-transform shadow-sm">
                <span className="text-xl">{cat.icon}</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter text-text-main">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Brands Marquee */}
      <section className="bg-white py-8 border-b border-border-dim overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted opacity-60">Strategic Partners</span>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap space-x-16 items-center pr-16"
          >
            {['SONY', 'PANASONIC', 'SAMSUNG', 'LG', 'APPLE', 'TEK-CORE', 'NEO-LOGIC', 'OMNI-SYS'].map((brand) => (
              <span key={brand} className="text-xl md:text-4xl font-sans font-black tracking-tighter uppercase text-text-main opacity-30 hover:opacity-100 hover:text-brand transition-all cursor-default">
                {brand}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {['SONY', 'PANASONIC', 'SAMSUNG', 'LG', 'APPLE', 'TEK-CORE', 'NEO-LOGIC', 'OMNI-SYS'].map((brand) => (
              <span key={`${brand}-2`} className="text-xl md:text-4xl font-sans font-black tracking-tighter uppercase text-text-main opacity-30 hover:opacity-100 hover:text-brand transition-all cursor-default">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Deals of the Day - Amazon Style */}
      <section className="py-12 md:py-20 bg-white border-b border-border-dim">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
             <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4">
               <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tighter text-text-main uppercase">Flash Deployments</h2>
               <div className="flex items-center space-x-3 bg-brand/10 px-4 py-2 rounded-full border border-brand/20">
                 <div className="flex space-x-1">
                   <div className="w-1.5 h-1.5 bg-brand rounded-full animate-ping"></div>
                   <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></div>
                 </div>
                 <div className="flex items-center space-x-2 font-mono">
                    <span className="text-xs font-black text-brand tracking-widest uppercase">Ends:</span>
                    <span className="text-sm font-black text-brand">
                      {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
                    </span>
                 </div>
               </div>
             </div>
             <Link to="/shop" className="group flex items-center space-x-3 bg-text-main text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-text-main transition-all shadow-xl shadow-text-main/10">
               <span>Intercept all Deals</span>
               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 12).map((product) => {
                const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 15 + Math.floor(Math.random() * 20);
                return (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="group flex flex-col space-y-3 cursor-pointer"
                  >
                    <div className="aspect-square bg-bg-base border border-border-dim rounded-xl overflow-hidden flex items-center justify-center relative">
                      {product.image.endsWith('.mp4') ? (
                        <video 
                          src={product.image} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      )}
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Up to {discount}% Off
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-black uppercase truncate text-text-main">{product.name}</h4>
                      <div className="flex items-baseline space-x-2">
                         <span className="text-xs font-black text-brand">₹{product.price.toLocaleString('en-IN')}</span>
                         <span className="text-[9px] text-text-muted line-through">₹{(product.originalPrice || product.price * 1.2).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              products.slice(0, 6).map((product) => {
                const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 15 + Math.floor(Math.random() * 20);
                return (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="group flex flex-col space-y-3 cursor-pointer"
                  >
                    <div className="aspect-square bg-bg-base border border-border-dim rounded-xl overflow-hidden flex items-center justify-center relative">
                      {product.image.endsWith('.mp4') ? (
                        <video 
                          src={product.image} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      )}
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Up to {discount}% Off
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-black uppercase truncate text-text-main">{product.name}</h4>
                      <div className="flex items-baseline space-x-2">
                         <span className="text-xs font-black text-brand">₹{product.price.toLocaleString('en-IN')}</span>
                         <span className="text-[9px] text-text-muted line-through">₹{(product.originalPrice || product.price * 1.2).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Category Spotlight */}
      <section id="category-spotlight" className="min-h-[80vh] md:h-screen flex items-center bg-text-main overflow-hidden border-y border-border-dim/10 py-16 md:py-0">
        <div className="max-w-7xl mx-auto px-6 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative aspect-video">
              <motion.video
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2 }}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-xl grayscale"
              >
                <source src="https://framerusercontent.com/assets/XF0oaBiwgGt0IwO78vZEKCB2q7k.mp4" type="video/mp4" />
              </motion.video>
              <div className="absolute inset-0 border-[8px] md:border-[12px] border-white/5 rounded-xl pointer-events-none"></div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <span className="text-brand uppercase tracking-[0.2em] font-black text-[10px]">
                  Next-Gen Logistics
                </span>
                <h2 className="text-3xl md:text-5xl font-sans font-black text-white tracking-tighter leading-[1.1] uppercase">
                  UNCOMPROMISING <br className="hidden md:block" /> <span className="text-brand italic">TECHNICAL WEAR.</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                  Discover our new modular apparel system. Built for adaptability in any environment, using industry-leading materials that resist the elements.
                </p>
              </motion.div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {['Modular Tech', 'Static Guard', 'Vapor-Proof', 'Ultra-Durable'].map((text, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-2 text-slate-100 text-[10px] uppercase tracking-widest font-bold"
                  >
                    <div className="h-1 w-1 bg-brand rounded-full"></div>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/shop?category=Watches"
                className="inline-block bg-white text-text-main px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-brand transition-colors text-center w-full sm:w-auto"
              >
                Explore Chronos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-bg-base overflow-hidden border-b border-border-dim/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-text-main/10 border border-border-dim">
              <motion.div 
                className="flex"
                animate={{ x: `-${(currentSlide % 4) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {[
                  {
                    title: "CHRONOS SYSTEM",
                    subtitle: "NEXT-GEN TIMEPIECES | BEYOND HOROLOGY",
                    image: "https://rukminim1.flixcart.com/fk-p-flap/3200/1560/image/6eab6284b5f89624.png?q=60",
                    cta: "EXPLORE ASSETS",
                    category: "Watches"
                  },
                  {
                    title: "TEK-LAB MODULAR",
                    subtitle: "ADVANCED WORKSTATIONS | OPTIMIZED FOR DATA",
                    image: "https://framerusercontent.com/images/dGRJGLLW8aP09qln5gOo4WADOhk.png?scale-down-to=2048&width=2144&height=1218",
                    cta: "CONFIGURE STUDIO",
                    category: "Studio"
                  },
                  {
                    title: "OMNI-GEAR DEPLOY",
                    subtitle: "FULL-SPECTRUM PROTECTION | ADAPTIVE ARMOR",
                    image: "https://framerusercontent.com/images/tcNcZRFFr6F9GZT9tQRnvKggSeE.png",
                    cta: "VIEW LOADOUT",
                    category: "Essentials"
                  },
                  {
                    title: "APPAREL DEPLOYMENT",
                    subtitle: "MODULAR TECH-WEAR | ENGINEERED FOR MOVEMENT",
                    image: "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/35abbb9b568149d3.png?q=60",
                    cta: "VIEW COLLECTION",
                    category: "Apparel"
                  },
                ].map((banner, index) => (
                  <Link 
                    key={index} 
                    to={`/shop?category=${banner.category}`}
                    className="min-w-full relative h-[300px] md:h-[500px] block group/slide"
                  >
                    {banner.image.endsWith('.mp4') ? (
                      <video 
                        src={banner.image} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover grayscale brightness-50 group-hover/slide:grayscale-0 group-hover/slide:brightness-75 transition-all duration-700"
                      />
                    ) : (
                      <img 
                        src={banner.image} 
                        alt={banner.title}
                        className="w-full h-full object-cover grayscale brightness-50 group-hover/slide:grayscale-0 group-hover/slide:brightness-75 transition-all duration-700"
                      />
                    )}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 space-y-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-2"
                      >
                        <span className="px-3 py-1 border border-brand/50 bg-brand/10 text-brand text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-sm">
                          Related Collection: {banner.category}
                        </span>
                      </motion.div>
                      <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white/80 font-bold text-[10px] md:text-xs uppercase tracking-[0.4em]"
                      >
                        {banner.title}
                      </motion.span>
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-5xl font-sans font-black text-white tracking-widest uppercase leading-tight max-w-3xl"
                      >
                        {banner.subtitle}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div 
                          className="mt-6 inline-block bg-brand text-text-main px-8 py-4 text-[10px] font-black uppercase tracking-widest group-hover/slide:scale-105 transition-transform"
                        >
                          {banner.cta}
                        </div>
                      </motion.div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
            
            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
              {[0, 1, 2, 3].map((i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide % 4 === i ? 'w-10 bg-brand' : 'w-4 bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-bg-base overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-3xl md:text-5xl font-sans font-black mb-16 md:mb-24 text-center tracking-tighter uppercase text-text-main">
            Deployment Zones
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          >
            {[
              { name: 'Apparel', label: 'Apparel', image: 'https://t3.ftcdn.net/jpg/03/31/00/20/240_F_331002038_YaW32xvhQ2er79vA4afGnxK5yMZysb5G.jpg' },
              { name: 'Studio', label: 'Studio', image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=1000' },
              { name: 'Assets', label: 'Assets', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000' },
            ].map((cat, i) => {
              const count = products.filter(p => p.category === cat.name).length;
              return (
                <Link 
                  key={cat.name} 
                  to={`/shop?category=${cat.name}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group h-[350px] md:h-[500px] cursor-pointer rounded-2xl border border-border-dim shadow-2xl overflow-hidden bg-white"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-text-main/90 via-text-main/40 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                      <div className="absolute top-6 right-6">
                        <div className="bg-brand text-text-main px-3 py-1 rounded-full shadow-lg">
                          <span className="text-[10px] font-black tracking-widest uppercase">{count} Units</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <span className="text-brand text-[10px] font-black uppercase tracking-[0.4em]">Sector {i + 1}</span>
                        <h3 className="text-white text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase group-hover:text-brand transition-colors">
                          {cat.label}
                        </h3>
                        <p className="text-slate-300 text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Access Deployment Data
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

