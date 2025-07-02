import express from 'express';
import {
  createRequest,
  getMyRequests,
  getAllRequests,
} from '../controllers/requestController.js';
import { protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createRequest);
router.get('/mine', protect, getMyRequests);
router.get('/all', protect, getAllRequests); // maybe admin only

export default router;
