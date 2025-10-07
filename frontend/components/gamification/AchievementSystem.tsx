import React, { useState } from 'react';
import { Achievement, AchievementType } from '@/types/dao-features';

interface AchievementSystemProps {
  achievements: Achievement[];
  totalPoints: number;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({
  achievements,
  totalPoints
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const filteredAchievements = achievements.filter(achievement => {
    const rarityMatch = selectedRarity === 'all' || achievement.rarity === selectedRarity;
    const statusMatch = filter === 'all' || 
      (filter === 'unlocked' && achievement.unlockedAt) ||
      (filter === 'locked' && !achievement.unlockedAt);
    return rarityMatch && statusMatch;
  });

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-100 text-gray-800 border-gray-200',
      rare: 'bg-blue-100 text-blue-800 border-blue-200',
      epic: 'bg-purple-100 text-purple-800 border-purple-200',
      legendary: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getAchievementIcon = (type: AchievementType) => {
    const icons = {
      earlyVoter: '⚡',
      debater: '💬',
      builder: '🏗️',
      connector: '🤝'
    };
    return icons[type];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="text-2xl mr-2">🏅</span>
          Achievement System
        </h3>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">
          {totalPoints.toLocaleString()} Points
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{unlockedAchievements.length}</div>
          <div className="text-sm text-green-700">Unlocked</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{lockedAchievements.length}</div>
          <div className="text-sm text-gray-700">Locked</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {((unlockedAchievements.length / achievements.length) * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-blue-700">Complete</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {['all', 'unlocked', 'locked'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {['all', 'common', 'rare', 'epic', 'legendary'].map(rarity => (
            <button
              key={rarity}
              onClick={() => setSelectedRarity(rarity)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedRarity === rarity
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map(achievement => {
          const isUnlocked = !!achievement.unlockedAt;
          const hasProgress = achievement.progress !== undefined && achievement.maxProgress !== undefined;
          const progressPercentage = hasProgress 
            ? (achievement.progress! / achievement.maxProgress!) * 100 
            : 0;
          
          return (
            <div 
              key={achievement.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                isUnlocked 
                  ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md' 
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              {isUnlocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              
              <div className={`text-3xl mb-2 ${!isUnlocked ? 'grayscale' : ''}`}>
                {getAchievementIcon(achievement.type)}
              </div>
              
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mb-2 ${
                getRarityColor(achievement.rarity)
              }`}>
                {achievement.rarity.toUpperCase()}
              </div>
              
              <h4 className={`font-bold mb-1 ${
                isUnlocked ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {achievement.name}
              </h4>
              
              <p className={`text-sm mb-2 ${
                isUnlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  isUnlocked ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {achievement.points} points
                </span>
                
                {isUnlocked && achievement.unlockedAt && (
                  <span className="text-xs text-gray-500">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {hasProgress && !isUnlocked && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-600">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>No achievements found with the selected filters.</p>
        </div>
      )}
    </div>
  );
};