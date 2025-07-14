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
router.get('/me/donations', protect, getUserDonations);
router.get('/me/requests', protect, getUserRequests);
router.get('/me/notifications', protect, getUserNotifications);
router.get('/dashboard/summary', protect, getDashboardSummary);
router.put('/notifications/:id/read', protect, markNotificationRead);
// router.put('/notifications/mark-all-read', protect, markAllNotificationsRead);
router.get('/', protect, adminOnly, getAllUsers);
router.get('/:id', protect, adminOnly, getUserById);

export default router;
