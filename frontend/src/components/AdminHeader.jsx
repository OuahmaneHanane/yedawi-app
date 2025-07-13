import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, LogOut, ShieldCheck, Menu } from 'lucide-react';

const AdminHeader = ({ adminName = "Admin", onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem('token');

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="font-poppins mt-8 mx-6">
      <header className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition duration-200"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-300 to-emerald-500 rounded-3xl flex items-center justify-center shadow-md">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">
                Welcome back, <span className="text-emerald-600">{adminName}</span>
              </h1>
              <p className="text-xs text-gray-500">Manage your platform</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          {/* Notification Button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition duration-200"
            aria-label="Toggle Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 max-h-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-thumb-rounded">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 italic text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      onClick={() => markAsRead(notification._id)}
                      title={notification.message}
                      className={`p-3 flex items-start gap-3 cursor-pointer border-b border-gray-100 transition duration-200 ${
                        !notification.read ? 'bg-emerald-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span
                        className={`mt-1 w-3 h-3 rounded-full ${
                          notification.type === 'success'
                            ? 'bg-green-500'
                            : notification.type === 'warning'
                            ? 'bg-yellow-400'
                            : 'bg-blue-400'
                        }`}
                      ></span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
