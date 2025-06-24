import React, { useState } from 'react';

const QuickDonationSection = ({ onQuickDonate }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const amounts = [25, 50, 100, 200];

  const handleDonate = (amount) => {
    setSelectedAmount(amount);
    onQuickDonate(amount);
  };

  return (
    <div className="
      relative rounded-2xl p-6 
      border border-gray-100 
      bg-gradient-to-br from-blue-200 via-emerald-200 to-blue-400
      hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out ml-6
    ">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-current" />
        <div className="absolute -left-2 -bottom-2 w-16 h-16 rounded-full bg-current" />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Donation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose an amount and give instantly.
        </p>

        <div className="flex gap-3 flex-wrap">
          {amounts.map((amount) => {
            const isSelected = selectedAmount === amount;
            const isHighlighted = amount === 25;

            return (
              <button
                key={amount}
                onClick={() => handleDonate(amount)}
                className={`
                  px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                  ${isSelected ? 'bg-white text-emerald-700 shadow-md scale-105' : ''}
                  ${isHighlighted ? 'bg-white text-emerald-700 ' : 'bg-white/20 text-gray-800 hover:bg-white'}
                `}
              >
                ${amount}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickDonationSection;
