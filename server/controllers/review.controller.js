import Review from '../models/Review.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } else {
      const list = inMemoryStore.reviews.filter((r) => r.isApproved);
      return res.status(200).json({ success: true, count: list.length, data: list });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews including unapproved (Admin)
// @route   GET /api/reviews/admin
// @access  Private/Admin
export const getAdminReviews = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const reviews = await Review.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } else {
      return res.status(200).json({
        success: true,
        count: inMemoryStore.reviews.length,
        data: inMemoryStore.reviews,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res, next) => {
  try {
    const { name, city, rating, text, boughtProduct } = req.body;

    if (isDbConnected()) {
      const review = await Review.create({
        name,
        city: city || 'Mumbai',
        rating: Number(rating) || 5,
        text,
        boughtProduct: boughtProduct || 'Artisanal Candle',
        isApproved: true,
      });
      return res.status(201).json({ success: true, data: review });
    } else {
      const newReview = {
        _id: String(Date.now()),
        id: Date.now(),
        name,
        city: city || 'Mumbai',
        rating: Number(rating) || 5,
        text,
        boughtProduct: boughtProduct || 'Artisanal Candle',
        isApproved: true,
        createdAt: new Date().toISOString(),
      };
      inMemoryStore.reviews.unshift(newReview);
      return res.status(201).json({ success: true, data: newReview });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle review approval status (Admin)
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
export const toggleReviewApproval = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const review = await Review.findById(req.params.id);
      if (!review) {
        res.status(404);
        throw new Error('Review not found');
      }
      review.isApproved = !review.isApproved;
      await review.save();
      return res.status(200).json({ success: true, data: review });
    } else {
      const review = inMemoryStore.reviews.find(
        (r) => String(r._id) === String(req.params.id) || String(r.id) === String(req.params.id)
      );
      if (!review) {
        res.status(404);
        throw new Error('Review not found');
      }
      review.isApproved = !review.isApproved;
      return res.status(200).json({ success: true, data: review });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review (Admin)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) {
        res.status(404);
        throw new Error('Review not found');
      }
      return res.status(200).json({ success: true, message: 'Review removed successfully' });
    } else {
      const idx = inMemoryStore.reviews.findIndex(
        (r) => String(r._id) === String(req.params.id) || String(r.id) === String(req.params.id)
      );
      if (idx === -1) {
        res.status(404);
        throw new Error('Review not found');
      }
      inMemoryStore.reviews.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Review removed successfully' });
    }
  } catch (error) {
    next(error);
  }
};
