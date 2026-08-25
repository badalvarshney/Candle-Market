import React from 'react';
import { Leaf, Flame, Award, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto">
      <div className="bg-[#1B3B32] text-white p-6 sm:p-10 md:p-14 shadow-xl border border-[#B45309]/40 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 bg-[#B45309]/25 text-[#FEF3C7] border border-[#B45309]/50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>BOTANICAL PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold tracking-wider text-white leading-tight mb-6">
              HAND-POURED WITH CARE, PURE BOTANICAL LIGHT
            </h2>

            <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
              At <strong>Illumination by Gargi</strong>, every candle is crafted in small micro-batches using 100% renewable organic soy and coconut wax. We reject toxic paraffin waxes, phthalates, and synthetic chemical additives.
            </p>

            <p className="text-stone-300 text-xs leading-relaxed mb-8 font-light">
              From our sustainably harvested whispering crackle wood wicks to hand-selected steam distilled essential oils, our goal is to bring peaceful warmth, quiet focus, and pure sensory magic into your sanctuary.
            </p>

            {/* Feature Highlights - Stack 1 per row on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/15">
              <div className="flex items-center gap-3.5 bg-white/5 p-3 border border-white/10 sm:bg-transparent sm:p-0 sm:border-0">
                <div className="w-10 h-10 bg-white/10 text-[#FEF3C7] flex items-center justify-center shrink-0 border border-[#B45309]/50">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% VEGAN</h4>
                  <p className="text-[11px] text-stone-300 font-light">Zero Paraffin or Lead</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white/5 p-3 border border-white/10 sm:bg-transparent sm:p-0 sm:border-0">
                <div className="w-10 h-10 bg-white/10 text-[#FEF3C7] flex items-center justify-center shrink-0 border border-[#B45309]/50">
                  <Flame className="w-5 h-5 text-[#B45309] animate-flame-delicate" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">SLOW CLEAN BURN</h4>
                  <p className="text-[11px] text-stone-300 font-light">Up to 75 Hours Light</p>
                </div>
              </div>
            </div>

          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img
                src="/hero_banner.jpg"
                alt="Candle crafting process"
                className="shadow-lg object-cover h-56 sm:h-64 w-full border border-white/20 transform hover:scale-105 transition-transform"
              />
              <img
                src="/scent_lab.jpg"
                alt="Essential oil blending studio"
                className="shadow-lg object-cover h-56 sm:h-64 w-full sm:mt-8 border border-white/20 transform hover:scale-105 transition-transform"
              />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white text-[#111827] p-4 shadow-xl border border-[#E8E3DA] hidden sm:block">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#B45309]" />
                <div>
                  <div className="font-serif text-sm font-bold uppercase tracking-wider">100% ECO CERTIFIED</div>
                  <div className="text-[10px] text-[#6B7280] font-medium">Cruelty-Free & Earth Friendly</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
