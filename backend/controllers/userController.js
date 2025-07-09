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
