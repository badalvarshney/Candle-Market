import express from 'express';
import healthRoutes from './health.routes.js';
import productRoutes from './product.routes.js';
import authRoutes from './auth.routes.js';
import orderRoutes from './order.routes.js';
import reviewRoutes from './review.routes.js';
import bannerRoutes from './banner.routes.js';
import dropRoutes from './drop.routes.js';
import couponRoutes from './coupon.routes.js';
import uploadRoutes from './upload.routes.js';
import wishlistRoutes from './wishlist.routes.js';
import cartRoutes from './cart.routes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/banners', bannerRoutes);
router.use('/drops', dropRoutes);
router.use('/coupons', couponRoutes);
router.use('/upload', uploadRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/cart', cartRoutes);

export default router;


