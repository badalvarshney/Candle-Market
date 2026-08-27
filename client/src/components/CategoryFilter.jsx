import React from 'react';
import { CATEGORIES, SCENT_PROFILES } from '../data/candlesData';
import { SlidersHorizontal, RotateCcw, Heart, Leaf, Flame, Gem, Gift } from 'lucide-react';

const ICON_MAP = {
  Heart: Heart,
  Leaf: Leaf,
  Flame: Flame,
  Gem: Gem,
  Gift: Gift
};

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  selectedScentProfile,
  setSelectedScentProfile,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  resetFilters
}) {
  return (
    <div className="bg-white border border-[#E8E3DA] p-3.5 sm:p-5 md:p-6 mb-8 shadow-sm overflow-hidden">
      
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-[#E8E3DA]">
        <div>
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-[#111827] flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#B45309]" />
            <span>DISCOVER COLLECTIONS</span>
          </h2>
          <p className="text-[10px] sm:text-[11px] text-[#6B7280] tracking-wider uppercase mt-0.5">FILTER BY CATEGORY, SCENT ACCORD OR PRICE</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <label className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#111827] shrink-0">SORT BY:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 min-w-[140px] bg-[#FAFAF7] border border-[#E8E3DA] rounded-none text-[11px] sm:text-xs text-[#111827] font-semibold uppercase tracking-wider px-2 py-1.5 focus:outline-none focus:border-[#B45309] cursor-pointer"
          >
            <option value="featured">FEATURED COLLECTIONS</option>
            <option value="price-low">PRICE: LOW TO HIGH (₹)</option>
            <option value="price-high">PRICE: HIGH TO LOW (₹)</option>
            <option value="rating">TOP RATED (5.0 ★)</option>
            <option value="burn-time">LONGEST BURN TIME</option>
          </select>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-[#8B3A2B] hover:text-[#111827] bg-[#F9F5F0] hover:bg-[#E8E3DA] px-2.5 py-1.5 font-semibold uppercase tracking-wider transition-colors shrink-0"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 sm:mt-5">
        <label className="text-[10px] uppercase tracking-widest text-[#6B7280] font-bold block mb-2">CATEGORY</label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Flame;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-[#1B3B32] text-[#FEF3C7] border-[#1B3B32]'
                    : 'bg-[#FAFAF7] text-[#4B5563] border-[#E8E3DA] hover:border-[#B45309] hover:text-[#111827]'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B45309]' : 'text-[#1B3B32]'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scent Accord & Price Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 sm:mt-5 pt-4 border-t border-[#E8E3DA]">
        
        {/* Fragrance Accord */}
        <div>
          <label className="text-[10px] uppercase tracking-widest text-[#6B7280] font-bold block mb-2">FRAGRANCE ACCORD</label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {SCENT_PROFILES.map((scent) => (
              <button
                key={scent.id}
                onClick={() => setSelectedScentProfile(scent.id)}
                className={`px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all border ${
                  selectedScentProfile === scent.id
                    ? 'bg-[#B45309] text-white border-[#B45309]'
                    : 'bg-[#FAFAF7] text-[#4B5563] border-[#E8E3DA] hover:bg-[#F9F5F0]'
                }`}
              >
                {scent.name}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price Range Slider */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] uppercase tracking-widest text-[#6B7280] font-bold">MAXIMUM PRICE</label>
            <span className="text-xs font-bold text-[#1B3B32] bg-[#F9F5F0] px-2.5 py-0.5 border border-[#E8E3DA]">
              UP TO ₹{maxPrice}
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="2500"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-200 appearance-none cursor-pointer accent-[#1B3B32]"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-semibold mt-1">
            <span>₹500</span>
            <span>₹1,500</span>
            <span>₹2,500+</span>
          </div>
        </div>

      </div>

    </div>
  );
}
