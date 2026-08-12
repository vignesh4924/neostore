import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../lib/firestore';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, Truck, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [maxPrice, setMaxPrice] = useState(2000000);

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

  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (categoryParam) {
      result = result.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
    }

    if (searchParam) {
      const term = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    result = result.filter(p => p.price <= maxPrice);

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, categoryParam, searchParam, sortBy, maxPrice]);

  const categories = Array.from(new Set(products.map(p => p.category))) as string[];

  return (
    <div className="bg-bg-base min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Header Section */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-[2px] bg-brand animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-brand">Inventory Access</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tighter uppercase leading-none">
                Vault <span className="text-text-muted">Archives</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center p-1 bg-white border border-border-dim rounded-lg">
                <button 
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded-md transition-all ${layout === 'grid' ? 'bg-bg-base text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setLayout('list')}
                  className={`p-2 rounded-md transition-all ${layout === 'list' ? 'bg-bg-base text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                >
                  <List size={18} />
                </button>
              </div>
              
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-white border border-border-dim rounded-xl hover:border-brand transition-all"
              >
                <SlidersHorizontal size={18} className="text-brand" />
                <span className="text-[10px] font-black uppercase tracking-widest">Tactical Filters</span>
              </button>

              <div className="relative group hidden sm:block">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-border-dim rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-brand cursor-pointer min-w-[180px] transition-all"
                >
                  <option value="newest">System Default</option>
                  <option value="price-low">Value: Ascension</option>
                  <option value="price-high">Value: Peak</option>
                  <option value="rating">Execution Grade</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-brand transition-colors" />
              </div>
            </div>
          </div>

          {/* Active Filters Bar */}
          {(categoryParam || searchParam) && (
            <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-border-dim rounded-xl">
              <span className="text-[9px] font-black uppercase tracking-widest text-text-muted px-3">Active Filters:</span>
              {categoryParam && (
                <button 
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('category');
                    setSearchParams(newParams);
                  }}
                  className="px-3 py-1.5 bg-bg-base text-[9px] font-black uppercase tracking-widest border border-border-dim rounded-lg hover:border-brand transition-all"
                >
                  Asset: {categoryParam} <span className="ml-1 text-brand">×</span>
                </button>
              )}
              {searchParam && (
                <button 
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  className="px-3 py-1.5 bg-bg-base text-[9px] font-black uppercase tracking-widest border border-border-dim rounded-lg hover:border-brand transition-all"
                >
                  Query: {searchParam} <span className="ml-1 text-brand">×</span>
                </button>
              )}
              <button 
                onClick={() => setSearchParams({})}
                className="ml-auto text-[9px] font-black uppercase tracking-widest text-brand hover:underline px-3"
              >
                Clear All Protocols
              </button>
            </div>
          )}
        </div>

        {/* Tactical Trust Marquee */}
        <section className="mb-12 bg-white py-6 border-y border-border-dim overflow-hidden rounded-2xl">
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

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex lg:w-64 flex-shrink-0 flex-col space-y-10 bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none border lg:border-0 border-border-dim shadow-xl lg:shadow-none`}>
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted border-b border-border-dim pb-3">Collections</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.delete('category');
                      setSearchParams(newParams);
                    }}
                    className={`text-xs font-bold transition-all flex items-center group w-full ${!categoryParam ? 'text-brand translate-x-1' : 'text-text-muted hover:text-text-main'}`}
                  >
                    <div className={`w-1 h-1 rounded-full bg-brand mr-2 transition-all ${!categoryParam ? 'opacity-100' : 'opacity-0'}`}></div>
                    ALL ARCHIVES
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSearchParams({ category: cat })}
                      className={`text-xs font-bold transition-all flex items-center group w-full uppercase ${categoryParam === cat ? 'text-brand translate-x-1' : 'text-text-muted hover:text-text-main'}`}
                    >
                      <div className={`w-1 h-1 rounded-full bg-brand mr-2 transition-all ${categoryParam === cat ? 'opacity-100' : 'opacity-0'}`}></div>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-border-dim pb-3">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted">Price Spectrum</h3>
                <span className="text-[10px] font-black text-brand">UP TO ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="space-y-4 px-1">
                <input 
                  type="range" 
                  min="0"
                  max="2000000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1 bg-border-dim appearance-none cursor-pointer accent-brand rounded-full"
                />
                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-text-muted">
                  <span>₹0</span>
                  <span>₹2,000,000+</span>
                </div>
              </div>
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
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-[4/5] bg-white border border-border-dim rounded-xl p-3 animate-pulse">
                    <div className="bg-bg-base w-full h-2/3 rounded-lg mb-4"></div>
                    <div className="h-4 bg-bg-base rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-bg-base rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-4 md:gap-6 ${layout === 'grid' ? 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-24 text-center space-y-4 bg-white rounded-2xl border border-border-dim">
                <div className="mx-auto w-16 h-16 rounded-full bg-bg-base flex items-center justify-center border border-border-dim">
                  <Award size={32} className="text-text-muted opacity-20" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Zero Assets Found</h3>
                  <p className="text-xs text-text-muted max-w-xs mx-auto">The requested archive parameters yield no matches. Adjust tactical filters.</p>
                </div>
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setMaxPrice(2000000);
                  }}
                  className="mt-4 px-6 py-3 bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-all"
                >
                  Reset All Protocols
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
