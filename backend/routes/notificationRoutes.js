// routes/notificationRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, (req, res) => {
  // For testing, return dummy notifications
  res.json([
    {
      _id: '1',
      title: 'Welcome!',
      message: 'Your admin dashboard is ready.',
      read: false,
      type: 'success',
      createdAt: new Date(),
    },
  ]);
});

export default router;
