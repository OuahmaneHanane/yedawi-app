import React, { useState } from 'react';
import FormInput from './FormInput';
import SwitchToggle from './SwitchToggle';
import SubmitButton from './SubmitButton';
import ReceiptBox from './ReceiptBox';
import DonationSummary from './DonationSummary';
import { FaCreditCard, FaPaypal, FaMobileAlt } from 'react-icons/fa';

const DonationForm = () => {
  const [step, setStep] = useState('form'); // form, summary, receipt
  const [donationID] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: '',
    isRecurring: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, isRecurring: !formData.isRecurring });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('summary');
  };

  const handleConfirmDonation = () => {
    console.log('Donation confirmed:', formData);
    setStep('receipt');
  };

  if (step === 'receipt') {
    return <ReceiptBox donationID={donationID} email={formData.email} />;
  }

  if (step === 'summary') {
    return <DonationSummary formData={formData} onEdit={() => setStep('form')} onConfirm={handleConfirmDonation} />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-center mb-2">Make a Difference</h2>
      <p className="text-center text-gray-600 mb-4">Your donation helps us continue our mission. Thank you!</p>

      <div className="space-y-4">
        <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
        <FormInput label="Email Address" name="email" value={formData.email} onChange={handleChange} required />
        <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">Donation Amount</h3>
        <FormInput
          label="Enter Amount (MAD)"
          name="amount"
          value={formData.amount}
          onChange={(e) => {
            const val = e.target.value;

            // Allow empty string for better UX
            if (val === '') {
              setFormData({ ...formData, amount: '' });
              return;
            }

            let value = Number(val);
            if (value < 1) value = 1;

            setFormData({ ...formData, amount: value });
          }}
          onBlur={() => {
            // On blur, correct empty or invalid values
            if (!formData.amount || formData.amount < 1) {
              setFormData({ ...formData, amount: 1 });
            }
          }}
          type="number"
          min="1"
          required
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700 mb-2">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Credit Card', icon: <FaCreditCard className="text-xl text-blue-600" /> },
            { name: 'PayPal', icon: <FaPaypal className="text-xl text-blue-600" /> },
            { name: 'Mobile Payment', icon: <FaMobileAlt className="text-xl text-blue-600" /> },
          ].map((method) => (
            <label
              key={method.name}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition ${
                formData.paymentMethod === method.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.name}
                  checked={formData.paymentMethod === method.name}
                  onChange={handleChange}
                  required
                />
                <span className="font-medium text-gray-700">{method.name}</span>
              </div>
              {method.icon}
            </label>
          ))}
        </div>
      </div>

      <SwitchToggle
        label="Make this a Recurring Donation (Monthly/Yearly)"
        isToggled={formData.isRecurring}
        onToggle={handleToggle}
      />

      <SubmitButton text="Continue to Summary" />
    </form>
  );
};

export default DonationForm;
