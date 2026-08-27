import express from 'express';
import { getBanners, createBanner, deleteBanner } from '../controllers/banner.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBanners).post(protect, admin, createBanner);
router.route('/:id').delete(protect, admin, deleteBanner);

export default router;
