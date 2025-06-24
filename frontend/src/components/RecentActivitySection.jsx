import { Trophy, Medal, Star, Award } from 'lucide-react';
import Card from './Card';
import Typography from './Typography';
import AchievementCard from './AchievementCard';

const AchievementsSection = ({ achievements = [] }) => {
  const getHeaderIcon = () => {
    const iconCount = achievements.length;
    if (iconCount >= 10) return Trophy;
    if (iconCount >= 5) return Medal;
    if (iconCount >= 3) return Award;
    return Star;
  };

  const HeaderIcon = getHeaderIcon();
  const hasAchievements = achievements && achievements.length > 0;

  return (
<Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
  {/* Add ml-4 here */}
  <div className="ml-4">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
        <HeaderIcon className="w-5 h-5 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        Achievements
      </h3>
      {hasAchievements && (
        <span className="ml-auto inline-flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 select-none">
          {achievements.length}
        </span>
      )}
    </div>

    {/* Achievements Grid */}
    {hasAchievements ? (
      <div className="relative">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] bg-[size:20px_20px]" />
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="transform hover:scale-[1.02] transition-transform duration-200"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <AchievementCard {...achievement} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      /* Empty state */
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Award className="w-12 h-12 text-gray-300 mb-4" />
        <Typography variant="body1" className="text-gray-500 mb-2">
          No achievements yet
        </Typography>
        <Typography variant="caption" className="text-gray-400 max-w-xs">
          Your accomplishments will appear here
        </Typography>
      </div>
    )}
  </div>

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
