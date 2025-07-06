import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatsGrid from '../../components/StatsGrid';
import AchievementsSection from '../../components/AchievementsSection';
import RecentActivitySection from '../../components/RecentActivitySection';
import QuickDonationSection from '../../components/QuickDonationSection';
import { CheckCircle, Award, Heart, TrendingUp } from 'lucide-react';
import { generateAchievements } from '../../utils/achievementRules';


const UserDashboard = () => {
  const [userStats, setUserStats] = useState({
    totalDonations: 0,
    totalRequests: 0,
  });
  const [user, setUser] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [achievements, setAchievements] = useState([]);

 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch user profile
        const userRes = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Fetch user donations and requests
        const [donationsRes, requestsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/user/donations/my-donations', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/user/requests/me', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Update stats
        setUserStats({
          totalDonations: donationsRes.data.length,
          totalRequests: requestsRes.data.length,
        });

        const dynamicAchievements = generateAchievements({
  totalDonations: donationsRes.data.length,
  totalRequests: requestsRes.data.length,
});
setAchievements(dynamicAchievements);
        // Combine donations and requests into recent activities, sorted by date descending
        const donations = donationsRes.data.map(d => ({
          id: d._id,
          type: 'donation',
          name: userRes.data.name,
          medicine: 'General Donation', // or get from donation if available
          status: d.status || 'completed',
          amount: d.amount,
          createdAt: d.createdAt,
        }));

        const requests = requestsRes.data.map(r => ({
          id: r._id,
          type: 'request',
          medicine: r.assistanceType || 'Assistance',
          status: r.status,
          createdAt: r.createdAt,
        }));

        const combinedActivities = [...donations, ...requests].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setRecentActivities(combinedActivities.slice(0, 5)); // show latest 5

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDonate = () => {
    // Redirect to donation page or show modal
    window.location.href = '/donation'; // or use react-router navigate if available
  };

  const handleViewActivity = () => {
    setActiveTab('activity');
  };

  const handleQuickDonate = (amount) => {
    // Placeholder for quick donation action
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Donation successful! Thank you for your generosity.</span>
          </div>
        </div>
      )}

      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="ml-64 p-8">
        <Header
          userStats={userStats}
          user={user}
          onDonate={handleDonate}
          onViewActivity={handleViewActivity}
        />

        <StatsGrid
          donationStats={{
            totalDonated: userStats.totalDonations,
            requestsMade: userStats.totalRequests,
          }}
          onStatClick={(type) => console.log(`Clicked on ${type} stat`)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AchievementsSection achievements={achievements} />
          <RecentActivitySection activities={recentActivities} />
        </div>

        <QuickDonationSection onQuickDonate={handleQuickDonate} />
      </div>
    </div>
  );
};

export default UserDashboard;
