import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ notifications: 0 });

  const fetchDashboardStats = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:5000/api/user/dashboard/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error('Dashboard summary fetch error:', err);
    }
  };

  const decrementNotificationCount = () => {
    setStats(prev => ({
      ...prev,
      notifications: Math.max(prev.notifications - 1, 0),
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(err => console.error("User fetch error:", err))
      .finally(() => setLoading(false));

    fetchDashboardStats(); // 🔁 Initial dashboard stats
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading…</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} stats={stats} />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet context={{ user, decrementNotificationCount, fetchDashboardStats }} />
      </main>
    </div>
  );
};

export default DashboardLayout;
