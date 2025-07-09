import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    supportingDocument: {
      type: String,
      required: true,
    },

    // Requester Info
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: { type: String },
    address: { type: String, required: true },
    nationalId: { type: String, required: true },
    age: { type: Number },

    // Beneficiary Info
    beneficiaryName: { type: String, required: true },
    beneficiaryAge: { type: Number, required: true },
    relationship: { type: String, required: true },

    // Assistance Details
    assistanceType: { type: String, required: true },
    notes: { type: String },

    // Status & Processing
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: Date,
    pharmacyCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PharmacyCode',
    },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', requestSchema);
export default Request;
