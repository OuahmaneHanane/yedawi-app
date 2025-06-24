import React from 'react';

const SwitchToggle = ({ label, isToggled, onToggle }) => (
  <div className="flex items-center space-x-3">
    <span className="text-gray-700">{label}</span>
    <button
      type="button" // 🚩 This prevents accidental form submission
      onClick={onToggle}
      aria-pressed={isToggled}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${isToggled ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isToggled ? 'translate-x-6' : ''}`}
      ></div>
    </button>
  </div>
);

export default SwitchToggle;
