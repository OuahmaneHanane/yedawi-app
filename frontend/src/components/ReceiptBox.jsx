// /components/ReceiptBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ReceiptBox = ({ donationID, email, amount,method,tip,total=amount, fullName, date = new Date().toLocaleString(), }) => {
  const handlePrint = () => window.print();
  const navigate = useNavigate();
  const handleReturn = () => navigate('/');

  return (
  // <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 print:bg-white">
      <div className="max-w-sm mx-auto bg-white text-black p-6 rounded-sm shadow-md border border-gray-300 font-mono">
        {/* Header */}
        <div className="border-b border-dashed pb-2 mb-2 text-center">
          <h2 className="text-lg font-bold tracking-widest">RECEIPT</h2>
        </div>

        {/* Body */}
        <p className="text-sm"><strong>Donation ID:</strong> {donationID}</p>
        <p className="text-sm"><strong>Date:</strong> {date}</p>
        <p className="text-sm"><strong>Amount Donated:</strong> ${amount}</p>
        <p className="text-sm"><strong>Payment Method:</strong> {method}</p>
        <p className="text-sm">A receipt was sent to <strong>{email}</strong>.</p>

        {/* Totals */}
        <div className="border-t border-b border-dashed py-2 my-2 text-sm">
          <p className="flex justify-between"><span>Donation:</span> <span>${amount}</span></p>
          <p className="flex justify-between"><span>Yedawi Tip:</span> <span>${tip}</span></p>
          <p className="flex justify-between font-bold"><span>Total Amount:</span> <span>${total}</span></p>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-dashed pt-2 mt-2">
          <p className="text-base font-semibold tracking-wide">
            THANK YOU {fullName}
          </p>
          <div className="mt-2 h-6 bg-black w-full rounded-sm" />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-4 print:hidden">
          <button onClick={handlePrint} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm">
            Print Receipt
          </button>
          <button onClick={handleReturn} className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
            Return Home
          </button>
        </div>
      </div>
    // </div>

);
};

export default ReceiptBox;
