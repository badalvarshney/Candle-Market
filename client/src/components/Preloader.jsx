import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Progress bar increment over ~4.5s (2x duration)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Start fade out at 4.6s
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 4600);

    // Finish preloader at 5.2s
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5200);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#122822] text-[#FEF3C7] flex flex-col items-center justify-center p-6 transition-all duration-700 ${isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
    >
      {/* Background Subtle Radial Amber Aura */}
      <div className="absolute w-[500px] h-[500px] bg-[#B45309]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Decorative Outer Border Frame */}
      <div className="absolute inset-4 sm:inset-8 border border-[#B45309]/40 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between text-[9px] sm:text-[10px] text-[#B45309] font-bold uppercase tracking-[0.2em]">
          <span>EST. 2026</span>
          <span>BOTANICAL STUDIO</span>
        </div>
        <div className="flex justify-between text-[9px] sm:text-[10px] text-[#B45309] font-bold uppercase tracking-[0.2em]">
          <span>ORGANIC SOY WAX</span>
          <span>HAND-POURED IN INDIA</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm animate-fade-in">

        {/* Pulsing Glowing Candle Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1B3B32] border-2 border-[#B45309] flex items-center justify-center shadow-[0_0_35px_rgba(180,83,9,0.6)]">
            <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-[#FEF3C7] animate-pulse" />
          </div>
          {/* Flame Halo Rings */}
          <div className="absolute -inset-2 rounded-full border border-[#FEF3C7]/30 animate-ping pointer-events-none" />
        </div>

        {/* Brand Title */}
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-[0.22em] text-white uppercase mb-1 drop-shadow-md">
          ILLUMINATION
        </h1>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#B45309] mb-8">
          BY GARGI • LUXURY BOTANICAL CANDLES
        </span>

        {/* Minimalist Gold Line Progress Bar */}
        <div className="w-52 sm:w-64 bg-[#1B3B32] h-1 rounded-full overflow-hidden border border-[#B45309]/50 relative mb-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-[#B45309] via-[#F4E8C1] to-[#B45309] h-full transition-all duration-75 ease-out shadow-[0_0_12px_#FEF3C7]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-[10px] font-mono tracking-widest text-stone-300">
          CREATING AMBIANCE... {progress}%
        </span>
      </div>
    </div>
  );
}
