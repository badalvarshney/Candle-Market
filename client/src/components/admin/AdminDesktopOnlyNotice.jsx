import React, { useState, useEffect } from 'react';
import { Laptop, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AdminDesktopOnlyNotice({ onGoHome }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deviceType = windowWidth < 640 ? 'Mobile Screen' : 'Tablet Screen';

  return (
    <div className="min-h-screen bg-[#122822] text-[#FEF3C7] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
      
      {/* Background Radial Aura */}
      <div className="absolute w-[500px] h-[500px] bg-[#B45309]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Decorative Outer Frame */}
      <div className="absolute inset-4 sm:inset-6 border border-[#B45309]/30 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between text-[9px] text-[#B45309] font-bold uppercase tracking-[0.2em]">
          <span>RESTRICTED ACCESS</span>
          <span>ADMIN STUDIO</span>
        </div>
        <div className="flex justify-between text-[9px] text-[#B45309] font-bold uppercase tracking-[0.2em]">
          <span>DESKTOP DISPLAY ONLY</span>
          <span>GARGI ILLUMINATION</span>
        </div>
      </div>

      {/* Main Notice Card */}
      <div className="relative z-10 max-w-lg w-full bg-[#1B3B32] border-2 border-[#B45309] p-6 sm:p-10 shadow-2xl space-y-6 animate-fade-in">
        
        {/* Animated Laptop Icon with Ring */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#B45309]/40 rounded-full blur-xl animate-pulse" />
          <div className="w-20 h-20 bg-[#122822] border-2 border-[#B45309] rounded-full flex items-center justify-center relative z-10 shadow-xl">
            <Laptop className="w-10 h-10 text-[#FEF3C7] animate-bounce" />
          </div>
        </div>

        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#B45309] block mb-2">
            DESKTOP & LAPTOP REQUIRED
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-white uppercase tracking-wider leading-tight">
            PLEASE OPEN ON A LAPTOP COMPUTER
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light mt-3 leading-relaxed">
            The Admin Control Dashboard is built exclusively for Laptop and Desktop displays to manage inventory tables, multi-column orders, drop timers, and coupon engines.
          </p>
        </div>

        {/* Current Screen Indicator Badge */}
        <div className="bg-[#122822] border border-[#B45309]/50 p-3.5 text-xs text-[#FEF3C7] space-y-1">
          <div className="flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-4 h-4 text-[#B45309]" />
            <span>Mobile / Tablet Screen Detected</span>
          </div>
          <p className="text-[10px] text-stone-400 font-mono">
            Detected: {deviceType} ({windowWidth}px) • Required: Laptop Display (1024px+)
          </p>
        </div>

        {/* Return to Storefront Button */}
        {onGoHome && (
          <div className="pt-2">
            <button
              onClick={onGoHome}
              className="w-full btn-gold justify-center py-3 text-xs shadow-lg uppercase font-bold tracking-widest cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO MAIN STOREFRONT</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
