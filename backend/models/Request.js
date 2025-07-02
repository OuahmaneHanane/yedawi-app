import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prescriptionFile: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  approvedAt: Date,
  pharmacyCode: { type: mongoose.Schema.Types.ObjectId, ref: 'PharmacyCode' },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request;
