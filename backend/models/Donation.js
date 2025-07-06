import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // unified user
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,

  amount: { type: Number, required: true },
  tip: { type: Number, default: 0 },
  method: {
    type: String,
    enum: ['PayPal', 'Credit Card', 'Mobile Payment'],
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // beneficiary will be assigned later
  },

  transactionId: { type: String },                // PayPal/Stripe ID if applicable
  donationId: { type: String, unique: true },     // for receipt display (custom ID)

  isApproved: { type: Boolean, default: false },  // can be used for admin validation
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
