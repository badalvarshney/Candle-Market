import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export default function UpcomingDropBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  // Calculate dynamic launch date from real current system time
  const now = new Date();
  const launchDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5);
  const monthName = launchDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const launchYear = launchDate.getFullYear();
  const dynamicBadgeText = `COMING SOON • ${monthName} ${launchYear}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#122822] text-white py-12 sm:py-16 border-y border-[#B45309]/50 relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Copy & Countdown Only */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <div className="inline-flex items-center gap-2 bg-[#B45309]/25 text-[#FEF3C7] border border-[#B45309]/50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>EXCLUSIVELY LAUNCHING SOON • LIMITED BATCH DROP</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white uppercase leading-tight">
            ROYAL BOTANICAL ELIXIR COLLECTION
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            Infused with rare Kashmiri Saffron, Damask Velvet Rose, and Smoked Oudh. Hand-poured into 24K gold foil glass vessels with whispering crackle wood wicks. Only 250 handcrafted units will be released.
          </p>

          {/* Countdown Clock Grid */}
          <div className="pt-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#FEF3C7] flex items-center gap-1.5 mb-3">
              <Clock className="w-3.5 h-3.5 text-[#B45309]" />
              <span>VIP LAUNCH COUNTDOWN:</span>
            </label>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
              <div className="bg-[#1B3B32] border border-[#B45309]/40 p-2.5 sm:p-3 text-center shadow-lg">
                <span className="font-serif text-xl sm:text-3xl font-bold text-white block leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#FEF3C7] font-semibold uppercase tracking-wider block mt-1">
                  DAYS
                </span>
              </div>

              <div className="bg-[#1B3B32] border border-[#B45309]/40 p-2.5 sm:p-3 text-center shadow-lg">
                <span className="font-serif text-xl sm:text-3xl font-bold text-white block leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#FEF3C7] font-semibold uppercase tracking-wider block mt-1">
                  HOURS
                </span>
              </div>

              <div className="bg-[#1B3B32] border border-[#B45309]/40 p-2.5 sm:p-3 text-center shadow-lg">
                <span className="font-serif text-xl sm:text-3xl font-bold text-white block leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#FEF3C7] font-semibold uppercase tracking-wider block mt-1">
                  MINS
                </span>
              </div>

              <div className="bg-[#1B3B32] border border-[#B45309]/40 p-2.5 sm:p-3 text-center shadow-lg animate-pulse">
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#FEF3C7] block leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#FEF3C7] font-semibold uppercase tracking-wider block mt-1">
                  SECS
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Product Teaser Photo with Dynamic Launch Badge */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            
            <div className="absolute -top-3 -right-3 z-20 bg-[#B45309] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-xl border border-white/20">
              {dynamicBadgeText}
            </div>

            <img
              src="/candle_smoked_oudh.jpg"
              alt="Upcoming Royal Botanical Elixir Collection"
              className="shadow-2xl object-cover h-80 sm:h-96 w-full border-2 border-[#B45309]/50 transform hover:scale-[1.02] transition-transform"
            />

            <div className="absolute bottom-4 left-4 right-4 bg-[#122822]/90 backdrop-blur-md p-3 border border-[#B45309]/40 text-center">
              <div className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                ILLUMINATION BY GARGI • ROYAL OUDH
              </div>
              <div className="text-[10px] text-[#FEF3C7] font-medium tracking-widest uppercase mt-0.5">
                LIMITED EDITION 250 UNITS ONLY
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
