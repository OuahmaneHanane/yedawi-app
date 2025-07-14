import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Bell, Info, CheckCircle, Dot } from "lucide-react";

const Notifications = () => {
  const { user } = useOutletContext();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { decrementNotificationCount } = useOutletContext();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/me/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Could not load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/user/notifications/${id}/read`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
        decrementNotificationCount(); // <-- update sidebar count here

  } catch (err) {
    console.error("Failed to mark notification as read", err);
  }
};
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f9f9fb] to-white">
      <Sidebar user={user} />

      <main className="flex-1 p-10 ml-64">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 italic">No notifications yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                onClick={() => markAsRead(notif._id)}
                className={`relative bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex gap-3 items-start transition-all duration-300 ${
                  !notif.read && (
  <div className="absolute top-2 right-2">
    <Dot className="text-red-500 animate-ping" />
  </div>
)
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full">
                  {notif.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Info className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-700">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                {!notif.read && (
                  <div className="absolute top-2 right-2">
                    <Dot className="text-red-500 animate-ping" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Notifications;
