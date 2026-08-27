import express from 'express';
import {
  getReviews,
  getAdminReviews,
  createReview,
  toggleReviewApproval,
  deleteReview,
} from '../controllers/review.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getReviews).post(createReview);
router.route('/admin').get(protect, admin, getAdminReviews);
router.route('/:id/approve').put(protect, admin, toggleReviewApproval);
router.route('/:id').delete(protect, admin, deleteReview);

export default router;
