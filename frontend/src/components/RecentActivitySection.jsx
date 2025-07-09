import React from 'react';
import { Heart, HandHelping, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card from './Card';

const RecentActivitySection = ({ activities }) => {
  const getTypeIcon = (type) =>
    type === 'donation' ? <Heart className="w-5 h-5 text-rose-600" /> : <HandHelping className="w-5 h-5 text-sky-600" />;

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-md border border-gray-100 bg-white">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-500" />
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="p-4 flex items-start gap-4 rounded-xl hover:shadow-lg transition-shadow duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-inner">
                {getTypeIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">
                  {activity.type === 'donation' ? (
                    <>
                      Donated <span className="font-semibold">{activity.amount} USD</span>{' '}
                      {activity.medicine && <> for <span className="italic">{activity.medicine}</span></>}
                    </>
                  ) : (
                    <>
                      Requested <span className="italic">{activity.medicine}</span>
                    </>
                  )}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {getStatusIcon(activity.status)}
                  <span className="capitalize">{activity.status}</span>
                  <span className="ml-auto">{new Date(activity.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivitySection;
