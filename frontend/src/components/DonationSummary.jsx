import React from 'react';

const DonationSummary = ({ formData, onEdit, onConfirm }) => {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Review Your Donation</h2>

      <div className="space-y-2">
        <div><strong>Full Name:</strong> {formData.fullName}</div>
        <div><strong>Email:</strong> {formData.email}</div>
        <div><strong>Phone:</strong> {formData.phone || 'Not provided'}</div>
        <div><strong>Donation Amount:</strong> ${formData.amount}</div>
        <div><strong>Payment Method:</strong> {formData.paymentMethod}</div>
        <div><strong>Recurring Donation:</strong> {formData.isRecurring ? 'Yes' : 'No'}</div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
        >
          Edit
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Confirm & Donate
        </button>
      </div>
    </div>
  );
};

export default DonationSummary;
