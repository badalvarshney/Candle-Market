import React from 'react';
import { TESTIMONIALS } from '../data/candlesData';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto">



      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[#C59B27] text-xs font-bold uppercase tracking-widest block mb-2">
          CLIENT TESTIMONIALS
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-[#111827] uppercase">
          LOVED BY CANDLE LOVERS NATIONWIDE
        </h2>
        <p className="text-[#6B7280] text-xs uppercase tracking-wider mt-2 font-light">
          Over 10,000+ homes lit with warmth and pure botanical fragrance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="kimirica-card p-6 flex flex-col justify-between relative"
          >
            <Quote className="w-8 h-8 text-[#E8E3DA] absolute top-4 right-4 pointer-events-none" />

            <div>
              <div className="flex text-[#C59B27] mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-[#4B5563] text-xs leading-relaxed mb-6 font-light">
                "{t.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#111827] text-xs uppercase tracking-wider flex items-center gap-1">
                  <span>{t.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#1B3B32]" title="Verified Purchaser" />
                </h4>
                <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{t.city} • Verified Buyer</span>
              </div>
              <span className="text-[9px] font-bold text-[#1B3B32] bg-[#F9F5F0] px-2 py-0.5 uppercase tracking-wider border border-[#E8E3DA]">
                {t.boughtProduct}
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
