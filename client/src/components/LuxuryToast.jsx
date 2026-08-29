import React, { useEffect } from 'react';
import { X, Flame, Heart, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '../services/api';

export default function LuxuryToast({ toasts, onCloseToast, onViewCart, onViewWishlist }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => onCloseToast(toast.id)}
          onViewCart={onViewCart}
          onViewWishlist={onViewWishlist}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose, onViewCart, onViewWishlist }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isCart = toast.type === 'cart';
  const isWishlist = toast.type === 'wishlist';

  return (
    <div className="pointer-events-auto bg-[#122822]/95 backdrop-blur-md text-white border-2 border-[#B45309]/80 shadow-2xl p-3.5 relative overflow-hidden animate-slide-in-down transition-all duration-300">
      
      {/* Progress Bar Timer Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#B45309]/30">
        <div className="h-full bg-[#B45309] animate-shrink-width duration-[4000ms] linear" />
      </div>

      <div className="flex items-start gap-3">
        {/* Product Thumbnail */}
        {toast.image ? (
          <img
            src={getImageUrl(toast.image)}
            alt={toast.title}
            className="w-12 h-12 object-cover border border-[#B45309]/50 shrink-0 mt-0.5 shadow-md bg-[#1B3B32]"
          />
        ) : (
          <div className="w-12 h-12 bg-[#1B3B32] border border-[#B45309]/50 flex items-center justify-center shrink-0">
            {isWishlist ? (
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
            ) : (
              <Flame className="w-6 h-6 text-[#FEF3C7]" />
            )}
          </div>
        )}

        {/* Content Details */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#FEF3C7] mb-0.5">
            {isWishlist ? (
              <>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>{toast.status === 'removed' ? 'REMOVED FROM WISHLIST' : 'SAVED TO WISHLIST'}</span>
              </>
            ) : isCart ? (
              <>
                <ShoppingBag className="w-3 h-3 text-[#FEF3C7]" />
                <span>ADDED TO SHOPPING BAG</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>STORE NOTIFICATION</span>
              </>
            )}
          </div>

          <h4 className="font-serif text-xs font-bold text-white truncate leading-snug">
            {toast.title}
          </h4>

          {toast.price && (
            <div className="text-[11px] font-semibold text-[#FEF3C7]">
              ₹{toast.price} {toast.quantity > 1 ? `(Qty: ${toast.quantity})` : ''}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-2 pt-1.5 border-t border-[#B45309]/30 flex items-center justify-between">
            {isCart && (
              <button
                onClick={() => {
                  onClose();
                  if (onViewCart) onViewCart();
                }}
                className="text-[10px] font-bold text-[#FEF3C7] hover:text-white uppercase tracking-wider flex items-center gap-1 group cursor-pointer"
              >
                <span>VIEW SHOPPING BAG</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#B45309]" />
              </button>
            )}

            {isWishlist && (
              <button
                onClick={() => {
                  onClose();
                  if (onViewWishlist) onViewWishlist();
                }}
                className="text-[10px] font-bold text-[#FEF3C7] hover:text-white uppercase tracking-wider flex items-center gap-1 group cursor-pointer"
              >
                <span>VIEW WISHLIST</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#B45309]" />
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white transition-colors p-1 -mr-1 -mt-1"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
