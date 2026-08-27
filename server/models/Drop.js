import mongoose from 'mongoose';

const dropSchema = new mongoose.Schema(
  {
    badgeText: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    launchDate: { type: Date, required: true },
    totalUnits: { type: Number, default: 250 },
    image: { type: String, required: true },
    subtitle: { type: String, default: 'LIMITED EDITION' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Drop = mongoose.model('Drop', dropSchema);

export default Drop;
