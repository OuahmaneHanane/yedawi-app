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
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    nationalId: { type: String },
    age: { type: Number },

    // Beneficiary Info
    beneficiaryName: { type: String },
    beneficiaryAge: { type: Number },
    relationship: { type: String },

    // Assistance Details
    assistanceType: { type: String },
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
