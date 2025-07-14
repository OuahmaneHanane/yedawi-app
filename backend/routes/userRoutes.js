import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
   getUserProfile,
  getUserDonations,
  getUserRequests,
  getUserNotifications,
  getDashboardSummary,
  markNotificationRead,
  // markAllNotificationsRead,
  getAllUsers,
  getUserById,
  updateUserProfile
} from '../controllers/userController.js';
import Donation from '../models/Donation.js';
import Request from '../models/Request.js';

const router = express.Router();

// router.get('/dashboard/summary', protect, async (req, res) => {
//   const userId = req.user.id;              // set by auth middleware

//   // Count only this user’s docs
//   const [donations, requests] = await Promise.all([
//     Donation.countDocuments({ user: userId }),
//     Request.countDocuments({ user: userId })
//   ]);

//   res.json({ donations, requests });
// });

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);

router.get('/me/donations', protect, getUserDonations);
router.get('/me/requests', protect, getUserRequests);
router.get('/me/notifications', protect, getUserNotifications);
router.get('/dashboard/summary', protect, getDashboardSummary);
router.put('/notifications/:id/read', protect, markNotificationRead);
// router.put('/notifications/mark-all-read', protect, markAllNotificationsRead);
router.get('/', protect, adminOnly, getAllUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.get('/', (req, res) => {
  // Just return some dummy data to test
  res.json([
    { _id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
  ]);
});
// Note: The 3-per-month limit for beneficiary requests is enforced inside the
// createRequest controller, which is used in the requests route, not here.

export default router;
