import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  phone: String,
  address: String,
  // isAcite: Boolean,
  donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
  requestHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
