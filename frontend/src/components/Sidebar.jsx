import React, { useState } from 'react';
import { Award, ShoppingBag, Users, Heart, Settings, MessageCircle, Bell, TrendingUp, User, LogOut, UserCircle, ChevronDown } from 'lucide-react';

const Sidebar = ({ donorData, activeTab, setActiveTab }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
    { id: 'leaderboard', icon: Award, label: 'Leaderboard' },
    { id: 'pharmacies', icon: ShoppingBag, label: 'Pharmacies' },
    { id: 'support', icon: MessageCircle, label: 'Support' },
    { id: 'notifications', icon: Bell, label: 'Notifications' }
  ];

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleViewProfile = () => {
    setActiveTab('profile');
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    setIsProfileOpen(false);
  };

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col z-50">
      {/* Header */}
        <div className="p-8 border-b border-gray-50">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-400 rounded-xl flex items-center justify-center shadow-sm">
            <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Yedawi</span>
        </div>
        </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl
                transition-all duration-200 ease-out
                ${activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <item.icon className={`w-5 h-5 transition-colors ${
                activeTab === item.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-50 relative">
        <button
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {donorData?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500">Active Donor</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isProfileOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute bottom-full left-6 right-6 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-10">
            <button
              onClick={handleViewProfile}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserCircle className="w-4 h-4 text-gray-500" />
              View Profile
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;