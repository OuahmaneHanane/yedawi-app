// import express from 'express';
// import { getUserProfile } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/me', protect, getUserProfile);
// router.get('/dashboard/summary', protect, async (req, res) => {
//   const userId = req.user.id;              // set by auth middleware

//   // Count only this user’s docs
//   const [donations, requests] = await Promise.all([
//     Donation.countDocuments({ user: userId }),
//     Request.countDocuments({ user: userId })
//   ]);

//   res.json({ donations, requests });
// });

// export default router;


import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserProfile,
  getUserDonations,
  getUserRequests,
  getUserNotifications
} from '../controllers/userController.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.get('/me/donations', protect, getUserDonations);
router.get('/me/requests', protect, getUserRequests);
router.get('/me/notifications', protect, getUserNotifications);

export default router;
