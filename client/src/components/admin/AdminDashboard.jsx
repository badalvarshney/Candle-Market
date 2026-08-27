import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  Clock,
  MessageSquare,
  Ticket,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  LogOut,
  RefreshCw,
  Flame,
  Check
} from 'lucide-react';
import {
  fetchProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  fetchOrdersAPI,
  updateOrderStatusAPI,
  fetchAdminReviewsAPI,
  toggleReviewApprovalAPI,
  deleteReviewAPI,
  fetchBannersAPI,
  createBannerAPI,
  deleteBannerAPI,
  fetchActiveDropAPI,
  createDropAPI,
  fetchCouponsAPI,
  createCouponAPI,
  deleteCouponAPI
} from '../../services/api';
import AdminDesktopOnlyNotice from './AdminDesktopOnlyNotice';

export default function AdminDashboard({ onLogout, onRefreshApp }) {
  const [activeSubTab, setActiveSubTab] = useState('products'); // 'products' | 'orders' | 'drops' | 'reviews' | 'coupons'

  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [banners, setBanners] = useState([]);
  const [activeDrop, setActiveDrop] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  // Modals & Forms
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    tagline: '',
    description: '',
    price: 899,
    originalPrice: 1299,
    category: 'soy-coconut',
    scentFamily: 'warm-cozy',
    stock: 50,
    isBestSeller: true,
    isNewItem: false,
    image: '/candle_vanilla.jpg',
    burnTime: '60 Hours',
    weight: '320g / 11.2 oz',
    waxType: '100% Organic Soy Wax',
    wickType: 'Whispering Wood Wick',
    jarMaterial: 'Amber Glass Jar',
    mood: 'Relaxation & Ambiance',
    scentProfile: { top: ['Honey'], heart: ['Vanilla'], base: ['Amber'] }
  });

  // Drop Form
  const [dropForm, setDropForm] = useState({
    badgeText: 'EXCLUSIVELY LAUNCHING SOON • LIMITED BATCH DROP',
    title: 'ROYAL BOTANICAL ELIXIR COLLECTION',
    description: 'Infused with rare Kashmiri Saffron, Damask Velvet Rose, and Smoked Oudh. 24K gold foil glass vessels.',
    launchDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    totalUnits: 250,
    image: '/candle_smoked_oudh.jpg'
  });

  // Coupon Form
  const [couponForm, setCouponForm] = useState({
    code: 'FESTIVE15',
    discountPercent: 15,
    maxDiscount: 600,
    minPurchase: 799
  });

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [prodsData, ordsData, revsData, bansData, dropData, coupData] = await Promise.all([
        fetchProductsAPI(),
        fetchOrdersAPI().catch(() => []),
        fetchAdminReviewsAPI().catch(() => []),
        fetchBannersAPI().catch(() => []),
        fetchActiveDropAPI().catch(() => null),
        fetchCouponsAPI().catch(() => [])
      ]);

      setProducts(prodsData || []);
      setOrders(ordsData || []);
      setReviews(revsData || []);
      setBanners(bansData || []);
      setActiveDrop(dropData);
      setCoupons(coupData || []);
    } catch (err) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const flashMsg = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3500);
  };

  // Product Actions
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProductAPI(editingProduct._id || editingProduct.id, productForm);
        flashMsg('Product updated successfully!');
      } else {
        await createProductAPI(productForm);
        flashMsg('New candle product added to store catalog!');
      }
      setIsAddProductOpen(false);
      setEditingProduct(null);
      loadAllAdminData();
      if (onRefreshApp) onRefreshApp();
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return;
    try {
      await deleteProductAPI(id);
      flashMsg('Product removed');
      loadAllAdminData();
      if (onRefreshApp) onRefreshApp();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  // Order Actions
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await updateOrderStatusAPI(id, { orderStatus: status });
      flashMsg(`Order #${id} status updated to ${status}`);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating order');
    }
  };

  // Review Actions
  const handleToggleReview = async (id) => {
    try {
      await toggleReviewApprovalAPI(id);
      flashMsg('Review approval status toggled');
      loadAllAdminData();
      if (onRefreshApp) onRefreshApp();
    } catch (err) {
      alert('Error updating review');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReviewAPI(id);
      flashMsg('Review deleted');
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting review');
    }
  };

  // Drop Action
  const handleSaveDrop = async (e) => {
    e.preventDefault();
    try {
      await createDropAPI({
        ...dropForm,
        launchDate: new Date(dropForm.launchDate)
      });
      flashMsg('Upcoming Drop countdown updated successfully!');
      loadAllAdminData();
      if (onRefreshApp) onRefreshApp();
    } catch (err) {
      alert('Error saving drop banner');
    }
  };

  // Coupon Actions
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await createCouponAPI(couponForm);
      flashMsg('New Promo Coupon created!');
      setCouponForm({ code: '', discountPercent: 10, maxDiscount: 500, minPurchase: 499 });
      loadAllAdminData();
    } catch (err) {
      alert('Error creating coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await deleteCouponAPI(id);
      flashMsg('Coupon deleted');
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting coupon');
    }
  };

  return (
    <>
      {/* Mobile & Tablet Restricted Notice (< 1024px) */}
      <div className="block lg:hidden">
        <AdminDesktopOnlyNotice onGoHome={onLogout} />
      </div>

      {/* Laptop & Desktop Admin Control Dashboard (>= 1024px) */}
      <div className="hidden lg:block bg-[#FAF7F2] min-h-screen pb-16 font-sans">
      
      {/* Top Header */}
      <header className="bg-[#122822] text-white border-b border-[#B45309]/50 shadow-xl sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1B3B32] border border-[#B45309] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#FEF3C7]" />
            </div>
            <div>
              <span className="text-[10px] text-[#B45309] font-bold uppercase tracking-widest block">
                ILLUMINATION BY GARGI STUDIO
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                ADMIN CONTROL DASHBOARD
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllAdminData}
              className="p-2 bg-[#1B3B32] border border-[#B45309]/40 text-[#FEF3C7] hover:bg-[#B45309] transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onLogout}
              className="btn-gold text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span>EXIT ADMIN</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8">
        
        {/* Flash Message Banner */}
        {statusMsg && (
          <div className="mb-6 p-4 bg-[#1B3B32] border-2 border-[#B45309] text-[#FEF3C7] text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-[#B45309]" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Quick Summary Cards Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 border border-[#E8E3DA] shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL CANDLES</span>
              <Package className="w-4 h-4 text-[#B45309]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#111827]">{products.length}</div>
          </div>

          <div className="bg-white p-4 border border-[#E8E3DA] shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL ORDERS</span>
              <ShoppingBag className="w-4 h-4 text-[#1B3B32]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#111827]">{orders.length}</div>
          </div>

          <div className="bg-white p-4 border border-[#E8E3DA] shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">PENDING DROPS</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#111827]">{activeDrop ? 1 : 0}</div>
          </div>

          <div className="bg-white p-4 border border-[#E8E3DA] shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">CLIENT REVIEWS</span>
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#111827]">{reviews.length}</div>
          </div>

          <div className="bg-white p-4 border border-[#E8E3DA] shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">PROMO COUPONS</span>
              <Ticket className="w-4 h-4 text-rose-600" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#111827]">{coupons.length}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E3DA] mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('products')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'products'
                ? 'border-[#B45309] text-[#B45309] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            CANdle CATALOG ({products.length})
          </button>

          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'orders'
                ? 'border-[#B45309] text-[#B45309] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            CUSTOMER ORDERS ({orders.length})
          </button>

          <button
            onClick={() => setActiveSubTab('drops')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'drops'
                ? 'border-[#B45309] text-[#B45309] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            UPCOMING DROP TIMER
          </button>

          <button
            onClick={() => setActiveSubTab('reviews')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'reviews'
                ? 'border-[#B45309] text-[#B45309] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            CLIENT REVIEWS ({reviews.length})
          </button>

          <button
            onClick={() => setActiveSubTab('coupons')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'coupons'
                ? 'border-[#B45309] text-[#B45309] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            DISCOUNT COUPONS ({coupons.length})
          </button>
        </div>

        {/* --- TAB 1: PRODUCTS MANAGER --- */}
        {activeSubTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 border border-[#E8E3DA]">
              <h3 className="font-serif text-lg font-bold text-[#111827] uppercase tracking-wider">
                MANAGE CANDLE INVENTORY & PRICING
              </h3>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: 'Kashmiri Saffron & Smoked Vanilla',
                    tagline: 'Artisanal soy candle in amber glass',
                    description: 'Hand-poured candle with pure saffron extracts.',
                    price: 999,
                    originalPrice: 1399,
                    category: 'soy-coconut',
                    scentFamily: 'warm-cozy',
                    stock: 50,
                    isBestSeller: true,
                    isNewItem: true,
                    image: '/candle_vanilla.jpg',
                    burnTime: '60 Hours',
                    weight: '320g / 11.2 oz',
                    waxType: 'Organic Soy Wax',
                    wickType: 'Whispering Wood Wick',
                    jarMaterial: 'Amber Glass',
                    mood: 'Royal Luxury',
                    scentProfile: { top: ['Saffron'], heart: ['Vanilla'], base: ['Cedar'] }
                  });
                  setIsAddProductOpen(true);
                }}
                className="btn-kimirica text-xs py-2 px-4 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW CANDLE</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-[#E8E3DA] overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1B3B32] text-[#FEF3C7] uppercase tracking-wider font-bold">
                    <th className="p-3">Candle</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Scent Family</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DA]">
                  {products.map((p) => (
                    <tr key={p._id || p.id} className="hover:bg-[#FAFAF7] transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover border border-[#E8E3DA]" />
                        <div>
                          <div className="font-semibold text-[#111827] line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-stone-500 line-clamp-1">{p.tagline}</div>
                        </div>
                      </td>
                      <td className="p-3 font-semibold uppercase text-stone-700">{p.category}</td>
                      <td className="p-3 text-stone-600">{p.scentFamily}</td>
                      <td className="p-3 font-bold text-[#B45309]">
                        ₹{p.price} <span className="text-stone-400 line-through text-[10px] font-normal">₹{p.originalPrice}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold ${p.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3 space-x-1">
                        {p.isBestSeller && <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 text-[9px] font-bold uppercase">BESTSELLER</span>}
                        {p.isNewItem && <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 text-[9px] font-bold uppercase">NEW</span>}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm({ ...p });
                            setIsAddProductOpen(true);
                          }}
                          className="p-1.5 text-stone-600 hover:text-[#B45309] transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id || p.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 2: ORDERS MANAGER --- */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#111827] uppercase tracking-wider bg-white p-4 border border-[#E8E3DA]">
              CUSTOMER ORDERS STATUS & LOGISTICS
            </h3>

            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#E8E3DA]">
                <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-light uppercase tracking-wider">No customer orders placed yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord._id || ord.orderId} className="bg-white p-6 border border-[#E8E3DA] shadow-sm space-y-4">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E8E3DA] pb-3 gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#B45309]">ORDER #{ord.orderId || ord._id}</span>
                        <div className="text-[10px] text-stone-500">{new Date(ord.createdAt).toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(ord._id || ord.orderId, e.target.value)}
                          className="bg-[#FAFAF7] border border-[#111827] text-xs font-bold uppercase p-1.5 focus:outline-none"
                        >
                          <option value="Pending">PENDING</option>
                          <option value="Processing">PROCESSING</option>
                          <option value="Shipped">SHIPPED</option>
                          <option value="Delivered">DELIVERED</option>
                          <option value="Cancelled">CANCELLED</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-bold text-stone-900 block mb-1 uppercase tracking-wider">Customer Shipping Details</span>
                        <div className="text-stone-600 leading-relaxed uppercase">
                          <p className="font-semibold text-[#111827]">{ord.shippingAddress?.name}</p>
                          <p>{ord.shippingAddress?.phone}</p>
                          <p>{ord.shippingAddress?.address}, {ord.shippingAddress?.city} - {ord.shippingAddress?.pincode}</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-stone-900 block mb-1 uppercase tracking-wider">Items Ordered</span>
                        <div className="space-y-1">
                          {ord.orderItems?.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-stone-700">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="font-semibold">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-stone-900 block mb-1 uppercase tracking-wider">Payment Summary</span>
                        <div className="bg-[#FAFAF7] p-2.5 border border-[#E8E3DA] space-y-1 text-stone-600">
                          <div className="flex justify-between">
                            <span>Payment Mode:</span>
                            <span className="font-bold uppercase text-[#1B3B32]">{ord.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-[#E8E3DA]">
                            <span>Final Total:</span>
                            <span className="text-[#B45309]">₹{ord.pricing?.finalTotal}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: UPCOMING DROP TIMER --- */}
        {activeSubTab === 'drops' && (
          <div className="bg-white p-6 border border-[#E8E3DA] max-w-2xl mx-auto space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#111827] uppercase tracking-wider border-b border-[#E8E3DA] pb-3">
              CONFIGURE LIMITED DROP COUNTDOWN BANNER
            </h3>

            <form onSubmit={handleSaveDrop} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Badge Text</label>
                <input
                  type="text"
                  required
                  value={dropForm.badgeText}
                  onChange={(e) => setDropForm({ ...dropForm, badgeText: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 uppercase text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Collection Title</label>
                <input
                  type="text"
                  required
                  value={dropForm.title}
                  onChange={(e) => setDropForm({ ...dropForm, title: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 uppercase font-bold text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={dropForm.description}
                  onChange={(e) => setDropForm({ ...dropForm, description: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Launch Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={dropForm.launchDate}
                    onChange={(e) => setDropForm({ ...dropForm, launchDate: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Available Units</label>
                  <input
                    type="number"
                    required
                    value={dropForm.totalUnits}
                    onChange={(e) => setDropForm({ ...dropForm, totalUnits: Number(e.target.value) })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Product Teaser Image URL</label>
                <input
                  type="text"
                  required
                  value={dropForm.image}
                  onChange={(e) => setDropForm({ ...dropForm, image: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <button type="submit" className="btn-kimirica text-xs py-3 px-6 w-full justify-center">
                <span>UPDATE UPCOMING DROP BANNER</span>
              </button>
            </form>
          </div>
        )}

        {/* --- TAB 4: REVIEWS MODERATION --- */}
        {activeSubTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#111827] uppercase tracking-wider bg-white p-4 border border-[#E8E3DA]">
              CLIENT REVIEWS & MODERATION PORTAL
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((r) => (
                <div key={r._id || r.id} className="bg-white p-5 border border-[#E8E3DA] shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-[#111827] text-xs uppercase">{r.name} ({r.city})</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold ${r.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'}`}>
                        {r.isApproved ? 'APPROVED' : 'HIDDEN'}
                      </span>
                    </div>
                    <p className="text-stone-600 text-xs italic">"{r.text}"</p>
                    <span className="text-[10px] text-[#B45309] font-bold block mt-2">Product: {r.boughtProduct}</span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-[#E8E3DA]">
                    <button
                      onClick={() => handleToggleReview(r._id || r.id)}
                      className="btn-outline-kimirica text-[10px] py-1.5 px-3 flex-1 justify-center"
                    >
                      {r.isApproved ? 'Hide Review' : 'Approve Review'}
                    </button>
                    <button
                      onClick={() => handleDeleteReview(r._id || r.id)}
                      className="p-2 text-rose-600 border border-rose-200 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: COUPONS MANAGER --- */}
        {activeSubTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 bg-white p-6 border border-[#E8E3DA] h-fit">
              <h3 className="font-serif text-base font-bold text-[#111827] uppercase tracking-wider mb-4 border-b border-[#E8E3DA] pb-2">
                CREATE PROMO CODE
              </h3>

              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 uppercase font-mono font-bold text-stone-900 focus:border-[#B45309]"
                    placeholder="FESTIVE15"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Discount %</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={90}
                    value={couponForm.discountPercent}
                    onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Max Disc (₹)</label>
                    <input
                      type="number"
                      required
                      value={couponForm.maxDiscount}
                      onChange={(e) => setCouponForm({ ...couponForm, maxDiscount: Number(e.target.value) })}
                      className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-900 uppercase tracking-wider block mb-1">Min Spend (₹)</label>
                    <input
                      type="number"
                      required
                      value={couponForm.minPurchase}
                      onChange={(e) => setCouponForm({ ...couponForm, minPurchase: Number(e.target.value) })}
                      className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-gold text-xs py-3 w-full justify-center">
                  <span>CREATE COUPON</span>
                </button>
              </form>
            </div>

            <div className="md:col-span-7 bg-white p-6 border border-[#E8E3DA]">
              <h3 className="font-serif text-base font-bold text-[#111827] uppercase tracking-wider mb-4 border-b border-[#E8E3DA] pb-2">
                ACTIVE DISCOUNTS & COUPONS
              </h3>

              <div className="space-y-3">
                {coupons.map((c) => (
                  <div key={c._id || c.code} className="p-4 bg-[#FAFAF7] border border-[#E8E3DA] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-base font-bold text-[#1B3B32]">{c.code}</span>
                      <span className="text-xs text-[#B45309] font-bold block">{c.discountPercent}% OFF (Max ₹{c.maxDiscount})</span>
                      <span className="text-[10px] text-stone-500">Min Order: ₹{c.minPurchase}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteCoupon(c._id)}
                      className="p-2 text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-[#E8E3DA] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8 shadow-2xl">
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111827] mb-4 pb-2 border-b border-[#E8E3DA]">
              {editingProduct ? 'EDIT CANDLE PRODUCT' : 'ADD NEW CANDLE TO CATALOG'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={productForm.tagline}
                    onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 font-bold text-[#B45309] focus:border-[#B45309]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Inventory Stock</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  >
                    <option value="soy-coconut">ORGANIC SOY & BEESWAX</option>
                    <option value="gift-sets">ARTISANAL CANDLE SETS</option>
                    <option value="aromatherapy">AROMATHERAPY & SPA</option>
                    <option value="wood-wick">WHISPERING WOOD WICK</option>
                    <option value="luxury-glass">CRYSTAL & AMBER GLASS</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Scent Family</label>
                  <select
                    value={productForm.scentFamily}
                    onChange={(e) => setProductForm({ ...productForm, scentFamily: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                  >
                    <option value="warm-cozy">WARM VANILLA & AMBER</option>
                    <option value="floral">FRENCH LAVENDER & ROSE</option>
                    <option value="fresh-citrus">BERGAMOT & EUCALYPTUS</option>
                    <option value="woody-earthy">ATLAS CEDAR & OUDH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2.5 text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={productForm.isNewItem}
                    onChange={(e) => setProductForm({ ...productForm, isNewItem: e.target.checked })}
                  />
                  <span>Mark as New Release</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E3DA]">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="btn-outline-kimirica text-xs py-2 px-5"
                >
                  CANCEL
                </button>
                <button type="submit" className="btn-kimirica text-xs py-2 px-6">
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
    </>
  );
}
