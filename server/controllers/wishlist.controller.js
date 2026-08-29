import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

const getSessionId = (req) => {
  return req.headers['x-session-id'] || 'default_guest_session';
};

// @desc    Get user/guest wishlist
// @route   GET /api/wishlist
// @access  Public
export const getWishlist = async (req, res, next) => {
  try {
    const sessionId = getSessionId(req);

    if (isDbConnected()) {
      let wishlist = await Wishlist.findOne({ sessionId });
      if (!wishlist) {
        wishlist = await Wishlist.create({ sessionId, products: [] });
      }
      const productIds = wishlist.products.map((p) => String(p));
      const validObjectIds = productIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
      const products = await Product.find({
        $or: [{ _id: { $in: validObjectIds } }, { id: { $in: productIds } }],
      });

      return res.status(200).json({
        success: true,
        data: {
          productIds,
          products,
        },
      });
    } else {
      // In-Memory Fallback
      const productIds = inMemoryStore.wishlist.map((id) => String(id));
      const products = inMemoryStore.products.filter((p) =>
        productIds.includes(String(p._id || p.id))
      );
      return res.status(200).json({
        success: true,
        data: {
          productIds,
          products,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle product in wishlist (Add/Remove)
// @route   POST /api/wishlist/toggle
// @access  Public
export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res.status(400);
      throw new Error('Product ID is required');
    }

    const sessionId = getSessionId(req);
    const targetIdStr = String(productId);

    if (isDbConnected()) {
      let wishlist = await Wishlist.findOne({ sessionId });
      if (!wishlist) {
        wishlist = await Wishlist.create({ sessionId, products: [targetIdStr] });
      } else {
        const index = wishlist.products.findIndex(
          (p) => String(p) === targetIdStr
        );
        if (index > -1) {
          wishlist.products.splice(index, 1);
        } else {
          wishlist.products.push(targetIdStr);
        }
        await wishlist.save();
      }

      const productIds = wishlist.products.map((p) => String(p));
      const isWishlisted = productIds.includes(targetIdStr);
      const validObjectIds = productIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
      const products = await Product.find({
        $or: [{ _id: { $in: validObjectIds } }, { id: { $in: productIds } }],
      });

      return res.status(200).json({
        success: true,
        message: isWishlisted ? 'Added to wishlist' : 'Removed from wishlist',
        data: {
          isWishlisted,
          productIds,
          products,
        },
      });
    } else {
      // In-Memory Fallback
      const index = inMemoryStore.wishlist.findIndex(
        (id) => String(id) === targetIdStr
      );
      let isWishlisted = false;
      if (index > -1) {
        inMemoryStore.wishlist.splice(index, 1);
        isWishlisted = false;
      } else {
        inMemoryStore.wishlist.push(targetIdStr);
        isWishlisted = true;
      }

      const productIds = inMemoryStore.wishlist.map((id) => String(id));
      const products = inMemoryStore.products.filter((p) =>
        productIds.includes(String(p._id || p.id))
      );

      return res.status(200).json({
        success: true,
        message: isWishlisted ? 'Added to wishlist' : 'Removed from wishlist',
        data: {
          isWishlisted,
          productIds,
          products,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
