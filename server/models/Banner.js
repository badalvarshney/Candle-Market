import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    ctaPrimary: { type: String, default: 'EXPLORE COLLECTION' },
    ctaSecondary: { type: String, default: 'TAKE SCENT QUIZ' },
    categoryAction: { type: String, default: '' },
    image: { type: String, required: true },
    accentTag: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
