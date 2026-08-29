import React, { useState } from 'react';
import { X, Star, Heart, Flame, ShoppingBag, Check } from 'lucide-react';
import { getImageUrl } from '../services/api';

export default function ProductModal({
  candle,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isInCart
}) {
  const [quantity, setQuantity] = useState(1);

  if (!candle) return null;

  const handleAdd = () => {
    onAddToCart(candle, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white overflow-hidden shadow-2xl border border-[#E8E3DA] max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-[#FAFAF7] hover:bg-[#1B3B32] text-[#111827] hover:text-[#FEF3C7] border border-[#E8E3DA] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image */}
        <div className="md:w-1/2 relative bg-[#FAFAF7] h-52 sm:h-64 md:h-auto shrink-0">
          <img
            src={getImageUrl(candle.image)}
            alt={candle.name}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
            <span className="bg-[#1B3B32] text-[#FEF3C7] text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2.5 py-1 flex items-center gap-1 border border-[#B45309]/40">
              <Flame className="w-3.5 h-3.5 text-[#B45309] animate-flame-delicate" />
              {candle.burnTime}
            </span>

            <button
              onClick={() => onToggleWishlist(candle)}
              className={`p-2 transition-all ${
                isWishlisted ? 'bg-rose-600 text-white' : 'bg-white text-[#111827] hover:bg-[#F9F5F0]'
              }`}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Details */}
        <div className="md:w-1/2 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh] flex flex-col justify-between">
          
          <div>
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#F9F5F0] text-[#1B3B32] text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 border border-[#E8E3DA]">
                {candle.waxType}
              </span>
              <span className="text-[11px] text-[#6B7280] uppercase tracking-wider">• {candle.mood}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider text-[#111827] leading-tight mb-2">
              {candle.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#B45309]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#111827]">{candle.rating}</span>
              <span className="text-xs text-[#6B7280]">({candle.reviewsCount} verified reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-[#E8E3DA]">
              <span className="text-xl sm:text-2xl font-bold text-[#111827]">₹{candle.price}</span>
              <span className="text-xs sm:text-sm text-[#6B7280] line-through">₹{candle.originalPrice}</span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#8B3A2B] bg-[#F9F5F0] px-2 py-0.5 uppercase tracking-wider border border-[#E8E3DA]">
                SAVE ₹{candle.originalPrice - candle.price}
              </span>
            </div>

            {/* Scent Pyramid Accord */}
            <div className="bg-[#FAFAF7] p-3.5 mb-4 border border-[#E8E3DA]">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#1B3B32] mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#B45309]" />
                <span>FRAGRANCE PYRAMID</span>
              </h3>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#6B7280] uppercase tracking-wider w-14 shrink-0">TOP:</span>
                  <span className="text-[#111827]">{candle.scentProfile.top.join(', ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#B45309] uppercase tracking-wider w-14 shrink-0">HEART:</span>
                  <span className="text-[#111827] font-semibold">{candle.scentProfile.heart.join(', ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#6B7280] uppercase tracking-wider w-14 shrink-0">BASE:</span>
                  <span className="text-[#111827]">{candle.scentProfile.base.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-white p-2 border border-[#E8E3DA]">
                <span className="text-[#6B7280] block text-[9px] uppercase tracking-widest">WICK TYPE</span>
                <span className="font-semibold text-[#111827] text-[11px]">{candle.wickType}</span>
              </div>
              <div className="bg-white p-2 border border-[#E8E3DA]">
                <span className="text-[#6B7280] block text-[9px] uppercase tracking-widest">VESSEL GLASSWARE</span>
                <span className="font-semibold text-[#111827] text-[11px]">{candle.jarMaterial}</span>
              </div>
            </div>

            <p className="text-[#6B7280] text-xs leading-relaxed mb-4 font-light">
              {candle.description}
            </p>
          </div>

          {/* Quantity & CTA */}
          <div className="pt-4 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            <div className="flex items-center justify-center border border-[#111827] px-3 py-2 bg-[#FAFAF7]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center font-bold text-[#111827]"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#111827]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-[#111827]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 btn-kimirica justify-center py-3.5"
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4 text-[#FEF3C7]" />
                  <span>UPDATE BAG ({quantity})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#FEF3C7]" />
                  <span>ADD TO BAG • ₹{candle.price * quantity}</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
