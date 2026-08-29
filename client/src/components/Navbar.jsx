import React, { useState } from 'react';
import { Flame, ShoppingBag, Heart, Search, Menu, X, ChevronRight, Phone, MapPin } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  setIsCartOpen,
  setIsWishlistOpen,
  searchQuery,
  setSearchQuery
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'ALL CANDLES' },
    { id: 'quiz', label: 'SCENT FINDER' },
    { id: 'about', label: 'OUR STORY' },
    { id: 'reviews', label: 'REVIEWS' },
  ];


  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8E3DA] transition-all relative">
      
      {/* Top Announcement Ribbon */}
      <div className="bg-[#1B3B32] text-[#FEF3C7] text-[10px] sm:text-[11px] font-bold py-1.5 px-3 sm:px-4 text-center tracking-widest uppercase flex items-center justify-center gap-1.5 border-b border-[#B45309]/40">
        <Flame className="w-3.5 h-3.5 text-[#FEF3C7] shrink-0" />
        <span className="truncate">FREE EXPRESS SHIPPING OVER ₹4999 • BOTANICAL HAND-POURED CANDLES</span>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-[1600px] mx-auto px-2.5 sm:px-4 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between relative">
        
        {/* Brand Logo: Illumination by Gargi */}
        <div 
          onClick={() => {
            setActiveTab('home');
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group shrink-0 min-w-0"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 xl:w-11 xl:h-11 rounded-full bg-[#1B3B32] text-[#FEF3C7] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-[#B45309]/60 shrink-0">
            <Flame className="w-4 h-4 sm:w-4 sm:h-4 xl:w-5 xl:h-5 text-[#FEF3C7] animate-flame-delicate" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-sm sm:text-base lg:text-lg xl:text-3xl font-extrabold tracking-[0.05em] xl:tracking-[0.08em] text-[#111827] leading-none group-hover:text-[#1B3B32] transition-colors truncate">
              ILLUMINATION
            </span>
            <span className="text-[8px] sm:text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.14em] text-[#B45309] leading-tight truncate">
              BY GARGI <span className="hidden xl:inline text-[#4B5563] font-normal">• BOTANICAL STUDIO</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-8 shrink-0">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
              }}
              className={`text-[11px] xl:text-xs font-bold tracking-wider xl:tracking-widest uppercase transition-all relative py-1.5 whitespace-nowrap px-1 ${
                activeTab === link.id
                  ? 'text-[#1B3B32] font-extrabold'
                  : 'text-[#4B5563] hover:text-[#B45309]'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B45309]" />
              )}
            </button>
          ))}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Search Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1.5 sm:p-2 text-[#111827] hover:text-[#B45309] transition-colors ${
                isSearchOpen ? 'text-[#B45309]' : ''
              }`}
              title="Search candles"
            >
              <Search className="w-5 h-5" />
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 md:w-96 bg-white border border-[#B45309] shadow-2xl p-3 z-50 animate-fade-in">
                <div className="flex items-center bg-[#FAFAF7] border border-[#E8E3DA] px-3 py-2">
                  <Search className="w-4 h-4 text-[#B45309] mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="SEARCH VANILLA, LAVENDER..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== 'shop') setActiveTab('shop');
                    }}
                    autoFocus
                    className="w-full bg-transparent text-xs font-semibold uppercase tracking-wider text-[#111827] focus:outline-none"
                  />
                  {searchQuery ? (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-[10px] font-bold text-[#6B7280] hover:text-[#111827] uppercase tracking-wider ml-1 shrink-0"
                    >
                      CLEAR
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="text-stone-400 hover:text-stone-700 ml-1 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-2 pt-2 border-t border-[#F0EBE3] flex items-center justify-between text-[9px] text-[#6B7280] uppercase tracking-widest font-semibold">
                  <span>QUICK SEARCH CATALOG</span>
                  {searchQuery && <span className="text-[#B45309]">FILTERING...</span>}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button (Icon with Badge) */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-1.5 sm:p-2 text-[#111827] hover:text-rose-600 transition-colors relative shrink-0"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 sm:top-0 sm:right-0 w-4 h-4 bg-[#B45309] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {wishlistCount}
            </span>
          </button>

          {/* Shopping Bag Button - MOBILE ONLY (< 640px): Vector Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="sm:hidden p-1.5 text-[#111827] hover:text-[#B45309] transition-colors relative shrink-0"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B45309] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          </button>

          {/* Shopping Bag Button - TABLET & DESKTOP (>= 640px): Crisp Compact Rectangular Green Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#1B3B32] hover:bg-[#122822] text-[#FEF3C7] py-1.5 px-3 rounded-none border border-[#1B3B32] shadow-sm hover:border-[#B45309] transition-all text-xs font-semibold uppercase tracking-wider shrink-0 cursor-pointer"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FEF3C7]" />
            <span>BAG</span>
            <span className="bg-[#B45309] text-white font-bold px-1.5 py-0.5 rounded-full text-[10px] min-w-[18px] text-center">
              {cartCount}
            </span>
          </button>

          {/* Hamburger Menu Icon (Visible on Mobile & Tablet < 1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#111827] hover:text-[#B45309] transition-colors border border-[#E8E3DA] bg-[#FAFAF7] shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </nav>

      {/* Mobile & Tablet Drawer Menu Sidebar (< 1024px) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8E3DA] px-4 py-5 space-y-4 animate-fade-in shadow-2xl">
          
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === link.id
                    ? 'bg-[#1B3B32] text-[#FEF3C7] border-l-4 border-[#B45309]'
                    : 'text-[#111827] hover:bg-[#FAFAF7]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E3DA] space-y-3">
            <div className="p-3 bg-[#FAFAF7] border border-[#E8E3DA] text-[10px] space-y-1 text-[#6B7280]">
              <div className="flex items-center gap-1.5 text-[#111827] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Illumination Studio, Mumbai</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#111827]">
                <Phone className="w-3.5 h-3.5 text-[#B45309]" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </header>
  );
}
