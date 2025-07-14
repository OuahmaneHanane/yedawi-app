import Donation from '../models/Donation.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js'; // Import User model to find admin
import { v4 as uuidv4 } from 'uuid';

/* --------------------------------- CREATE --------------------------------- */
// POST  /api/donations
export const createDonation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      amount,
      tip,
      method,
      status,
      transactionId,
      recurring,
      recurrenceType,
    } = req.body;

    const donation = new Donation({
      user: userId = req.user._id,  // make sure this is set by protect middleware
      fullName,
      email,
      phone,
      amount,
      tip,
      method,
      status,
      transactionId,
      donationId: uuidv4(), // Generate a unique donation ID
      recurring,
      recurrenceType,
    });

    const saved = await donation.save();

    // Notify admin about the new donation
    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser) {
      await Notification.create({
        user: adminUser._id,
        message: `${req.user.name || fullName} just made a donation of $${amount}`,
      });
    }

    res.status(201).json({
      message: "Donation saved successfully",
      donationId: saved._id,
    });
  } catch (error) {
    console.error("Error in createDonation:", error);
    res.status(500).json({ message: "Server error while saving donation" });
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
        'Thank you! Your donation has been used to help someone in need.',
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

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('user', 'name email') // optional: show who donated
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching all donations:', error);
    res.status(500).json({ message: 'Failed to fetch donations', error });
  }
};