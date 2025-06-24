import React from 'react';

const ToggleButton = ({ 
  isLogin, 
  onToggle, 
  disabled, 
  primaryText, // Example: "Don't have an account?" or "Want to make a donation instead?"
  toggleText,  // Example: "Sign up" or "Go to Donate"
}) => (
  <div className="text-center">
    <span className="text-gray-600">
      {primaryText}
    </span>
    <button
      onClick={disabled ? null : onToggle}
      className={`text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {toggleText}
    </button>
  </div>
);

export default ToggleButton;
