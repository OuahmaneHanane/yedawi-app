import express from 'express';
import { markDonationAsUsed } from '../controllers/donationController.js';
import {
  approveRequest,
  rejectRequest,
  getPendingRequests,
} from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/pending', protect, authorizeRoles('admin'), getPendingRequests);
router.put('/approve/:id', protect, authorizeRoles('admin'), approveRequest);
router.put('/reject/:id', protect, authorizeRoles('admin'), rejectRequest);
router.put('/donations/:id/complete', protect, authorizeRoles('admin'), markDonationAsUsed);

export default router;
