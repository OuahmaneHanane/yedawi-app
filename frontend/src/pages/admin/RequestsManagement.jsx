import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/requests/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/user/requests/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRequests((prev) => prev.map((req) => (req._id === id ? response.data : req)));
  } catch (err) {
    console.error('Error updating status:', err);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✓';
      case 'pending': return '…';
      case 'rejected': return '✗';
      default: return '•';
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = () => 'bg-gradient-to-br from-green-400 to-emerald-500';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-600 text-lg">Loading requests...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-600 text-lg">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans text-slate-800">
      <div className="max-w-10xl mx-auto">
        <div className="mb-14 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Medical Requests</h1>
          <p className="text-slate-600 text-base mt-1">Review and manage all incoming requests</p>
          <div className="w-20 h-1 bg-green-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-300 text-6xl mb-4">📋</div>
            <p className="text-slate-500 text-lg">No requests available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-semibold text-sm shadow-md`}
                      >
                        {getInitials(req.user?.name ?? '')}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base">{req.user?.name ?? 'Unknown'}</h3>
                        <p className="text-slate-500 text-xs">{req.user?.email ?? 'No email'}</p>
                        <div className="mt-1 text-xs text-slate-500 flex gap-4">
                          <span className="flex items-center gap-1">📄 {req.prescriptionFile}</span>
                          <span className="flex items-center gap-1">📅 {new Date(req.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                        {getStatusIcon(req.status)} {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </div>
                      {req.status === 'pending' && (
                        <div className="flex mt-2 gap-2">
                          <button
                            onClick={() => handleStatusChange(req._id, 'approved')}
                            className="px-4 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-full transition shadow"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(req._id, 'rejected')}
                            className="px-4 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsManagement;
