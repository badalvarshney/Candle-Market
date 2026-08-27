import Banner from '../models/Banner.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get active banners
// @route   GET /api/banners
// @access  Public
export const getBanners = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
      return res.status(200).json({ success: true, data: banners });
    } else {
      const list = inMemoryStore.banners.filter((b) => b.isActive);
      return res.status(200).json({ success: true, data: list });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create banner (Admin)
// @route   POST /api/banners
// @access  Private/Admin
export const createBanner = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const banner = await Banner.create(req.body);
      return res.status(201).json({ success: true, data: banner });
    } else {
      const newBanner = {
        _id: String(Date.now()),
        ...req.body,
        isActive: true,
      };
      inMemoryStore.banners.push(newBanner);
      return res.status(201).json({ success: true, data: newBanner });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete banner (Admin)
// @route   DELETE /api/banners/:id
// @access  Private/Admin
export const deleteBanner = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await Banner.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Banner removed' });
    } else {
      const idx = inMemoryStore.banners.findIndex((b) => String(b._id) === String(req.params.id));
      if (idx !== -1) inMemoryStore.banners.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Banner removed' });
    }
  } catch (error) {
    next(error);
  }
};
