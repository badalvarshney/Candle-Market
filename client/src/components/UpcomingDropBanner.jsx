import React, { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';
import { fetchActiveDropAPI } from '../services/api';

export default function UpcomingDropBanner() {
  const [dropData, setDropData] = useState({
    badgeText: 'EXCLUSIVELY LAUNCHING SOON • LIMITED BATCH DROP',
    title: 'ROYAL BOTANICAL ELIXIR COLLECTION',
    description: 'Infused with rare Kashmiri Saffron, Damask Velvet Rose, and Smoked Oudh. Hand-poured into 24K gold foil glass vessels with whispering crackle wood wicks. Only 250 handcrafted units will be released.',
    totalUnits: 250,
    image: '/candle_smoked_oudh.jpg',
    subtitle: 'ILLUMINATION BY GARGI • ROYAL OUDH',
    launchDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const loadDrop = async () => {
      try {
        const data = await fetchActiveDropAPI();
        if (data) {
          setDropData({
            ...data,
            launchDate: new Date(data.launchDate)
          });
        }
      } catch (err) {
        console.log('Using default drop banner');
      }
    };
    loadDrop();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(dropData.launchDate).getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dropData.launchDate]);

  const targetDateObj = new Date(dropData.launchDate);
  const monthName = targetDateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const launchYear = targetDateObj.getFullYear();
  const dynamicBadgeText = `COMING SOON • ${monthName} ${launchYear}`;

  return (
    <div className="bg-[#122822] text-white py-12 sm:py-16 border-y border-[#B45309]/50 relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Copy & Countdown Only */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <div className="inline-flex items-center gap-2 bg-[#B45309]/25 text-[#FEF3C7] border border-[#B45309]/50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{dropData.badgeText}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white uppercase leading-tight">
            {dropData.title}
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            {dropData.description}
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
              src={dropData.image}
              alt={dropData.title}
              className="shadow-2xl object-cover h-80 sm:h-96 w-full border-2 border-[#B45309]/50 transform hover:scale-[1.02] transition-transform"
            />

            <div className="absolute bottom-4 left-4 right-4 bg-[#122822]/90 backdrop-blur-md p-3 border border-[#B45309]/40 text-center">
              <div className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                {dropData.subtitle || dropData.title}
              </div>
              <div className="text-[10px] text-[#FEF3C7] font-medium tracking-widest uppercase mt-0.5">
                LIMITED EDITION {dropData.totalUnits} UNITS ONLY
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
