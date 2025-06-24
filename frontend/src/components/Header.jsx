import React from 'react';
import Button from './Button';
import { Heart, Activity } from 'lucide-react';

const Header = ({ donorData, onDonate, onViewActivity }) => {
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 ml-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Welcome back, {donorData?.name || 'Friend'}
        </h1>
        <p className="text-sm text-gray-600">
          Your kindness makes a difference
        </p>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="primary" 
          icon={Heart} 
          onClick={onDonate}
          className="shadow-lg shadow-emerald-500/25"
        >
          Give Hope
        </Button>
        <Button 
          variant="ghost" 
          icon={Activity} 
          onClick={onViewActivity}
        >
          My Impact
        </Button>
      </div>
    </div>
  );
};

export default Header;