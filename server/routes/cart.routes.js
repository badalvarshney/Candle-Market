import express from 'express';
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.route('/').get(getCart).post(addToCart);
router.route('/:productId').put(updateCartQuantity).delete(removeFromCart);

export default router;
