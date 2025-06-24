// src/components/StatCard.jsx
import React from 'react';
import Card from './Card';
import Typography from './Typography';
import Button from './Button'; 

const StatCard = ({ icon: Icon, title, value, color = 'primary', bgColor, className = '', onClick }) => {
  const colorVariants = {
    primary: { text: 'text-primary', bg: 'bg-highlight' },
    blue: { text: 'text-blue-600', bg: 'bg-blue-50' },
    purple: { text: 'text-purple-600', bg: 'bg-purple-50' },
    yellow: { text: 'text-yellow-600', bg: 'bg-yellow-50' }
  };

  const colors = colorVariants[color] || colorVariants.primary;

  return (
    <div 
      className={`p-6 rounded-xl shadow-sm ${bgColor || colors.bg} ${className} hover:shadow-md hover:scale-[1.02] transition`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className={`text-2xl font-semibold ${colors.text}`}>{value}</h2>
        </div>
        <div className={`p-3 rounded-full bg-white shadow-inner`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
