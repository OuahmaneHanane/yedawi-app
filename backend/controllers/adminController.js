import Request from '../models/Request.js';
import PharmacyCode from '../models/PharmacyCode.js';

// GET /api/admin/pending
export const getPendingRequests = async (req, res) => {
  try {
    const pending = await Request.find({ status: 'pending' }).populate('beneficiary', 'name email');
    res.json(pending);
  } catch (err) {
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

    // Generate a pharmacy code
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    const pharmacyCode = await PharmacyCode.create({
      code,
      request: request._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    request.pharmacyCode = pharmacyCode._id;
    await request.save();

    res.json({ message: 'Request approved', code });
  } catch (err) {
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

    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
