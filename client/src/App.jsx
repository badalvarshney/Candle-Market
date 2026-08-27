import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import ScentQuiz from './components/ScentQuiz';

import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import UpcomingDropBanner from './components/UpcomingDropBanner';

import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDesktopOnlyNotice from './components/admin/AdminDesktopOnlyNotice';
import Preloader from './components/Preloader';
import NotFound from './components/NotFound';

import { fetchProductsAPI } from './services/api';
import { Flame, Heart, ArrowRight, X, ShoppingBag } from 'lucide-react';

// Secret Admin Route Path (Public /admin returns 404 Not Found)
export const SECRET_ADMIN_PATH = '/gargi-admin-portal';

const TAB_PATH_MAP = {
  home: '/',
  shop: '/shop',
  quiz: '/quiz',
  about: '/about',
  reviews: '/reviews',
  admin: SECRET_ADMIN_PATH,
};

const getTabFromPath = (path) => {
  const clean = path.replace(/\/$/, '').toLowerCase();
  if (clean === '' || clean === '/') return 'home';
  if (clean === '/shop') return 'shop';
  if (clean === '/quiz') return 'quiz';
  if (clean === '/about') return 'about';
  if (clean === '/reviews') return 'reviews';
  if (clean === SECRET_ADMIN_PATH.toLowerCase()) return 'admin';
  return 'notFound'; // Returns 404 for any unmapped route including /admin
};

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeTab, setActiveTab] = useState(() => getTabFromPath(window.location.pathname));
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic API products dataset loaded from backend MongoDB
  const [candlesList, setCandlesList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Filtering & Sorting states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScentProfile, setSelectedScentProfile] = useState('all');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Auth state
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Modal states
  const [selectedQuickViewCandle, setSelectedQuickViewCandle] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPricing, setCheckoutPricing] = useState({ subtotal: 0, discountAmount: 0, shippingCost: 0, finalTotal: 0 });

  // URL Navigation helper
  const navigateToTab = (tabId, replace = false) => {
    const targetPath = TAB_PATH_MAP[tabId] || '/';
    if (window.location.pathname !== targetPath) {
      if (replace) {
        window.history.replaceState({ tab: tabId }, '', targetPath);
      } else {
        window.history.pushState({ tab: tabId }, '', targetPath);
      }
    }
    setActiveTab(tabId);
  };

  // Auto Scroll to Top on Page Route / Tab Change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // Sync state on Browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const currentTab = getTabFromPath(window.location.pathname);
      setActiveTab(currentTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check Admin permission on route change/reload ONLY on Laptop/Desktop
  useEffect(() => {
    if (activeTab === 'admin') {
      if (isDesktop) {
        if (!adminUser) {
          setIsAdminLoginOpen(true);
        } else {
          setIsAdminLoginOpen(false);
        }
      } else {
        // On Mobile & Tablet screens, NEVER show login modal! Show desktop notice directly.
        setIsAdminLoginOpen(false);
      }
    } else {
      setIsAdminLoginOpen(false);
    }
  }, [activeTab, adminUser, isDesktop]);

  // Load live products from API backend
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await fetchProductsAPI();
      if (data) {
        setCandlesList(data);
      }
    } catch (err) {
      console.warn('Error fetching products from API:', err.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle Tab navigation & Admin access check
  const handleNavTabChange = (tabId) => {
    if (tabId === 'admin') {
      if (!adminUser) {
        setIsAdminLoginOpen(true);
        navigateToTab('admin');
        return;
      }
    }
    navigateToTab(tabId);
  };

  // Add to cart handler
  const handleAddToCart = (candle, quantity = 1) => {
    const candleId = candle._id || candle.id;
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === candleId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === candleId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: candleId,
          name: candle.name,
          price: candle.price,
          originalPrice: candle.originalPrice,
          quantity: quantity,
          image: candle.image,
          waxType: candle.waxType,
          burnTime: candle.burnTime
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (candle) => {
    const candleId = candle._id || candle.id;
    setWishlist((prev) =>
      prev.includes(candleId) ? prev.filter((id) => id !== candleId) : [...prev, candleId]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedScentProfile('all');
    setMaxPrice(2500);
    setSortBy('featured');
    setSearchQuery('');
  };

  // Filtered dataset derived from API candlesList
  const filteredCandles = candlesList.filter((candle) => {
    const matchCategory = selectedCategory === 'all' || candle.category === selectedCategory;
    const matchScent = selectedScentProfile === 'all' || candle.scentFamily === selectedScentProfile;
    const matchPrice = candle.price <= maxPrice;
    const matchSearch =
      searchQuery === '' ||
      candle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (candle.tagline && candle.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (candle.scentProfile?.top && candle.scentProfile.top.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (candle.scentProfile?.heart && candle.scentProfile.heart.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchCategory && matchScent && matchPrice && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
    if (sortBy === 'burn-time') return parseInt(b.burnTime || '0') - parseInt(a.burnTime || '0');
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-amber-500 selection:text-white">

      {/* Brand Preloader Animation */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavTabChange}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenScentLab={() => setActiveTab('scent-lab')}
      />

      {/* Main Content Area depending on Active Tab */}
      <main className="flex-1">

        {/* Tab: ADMIN DASHBOARD OR DESKTOP NOTICE */}
        {activeTab === 'admin' ? (
          !isDesktop ? (
            <AdminDesktopOnlyNotice onGoHome={() => navigateToTab('home')} />
          ) : adminUser ? (
            <AdminDashboard
              onLogout={() => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                setAdminUser(null);
                navigateToTab('home', true);
              }}
              onRefreshApp={loadProducts}
            />
          ) : null
        ) : (
          <>
            {/* Tab: HOME */}
            {activeTab === 'home' && (
              <>
                {/* Hero Carousel */}
                <HeroSlider
                  onShopNow={(cat) => {
                    if (cat) setSelectedCategory(cat);
                    setActiveTab('shop');
                  }}
                  onOpenScentLab={() => setActiveTab('scent-lab')}
                  onOpenQuiz={() => setActiveTab('quiz')}
                />

                {/* Featured Bestsellers Grid */}
                <section className="py-12 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto">

                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[#B45309] text-xs font-bold uppercase tracking-wider mb-2">
                        <Flame className="w-4 h-4" />
                        <span>CURATED BEST-SELLERS</span>
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#111827] uppercase tracking-wider">
                        HAND-POURED FAVORITES
                      </h2>
                    </div>

                    <button
                      onClick={() => setActiveTab('shop')}
                      className="btn-outline-kimirica self-start md:self-auto text-xs"
                    >
                      <span>VIEW ALL CANDLES ({candlesList.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {candlesList.slice(0, 4).map((candle) => {
                      const cId = candle._id || candle.id;
                      return (
                        <ProductCard
                          key={cId}
                          candle={candle}
                          onQuickView={setSelectedQuickViewCandle}
                          onAddToCart={handleAddToCart}
                          onToggleWishlist={handleToggleWishlist}
                          isWishlisted={wishlist.includes(cId)}
                          isInCart={cartItems.some((item) => item.id === cId)}
                        />
                      );
                    })}
                  </div>
                </section>

                {/* Upcoming Exclusive Launch Countdown Banner */}
                <UpcomingDropBanner />

                {/* Craftsmanship & Customer Stories */}
                <AboutSection />
                <ReviewsSection showAddButton={false} isSlider={true} />
              </>
            )}

            {/* Tab: SHOP CATALOG */}
            {activeTab === 'shop' && (
              <section className="py-8 md:py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
                {/* Category & Price Filters */}
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedScentProfile={selectedScentProfile}
                  setSelectedScentProfile={setSelectedScentProfile}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  resetFilters={resetFilters}
                />

                {/* Results Counter */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Showing {filteredCandles.length} Artisanal Candles
                  </span>
                </div>

                {/* Catalog Grid */}
                {filteredCandles.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-md mx-auto my-12">
                    <Flame className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <h3 className="font-serif text-xl font-bold text-stone-800">No candles found</h3>
                    <p className="text-xs text-stone-500 mt-1 mb-4">Try clearing your price slider or search criteria.</p>
                    <button onClick={resetFilters} className="btn-primary text-xs">
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCandles.map((candle) => {
                      const cId = candle._id || candle.id;
                      return (
                        <ProductCard
                          key={cId}
                          candle={candle}
                          onQuickView={setSelectedQuickViewCandle}
                          onAddToCart={handleAddToCart}
                          onToggleWishlist={handleToggleWishlist}
                          isWishlisted={wishlist.includes(cId)}
                          isInCart={cartItems.some((item) => item.id === cId)}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* Tab: SCENT QUIZ */}
            {activeTab === 'quiz' && (
              <ScentQuiz
                onQuickView={setSelectedQuickViewCandle}
                onAddToCart={handleAddToCart}
                candlesList={candlesList}
              />
            )}

            {/* Tab: ABOUT US */}
            {activeTab === 'about' && (
              <div className="py-6">
                <AboutSection />
              </div>
            )}

            {/* Tab: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="py-6">
                <ReviewsSection showAddButton={true} isSlider={false} />
              </div>
            )}

            {/* 404 NOT FOUND ROUTE */}
            {activeTab === 'notFound' && (
              <NotFound onGoHome={() => navigateToTab('home')} />
            )}
          </>
        )}

      </main>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          if (activeTab === 'admin' && !adminUser) {
            navigateToTab('home', true);
          }
        }}
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setIsAdminLoginOpen(false);
          navigateToTab('admin', true);
        }}
      />

      {/* Quick View Product Modal */}
      {selectedQuickViewCandle && (
        <ProductModal
          candle={selectedQuickViewCandle}
          onClose={() => setSelectedQuickViewCandle(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.includes(selectedQuickViewCandle._id || selectedQuickViewCandle.id)}
          isInCart={cartItems.some((item) => item.id === (selectedQuickViewCandle._id || selectedQuickViewCandle.id))}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={(pricingData) => {
          setCheckoutPricing(pricingData);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-4 sm:p-8 max-w-2xl w-full border border-[#E8E3DA] shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 border-b border-[#E8E3DA] shrink-0">
              <Heart className="w-5 h-5 text-rose-600 fill-current" />
              <h2 className="font-serif text-base sm:text-2xl font-semibold tracking-wider text-[#111827] uppercase">SAVED WISHLIST</h2>
              <span className="text-xs text-[#B45309] font-bold">({wishlist.length})</span>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-[#6B7280] text-xs py-8 text-center uppercase tracking-wider font-light">No candles saved in wishlist yet. Click the heart icon on any candle card!</p>
            ) : (
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {candlesList.filter((c) => wishlist.includes(c._id || c.id)).map((candle) => {
                  const cId = candle._id || candle.id;
                  return (
                    <div key={cId} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#FAFAF7] border border-[#E8E3DA] gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={candle.image} alt={candle.name} className="w-14 h-14 object-cover shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-serif font-semibold text-xs text-[#111827] uppercase tracking-wider line-clamp-1">{candle.name}</h4>
                          <span className="text-xs text-[#B45309] font-bold">₹{candle.price}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(candle)}
                        className="btn-kimirica text-[10px] py-2 px-3.5 whitespace-nowrap justify-center w-full sm:w-auto shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#FEF3C7]" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        pricing={checkoutPricing}
        onOrderSuccess={() => setCartItems([])}
      />

      {/* Footer */}
      <Footer
        setActiveTab={handleNavTabChange}
        onOpenScentLab={() => setActiveTab('scent-lab')}
        onOpenQuiz={() => setActiveTab('quiz')}
      />

    </div>
  );
}
