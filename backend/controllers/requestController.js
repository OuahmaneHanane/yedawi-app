import Request from '../models/Request.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

/**
 * POST /api/requests
 * Create a new assistance request
 */
export const createRequest = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);
    const userId = req.user._id;

    /* ----- 1. Guard: supporting document required ----- */
    if (!req.file) {
      return res.status(400).json({ message: 'Supporting document is required.' });
    }

    /* ----- 2. Enforce 3‑per‑month limit ONLY for beneficiaries ----- */
    if (req.user.role === 'beneficiary') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const recentCount = await Request.countDocuments({
        user: userId,
        status: { $in: ['pending', 'approved'] },
        submittedAt: { $gte: startOfMonth },
      });

      if (recentCount >= 3) {
        return res.status(403).json({ message: 'Monthly request limit (3) reached.' });
      }
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

    /* ----- 6. Notify admin ----- */
    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser) {
      await Notification.create({
        user: adminUser._id,
        message: `${req.user.name || fullName} submitted a new request.`,
      });
    }

    res.status(201).json({
      message: 'Request submitted successfully',
      requestId: newRequest._id,
    });
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

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;

    if (status === 'approved') {
      request.approvedAt = new Date();
    }

    const updated = await request.save();

    // ✅ Send notification on status change
    if (['approved', 'rejected'].includes(status)) {
      await Notification.create({
        user: request.user,
        message: `Your request has been ${status}.`,
        type: status === 'approved' ? 'success' : 'info',
        read: false,
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    await request.deleteOne();

    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
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

