import React from 'react';
import * as Icons from 'lucide-react';
import Card from './Card';

// AchievementCard Component
const AchievementCard = ({ icon, title, description, className = '' }) => {
  const IconComponent = typeof icon === 'string' ? Icons[icon] || Icons.Star : icon;

  return (
    <Card className={`p-5 text-center hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
        <IconComponent className="w-5 h-5 text-amber-600" />
      </div>
      <h4 className="text-base font-semibold text-gray-900 mb-1">
        {title}
      </h4>
      <p className="text-sm text-gray-500">
        {description}
      </p>
    </Card>
  );
};

export default AchievementCard;
