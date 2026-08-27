import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be positive'],
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      default: 'soy-coconut',
    },
    scentFamily: {
      type: String,
      required: true,
      default: 'warm-cozy',
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    burnTime: {
      type: String,
      default: '60 Hours',
    },
    weight: {
      type: String,
      default: '320g / 11.2 oz',
    },
    waxType: {
      type: String,
      default: '100% Organic Soy Wax',
    },
    wickType: {
      type: String,
      default: 'Whispering Wood Wick',
    },
    jarMaterial: {
      type: String,
      default: 'Handblown Amber Glass',
    },
    image: {
      type: String,
      default: '/candle_vanilla.jpg',
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewItem: {
      type: Boolean,
      default: false,
    },
    scentProfile: {
      top: [{ type: String }],
      heart: [{ type: String }],
      base: [{ type: String }],
    },
    mood: {
      type: String,
      default: 'Sensory Relaxation',
    },
    stock: {
      type: Number,
      default: 50,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
