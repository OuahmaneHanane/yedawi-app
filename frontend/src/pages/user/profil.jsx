import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Phone } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Profile fetch error:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading profile...
      </div>
    );
  }

  const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name
  )}&background=10B981&color=fff&size=128&rounded=true`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-emerald-100 via-white to-blue-100 px-4 py-10">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl p-8 ml-64 w-full max-w-md text-center transition transform hover:scale-[1.02]">
        <div className="relative">
          <img
            src={avatarURL}
            alt="User Avatar"
            className="w-28 h-28 mx-auto rounded-full shadow-md border-4 border-white bg-white"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-gray-800 tracking-tight">
          {user.name}
        </h2>

        <p className="mt-1 text-gray-500 text-sm">
          Empowering lives through kindness
        </p>

        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-emerald-500" />
            {user.email}
          </div>
          {user.phone && (
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              {user.phone}
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={() => alert('Edit Profile coming soon')}
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
