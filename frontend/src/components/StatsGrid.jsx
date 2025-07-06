import React from 'react';
import { Coins, HeartHandshake, Trophy, TrendingUp, } from 'lucide-react';

// StatsGrid Component
const StatsGrid = ({ userStats, onStatClick }) => {
  const stats = [
    {
      icon: Coins,
      title: "Total Donated",
      value: `${userStats?.totalDonations || 0}`,
      color: "emerald",
      gradient: "from-blue-400 via-emerald-200 to-green-400",
      bgGradient: "from-blue-100 via-emerald-100 to-green-100/50",
      onClick: () => onStatClick('donations')
    },
    {
      icon: HeartHandshake,
      title: "Requests Made",
      value: userStats?.totalRequests || 0,
      color: "emerald",
      gradient: "from-blue-400 via-emerald-200 to-green-400",
      bgGradient: "from-blue-100 via-emerald-100 to-green-100/50",
      onClick: () => onStatClick('requests')
    },
    {
      icon: Trophy,
      title: "Your Rank",
      value: `#${userStats?.rank || '-'}`,
      color: "emerald",
      gradient: "from-blue-400 via-emerald-200 to-green-400",
      bgGradient: "from-blue-100 via-emerald-100 to-green-100/50",
      onClick: () => onStatClick('rank')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ml-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group cursor-pointer"
          onClick={stat.onClick}
        >
          <div className={`
            relative overflow-hidden rounded-2xl border border-gray-100
            bg-gradient-to-br ${stat.bgGradient}
            hover:shadow-lg hover:-translate-y-1
            transition-all duration-300 ease-out
            p-6
          `}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-current"></div>
              <div className="absolute -left-2 -bottom-2 w-16 h-16 rounded-full bg-current"></div>
            </div>

            {/* Content */}
            <div className="relative">
              {/* Icon */}
              <div className={`
                w-12 h-12 rounded-xl mb-4
                bg-gradient-to-br ${stat.gradient}
                flex items-center justify-center
                shadow-lg shadow-emerald-500/25
                group-hover:scale-110 transition-transform duration-300
              `}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              {/* Stats */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600 tracking-wide">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {stat.value}
                </p>
              </div>

              {/* Trend Indicator */}
              <div className="mt-4 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-600">
                  +12% this month
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
