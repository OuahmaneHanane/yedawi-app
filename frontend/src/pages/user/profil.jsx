import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AtSign, Phone, Star } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone || '');
      } catch (err) {
        console.error('Profile fetch error:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/user/me',
        { name, email, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({ ...user, name, email, phone });
      setEditMode(false);
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading profile...
      </div>
    );
  }

  const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10B981&color=fff&size=128&rounded=true`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden px-4"
      style={{ marginLeft: '16rem' }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-3xl p-6 w-full max-w-sm text-center transition-all duration-500 hover:shadow-emerald-500/20 hover:scale-[1.02] relative overflow-hidden">

        {/* Background animations */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full translate-x-16 translate-y-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute top-4 right-4 text-emerald-400 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute top-8 left-6 text-blue-400 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <Star className="w-3 h-3 fill-current" />
        </div>

        <div className="relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center shadow-2xl ring-4 ring-white transition-all duration-300 group-hover:ring-emerald-200">
              <img
                src={avatarURL}
                alt="User Avatar"
                className="rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          {editMode ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 text-gray-700 text-sm"
                placeholder="Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 text-gray-700 text-sm"
                placeholder="Email"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-3 w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 text-gray-700 text-sm"
                placeholder="Phone"
              />
            </>
          ) : (
            <>
              <h2 className="mt-6 text-2xl font-bold text-gray-800 tracking-tight">
                {user.name}
              </h2>

              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-emerald-700">Premium Member</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 justify-start px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <AtSign className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 justify-start px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-6 space-y-3">
            {editMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="w-full px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="w-full px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-400 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;