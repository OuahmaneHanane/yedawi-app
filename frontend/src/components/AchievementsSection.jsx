import React from 'react';
import * as Icons from 'lucide-react';
import Card from './Card';
import Typography from './Typography';
import AchievementCard from './AchievementCard';

const AchievementsSection = ({ achievements = [] }) => {
  // Determine header icon based on achievement count
  const getHeaderIcon = () => {
    const count = achievements.length;
    if (count >= 10) return Icons.Trophy;
    if (count >= 5) return Icons.Medal;
    if (count >= 3) return Icons.Award;
    return Icons.Star;
  };

  const HeaderIcon = getHeaderIcon();
  const hasAchievements = achievements.length > 0;

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ml-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <HeaderIcon className="text-gray-600 w-6 h-6" />
        <Typography variant="h3" className="text-gray-800 font-semibold">
          Achievements
        </Typography>
        {hasAchievements && (
          <span className="ml-auto inline-flex items-center justify-center rounded-full bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 select-none">
            {achievements.length}
          </span>
        )}
      </div>

      {/* Achievements Grid */}
      {hasAchievements ? (
        <div className="relative">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] bg-[size:20px_20px]" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
            {achievements.map((achievement, index) => {
              const IconComponent = typeof achievement.icon === 'string'
                ? Icons[achievement.icon] || Icons.Star
                : achievement.icon || Icons.Star;

              return (
                <div
                  key={index}
                  className="transform hover:scale-[1.02] transition-transform duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <AchievementCard
                    icon={IconComponent}
                    title={achievement.title}
                    description={achievement.description}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.Award className="w-12 h-12 text-gray-300 mb-4" />
          <Typography variant="body1" className="text-gray-500 mb-2">
            No achievements yet
          </Typography>
          <Typography variant="caption" className="text-gray-400 max-w-xs">
            Your accomplishments will appear here.
          </Typography>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
};

export default AchievementsSection;
