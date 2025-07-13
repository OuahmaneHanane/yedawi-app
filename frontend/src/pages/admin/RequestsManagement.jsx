import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/requests/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        setError('Failed to fetch requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { status: 'approved' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: 'approved' } : r))
      );
    } catch (err) {
      console.error('Failed to approve:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { status: 'rejected' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: 'rejected' } : r))
      );
    } catch (err) {
      console.error('Failed to reject:', err);
    }
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'NN';
    const parts = name.trim().split(' ').filter(Boolean);
    return parts.map((part) => part[0].toUpperCase()).join('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'pending':
        return '…';
      case 'rejected':
        return '✗';
      default:
        return '•';
    }
  };

  const getAvatarColor = () => 'bg-gradient-to-br from-green-400 to-emerald-500';

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Newest requests first
  const sortedRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-4">
      {sortedRequests.map((req, index) => {
        const name = req.user?.name ?? 'Unknown';
        const email = req.user?.email ?? 'No email';

        return (
          <div
            key={req._id || index}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-semibold text-sm shadow-md`}
                  >
                    {getInitials(name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">{name}</h3>
                    <p className="text-slate-500 text-xs">{email}</p>
                    <div className="mt-1 text-xs text-slate-500 flex gap-4">
                      <span>📄 {req.supportingDocument ?? 'No file'}</span>
                      <span>📅 {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'No date'}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}
                >
                  {getStatusIcon(req.status)}{' '}
                  {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : 'Unknown'}
                </div>
              </div>

              {req.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="flex-1 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md font-medium"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="flex-1 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md font-medium"
                  >
                    ✗ Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestsManagement;