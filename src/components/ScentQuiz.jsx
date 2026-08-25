import React, { useState } from 'react';
import { CANDLES_DATA } from '../data/candlesData';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Flame, Moon, Sun, Wind, Home, Bed, Laptop, Bath, Shield, Layers } from 'lucide-react';

export default function ScentQuiz({ onQuickView, onAddToCart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchedCandle, setMatchedCandle] = useState(null);

  const questions = [
    {
      id: 'mood',
      title: "WHAT ATMOSPHERE DO YOU WISH TO CREATE?",
      subtitle: "Select the desired ambiance for your space",
      options: [
        { label: "Cozy Fireside Evening & Relaxation", category: "warm-cozy", icon: Flame },
        { label: "Deep Stress Relief & Tranquil Sleep", category: "floral", icon: Moon },
        { label: "Morning Energy, Focus & Vitality", category: "fresh-citrus", icon: Sun },
        { label: "Mystic Meditation & Woodsy Cleansing", category: "woody-earthy", icon: Wind },
      ]
    },
    {
      id: 'room',
      title: "WHERE WILL THIS CANDLE LIVE IN YOUR HOME?",
      subtitle: "Select room location",
      options: [
        { label: "Living Room & Fireplace", val: "large", icon: Home },
        { label: "Bedroom & Nightstand Sanctuary", val: "cozy", icon: Bed },
        { label: "Home Office & Workspace Desk", val: "focused", icon: Laptop },
        { label: "Spa Bathroom & Bath Rituals", val: "spa", icon: Bath },
      ]
    },
    {
      id: 'burn',
      title: "WHAT WICK SOUND & TEXTURE DO YOU PREFER?",
      subtitle: "Choose your sensory wick preference",
      options: [
        { label: "Whispering Crackling Wood Wick", val: "wood", icon: Flame },
        { label: "Silent Organic Egyptian Cotton Wick", val: "cotton", icon: Sparkles },
        { label: "Ribbed Luxury Crystal Glassware", val: "glass", icon: Layers },
      ]
    }
  ];

  const handleSelectOption = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const preferredCategory = newAnswers.mood?.category || 'warm-cozy';
      const match = CANDLES_DATA.find(c => c.scentFamily === preferredCategory) || CANDLES_DATA[0];
      setMatchedCandle(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedCandle(null);
  };

  return (
    <section className="py-8 md:py-12 px-4 max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-10 border border-[#E8E3DA] shadow-md relative overflow-hidden">
        
        {!matchedCandle && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8E3DA]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1B3B32]">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span>SCENT FINDER QUIZ</span>
            </div>

            <div className="flex items-center gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 transition-all ${
                    idx === currentStep
                      ? 'w-8 bg-[#C59B27]'
                      : idx < currentStep
                      ? 'w-3 bg-[#1B3B32]'
                      : 'w-3 bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {!matchedCandle ? (
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold tracking-wider text-[#111827] mb-2">
              {questions[currentStep].title}
            </h2>
            <p className="text-[#6B7280] text-xs uppercase tracking-wider mb-8 font-light">
              {questions[currentStep].subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentStep].options.map((opt, idx) => {
                const IconComponent = opt.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(questions[currentStep].id, opt)}
                    className="p-5 border border-[#E8E3DA] hover:border-[#C59B27] bg-[#FAFAF7] hover:bg-[#F9F5F0] text-left transition-all hover:scale-[1.01] group flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-white text-[#1B3B32] group-hover:text-[#C59B27] border border-[#E8E3DA] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#111827] group-hover:text-[#1B3B32] text-xs uppercase tracking-wider block">
                        {opt.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-[#1B3B32] text-[#F4E8C1] border border-[#C59B27]/40 text-xs font-bold px-3.5 py-1 uppercase tracking-widest mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
              <span>PERFECT MATCH FOUND</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-[#111827] mb-2">
              RECOMMENDED: {matchedCandle.name}
            </h2>

            <p className="text-[#6B7280] text-xs uppercase tracking-wider max-w-xl mx-auto mb-8 font-light">
              Based on your sensory preferences, this candle provides ideal fragrance throw for your space.
            </p>

            <div className="max-w-md mx-auto bg-[#FAFAF7] p-5 border border-[#E8E3DA] shadow-sm mb-8 flex items-center gap-4 text-left">
              <img
                src={matchedCandle.image}
                alt={matchedCandle.name}
                className="w-24 h-24 object-cover shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-[#C59B27] uppercase tracking-widest">
                  {matchedCandle.burnTime} CLEAN BURN
                </span>
                <h4 className="font-serif text-base font-semibold tracking-wider text-[#111827]">
                  {matchedCandle.name}
                </h4>
                <div className="text-[#111827] text-xs font-bold mt-1">
                  ₹{matchedCandle.price} <span className="text-[#6B7280] line-through font-normal">₹{matchedCandle.originalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => onQuickView(matchedCandle)} className="btn-kimirica">
                <span>VIEW DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button onClick={() => onAddToCart(matchedCandle)} className="btn-gold">
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] uppercase tracking-wider py-2 w-full justify-center mt-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RETAKE SCENT QUIZ</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
