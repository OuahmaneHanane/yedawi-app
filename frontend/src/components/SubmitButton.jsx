import React from 'react';

const SubmitButton = ({ text, children, onClick, loading = false }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full bg-green-400 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-400 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
  >{text}
    {loading ? (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    ) : (
      children
    )}
  </button>
);

export default SubmitButton;
