import React, { useState } from 'react';
import { Flame, Send, Heart, Phone, MapPin } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenScentLab, onOpenQuiz }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#122822] text-stone-300 pt-16 pb-8 border-t border-[#B45309]/40">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Newsletter Banner */}
        <div className="bg-[#1B3B32] border border-[#B45309]/50 p-8 mb-16 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-[#FEF3C7] text-xs font-bold uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 text-[#B45309]" />
              <span>JOIN THE ILLUMINATION CLUB</span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white uppercase tracking-wider mb-2">
              GET 15% OFF YOUR FIRST ORDER
            </h3>

            <p className="text-stone-300 text-xs mb-6 font-light uppercase tracking-wider">
              Receive secret seasonal drops, candle care guides, and exclusive discount codes.
            </p>

            {subscribed ? (
              <div className="bg-[#B45309]/30 border border-[#B45309] text-[#FEF3C7] p-3 text-xs font-bold uppercase tracking-wider">
                THANK YOU FOR SUBSCRIBING! CHECK YOUR EMAIL FOR YOUR 15% CODE.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#122822] border border-[#B45309]/50 px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#B45309] uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="btn-gold py-3 px-6 text-xs font-bold justify-center"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10 text-xs uppercase tracking-wider">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B45309] text-white flex items-center justify-center border border-[#FEF3C7]/40">
                <Flame className="w-5 h-5 animate-flame-delicate" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white block leading-none">
                  ILLUMINATION
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#FEF3C7] font-bold block mt-1">
                  BY GARGI
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-light normal-case">
              Artisanal hand-poured 100% organic soy and coconut candles crafted for quiet warmth, serene ambiance, and pure botanical light.
            </p>

            <div className="space-y-1.5 text-stone-400 normal-case">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Studio 4B, Artisan District, Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B45309]" />
                <span>+91 98765 43210 (Mon-Sat 10AM - 7PM)</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold tracking-widest text-[#FEF3C7] text-xs mb-3">COLLECTIONS</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#FEF3C7] transition-colors">
                  Aromatherapy Candles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#FEF3C7] transition-colors">
                  Crackle Wood Wicks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#FEF3C7] transition-colors">
                  Luxury Amber Glass
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#FEF3C7] transition-colors">
                  Curated Gift Sets
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold tracking-widest text-[#FEF3C7] text-xs mb-3">STUDIO WORKSHOP</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => { setActiveTab('quiz'); onOpenQuiz(); }} className="hover:text-[#FEF3C7] transition-colors font-bold text-[#FEF3C7]">
                  Scent Finder Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#FEF3C7] transition-colors">
                  Botanical Wax Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#FEF3C7] transition-colors">
                  Candle Care & Wick Trimming
                </button>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="font-bold tracking-widest text-[#FEF3C7] text-xs mb-3">CUSTOMER CARE</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#" className="hover:text-[#FEF3C7] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[#FEF3C7] transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-[#FEF3C7] transition-colors">Returns & Guarantee</a></li>
              <li><a href="#" className="hover:text-[#FEF3C7] transition-colors">Corporate Gifting</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-400 gap-4 uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <span>© 2026 Illumination by Gargi. All Rights Reserved. Crafted for candle lovers.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 font-bold">
            <span>UPI</span>
            <span>GOOGLE PAY</span>
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
