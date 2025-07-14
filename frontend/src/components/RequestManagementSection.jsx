import React from 'react';
import { Pill } from 'lucide-react';

const Typography = ({ variant, className, children }) => {
  const variants = {
    body: 'text-base',
    caption: 'text-sm',
    small: 'text-xs',
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const RequestManagementSection = ({ requests = [], onApprove, onReject }) => {
  const displayRequests = requests;
  console.log('Requests:', displayRequests);
  const sortedRequests = [...displayRequests].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '✗';
      default:
        return '•';
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-700">Requests Management</h2>
        <p className="text-slate-400 text-sm">Manage all medicine requests</p>
      </div>

      {sortedRequests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-300 text-6xl mb-4">📋</div>
          <p className="text-slate-500 text-lg">No requests available</p>
        </div>
      ) : (
        sortedRequests.map((req, index) => (
          <div
            key={req._id || index}
            className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden group"
          >
            <div className="p-4 space-y-2">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Typography variant="body" className="text-slate-800 font-semibold">
                      {req.user?.name || 'Unknown'}
                    </Typography>
                    <Typography variant="caption" className="text-slate-500">
                      {req.medicine || 'N/A'}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">📄</span>
                  <Typography variant="small" className="text-slate-600">
                    {req.supportingDocument || 'No file'}
                  </Typography>
                </div>
              </div>

              {/* Status + Actions */}
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                    req.status
                  )}`}
                >
                  {getStatusIcon(req.status)} {req.status}
                </span>

                {req.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onApprove(req._id)}
                      className="text-sm px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(req._id)}
                      className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestManagementSection;
