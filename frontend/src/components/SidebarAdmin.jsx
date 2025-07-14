import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  FileText,
  Users,
  ShoppingBag,
  HandHeart,
  ChevronDown,
  ShieldCheck,
  UserCircle,
  LogOut,
} from 'lucide-react';

const SidebarAdmin = ({
  adminData,
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { id: 'requests', label: 'Requests', icon: FileText },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'pharmacies', label: 'Pharmacies', icon: ShoppingBag },
  { id: 'donations', label: 'Donations', icon: HandHeart },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-100 flex flex-col font-poppins z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          {/* <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Yedawi</span>
          </div> */}
           {/* Logo */}
      <div className="p-8 border-b border-gray-50">
        <Link to="/" className="flex items-center gap-2 text-3xl font-semibold hover:opacity-90 transition">
  <HandHeart className="w-10 h-10 text-green-400" /> Yedawi
</Link>
      </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);

                  if (item.id === 'dashboard') {
                    navigate('/dashboardAdmin');
                  } else {
                    navigate(`/dashboardAdmin/${item.id}`);
                  }
                }}
                className={`w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl
                  transition-all duration-200 ease-out
                  ${
                    activeTab === item.id
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    activeTab === item.id
                      ? 'text-emerald-600'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-50 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {adminData?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-10">
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() =>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                    setIsProfileOpen(false);
                } }
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;