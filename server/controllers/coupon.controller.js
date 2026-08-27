import Coupon from '../models/Coupon.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Public
export const validateCoupon = async (req, res, next) => {
  try {
    const { code, amount } = req.body;

    if (!code) {
      res.status(400);
      throw new Error('Coupon code is required');
    }

    const uppercaseCode = code.toUpperCase();

    let coupon;
    if (isDbConnected()) {
      coupon = await Coupon.findOne({ code: uppercaseCode, isActive: true });
    } else {
      coupon = inMemoryStore.coupons.find((c) => c.code === uppercaseCode && c.isActive);
    }

    if (!coupon) {
      res.status(404);
      throw new Error('Invalid or expired coupon code');
    }

    if (amount < coupon.minPurchase) {
      res.status(400);
      throw new Error(`Minimum purchase amount of ₹${coupon.minPurchase} required for this coupon`);
    }

    const discount = Math.min((amount * coupon.discountPercent) / 100, coupon.maxDiscount);

    return res.status(200).json({
      success: true,
      data: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        discountAmount: Math.round(discount),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
// @access  Private/Admin
export const getCoupons = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const coupons = await Coupon.find({});
      return res.status(200).json({ success: true, data: coupons });
    } else {
      return res.status(200).json({ success: true, data: inMemoryStore.coupons });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create coupon (Admin)
// @route   POST /api/coupons
// @access  Private/Admin
export const createCoupon = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const coupon = await Coupon.create(req.body);
      return res.status(201).json({ success: true, data: coupon });
    } else {
      const newCoupon = {
        _id: String(Date.now()),
        ...req.body,
        code: req.body.code.toUpperCase(),
        isActive: true,
      };
      inMemoryStore.coupons.push(newCoupon);
      return res.status(201).json({ success: true, data: newCoupon });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
export const deleteCoupon = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await Coupon.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Coupon removed' });
    } else {
      const idx = inMemoryStore.coupons.findIndex((c) => String(c._id) === String(req.params.id));
      if (idx !== -1) inMemoryStore.coupons.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Coupon removed' });
    }
  } catch (error) {
    next(error);
  }
};
