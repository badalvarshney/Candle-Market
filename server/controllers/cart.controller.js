import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

const getSessionId = (req) => {
  return req.headers['x-session-id'] || 'default_guest_session';
};

// @desc    Get user/guest cart
// @route   GET /api/cart
// @access  Public
export const getCart = async (req, res, next) => {
  try {
    const sessionId = getSessionId(req);

    if (isDbConnected()) {
      let cart = await Cart.findOne({ sessionId });
      if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
      }
      return res.status(200).json({
        success: true,
        data: cart.items,
      });
    } else {
      // In-Memory Fallback
      return res.status(200).json({
        success: true,
        data: inMemoryStore.cart,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Public
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      res.status(400);
      throw new Error('Product ID is required');
    }

    const sessionId = getSessionId(req);
    const targetIdStr = String(productId);

    if (isDbConnected()) {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }

      let cart = await Cart.findOne({ sessionId });
      if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
      }

      const itemIdx = cart.items.findIndex(
        (item) => String(item.product) === targetIdStr
      );

      if (itemIdx > -1) {
        cart.items[itemIdx].quantity += Number(quantity);
      } else {
        cart.items.push({
          product: product._id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          waxType: product.waxType,
          burnTime: product.burnTime,
          quantity: Number(quantity),
        });
      }

      await cart.save();
      return res.status(200).json({
        success: true,
        message: 'Item added to bag',
        data: cart.items,
      });
    } else {
      // In-Memory Fallback
      const product = inMemoryStore.products.find(
        (p) => String(p._id) === targetIdStr || String(p.id) === targetIdStr
      );
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }

      const itemIdx = inMemoryStore.cart.findIndex(
        (item) => String(item.id || item.product) === targetIdStr
      );

      if (itemIdx > -1) {
        inMemoryStore.cart[itemIdx].quantity += Number(quantity);
      } else {
        inMemoryStore.cart.push({
          id: product._id || product.id,
          product: product._id || product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          waxType: product.waxType,
          burnTime: product.burnTime,
          quantity: Number(quantity),
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Item added to bag',
        data: inMemoryStore.cart,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Public
export const updateCartQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const sessionId = getSessionId(req);
    const targetIdStr = String(productId);

    if (isDbConnected()) {
      let cart = await Cart.findOne({ sessionId });
      if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
      }

      const itemIdx = cart.items.findIndex(
        (item) => String(item.product) === targetIdStr
      );

      if (itemIdx === -1) {
        res.status(404);
        throw new Error('Item not found in cart');
      }

      if (Number(quantity) <= 0) {
        cart.items.splice(itemIdx, 1);
      } else {
        cart.items[itemIdx].quantity = Number(quantity);
      }

      await cart.save();
      return res.status(200).json({
        success: true,
        data: cart.items,
      });
    } else {
      // In-Memory Fallback
      const itemIdx = inMemoryStore.cart.findIndex(
        (item) => String(item.id || item.product) === targetIdStr
      );

      if (itemIdx === -1) {
        res.status(404);
        throw new Error('Item not found in cart');
      }

      if (Number(quantity) <= 0) {
        inMemoryStore.cart.splice(itemIdx, 1);
      } else {
        inMemoryStore.cart[itemIdx].quantity = Number(quantity);
      }

      return res.status(200).json({
        success: true,
        data: inMemoryStore.cart,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Public
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const sessionId = getSessionId(req);
    const targetIdStr = String(productId);

    if (isDbConnected()) {
      let cart = await Cart.findOne({ sessionId });
      if (cart) {
        cart.items = cart.items.filter(
          (item) => String(item.product) !== targetIdStr
        );
        await cart.save();
      }
      return res.status(200).json({
        success: true,
        message: 'Item removed from cart',
        data: cart ? cart.items : [],
      });
    } else {
      // In-Memory Fallback
      inMemoryStore.cart = inMemoryStore.cart.filter(
        (item) => String(item.id || item.product) !== targetIdStr
      );
      return res.status(200).json({
        success: true,
        message: 'Item removed from cart',
        data: inMemoryStore.cart,
      });
    }
  } catch (error) {
    next(error);
  }
};
