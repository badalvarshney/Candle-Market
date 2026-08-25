import React from 'react';

export default function AmbientCandleFlame() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
      
      {/* Central Flame Light Pulse */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#B45309]/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Warm Gold Flicker Glow Layer 1 */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#FEF3C7]/15 rounded-full blur-2xl"
        style={{
          animation: 'candleFlicker 3s infinite ease-in-out alternate'
        }}
      />

      {/* Light Smoke Sparkles Effect */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="w-2 h-2 bg-[#FEF3C7] rounded-full absolute top-1/2 left-1/3 blur-[1px]"
          style={{ animation: 'floatSparkle 4s infinite linear' }}
        />
        <div 
          className="w-1.5 h-1.5 bg-[#B45309] rounded-full absolute top-1/3 left-1/2 blur-[0.5px]"
          style={{ animation: 'floatSparkle 6s infinite linear 2s' }}
        />
        <div 
          className="w-2 h-2 bg-[#FEF3C7] rounded-full absolute top-2/3 left-3/4 blur-[1px]"
          style={{ animation: 'floatSparkle 5s infinite linear 1s' }}
        />
      </div>

      <style>{`
        @keyframes candleFlicker {
          0% { transform: translate(-50%, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(-49%, -2px) scale(1.05); opacity: 0.8; }
          50% { transform: translate(-51%, 1px) scale(0.98); opacity: 0.5; }
          75% { transform: translate(-50%, -1px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(-50%, 0) scale(1); opacity: 0.6; }
        }

        @keyframes floatSparkle {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-80px) scale(1.4); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
