import Product from '../models/Product.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryDb.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all products (with optional filtering)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, scentFamily, maxPrice, search, sortBy } = req.query;

    if (isDbConnected()) {
      let query = {};

      if (category && category !== 'all') {
        query.category = category;
      }

      if (scentFamily && scentFamily !== 'all') {
        query.scentFamily = scentFamily;
      }

      if (maxPrice) {
        query.price = { $lte: Number(maxPrice) };
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { tagline: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      let sortOptions = {};
      if (sortBy === 'price-low') sortOptions.price = 1;
      else if (sortBy === 'price-high') sortOptions.price = -1;
      else if (sortBy === 'rating') sortOptions.rating = -1;
      else sortOptions.createdAt = -1;

      const products = await Product.find(query).sort(sortOptions);

      return res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } else {
      // In-Memory Fallback
      let list = [...inMemoryStore.products];

      if (category && category !== 'all') {
        list = list.filter((p) => p.category === category);
      }
      if (scentFamily && scentFamily !== 'all') {
        list = list.filter((p) => p.scentFamily === scentFamily);
      }
      if (maxPrice) {
        list = list.filter((p) => p.price <= Number(maxPrice));
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.tagline.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s)
        );
      }

      if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

      return res.status(200).json({
        success: true,
        count: list.length,
        data: list,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      return res.status(200).json({ success: true, data: product });
    } else {
      const product = inMemoryStore.products.find(
        (p) => String(p._id) === String(req.params.id) || String(p.id) === String(req.params.id)
      );
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      return res.status(200).json({ success: true, data: product });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const product = await Product.create(req.body);
      return res.status(201).json({ success: true, data: product });
    } else {
      const newProduct = {
        _id: String(Date.now()),
        id: Date.now(),
        ...req.body,
        scentProfile: req.body.scentProfile || { top: [], heart: [], base: [] },
      };
      inMemoryStore.products.unshift(newProduct);
      return res.status(201).json({ success: true, data: newProduct });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      return res.status(200).json({ success: true, data: product });
    } else {
      const idx = inMemoryStore.products.findIndex(
        (p) => String(p._id) === String(req.params.id) || String(p.id) === String(req.params.id)
      );
      if (idx === -1) {
        res.status(404);
        throw new Error('Product not found');
      }
      inMemoryStore.products[idx] = { ...inMemoryStore.products[idx], ...req.body };
      return res.status(200).json({ success: true, data: inMemoryStore.products[idx] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      return res.status(200).json({ success: true, message: 'Product removed successfully' });
    } else {
      const idx = inMemoryStore.products.findIndex(
        (p) => String(p._id) === String(req.params.id) || String(p.id) === String(req.params.id)
      );
      if (idx === -1) {
        res.status(404);
        throw new Error('Product not found');
      }
      inMemoryStore.products.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Product removed successfully' });
    }
  } catch (error) {
    next(error);
  }
};
