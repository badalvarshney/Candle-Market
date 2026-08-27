import Drop from '../models/Drop.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get current active drop
// @route   GET /api/drops/active
// @access  Public
export const getActiveDrop = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const drop = await Drop.findOne({ isActive: true }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: drop || inMemoryStore.drop });
    } else {
      return res.status(200).json({ success: true, data: inMemoryStore.drop });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create/Update drop (Admin)
// @route   POST /api/drops
// @access  Private/Admin
export const createOrUpdateDrop = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await Drop.updateMany({}, { isActive: false });
      const drop = await Drop.create({ ...req.body, isActive: true });
      return res.status(201).json({ success: true, data: drop });
    } else {
      inMemoryStore.drop = {
        _id: String(Date.now()),
        ...req.body,
        isActive: true,
      };
      return res.status(201).json({ success: true, data: inMemoryStore.drop });
    }
  } catch (error) {
    next(error);
  }
};
