import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck, Check } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const freeShippingThreshold = 999;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.toUpperCase();
    if (code === 'ILLUMINATE10' || code === 'KIMIRICA10' || code === 'CANDLE10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try ILLUMINATE10 for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E8E3DA]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#E8E3DA] bg-[#FAFAF7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B45309]" />
              <h2 className="font-serif text-base sm:text-lg font-semibold tracking-wider text-[#111827] uppercase">SHOPPING BAG</h2>
              <span className="bg-[#1B3B32] text-[#FEF3C7] font-bold text-xs px-2.5 py-0.5 border border-[#B45309]/40">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Ribbon */}
          <div className="bg-[#F9F5F0] p-3.5 sm:p-4 border-b border-[#E8E3DA]">
            <div className="flex justify-between text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5">
              <span className="text-[#1B3B32] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                {subtotal >= freeShippingThreshold
                  ? 'FREE EXPRESS SHIPPING UNLOCKED'
                  : `ADD ₹${freeShippingThreshold - subtotal} MORE FOR FREE SHIPPING`}
              </span>
              <span className="text-[#B45309] font-bold">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E3DA] overflow-hidden">
              <div
                className="h-full bg-[#1B3B32] transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <ShoppingBag className="w-16 h-16 mx-auto mb-3 text-stone-300" />
                <p className="font-serif text-base font-semibold uppercase tracking-wider text-[#111827]">Your Shopping Bag is Empty</p>
                <p className="text-xs text-[#6B7280] mt-1 font-light uppercase tracking-wider">Explore our candles to elevate your home atmosphere.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-3 p-3 bg-[#FAFAF7] border border-[#E8E3DA] items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#111827] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-[#B45309] font-semibold uppercase tracking-wider block">
                        {item.waxType || 'Soy Wax'} • {item.burnTime}
                      </span>
                      <div className="text-xs font-bold text-[#111827] mt-0.5">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E3DA]">
                    <div className="flex items-center border border-[#111827] bg-white px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-[#111827] hover:text-[#B45309] text-xs px-1.5 font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-[#111827] hover:text-[#B45309] text-xs px-1.5 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#E8E3DA] bg-[#FAFAF7] space-y-3.5">
              
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1 min-w-0">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="PROMO CODE (ILLUMINATE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 text-xs bg-white border border-[#111827] focus:outline-none focus:border-[#B45309] uppercase tracking-wider font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#111827] hover:bg-[#1B3B32] text-white text-xs font-semibold uppercase tracking-wider px-3.5 py-2 transition-colors shrink-0"
                >
                  APPLY
                </button>
              </form>

              {couponApplied && (
                <div className="text-[10px] text-[#1B3B32] font-semibold flex items-center gap-1 bg-[#F9F5F0] p-2 border border-[#E8E3DA] uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>PROMO CODE ILLUMINATE10 APPLIED (10% OFF)!</span>
                </div>
              )}

              {couponError && (
                <div className="text-[10px] text-rose-600 font-semibold uppercase tracking-wider">
                  {couponError}
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span className="uppercase tracking-wider">Subtotal</span>
                  <span className="font-semibold text-[#111827]">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#1B3B32]">
                    <span className="uppercase tracking-wider">Discount (10%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="uppercase tracking-wider">Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#1B3B32] uppercase">FREE</strong> : `₹${shippingCost}`}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#111827] pt-2 border-t border-[#E8E3DA] uppercase tracking-wider">
                  <span>Total Payable</span>
                  <span className="text-[#B45309]">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout({ subtotal, discountAmount, shippingCost, finalTotal });
                }}
                className="w-full btn-kimirica justify-center py-3.5 text-xs shadow-md"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[9px] text-stone-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
