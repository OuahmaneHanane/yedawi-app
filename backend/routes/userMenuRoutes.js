// routes/menu.js
import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';


// You can build this list dynamically (e.g. from DB or roles)
router.get('/user/menu', protect, (req, res) => {
  const isAdmin = req.user?.role === 'admin';

  const menu = isAdmin
    ? [
        { id: 'dashboard', iconName: 'Activity', label: 'Admin Dashboard' },
        { id: 'users', iconName: 'Users', label: 'Users' },
        { id: 'requests', iconName: 'ClipboardList', label: 'All Requests' },
        { id: 'donations', iconName: 'FolderHeart', label: 'All Donations' },
      ]
    : [
        { id: 'dashboard', iconName: 'TrendingUp', label: 'Dashboard' },
        { id: 'mydonations', iconName: 'FolderHeart', label: 'My Donations' },
        { id: 'myrequests', iconName: 'ClipboardList', label: 'My Requests' },
        { id: 'support', iconName: 'MessageCircle', label: 'Support' },
        { id: 'notifications', iconName: 'Bell', label: 'Notifications' }
      ];

  res.json({ menu });
});

export default router;