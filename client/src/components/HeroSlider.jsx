import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, ShieldCheck, Flame, Gift } from 'lucide-react';
import AmbientCandleOverlay from './AmbientCandleOverlay';
import { fetchBannersAPI } from '../services/api';

const DEFAULT_SLIDES = [
  {
    id: 1,
    badge: "ILLUMINATION BY GARGI • BOTANICAL STUDIO",
    title: "Pure Botanical Light & Sensory Tranquility",
    subtitle: "Hand-poured 100% organic soy candles infused with Madagascar vanilla, warm golden amber, and whispering crackle wood wicks.",
    ctaPrimary: "EXPLORE COLLECTION",
    ctaSecondary: "TAKE SCENT QUIZ",
    image: "/hero_banner.jpg",
    accentTag: "60+ HOURS CLEAN BURN • ZERO TOXIC PARAFFIN"
  },
  {
    id: 2,
    badge: "ILLUMINATION BY GARGI • ARTISANAL SETS",
    title: "The Art of Luxury Votive Light",
    subtitle: "Handcrafted votive candle trios in amber & frosted glass vessels infused with Provence lavender & damask velvet rose.",
    ctaPrimary: "SHOP CANDLE SETS",
    ctaSecondary: "VIEW ALL CANDLES",
    categoryAction: "gift-sets",
    image: "/candle_votive_trio.jpg",
    accentTag: "COMPLIMENTARY GOLD FOIL GIFT PACKAGING"
  },
  {
    id: 3,
    badge: "ILLUMINATION BY GARGI • WOOD WICK STUDIO",
    title: "Fireside Crackle & Mystical Smoked Oudh",
    subtitle: "Experience soothing crackling fireside sounds with dark obsidian glass candles infused with smoked sage & atlas cedarwood.",
    ctaPrimary: "EXPLORE WOOD WICKS",
    ctaSecondary: "SCENT FINDER",
    categoryAction: "wood-wick",
    image: "/candle_obsidian.jpg",
    accentTag: "SUSTAINABLY HARVESTED NATURAL CHERRY WOOD WICKS"
  }
];

export default function HeroSlider({ onShopNow, onOpenQuiz }) {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchBannersAPI();
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (err) {
        console.log('Using default hero slides');
      }
    };
    loadBanners();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full py-0">
      
      {/* 100% Full-Width Edge-To-Edge Hero Slider with Pure Photo & Animated Light Overlay */}
      <div className="relative overflow-hidden w-full min-h-[520px] md:min-h-[640px] flex items-center bg-[#122822] border-b border-[#B45309]/50 shadow-2xl">
        
        {slides.map((slide, index) => (
          <div
            key={slide._id || slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Edge-to-Edge Background Candle Photo */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[10000ms] ease-out"
            />

            {/* Floating Golden Firefly Orbs & Ambient Light Overlay */}
            <AmbientCandleOverlay />

            {/* Glassmorphic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#122822]/90 via-[#122822]/60 to-transparent z-16" />

            {/* Inner Content Aligned to 1600px Max Width Grid */}
            <div className="relative z-20 h-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col justify-center text-white py-14">
              <div className="bg-[#122822]/85 backdrop-blur-md border border-[#B45309]/50 p-6 sm:p-10 md:p-12 shadow-2xl max-w-2xl relative overflow-hidden">
                
                {/* Decorative Amber Glow Corner */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#B45309]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 bg-[#B45309]/30 border border-[#B45309]/70 text-[#FEF3C7] px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 w-fit shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-[#FEF3C7]" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-wider text-white mb-4 drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-stone-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => onShopNow(slide.categoryAction)}
                    className="btn-gold group shadow-lg cursor-pointer"
                  >
                    <span>{slide.ctaPrimary || 'EXPLORE COLLECTION'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={onOpenQuiz}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/40 px-5 sm:px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm hover:border-[#FEF3C7]"
                  >
                    {slide.ctaSecondary || 'TAKE SCENT QUIZ'}
                  </button>
                </div>

                {slide.accentTag && (
                  <div className="mt-6 pt-5 border-t border-white/15 text-[10px] sm:text-[11px] text-[#FEF3C7] tracking-widest font-bold uppercase flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#B45309] animate-flame-delicate" />
                    <span>{slide.accentTag}</span>
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}

        {/* Circular Glass Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#122822]/80 hover:bg-[#B45309] text-white border border-[#B45309]/60 flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer backdrop-blur-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#122822]/80 hover:bg-[#B45309] text-white border border-[#B45309]/60 flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer backdrop-blur-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all duration-300 cursor-pointer rounded-full ${
                idx === currentSlide ? 'w-10 bg-[#B45309] shadow-md' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Feature Highlights Ribbon Under Hero (1600px Padded Grid) */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="kimirica-card p-4 flex items-center gap-3.5 shadow-sm hover:border-[#B45309]">
            <div className="w-10 h-10 bg-[#FAFAF7] text-[#1B3B32] flex items-center justify-center shrink-0 border border-[#E8E3DA]">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">100% ORGANIC SOY</h4>
              <p className="text-[11px] text-[#6B7280] font-light">Non-toxic clean burn</p>
            </div>
          </div>

          <div className="kimirica-card p-4 flex items-center gap-3.5 shadow-sm hover:border-[#B45309]">
            <div className="w-10 h-10 bg-[#FAFAF7] text-[#1B3B32] flex items-center justify-center shrink-0 border border-[#E8E3DA]">
              <Flame className="w-5 h-5 text-[#B45309] animate-flame-delicate" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">WHISPER WOOD WICK</h4>
              <p className="text-[11px] text-[#6B7280] font-light">Fireside crackle sound</p>
            </div>
          </div>

          <div className="kimirica-card p-4 flex items-center gap-3.5 shadow-sm hover:border-[#B45309]">
            <div className="w-10 h-10 bg-[#FAFAF7] text-[#1B3B32] flex items-center justify-center shrink-0 border border-[#E8E3DA]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">ESSENTIAL OILS</h4>
              <p className="text-[11px] text-[#6B7280] font-light">Phthalate-free formulas</p>
            </div>
          </div>

          <div className="kimirica-card p-4 flex items-center gap-3.5 shadow-sm hover:border-[#B45309]">
            <div className="w-10 h-10 bg-[#FAFAF7] text-[#1B3B32] flex items-center justify-center shrink-0 border border-[#E8E3DA]">
              <Gift className="w-5 h-5 text-[#B45309]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">LUXURY PACKAGING</h4>
              <p className="text-[11px] text-[#6B7280] font-light">Gift box & silk ribbon</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
