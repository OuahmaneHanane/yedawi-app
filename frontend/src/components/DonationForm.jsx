import React, { useState, useEffect } from "react";
import axios from "axios";
import DonationSummary from "./DonationSummary";
import ReceiptBox from "./ReceiptBox";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    tip: 0,
    method: "Credit Card",
    recurring: false,
    recurrenceType: "Monthly",
  });

  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationDetails, setDonationDetails] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token");

        const { data } = await axios.get(
          "http://localhost:5000/api/user/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFormData((prev) => ({
          ...prev,
          fullName: data.name || "",
          email: data.email || "",
        }));
      } catch (err) {
        console.error("Could not load user profile", err);
        // Leave name/email empty so user can fill manually
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

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

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.amount || Number(formData.amount) <= 0)
      newErrors.amount = "Valid amount required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setShowSummary(true);
  };

  const handleDonationComplete = async (paypalDetails = null) => {
    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/user/donations",
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          amount: Number(formData.amount),
          tip: Number(formData.tip),
          method: paypalDetails ? "PayPal" : formData.method,
          status: "completed",
          transactionId: paypalDetails?.id,
          recurring: formData.recurring,
          recurrenceType: formData.recurring ? formData.recurrenceType : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setDonationSuccess(true);
      setShowSummary(false);
      setDonationDetails({
        id: response.data.donationId,
        email: formData.email,
      });
    } catch (err) {
      console.log(err)
      console.error("Donation save failed:", err);
      alert(
        err.response?.data?.message ||
        "Sorry, something went wrong saving your donation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading user data...
      </div>
    );
  }

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
            submitting={submitting}
          />
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Make a Donation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block font-semibold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.phone ? "border-red-600" : "border-gray-300"
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block font-semibold">
                  Donation Amount (USD)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  className={`w-full p-2 border rounded ${errors.amount ? "border-red-600" : "border-gray-300"
                    }`}
                />
                {errors.amount && (
                  <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Tip */}
              <div>
                <label className="block font-semibold">Yedawi Tip (3%)</label>
                <input
                  type="text"
                  value={formData.tip}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block font-semibold">Payment Method</label>
                <select
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Mobile Payment">Mobile Payment</option>
                </select>
              </div>

              {/* Recurring */}
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
                    className="ml-2 p-2 border border-gray-300 rounded"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className={`bg-green-500 text-white p-2 w-full rounded ${submitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {submitting ? "Saving..." : "Continue to Summary"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationForm;
