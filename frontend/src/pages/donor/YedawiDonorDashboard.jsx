import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatsGrid from '../../components/StatsGrid';
import AchievementsSection from '../../components/AchievementsSection';
import RecentActivitySection from '../../components/RecentActivitySection';
import QuickDonationSection from '../../components/QuickDonationSection';
import { CheckCircle, Award, Heart, TrendingUp } from 'lucide-react';





// Main Dashboard Component
const YedawiDonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [showNotification, setShowNotification] = useState(false);

  // Dynamic data that can change
  const [donorData, setDonorData] = useState({
    name: "Ahmed Mohamed",
    totalDonations: 2500,
    beneficiaries: 27,
    rank: 5,
    thisMonth: 500,
    pending: 150,
    completed: 2350
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'donation', amount: 100, beneficiary: 'Fatima Ali', medicine: 'Insulin', status: 'completed' },
    { id: 2, type: 'donation', amount: 75, beneficiary: 'Mohamed Hassan', medicine: 'Antibiotics', status: 'pending' },
    { id: 3, type: 'donation', amount: 200, beneficiary: 'Aisha Ahmed', medicine: 'Heart Medicine', status: 'completed' }
  ]);

  const achievements = [
    { icon: Award, title: 'Gold Donor', description: 'Donated more than $2000' },
    { icon: Heart, title: 'Life Saver', description: 'Helped 25+ beneficiaries' },
    { icon: TrendingUp, title: 'Most Active', description: 'Donated for 6 consecutive months' }
  ];

  const handleDonate = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleViewActivity = () => {
    setActiveTab('activity');
  };

  const handleQuickDonate = (amount) => {
    // Update donor data dynamically
    setDonorData(prev => ({
      ...prev,
      totalDonations: prev.totalDonations + amount,
      thisMonth: prev.thisMonth + amount
    }));

    // Add new activity
    const newActivity = {
      id: Date.now(),
      type: 'donation',
      amount: amount,
      beneficiary: 'Quick Donation',
      medicine: 'General Support',
      status: 'completed'
    };

    setRecentActivities(prev => [newActivity, ...prev.slice(0, 2)]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleStatClick = (type) => {
    console.log(`Clicked on ${type} stat`);
    // You can navigate to detailed view here
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Donation successful! Thank you for your generosity.</span>
          </div>
        </div>
      )}

      <Sidebar 
        donorData={donorData} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="ml-64 p-8">
        <Header 
          donorData={donorData}
          onDonate={handleDonate}
          onViewActivity={handleViewActivity}
        />

        <StatsGrid donorData={donorData} onStatClick={handleStatClick} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AchievementsSection achievements={achievements} />
          <RecentActivitySection activities={recentActivities} />
        </div>

        <QuickDonationSection onQuickDonate={handleQuickDonate} />
      </div>
    </div>
  );
};

export default YedawiDonorDashboard;