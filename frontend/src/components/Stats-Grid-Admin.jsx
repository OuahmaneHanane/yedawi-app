import React from 'react';
import { CheckCircle2, UserCheck, Clock, TrendingUp } from 'lucide-react';

const StatsGrid = ({ donorData, onStatClick }) => {
  const stats = [
    {
      title: 'Total Approved',
      value: donorData.totalDonations,
      change: '+12%',
      changeType: 'positive',
      icon: CheckCircle2, 
      color: 'emerald'
    },
    {
      title: 'Active Users',
      value: donorData.beneficiaries,
      change: '+8%',
      changeType: 'positive',
      icon: UserCheck,  
      color: 'blue'
    },
    {
      title: 'Pending Requests',
      value: donorData.pending,
      change: '-3%',
      changeType: 'negative',
      icon: Clock,  
      color: 'amber'
    },
    {
      title: 'Completed',
      value: donorData.completed,
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp, 
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-100 text-emerald-600',
      blue: 'bg-blue-100 text-blue-600',
      amber: 'bg-amber-100 text-amber-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color];
  };

  return (
    <div className="font-poppins grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);

        return (
          <div
            key={index}
            onClick={() => onStatClick(stat.title)}
            className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 ${colorClasses} rounded-lg flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-700 bg-red-100'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
