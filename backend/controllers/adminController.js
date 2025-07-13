// controllers/adminController.js
import Request from '../models/Request.js';
import PharmacyCode from '../models/PharmacyCode.js';
import Notification from '../models/Notification.js';
import crypto from 'crypto';

// GET /api/admin/pending
export const getPendingRequests = async (req, res) => {
  try {
    const pending = await Request.find({ status: 'pending' })
      .populate('user', 'name email');

    res.json(pending);
  } catch (err) {
    console.error('Error fetching pending requests:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/admin/approve/:id
export const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = 'approved';
    request.approvedAt = new Date();

    // Ensure unique pharmacy code
    let code;
    let exists;
    do {
      code = Math.random().toString(36).substr(2, 8).toUpperCase();
      exists = await PharmacyCode.findOne({ code });
    } while (exists);

    const pharmacyCode = await PharmacyCode.create({
      code,
      request: request._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    request.pharmacyCode = pharmacyCode._id;
    await request.save();

    await Notification.create({
      user: request.user,
      message: ` Your request was approved. Pharmacy code: ${code} (valid for 7 days).`,
    });

    res.json({ message: 'Request approved', code });
  } catch (err) {
    console.error('Error approving request:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/admin/reject/:id
export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = 'rejected';
    await request.save();

    await Notification.create({
      user: request.user,
      message: ` Your request was rejected by the admin.`,
    });

    res.json({ message: 'Request rejected' });
  } catch (err) {
    console.error('Error rejecting request:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
