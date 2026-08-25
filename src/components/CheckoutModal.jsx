import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  pricing,
  onOrderSuccess
}) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    address: '42, Sunset Boulevard, Bandra West',
    city: 'Mumbai',
    pincode: '400050'
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const generatedId = `IL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep(3);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-[#E8E3DA] p-4 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {step !== 3 && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#E8E3DA]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B45309] mb-1">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>ILLUMINATION SECURE CHECKOUT</span>
          </div>
          <h2 className="font-serif text-lg sm:text-2xl font-semibold tracking-wider text-[#111827] uppercase">
            {step === 1 && 'SHIPPING DETAILS'}
            {step === 2 && 'PAYMENT OPTION'}
            {step === 3 && 'ORDER CONFIRMED'}
          </h2>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmitShipping} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="font-bold text-[#111827] uppercase tracking-wider block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-[#111827] p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="font-bold text-[#111827] uppercase tracking-wider block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-[#111827] p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none uppercase tracking-wider"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#111827] uppercase tracking-wider block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#FAFAF7] border border-[#111827] p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none uppercase tracking-wider"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="font-bold text-[#111827] uppercase tracking-wider block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-[#111827] p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="font-bold text-[#111827] uppercase tracking-wider block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-[#111827] p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none uppercase tracking-wider"
                />
              </div>
            </div>

            <div className="bg-[#F9F5F0] p-4 border border-[#E8E3DA] text-[#111827] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6">
              <div>
                <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest block">Total Payable</span>
                <span className="text-xl font-bold text-[#111827]">₹{pricing.finalTotal}</span>
              </div>
              <button type="submit" className="btn-kimirica text-xs py-3 px-6 justify-center">
                <span>CONTINUE TO PAYMENT</span>
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280] block">SELECT PAYMENT MODE</label>
              
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-3.5 sm:p-4 border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#1B3B32] bg-[#1B3B32] text-[#FEF3C7]'
                    : 'border-[#E8E3DA] hover:bg-[#FAFAF7] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white text-[#1B3B32] border border-[#B45309] flex items-center justify-center font-bold text-xs shrink-0">
                    UPI
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">INSTANT UPI (GPAY / PHONEPE)</span>
                    <span className="text-[10px] opacity-80 font-normal">Fastest 1-tap checkout</span>
                  </div>
                </div>
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${paymentMethod === 'upi' ? 'border-[#B45309] bg-[#B45309] text-white' : 'border-stone-300'}`}>
                  {paymentMethod === 'upi' && <div className="w-1.5 h-1.5 bg-white" />}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-3.5 sm:p-4 border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#1B3B32] bg-[#1B3B32] text-[#FEF3C7]'
                    : 'border-[#E8E3DA] hover:bg-[#FAFAF7] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white text-[#1B3B32] border border-[#B45309] flex items-center justify-center font-bold text-xs shrink-0">
                    <CreditCard className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">CREDIT / DEBIT CARD</span>
                    <span className="text-[10px] opacity-80 font-normal">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'border-[#B45309] bg-[#B45309] text-white' : 'border-stone-300'}`}>
                  {paymentMethod === 'card' && <div className="w-1.5 h-1.5 bg-white" />}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`w-full p-3.5 sm:p-4 border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#1B3B32] bg-[#1B3B32] text-[#FEF3C7]'
                    : 'border-[#E8E3DA] hover:bg-[#FAFAF7] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white text-[#1B3B32] border border-[#B45309] flex items-center justify-center font-bold text-xs shrink-0">
                    <Truck className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">CASH ON DELIVERY (COD)</span>
                    <span className="text-[10px] opacity-80 font-normal">Pay upon door delivery</span>
                  </div>
                </div>
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${paymentMethod === 'cod' ? 'border-[#B45309] bg-[#B45309] text-white' : 'border-stone-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 bg-white" />}
                </div>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-[#E8E3DA] gap-3">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] uppercase tracking-wider underline text-center sm:text-left"
              >
                ← EDIT ADDRESS
              </button>

              <button
                onClick={handlePlaceOrder}
                className="btn-kimirica text-xs py-3 px-8 shadow-md justify-center"
              >
                <span>PLACE ORDER • ₹{pricing.finalTotal}</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 bg-[#1B3B32] text-[#FEF3C7] border border-[#B45309] mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-[#B45309]" />
            </div>

            <div>
              <span className="text-xs text-[#6B7280] font-mono tracking-widest">ORDER ID: #{orderId}</span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#111827] uppercase mt-1">
                THANK YOU, {formData.name}!
              </h3>
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mt-1 max-w-md mx-auto font-light">
                Your artisanal candles are being hand-poured with care. Confirmation receipt sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-[#FAFAF7] p-4 text-xs text-[#111827] text-left border border-[#E8E3DA] space-y-2">
              <div className="flex justify-between font-bold uppercase tracking-wider pb-2 border-b border-[#E8E3DA]">
                <span>ESTIMATED DELIVERY</span>
                <span className="text-[#B45309]">3-4 BUSINESS DAYS</span>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider block text-[#111827]">SHIPPING ADDRESS:</span>
                <span className="uppercase tracking-wider">{formData.address}, {formData.city} - {formData.pincode}</span>
              </div>
            </div>

            <button onClick={onClose} className="btn-kimirica text-xs py-3 px-8 mx-auto justify-center">
              <span>CONTINUE SHOPPING</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
