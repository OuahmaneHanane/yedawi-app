// src/components/AdminHeader.jsx
import { useState } from 'react';
import { Bell, LogOut, ShieldCheck, Menu } from 'lucide-react';

const AdminHeader = ({ adminName = "Admin", onMenuClick, notifications = [], setNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="font-['Poppins',sans-serif]">
      <header className="
        flex justify-between items-center 
        bg-white border border-gray-200 
        p-3 rounded-2xl 
        mb-6
        shadow-lg 
        hover:shadow-xl 
        transition-shadow duration-300
      ">
        <div className="flex items-center gap-3">
          <button 
            className="
              lg:hidden text-gray-600 
              hover:text-gray-900 p-2 
              rounded-xl hover:bg-gray-100 
              transition-colors duration-200
            "
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="
              w-8 h-8 
              bg-gradient-to-tr from-emerald-300 to-emerald-400 
              rounded-3xl flex items-center justify-center 
              shadow-md
            ">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                Welcome back, <span className="text-emerald-600">{adminName}</span>
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Manage your platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Toggle Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="
                  absolute -top-1 -right-1 
                  w-4 h-4 
                  bg-red-600 text-white text-xs font-semibold 
                  rounded-full flex items-center justify-center 
                  shadow-md
                ">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="
                absolute right-0 top-12 
                w-80 max-h-60 
                bg-white border border-gray-200 
                rounded-2xl shadow-2xl z-50 
                overflow-hidden
              ">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wide">Notifications</h3>
                </div>
                <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-emerald-300">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-sm italic">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`
                          p-3 border-b border-gray-100 flex items-start gap-2 cursor-pointer
                          ${!notification.read ? 'bg-emerald-50' : 'hover:bg-gray-50'}
                          transition-colors duration-200
                        `}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <span className={`
                          mt-1 w-2.5 h-2.5 rounded-full
                          ${notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-400' :
                            'bg-blue-400'}
                        `} />
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-900">{notification.title}</p>
                          <p className="text-[10px] text-gray-600 mt-0.5">{notification.message}</p>
                          <p className="text-[9px] text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            className="
              p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 
              rounded-xl transition-colors duration-200
            "
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
