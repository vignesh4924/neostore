import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Eye, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white border border-border-dim rounded-xl p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 transition-shadow hover:shadow-xl cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-white rounded-lg flex items-center justify-center">
        {/* Media (Image or Video) */}
        {product.image.endsWith('.mp4') ? (
          <video
            src={product.image}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full z-20 backdrop-blur-md border border-white/20 transition-all ${
            isFavorited ? 'bg-red-500 text-white' : 'bg-black/5 text-text-muted hover:bg-black/10'
          }`}
        >
          <Heart size={14} fill={isFavorited ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>

        {/* Labels */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-brand text-white px-2 py-0.5 text-[10px] font-bold rounded-md">
              FEATURED
            </span>
          )}
          {product.stock === 0 ? (
            <span className="bg-red-500 text-white px-2 py-0.5 text-[10px] font-bold rounded-md uppercase">
              Out of Stock
            </span>
          ) : product.stock < 5 && (
            <span className="bg-red-100 text-red-500 px-2 py-0.5 text-[10px] font-bold rounded-md uppercase">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>

        <div className="flex flex-col gap-1 sm:gap-1.5 flex-grow">
        <div className="flex flex-col">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-text-main truncate group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter italic">
            {product.category}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-green-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center space-x-1">
            <span>{product.rating}</span>
            <ShoppingCart size={8} className="fill-current" />
          </div>
          <span className="text-[10px] font-bold text-text-muted">({product.reviews >= 1000 ? `${(product.reviews / 1000).toFixed(1)}k` : product.reviews})</span>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col -space-y-1">
             <span className="text-sm sm:text-base font-black text-brand">₹{product.price.toLocaleString('en-IN')}</span>
             <div className="flex items-center gap-2">
               <span className="text-[10px] text-text-muted line-through opacity-60">₹{(product.originalPrice || product.price * 1.25).toLocaleString('en-IN')}</span>
               <span className="text-[10px] text-green-600 font-bold uppercase">{product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20}% off</span>
             </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (product.stock > 0) addToCart(product);
            }}
            disabled={product.stock === 0}
            className={`p-2 rounded-xl transition-all active:scale-95 z-10 ${
              product.stock === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-bg-base border border-border-dim text-text-main hover:bg-brand hover:text-white hover:border-brand shadow-sm'
            }`}
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
