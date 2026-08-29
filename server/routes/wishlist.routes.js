import express from 'express';
import {
  getWishlist,
  toggleWishlist,
} from '../controllers/wishlist.controller.js';

const router = express.Router();

router.route('/').get(getWishlist);
router.route('/toggle').post(toggleWishlist);

export default router;
