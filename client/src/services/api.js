import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getGuestSessionId = () => {
  let sessionId = localStorage.getItem('guestSessionId');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('guestSessionId', sessionId);
  }
  return sessionId;
};

// Interceptor to add Auth JWT Token & Guest Session ID
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['x-session-id'] = getGuestSessionId();
  return config;
});

// Utility function to get full image URL (handles relative /uploads/ URLs)
export const getImageUrl = (url) => {
  if (!url) return '/candle_vanilla.jpg';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    // Derive server base URL from API_BASE_URL (http://localhost:5000)
    const serverBase = API_BASE_URL.replace(/\/api$/, '');
    return `${serverBase}${url}`;
  }
  return url;
};

export const uploadImageAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const fetchProductsAPI = async (params = {}) => {
  const res = await api.get('/products', { params });
  return res.data.data;
};

export const createProductAPI = async (productData) => {
  const res = await api.post('/products', productData);
  return res.data.data;
};

export const updateProductAPI = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData);
  return res.data.data;
};

export const deleteProductAPI = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const fetchBannersAPI = async (all = false) => {
  const res = await api.get('/banners', { params: { all } });
  return res.data.data;
};

export const createBannerAPI = async (bannerData) => {
  const res = await api.post('/banners', bannerData);
  return res.data.data;
};

export const updateBannerAPI = async (id, bannerData) => {
  const res = await api.put(`/banners/${id}`, bannerData);
  return res.data.data;
};

export const deleteBannerAPI = async (id) => {
  const res = await api.delete(`/banners/${id}`);
  return res.data;
};


export const fetchActiveDropAPI = async () => {
  const res = await api.get('/drops/active');
  return res.data.data;
};

export const createDropAPI = async (dropData) => {
  const res = await api.post('/drops', dropData);
  return res.data.data;
};

export const fetchReviewsAPI = async () => {
  const res = await api.get('/reviews');
  return res.data.data;
};

export const fetchAdminReviewsAPI = async () => {
  const res = await api.get('/reviews/admin');
  return res.data.data;
};

export const submitReviewAPI = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res.data.data;
};

export const toggleReviewApprovalAPI = async (id) => {
  const res = await api.put(`/reviews/${id}/approve`);
  return res.data.data;
};

export const deleteReviewAPI = async (id) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};

export const placeOrderAPI = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data.data;
};

export const fetchOrdersAPI = async () => {
  const res = await api.get('/orders');
  return res.data.data;
};

export const updateOrderStatusAPI = async (id, statusData) => {
  const res = await api.put(`/orders/${id}/status`, statusData);
  return res.data.data;
};

export const validateCouponAPI = async (code, amount) => {
  const res = await api.post('/coupons/validate', { code, amount });
  return res.data.data;
};

export const fetchCouponsAPI = async () => {
  const res = await api.get('/coupons');
  return res.data.data;
};

export const createCouponAPI = async (couponData) => {
  const res = await api.post('/coupons', couponData);
  return res.data.data;
};

export const deleteCouponAPI = async (id) => {
  const res = await api.delete(`/coupons/${id}`);
  return res.data;
};

export const adminLoginAPI = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data.data;
};

// --- WISHLIST APIs ---
export const fetchWishlistAPI = async () => {
  const res = await api.get('/wishlist');
  return res.data.data;
};

export const toggleWishlistAPI = async (productId) => {
  const res = await api.post('/wishlist/toggle', { productId });
  return res.data;
};

// --- CART / BAG APIs ---
export const fetchCartAPI = async () => {
  const res = await api.get('/cart');
  return res.data.data;
};

export const addToCartAPI = async (productId, quantity = 1) => {
  const res = await api.post('/cart', { productId, quantity });
  return res.data;
};

export const updateCartQtyAPI = async (productId, quantity) => {
  const res = await api.put(`/cart/${productId}`, { quantity });
  return res.data.data;
};

export const removeFromCartAPI = async (productId) => {
  const res = await api.delete(`/cart/${productId}`);
  return res.data.data;
};

export default api;

