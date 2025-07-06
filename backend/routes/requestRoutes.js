import express from 'express';
import {
  createRequest,
  getUserRequests,
  getAllRequests,
} from '../controllers/requestController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Create request (with document)
router.post('/', protect, upload.single('supportingDocument'), createRequest);

// Authenticated user's own requests
router.get('/my-requests', protect, getUserRequests);

// Admin: view all requests
router.get('/all', protect, authorizeRoles('admin'), getAllRequests);

export default router;
