import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './logoutButton';
import {
  HandHeart, TrendingUp, FolderHeart, ClipboardList, MessageCircle,
  Bell, User, ChevronDown, UserCircle,
} from 'lucide-react';

const Sidebar = ({user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [stats, setStats] = useState({ notifications: 0});
  const location = useLocation();

const getActiveTabFromPath = (pathname) => {
  const segments = pathname.split('/');
  if (pathname === '/dashboard' || pathname === '/dashboard/') return 'dashboard';
  if (segments.includes('donations')) return 'donations';
  if (segments.includes('requests')) return 'requests';
  if (segments.includes('notifications')) return 'notifications';
  if (segments.includes('profil')) return 'profile';
  return '';
};


  /* ───────────────────────────────────
     1.   Get counts for this user
  ─────────────────────────────────── */

    const activeTab = getActiveTabFromPath(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('/api/users/dashboard/summary', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
    console.log("📬 Dashboard summary:", res.data); // <-- This should show the notification count
    setStats(res.data);
  })
    .catch(err => console.error('Summary fetch error', err));
  }, []);

  /* ───────────────────────────────────
     2.   Build menu dynamically
  ─────────────────────────────────── */
  const menuItems = [
    { id: 'dashboard',  icon: TrendingUp,   label: 'Dashboard' },
    { id: 'donations',  icon: FolderHeart,  label: 'My Donations' },
    { id: 'requests',   icon: ClipboardList,label: 'My Requests' },
    { id: 'support',    icon: MessageCircle,label: 'Support' },
    {
  id: 'notifications',
  icon: Bell,
  label: (
    <span className="flex items-center gap-1">
      Notifications
      {stats.notifications > 0 && (
        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
          {stats.notifications}
        </span>
      )}
    </span>
  ),
}
  ];
console.log("Sidebar user:", user);

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto z-50">
      {/* Logo */}
      <div className="p-8 border-b border-gray-50">
        <Link to="/" className="flex items-center gap-2 text-3xl font-semibold hover:opacity-90 transition">
  <HandHeart className="w-10 h-10 text-green-400" /> Yedawi
</Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-1">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <Link
  key={id}
  to={`/dashboard/${id === 'dashboard' ? '' : id}`}
  className={`w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl
    transition-all
    ${activeTab === id
      ? 'bg-emerald-50 text-emerald-700 shadow-sm'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
  onClick={() => setIsProfileOpen(false)}
>
  <Icon className={`w-5 h-5 ${activeTab === id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
  <span>{label}</span>
</Link>
        ))}
      </nav>

      {/* User dropdown */}
      <div className="p-6 border-t border-gray-50 relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'User'}
            </p>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProfileOpen && (
          <div className="absolute bottom-full left-6 right-6 mb-2 bg-white border rounded-xl shadow-lg py-2 z-10">
            <Link
  to="/dashboard/profil"
  onClick={() => setIsProfileOpen(false)}
  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
>
  <UserCircle className="w-4 h-4 text-gray-500" /> View Profile
</Link>
            <div className="border-t my-1" />
            <LogoutButton/>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
