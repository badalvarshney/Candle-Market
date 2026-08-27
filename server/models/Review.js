import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: 'Mumbai',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    text: {
      type: String,
      required: true,
    },
    boughtProduct: {
      type: String,
      default: 'Artisanal Botanical Candle',
    },
    isApproved: {
      type: Boolean,
      default: true, // Default to true or controlled by admin
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
