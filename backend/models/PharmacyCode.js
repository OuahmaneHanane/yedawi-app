import mongoose from 'mongoose';

const pharmacyCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  used: { type: Boolean, default: false },
  expiresAt: Date
}, { timestamps: true });

const PharmacyCode = mongoose.model('PharmacyCode', pharmacyCodeSchema);
export default PharmacyCode;
