import React from 'react';
import { Sparkles, Star } from 'lucide-react';

export default function AmbientCandleOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
      
      {/* 1. Pulsating Radial Candle Flame Light Aura */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B45309]/20 rounded-full blur-3xl"
        style={{
          animation: 'candleAuraPulse 4s infinite ease-in-out alternate'
        }}
      />

      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#FEF3C7]/15 rounded-full blur-2xl"
        style={{
          animation: 'candleFlickerGlow 2.5s infinite ease-in-out alternate'
        }}
      />

      {/* 2. Floating Golden Firefly Orbs & Bokeh Dust */}
      <div className="absolute inset-0">
        <div 
          className="w-2.5 h-2.5 bg-[#FEF3C7] rounded-full absolute bottom-10 left-1/4 blur-[1px] shadow-lg shadow-[#B45309]"
          style={{ animation: 'floatOrb 7s infinite ease-in-out' }}
        />
        <div 
          className="w-2 h-2 bg-[#B45309] rounded-full absolute bottom-20 left-1/2 blur-[0.5px]"
          style={{ animation: 'floatOrb 9s infinite ease-in-out 2s' }}
        />
        <div 
          className="w-3 h-3 bg-[#FEF3C7]/80 rounded-full absolute bottom-5 left-2/3 blur-[1.5px] shadow-md shadow-[#FEF3C7]"
          style={{ animation: 'floatOrb 8s infinite ease-in-out 4s' }}
        />
        <div 
          className="w-1.5 h-1.5 bg-amber-300 rounded-full absolute bottom-32 left-3/4 blur-[0.5px]"
          style={{ animation: 'floatOrb 11s infinite ease-in-out 1s' }}
        />
        <div 
          className="w-2 h-2 bg-amber-100 rounded-full absolute bottom-16 left-1/6 blur-[1px]"
          style={{ animation: 'floatOrb 6s infinite ease-in-out 3s' }}
        />
      </div>

      {/* 3. DENSE LEFT SIDE & DRIFTING MOVING STARS (14+ Stars moving idhar-se-udhar) */}
      
      {/* Star 1: Far Left Top Corner (Drifting right) */}
      <div 
        className="absolute top-8 left-8 text-[#FEF3C7] filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftRight 6s infinite ease-in-out' }}
      >
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Star 2: Left Upper Card (Drifting down-right) */}
      <div 
        className="absolute top-24 left-1/6 text-amber-200 filter drop-shadow-[0_0_6px_#FEF3C7]"
        style={{ animation: 'starDriftDiagonal 8s infinite ease-in-out 1s' }}
      >
        <Star className="w-4 h-4 fill-[#FEF3C7]" />
      </div>

      {/* Star 3: Left Middle Above Title */}
      <div 
        className="absolute top-36 left-1/4 text-[#FEF3C7]/90 filter drop-shadow-[0_0_10px_#B45309]"
        style={{ animation: 'starDriftLeft 7s infinite ease-in-out 2s' }}
      >
        <Sparkles className="w-6 h-6" />
      </div>

      {/* Star 4: Left Side Glass Card Center */}
      <div 
        className="absolute top-1/2 left-16 text-amber-300 filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftVertical 5.5s infinite ease-in-out 0.5s' }}
      >
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Star 5: Left Lower Card (Near Buttons) */}
      <div 
        className="absolute bottom-28 left-1/5 text-[#FEF3C7] filter drop-shadow-[0_0_6px_#FEF3C7]"
        style={{ animation: 'starDriftDiagonal 9s infinite ease-in-out 3s' }}
      >
        <Star className="w-4.5 h-4.5 fill-[#FEF3C7]" />
      </div>

      {/* Star 6: Far Left Bottom Corner */}
      <div 
        className="absolute bottom-10 left-10 text-amber-200/90 filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftRight 6.5s infinite ease-in-out 1.5s' }}
      >
        <Sparkles className="w-5.5 h-5.5" />
      </div>

      {/* Star 7: Center Top Header */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 text-[#FEF3C7] filter drop-shadow-[0_0_6px_#FEF3C7]"
        style={{ animation: 'starDriftVertical 7.5s infinite ease-in-out 2.5s' }}
      >
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Star 8: Right Flame Peak (Floating & Drifting) */}
      <div 
        className="absolute top-16 right-1/4 text-[#FEF3C7] filter drop-shadow-[0_0_10px_#B45309]"
        style={{ animation: 'starDriftLeft 6.8s infinite ease-in-out 1.2s' }}
      >
        <Sparkles className="w-7 h-7" />
      </div>

      {/* Star 9: Right Center Vessel */}
      <div 
        className="absolute top-1/2 right-1/3 text-amber-200 filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftRight 8.2s infinite ease-in-out 0.8s' }}
      >
        <Sparkles className="w-6 h-6" />
      </div>

      {/* Star 10: Far Right Upper Corner */}
      <div 
        className="absolute top-14 right-10 text-[#FEF3C7]/90 filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftVertical 6s infinite ease-in-out 3.5s' }}
      >
        <Star className="w-4 h-4 fill-[#FEF3C7]" />
      </div>

      {/* Star 11: Far Right Lower Corner */}
      <div 
        className="absolute bottom-16 right-14 text-amber-300 filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftLeft 7.2s infinite ease-in-out 2.1s' }}
      >
        <Sparkles className="w-6 h-6" />
      </div>

      {/* Star 12: Left Center Floating Sparkle */}
      <div 
        className="absolute top-2/3 left-1/3 text-[#FEF3C7] filter drop-shadow-[0_0_8px_#B45309]"
        style={{ animation: 'starDriftDiagonal 10s infinite ease-in-out 4s' }}
      >
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Custom Keyframes for Idhar-Se-Urdhar Motion */}
      <style>{`
        @keyframes candleAuraPulse {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.75; }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.4; }
        }

        @keyframes candleFlickerGlow {
          0% { transform: translate(-50%, 0) scale(0.98); opacity: 0.5; }
          25% { transform: translate(-49%, -3px) scale(1.04); opacity: 0.85; }
          50% { transform: translate(-51%, 2px) scale(0.96); opacity: 0.45; }
          75% { transform: translate(-50%, -1px) scale(1.02); opacity: 0.9; }
          100% { transform: translate(-50%, 0) scale(0.98); opacity: 0.5; }
        }

        @keyframes floatOrb {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          30% { opacity: 0.9; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-220px) scale(1.5); opacity: 0; }
        }

        /* 1. Drift Right Motion */
        @keyframes starDriftRight {
          0% { transform: translateX(0) translateY(0) scale(0.6) rotate(0deg); opacity: 0.3; }
          50% { transform: translateX(35px) translateY(-15px) scale(1.3) rotate(60deg); opacity: 1; filter: drop-shadow(0 0 12px #B45309); }
          100% { transform: translateX(0) translateY(0) scale(0.6) rotate(120deg); opacity: 0.3; }
        }

        /* 2. Drift Left Motion */
        @keyframes starDriftLeft {
          0% { transform: translateX(0) translateY(0) scale(0.7) rotate(0deg); opacity: 0.3; }
          50% { transform: translateX(-40px) translateY(18px) scale(1.35) rotate(-60deg); opacity: 1; filter: drop-shadow(0 0 14px #B45309); }
          100% { transform: translateX(0) translateY(0) scale(0.7) rotate(-120deg); opacity: 0.3; }
        }

        /* 3. Drift Vertical Motion */
        @keyframes starDriftVertical {
          0% { transform: translateY(0) scale(0.6) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-30px) scale(1.2) rotate(45deg); opacity: 1; }
          100% { transform: translateY(0) scale(0.6) rotate(90deg); opacity: 0.2; }
        }

        /* 4. Drift Diagonal Motion */
        @keyframes starDriftDiagonal {
          0% { transform: translate(0, 0) scale(0.5) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(25px, -25px) scale(1.3) rotate(90deg); opacity: 1; }
          100% { transform: translate(0, 0) scale(0.5) rotate(180deg); opacity: 0.3; }
        }
      `}</style>

    </div>
  );
}
