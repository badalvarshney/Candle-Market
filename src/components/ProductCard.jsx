import React from 'react';
import { Heart, Eye, ShoppingBag, Star, Flame, Sparkles, Check } from 'lucide-react';

export default function ProductCard({
  candle,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isInCart
}) {
  const discountPercent = Math.round(
    ((candle.originalPrice - candle.price) / candle.originalPrice) * 100
  );

  return (
    <div className="kimirica-card overflow-hidden group flex flex-col justify-between relative transition-all duration-300">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {candle.isBestSeller && (
          <span className="bg-[#1B3B32] text-[#F4E8C1] text-[9px] font-bold px-2.5 py-1 uppercase tracking-widest flex items-center gap-1 border border-[#C59B27]/40">
            <Sparkles className="w-3 h-3 text-[#C59B27]" />
            BESTSELLER
          </span>
        )}
        {candle.isNew && (
          <span className="bg-[#C59B27] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-widest">
            NEW ARRIVAL
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#8B3A2B] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest w-fit">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(candle);
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all ${
          isWishlisted
            ? 'bg-rose-600 text-white shadow-sm'
            : 'bg-white/80 hover:bg-white text-[#111827] hover:text-rose-600 shadow-sm border border-[#E8E3DA]'
        }`}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container */}
      <div 
        onClick={() => onQuickView(candle)}
        className="relative h-64 overflow-hidden cursor-pointer bg-[#FAFAF7]"
      >
        <img
          src={candle.image}
          alt={candle.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-[#111827]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(candle);
            }}
            className="bg-white text-[#111827] px-4 py-2 text-xs font-semibold uppercase tracking-wider shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all border border-[#E8E3DA]"
          >
            <Eye className="w-4 h-4 text-[#C59B27]" />
            <span>QUICK VIEW</span>
          </button>
        </div>

        {/* Burn Time Badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/90 text-[#111827] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 flex items-center gap-1 border border-[#E8E3DA]">
          <Flame className="w-3.5 h-3.5 text-[#C59B27] animate-flame-delicate" />
          <span>{candle.burnTime}</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-[#C59B27]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#111827] ml-1">{candle.rating}</span>
            <span className="text-[10px] text-[#6B7280]">({candle.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(candle)}
            className="font-serif text-base font-semibold text-[#111827] hover:text-[#C59B27] transition-colors line-clamp-1 cursor-pointer mb-1 tracking-wider"
          >
            {candle.name}
          </h3>

          {/* Scent Tagline */}
          <p className="text-xs text-[#6B7280] line-clamp-1 mb-3 font-light">
            {candle.tagline}
          </p>

          {/* Scent Notes Preview Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {candle.scentProfile.heart.map((note, idx) => (
              <span key={idx} className="bg-[#F9F5F0] text-[#1B3B32] border border-[#E8E3DA] text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5">
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Price & Add Button */}
        <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#6B7280] line-through">₹{candle.originalPrice}</div>
            <div className="text-base font-bold text-[#111827]">
              ₹{candle.price}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(candle)}
            className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              isInCart
                ? 'bg-[#C59B27] text-white border border-[#C59B27]'
                : 'bg-[#1B3B32] hover:bg-[#122822] text-[#F4E8C1] border border-[#1B3B32]'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>IN BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#F4E8C1]" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
