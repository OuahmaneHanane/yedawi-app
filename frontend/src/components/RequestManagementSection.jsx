import React from 'react';
import { CheckCircle } from 'lucide-react';

const RequestManagementSection = ({ requests, onApprove }) => {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">Pending Requests</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
          <span className="text-xs text-gray-500">
            {requests.filter(r => r.status === 'pending').length} pending
          </span>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition"
          >
            {/* Info */}
            <div className="flex-1 mb-3 sm:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-medium text-gray-600 text-xs">
                  {req.beneficiary.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{req.beneficiary}</p>
                  <p className="text-xs text-gray-500">
                    Requesting <span className="text-gray-700 font-medium">{req.medicine}</span>
                  </p>
                </div>
              </div>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  req.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}
              >
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>
            </div>

            {/* Approve Button */}
            {req.status === 'pending' && (
                <button
                onClick={() => onApprove(req.id)}
                className="flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-sm transition-all"
                >
                <CheckCircle className="w-4 h-4" />
                <span>Approve</span>
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestManagementSection;
