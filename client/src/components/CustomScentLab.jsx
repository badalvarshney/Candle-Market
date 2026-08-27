import React, { useState } from 'react';
import { Flame, Wand2, CheckCircle2, Leaf, Gem, Wind, Printer, Check } from 'lucide-react';

export default function CustomScentLab() {
  const VESSELS = [
    { id: 'amber-jar', name: 'Amber Glass Jar', color: '#D97706', price: 0, bgClass: 'bg-[#4A2E1B]', textClass: 'text-amber-100' },
    { id: 'matte-black', name: 'Matte Obsidian Black', color: '#1C1917', price: 100, bgClass: 'bg-[#111827]', textClass: 'text-white' },
    { id: 'cream-ceramic', name: 'Cream Ceramic Pot', color: '#F4EFE6', price: 150, bgClass: 'bg-[#F9F5F0]', textClass: 'text-[#111827]' },
    { id: 'rose-gold', name: 'Rose Gold Crystal Jar', color: '#E11D48', price: 200, bgClass: 'bg-[#5C2C24]', textClass: 'text-rose-100' },
  ];

  const WAXES = [
    { id: 'soy-wax', name: '100% Organic Soy Wax', price: 0, desc: 'Clean slow burn with subtle natural sweetness' },
    { id: 'coconut-wax', name: 'Coconut & Beeswax Velvet', price: 100, desc: 'Creamy texture with supreme fragrance throw' },
  ];

  const WICKS = [
    { id: 'wood-wick', name: 'Whispering Wood Crackle Wick', price: 50, desc: 'Fireside soft crackling sound' },
    { id: 'cotton-wick', name: 'Organic Egyptian Cotton Wick', price: 0, desc: 'Silent, consistent steady flame' },
  ];

  const TOP_NOTES = ['French Lavender', 'Italian Bergamot', 'Ceylon Cinnamon', 'Wild Honey', 'Pink Grapefruit'];
  const HEART_NOTES = ['Madagascar Vanilla', 'Damask Rose', 'White Jasmine', 'Blue Eucalyptus', 'Baked Pumpkin'];
  const BASE_NOTES = ['Atlas Cedarwood', 'Smoked Amber', 'Velvet Musk', 'Sandalwood', 'Patchouli Bark'];

  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0]);
  const [selectedWax, setSelectedWax] = useState(WAXES[0]);
  const [selectedWick, setSelectedWick] = useState(WICKS[0]);
  const [topNote, setTopNote] = useState(TOP_NOTES[0]);
  const [heartNote, setHeartNote] = useState(HEART_NOTES[0]);
  const [baseNote, setBaseNote] = useState(BASE_NOTES[0]);
  const [customLabel, setCustomLabel] = useState('My Sanctuary Glow');
  const [customSubtext, setCustomSubtext] = useState('Hand-Poured Artisan Blend');
  const [isSaved, setIsSaved] = useState(false);

  const basePrice = 899;
  const totalPrice = basePrice + selectedVessel.price + selectedWax.price + selectedWick.price;

  const handleSaveRecipe = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section className="py-8 md:py-12 px-4 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#1B3B32] text-[#FEF3C7] border border-[#B45309]/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Wand2 className="w-3.5 h-3.5 text-[#B45309]" />
          <span>INTERACTIVE ARTISANAL STUDIO</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111827] tracking-wider uppercase">
          CREATE YOUR CUSTOM CANDLE
        </h2>

        <p className="text-[#6B7280] text-xs md:text-sm mt-3 leading-relaxed font-light uppercase tracking-wider">
          Select your jar vessel, wax blend, whisper wood wick, and blend 3 fragrance notes with custom label preview.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Vessel */}
          <div className="bg-white p-6 border border-[#E8E3DA]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111827] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-[#1B3B32] text-[#FEF3C7] text-xs font-bold flex items-center justify-center">1</span>
              <span>SELECT GLASSWARE VESSEL</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VESSELS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVessel(v)}
                  className={`p-3 border text-left transition-all relative ${
                    selectedVessel.id === v.id
                      ? 'border-[#B45309] bg-[#F9F5F0]'
                      : 'border-[#E8E3DA] hover:border-[#1B3B32] bg-[#FAFAF7]'
                  }`}
                >
                  <div className={`w-7 h-7 mb-2 border border-black/10 shadow-sm ${v.bgClass}`} />
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#111827] line-clamp-1">{v.name}</div>
                  <div className="text-[10px] text-[#B45309] font-bold">
                    {v.price > 0 ? `+₹${v.price}` : 'INCLUDED'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Wax & Wick */}
          <div className="bg-white p-6 border border-[#E8E3DA]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111827] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-[#1B3B32] text-[#FEF3C7] text-xs font-bold flex items-center justify-center">2</span>
              <span>BOTANICAL WAX & WICK BASE</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#111827] block mb-2">WAX BASE</label>
                <div className="space-y-2">
                  {WAXES.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWax(w)}
                      className={`w-full text-left p-3 border text-xs uppercase tracking-wider transition-all ${
                        selectedWax.id === w.id
                          ? 'border-[#1B3B32] bg-[#1B3B32] text-[#FEF3C7] font-semibold'
                          : 'border-[#E8E3DA] hover:bg-[#FAFAF7] text-[#4B5563]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{w.name}</span>
                        <span>{w.price > 0 ? `+₹${w.price}` : 'FREE'}</span>
                      </div>
                      <p className="text-[9px] text-[#6B7280] font-normal mt-0.5 normal-case">{w.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#111827] block mb-2">WICK TYPE</label>
                <div className="space-y-2">
                  {WICKS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWick(w)}
                      className={`w-full text-left p-3 border text-xs uppercase tracking-wider transition-all ${
                        selectedWick.id === w.id
                          ? 'border-[#1B3B32] bg-[#1B3B32] text-[#FEF3C7] font-semibold'
                          : 'border-[#E8E3DA] hover:bg-[#FAFAF7] text-[#4B5563]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-[#B45309]" />
                          <span>{w.name}</span>
                        </span>
                        <span>{w.price > 0 ? `+₹${w.price}` : 'FREE'}</span>
                      </div>
                      <p className="text-[9px] text-[#6B7280] font-normal mt-0.5 normal-case">{w.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Fragrance Accord */}
          <div className="bg-white p-6 border border-[#E8E3DA]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111827] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-[#1B3B32] text-[#FEF3C7] text-xs font-bold flex items-center justify-center">3</span>
              <span>FRAGRANCE ACCORD</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs uppercase tracking-wider">
              <div>
                <label className="font-bold text-[#111827] block mb-1.5">TOP NOTE</label>
                <select
                  value={topNote}
                  onChange={(e) => setTopNote(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-[#E8E3DA] rounded-none p-2.5 font-semibold text-[#111827] focus:border-[#B45309] focus:outline-none"
                >
                  {TOP_NOTES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#B45309] block mb-1.5">HEART NOTE</label>
                <select
                  value={heartNote}
                  onChange={(e) => setHeartNote(e.target.value)}
                  className="w-full bg-[#F9F5F0] border border-[#B45309] rounded-none p-2.5 font-semibold text-[#1B3B32] focus:border-[#B45309] focus:outline-none"
                >
                  {HEART_NOTES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#111827] block mb-1.5">BASE NOTE</label>
                <select
                  value={baseNote}
                  onChange={(e) => setBaseNote(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-[#E8E3DA] rounded-none p-2.5 font-semibold text-[#111827] focus:border-[#B45309] focus:outline-none"
                >
                  {BASE_NOTES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 4: Custom Label */}
          <div className="bg-white p-6 border border-[#E8E3DA]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111827] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-[#1B3B32] text-[#FEF3C7] text-xs font-bold flex items-center justify-center">4</span>
              <span>PERSONALIZED JAR LABEL</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-[#111827] uppercase tracking-wider block mb-1">Candle Title / Name</label>
                <input
                  type="text"
                  maxLength={30}
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  placeholder="e.g. My Sanctuary Glow"
                  className="w-full bg-[#FAFAF7] border border-[#E8E3DA] rounded-none p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#111827] uppercase tracking-wider block mb-1">Subtitle / Dedicated To</label>
                <input
                  type="text"
                  maxLength={35}
                  value={customSubtext}
                  onChange={(e) => setCustomSubtext(e.target.value)}
                  placeholder="e.g. Handcrafted for cozy winters"
                  className="w-full bg-[#FAFAF7] border border-[#E8E3DA] rounded-none p-2.5 text-[#111827] focus:border-[#B45309] focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Live Preview & Recipe Summary (NO SHOPPING BAG) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white p-6 border border-[#E8E3DA] shadow-md text-center">
            
            <div className="inline-flex items-center gap-1.5 text-[#B45309] text-xs font-bold uppercase tracking-widest mb-4">
              <Flame className="w-4 h-4" />
              <span>LIVE VISUAL PREVIEW</span>
            </div>

            {/* Mockup Jar Card */}
            <div className={`relative mx-auto w-64 h-80 border-2 border-[#B45309]/40 p-6 shadow-xl flex flex-col justify-between transition-all duration-500 ${selectedVessel.bgClass} ${selectedVessel.textClass}`}>
              
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1 h-4 bg-black/40" />
                <Flame className="w-8 h-8 text-[#B45309] animate-flame-delicate -mt-1 drop-shadow-[0_0_8px_rgba(180,83,9,0.8)]" />
              </div>

              <div className="text-left pt-3">
                <span className="text-[9px] uppercase font-bold tracking-widest opacity-80 block">
                  ILLUMINATION BY GARGI • STUDIO
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-90 block">
                  {selectedWax.name}
                </span>
              </div>

              {/* Printed Label */}
              <div className="bg-white text-[#111827] p-4 border border-[#E8E3DA] text-center shadow-sm">
                <h4 className="font-serif text-base font-semibold uppercase tracking-wider leading-tight line-clamp-1">
                  {customLabel || 'YOUR CANDLE NAME'}
                </h4>
                <p className="text-[9px] text-[#6B7280] font-medium mt-0.5 uppercase tracking-wider line-clamp-1">
                  {customSubtext || 'Hand-Poured Artisan Blend'}
                </p>
                
                <div className="mt-2 pt-2 border-t border-[#E8E3DA] text-[8px] text-[#1B3B32] uppercase tracking-widest font-bold">
                  {topNote} • {heartNote}
                </div>
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-widest opacity-80 flex justify-between items-center">
                <span>{selectedWick.name.split(' ')[0]} Wick</span>
                <span>60 Hrs Burn</span>
              </div>

            </div>

            {/* Custom Recipe Summary (NO SHOPPING BAG) */}
            <div className="mt-6 pt-5 border-t border-[#E8E3DA] text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">STUDIO CUSTOM FORMULA</span>
                <span className="text-xs font-bold text-[#1B3B32] bg-[#FAFAF7] px-2 py-0.5 border border-[#E8E3DA]">EST. VALUE ₹{totalPrice}</span>
              </div>

              <div className="p-3 bg-[#FAFAF7] border border-[#E8E3DA] text-[11px] space-y-1 text-[#4B5563]">
                <div className="flex justify-between">
                  <span className="font-semibold text-[#111827]">Glass Vessel:</span>
                  <span>{selectedVessel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#111827]">Botanical Wax:</span>
                  <span>{selectedWax.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#111827]">Wick Style:</span>
                  <span>{selectedWick.name}</span>
                </div>
                <div className="flex justify-between truncate">
                  <span className="font-semibold text-[#111827]">Fragrance Accord:</span>
                  <span className="text-[#B45309] font-bold truncate ml-1">{topNote} + {heartNote} + {baseNote}</span>
                </div>
              </div>

              <button
                onClick={handleSaveRecipe}
                className="w-full btn-outline-kimirica justify-center py-3 text-xs"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>RECIPE PREVIEW SAVED!</span>
                  </>
                ) : (
                  <>
                    <Printer className="w-4 h-4 text-[#111827]" />
                    <span>SAVE & PRINT FORMULA CARD</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
