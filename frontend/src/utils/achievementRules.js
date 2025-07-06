// utils/achievementRules.js
export const generateAchievements = (stats) => {
  const achievements = [];

  if (stats.totalDonations >= 1) {
    achievements.push({
      icon: 'Heart',
      title: 'First Donation',
      description: 'You made your first donation!'
    });
  }

  if (stats.totalDonations >= 10) {
    achievements.push({
      icon: 'Trophy',
      title: 'Top Donor',
      description: '10+ donations — You’re making a difference!'
    });
  }

  if (stats.totalRequests >= 1) {
    achievements.push({
      icon: 'HandHelping',
      title: 'First Request',
      description: 'You made your first request!'
    });
  }

  if (stats.totalRequests >= 5) {
    achievements.push({
      icon: 'Award',
      title: 'Request Supporter',
      description: 'You’ve requested assistance 5+ times.'
    });
  }

  return achievements;
};
