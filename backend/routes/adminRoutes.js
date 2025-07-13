import express from 'express';
import { markDonationAsUsed } from '../controllers/donationController.js';
import {
  approveRequest,
  rejectRequest,
  getPendingRequests,
} from '../controllers/adminController.js';
import { protect, authorizeRoles, adminOnly } from '../middleware/authMiddleware.js';
import { getAllRequests } from '../controllers/requestController.js';

const router = express.Router();

// Admin routes
router.get('/pending', protect, authorizeRoles('admin'), getPendingRequests);
router.put('/approve/:id', protect, authorizeRoles('admin'), approveRequest);
router.put('/reject/:id', protect, authorizeRoles('admin'), rejectRequest);
router.put('/donations/:id/complete', protect, authorizeRoles('admin'), markDonationAsUsed);

// ✅ This one is your target route
router.get('/requests/all', protect, adminOnly, getAllRequests);

export default router;
