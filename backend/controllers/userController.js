import Donation from '../models/Donation.js';
import Request from '../models/Request.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

// GET /api/user/me
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/user/donations
export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations.' });
  }
};

// GET /api/user/requests
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('pharmacyCode');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests.' });
  }
};

// GET /api/user/notifications
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
};
// GET /api/user/dashboard/summary
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [donationCount, requestCount, unreadNotifications] = await Promise.all([
      Donation.countDocuments({ user: userId }),
      Request.countDocuments({ user: userId }),
      Notification.countDocuments({ user: userId, read: false }),
    ]);

    res.json({
      donations: donationCount,
      requests: requestCount,
      notifications: unreadNotifications,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * PUT /api/notifications/:id/read
 * Mark a single notification as read
 */
export const markNotificationRead = async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // ownership check
      { read: true },
      { new: true }
    );

    if (!notif) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.json({ message: 'Notification marked as read.', notification: notif });
  } catch (err) {
    console.error('Mark notification read error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// // PUT /api/user/notifications/mark-all-read
// export const markAllNotificationsRead = async (req, res) => {
//   try {
//     await Notification.updateMany(
//       { user: req.user.id, read: false },
//       { $set: { read: true } }
//     );
//     res.json({ message: 'All notifications marked as read.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // إخفاء كلمة السر
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId =req.user._id;;
    const { name, email, phone } = req.body;

    // Fetch user, update fields
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};