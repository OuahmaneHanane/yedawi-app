// controllers/requestController.js
import Request from '../models/Request.js';
import Notification from '../models/Notification.js';

/**
 * POST /api/requests
 * Create a new assistance request
 */
export const createRequest = async (req, res) => {
  try {
    const userId = req.user._id;

    /* ----- 1. Guard: supporting document required ----- */
    if (!req.file) {
      return res.status(400).json({ message: 'Supporting document is required.' });
    }

    /* ----- 2. Enforce 3‑per‑month limit (pending + approved only) ----- */
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const recentCount = await Request.countDocuments({
      user: userId,
      status: { $in: ['pending', 'approved'] },
      submittedAt: { $gte: thirtyDaysAgo },
    });

    if (recentCount >= 3) {
      return res.status(403).json({ message: 'Monthly request limit (3) reached.' });
    }

    /* ----- 3. Build request payload ----- */
    const {
      fullName,
      email,
      phone,
      address,
      nationalId,
      age,
      assistanceType,
      notes,
      beneficiaryName,
      beneficiaryAge,
      relationship,
    } = req.body;

    const requestData = {
      user: userId,
      supportingDocument: req.file.path,
      fullName,
      email,
      phone,
      address,
      nationalId,
      age,
      assistanceType,
      notes,
      beneficiaryName,
      beneficiaryAge,
      relationship,
      status: 'pending',
      submittedAt: new Date(),
    };

    /* ----- 4. Persist request ----- */
    const newRequest = await Request.create(requestData);

    /* ----- 5. Notify user ----- */
    await Notification.create({
      user: userId,
      message: 'Your request has been submitted and is awaiting approval.',
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * GET /api/requests/mine
 * Return requests belonging to the authenticated user
 */
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('pharmacyCode');

    res.json(requests);
  } catch (err) {
    console.error('Fetch user requests error:', err);
    res.status(500).json({ message: 'Failed to fetch requests.' });
  }
};

/**
 * GET /api/requests/all   (admin‑only)
 * Return every request in the system
 */
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('user', 'name email')
      .populate('pharmacyCode');

    res.json(requests);
  } catch (err) {
    console.error('Fetch all requests error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * GET /api/notifications
 * Fetch notifications for the authenticated user
 */
export const getMyNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('Fetch notifications error:', err);
    res.status(500).json({ message: 'Failed to fetch notifications.' });
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
