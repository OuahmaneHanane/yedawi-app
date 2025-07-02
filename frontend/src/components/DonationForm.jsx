import React, { useState } from "react";
import DonationSummary from "./DonationSummary";
import ReceiptBox from "./ReceiptBox";
import DonateButton from "./DonationButton";

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

const handleDonationComplete = (paypalDetails = null) => {
  setDonationSuccess(true);
  setShowSummary(false);
  setDonationDetails({
    id: paypalDetails?.id || "offline-" + Date.now(),
    email: formData.email
  });
};

  return (
    <div className="p-4 max-w-xl mx-auto shadow-md rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
      {donationSuccess ? (
  <ReceiptBox donationID={donationDetails?.id} email={donationDetails?.email} amount={formData.amount}/>
) : showSummary ? (
  <DonationSummary
    formData={formData}
    onEdit={() => setShowSummary(false)}
    onComplete={handleDonationComplete}
  />

      ) : (
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
      )}
    </div>
  );
};

export default DonationForm;