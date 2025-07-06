import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from './Button';
import { Heart, HandHelping } from 'lucide-react';

const Header = ({ userStats }) => {
  const { user } = useOutletContext(); 
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const navigate = useNavigate();

  const onDonate = () => navigate('/donate');
  const onViewActivity = () => navigate('/request');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 ml-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          {timeGreeting}, {user?.name || 'Friend'}
        </h1>

        {/*  Conditional message based on stats */}
        <p className="text-sm text-gray-600">
          {userStats?.totalDonations > 0 || userStats?.totalRequests > 0
            ? "Here’s your activity summary"
            : "Start your journey by requesting or donating"}
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="primary" icon={Heart} onClick={onDonate}>
          Give Hope
        </Button>
        <Button variant="ghost" icon={HandHelping} onClick={onViewActivity}>
          Receive Hope
        </Button>
      </div>
    </div>
  );
};

export default Header;
