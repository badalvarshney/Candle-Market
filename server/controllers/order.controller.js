import Order from '../models/Order.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, orderItems, paymentMethod, pricing } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items provided');
    }

    const orderId = `IL-${Math.floor(100000 + Math.random() * 900000)}`;

    if (isDbConnected()) {
      const order = await Order.create({
        orderId,
        user: req.user ? req.user._id : null,
        shippingAddress,
        orderItems,
        paymentMethod,
        pricing,
        orderStatus: 'Pending',
      });
      return res.status(201).json({ success: true, data: order });
    } else {
      const newOrder = {
        _id: String(Date.now()),
        orderId,
        shippingAddress,
        orderItems,
        paymentMethod,
        pricing,
        orderStatus: 'Pending',
        isPaid: false,
        trackingNumber: '',
        createdAt: new Date().toISOString(),
      };
      inMemoryStore.orders.unshift(newOrder);
      return res.status(201).json({ success: true, data: newOrder });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: orders.length, data: orders });
    } else {
      return res.status(200).json({
        success: true,
        count: inMemoryStore.orders.length,
        data: inMemoryStore.orders,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID or orderId
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const order = await Order.findOne({
        $or: [{ _id: req.params.id }, { orderId: req.params.id }],
      });
      if (!order) {
        res.status(404);
        throw new Error('Order not found');
      }
      return res.status(200).json({ success: true, data: order });
    } else {
      const order = inMemoryStore.orders.find(
        (o) => String(o._id) === String(req.params.id) || o.orderId === req.params.id
      );
      if (!order) {
        res.status(404);
        throw new Error('Order not found');
      }
      return res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, trackingNumber } = req.body;

    if (isDbConnected()) {
      const order = await Order.findById(req.params.id);
      if (!order) {
        res.status(404);
        throw new Error('Order not found');
      }
      if (orderStatus) order.orderStatus = orderStatus;
      if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
      if (orderStatus === 'Delivered') order.isPaid = true;
      const updatedOrder = await order.save();
      return res.status(200).json({ success: true, data: updatedOrder });
    } else {
      const order = inMemoryStore.orders.find(
        (o) => String(o._id) === String(req.params.id) || o.orderId === req.params.id
      );
      if (!order) {
        res.status(404);
        throw new Error('Order not found');
      }
      if (orderStatus) order.orderStatus = orderStatus;
      if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
      if (orderStatus === 'Delivered') order.isPaid = true;
      return res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};
