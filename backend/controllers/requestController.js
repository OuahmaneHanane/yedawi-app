import Request from '../models/Request.js';

// POST /api/requests
export const createRequest = async (req, res) => {
  const { prescriptionFile } = req.body;

  try {
    const newRequest = await Request.create({
      beneficiary: req.user._id,
      prescriptionFile,
      status: 'pending',
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/requests/mine
export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ beneficiary: req.user._id }).populate('pharmacyCode');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/requests/all (for admin use)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('beneficiary', 'name email')
      .populate('pharmacyCode');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
