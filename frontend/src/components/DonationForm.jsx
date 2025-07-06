import React, { useState } from "react";
import axios from "axios";
import DonationSummary from "./DonationSummary";
import ReceiptBox from "./ReceiptBox";
// import DonateButton from "./DonationButton";

const DonationForm = ({ userData = {}  }) => {
  const fullName = userData?.fullName || "";
  const email = userData?.email || "";

  const [formData, setFormData] = useState({
    fullName,
    email,
    phone: "",
    amount: "",
    tip: 0,
    method: "Credit Card",
    recurring: false,
    recurrenceType: "Monthly",
  });

  const [showSummary, setShowSummary] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: updatedValue };
      if (name === "amount") {
        updated.tip = (parseFloat(value || 0) * 0.03).toFixed(2);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const [donationDetails, setDonationDetails] = useState(null);
  const [submitting, setSubmitting] = useState(false);

const handleDonationComplete = async (paypalDetails = null) => {
  try {
    setSubmitting(true);

    // 1️⃣  Send donation data to your API
    const res = await axios.post("http://localhost:5000/api/donations", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      amount: Number(formData.amount),
      tip: Number(formData.tip),
      method: paypalDetails ? "PayPal" : formData.method,
      status: "completed",            // or "pending" if applicable
      transactionId: paypalDetails?.id
    });

    // 2️⃣  Back‑end returns { donationId: "..." }
    const backendID = res.data.donationId;

    // 3️⃣  Update UI state
    setDonationSuccess(true);
    setShowSummary(false);
    setDonationDetails({
      id: backendID,
      email: formData.email
    });
  } catch (err) {
    console.error("Donation save failed:", err);
    alert("Sorry, something went wrong saving your donation. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-6">

      {donationSuccess ? (
        <ReceiptBox
          donationID={donationDetails?.id}
          email={donationDetails?.email}
          amount={formData.amount}
          fullName={formData.fullName}
          method={formData.method}
          tip={formData.tip}
        />
      ) : showSummary ? (
        <DonationSummary
          formData={formData}
          onEdit={() => setShowSummary(false)}
          onComplete={handleDonationComplete}
        />
      ) : (
        <div>
         <h2 className="text-2xl font-bold mb-4 text-center">Make a Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Full Name</label>
            <input type="text" value={formData.fullName} disabled className="input" />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input type="email" value={formData.email} disabled className="input" />
          </div>
          <div>
            <label className="block font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label className="block font-semibold">Donation Amount (USD)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              className="input"
            />
          </div>
          <div>
            <label className="block font-semibold">Yedawi Tip (3%)</label>
            <input type="text" value={formData.tip} disabled className="input" />
          </div>

          <div>
            <label className="block font-semibold">Payment Method</label>
            <select name="method" value={formData.method} onChange={handleChange} className="input">
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Mobile Payment">Mobile Payment</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
            />
            <label>Make this a Recurring Donation</label>
            {formData.recurring && (
              <select
                name="recurrenceType"
                value={formData.recurrenceType}
                onChange={handleChange}
                className="ml-2 input"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            )}
          </div>

          <button type="submit" className="bg-green-400 text-white p-2 w-full rounded">
            Continue to Summary
          </button>
        </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default DonationForm;