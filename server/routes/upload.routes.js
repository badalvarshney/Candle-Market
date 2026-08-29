import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  protect,
  admin,
  (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || 'Image upload failed',
        });
      }
      next();
    });
  },
  uploadImage
);

export default router;

