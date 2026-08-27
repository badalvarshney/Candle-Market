import express from 'express';
import { getActiveDrop, createOrUpdateDrop } from '../controllers/drop.controller.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/active').get(getActiveDrop);
router.route('/').post(protect, admin, createOrUpdateDrop);

export default router;
