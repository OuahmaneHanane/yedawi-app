// /components/ReceiptBox.jsx
import React from 'react';

const ReceiptBox = ({ donationID, email }) => {
  const handlePrint = () => window.print();
  const handleReturn = () => window.location.reload();

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center space-y-4">
      <h2 className="text-3xl font-bold text-green-600">Thank You!</h2>
      <p className="text-gray-700">Your donation was successful!</p>
      <p><strong>Donation ID:</strong> {donationID}</p>
      <p>A receipt was sent to <strong>{email}</strong>.</p>
      <div className="flex gap-4 mt-4">
        <button onClick={handlePrint} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          Print Receipt
        </button>
        <button onClick={handleReturn} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Return Home
        </button>
      </div>
    </div>
  );
};

export default ReceiptBox;
