import React from 'react';
import { Pill } from 'lucide-react';
import Typography from './Typography';


// ActivityItem Component
const ActivityItem = ({ activity, className = '' }) => (
  <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${className}`}>
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <Pill className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <Typography variant="body" className="text-gray-800 font-medium">
          {activity.beneficiary}
        </Typography>
        <Typography variant="caption" className="text-gray-600">
          {activity.medicine}
        </Typography>
      </div>
    </div>
    <div className="text-right">
      <Typography variant="body" className="font-semibold text-green-600">
        ${activity.amount}
      </Typography>
      <Typography 
        variant="small" 
        className={activity.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}
      >
        {activity.status === 'completed' ? 'Completed' : 'Pending'}
      </Typography>
    </div>
  </div>
);


 export default ActivityItem;