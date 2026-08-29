import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      default: 'default_guest_session',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
