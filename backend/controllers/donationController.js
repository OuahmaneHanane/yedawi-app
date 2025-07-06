import Donation from '../models/Donation.js';
import Notification from '../models/Notification.js';

/* --------------------------------- CREATE --------------------------------- */
// POST  /api/donations
export const createDonation = async (req, res) => {
  try {
    const { amount, method, tip = 0, donationId } = req.body;

    // Prevent duplicate donation IDs (optional but recommended)
    if (donationId) {
      const exists = await Donation.findOne({ donationId });
      if (exists) {
        return res.status(400).json({ message: 'Duplicate donationId.' });
      }
    }

    const newDonation = await Donation.create({
      user: req.user._id,
      fullName: req.user.name,
      email: req.user.email,
      phone: req.user.phone || '',
      amount,
      method,
      tip,
      donationId,
      status: 'pending',
      isApproved: false,
    });

    res.status(201).json(newDonation);
  } catch (err) {
    console.error('Donation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/* --------------------------- USER DONATIONS LIST -------------------------- */
// GET /api/donations/mine
export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id })
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Failed to fetch donations.' });
  }
};

/* ------------------------- ADMIN: MARK AS COMPLETED ----------------------- */
// PUT /api/admin/donations/:id/complete   (protect + isAdmin middleware)
export const markDonationAsUsed = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found.' });
    }

    // Prevent double‑completion
    if (donation.status === 'completed') {
      return res.status(400).json({ message: 'Donation already completed.' });
    }

    donation.status = 'completed';
    await donation.save();

    await Notification.create({
      user: donation.user._id,
      message:
        '🎉 Thank you! Your donation has been used to help someone in need.',
    });

    res.json({
      message: 'Donation marked as completed and donor notified.',
      donation,
    });
  } catch (error) {
    console.error('Error completing donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
