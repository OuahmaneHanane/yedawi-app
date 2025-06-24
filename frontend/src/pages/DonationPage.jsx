import React from 'react';
import DonationForm from '../components/DonationForm';
import DonationSummary from '../components/DonationSummary';

const DonationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-8 flex flex-col md:flex-row justify-between">
        {/* Donation Form */}
        <div className="w-full  pr-4">
          <DonationForm />
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
