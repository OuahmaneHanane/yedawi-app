import Donation from '../models/Donation.js';

// POST /api/donations
export const createDonation = async (req, res) => {
  const { amount, method, tipAmount, donationId } = req.body;

  try {
    const newDonation = await Donation.create({
      donor: req.user._id,
      amount,
      method,
      tipAmount,
      donationId,
      isApproved: false, // By default
    });

    res.status(201).json(newDonation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/donations/mine
export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
