import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['paypal', 'credit_card', 'mobile_payment'], required: true },
  tipAmount: Number,
  date: { type: Date, default: Date.now },
  donationId: String,
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
