import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(createOrder).get(protect, admin, getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;
