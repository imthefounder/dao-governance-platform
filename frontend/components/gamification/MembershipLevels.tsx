import React from 'react';
import { MembershipLevel, MembershipLevelData } from '@/types/dao-features';

interface MembershipLevelsProps {
  currentLevel: MembershipLevel;
  levelData: Record<MembershipLevel, MembershipLevelData>;
  userStats: {
    votes: number;
    proposals: number;
    discussions: number;
  };
}

export const MembershipLevels: React.FC<MembershipLevelsProps> = ({
  currentLevel,
  levelData,
  userStats
}) => {
  const levels: MembershipLevel[] = ['newbie', 'contributor', 'guardian', 'elder'];
  const currentLevelIndex = levels.indexOf(currentLevel);

  const getLevelIcon = (level: MembershipLevel) => {
    const icons = {
      newbie: '🌱',
      contributor: '⚡',
      guardian: '🛡️',
      elder: '👑'
    };
    return icons[level];
  };

  const getProgressToNextLevel = (level: MembershipLevel) => {
    const nextLevelIndex = levels.indexOf(level) + 1;
    if (nextLevelIndex >= levels.length) return 100;
    
    const nextLevel = levels[nextLevelIndex];
    const nextLevelData = levelData[nextLevel];
    
    if (nextLevelData.minVotes) {
      return Math.min(100, (userStats.votes / nextLevelData.minVotes) * 100);
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">🏆</span>
        Membership Levels
      </h3>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Your Progress</span>
          <span className="text-sm text-gray-500">
            Level {currentLevelIndex + 1} of {levels.length}
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentLevelIndex + 1) / levels.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            {levels.map((level, index) => (
              <div 
                key={level}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                  index <= currentLevelIndex 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {getLevelIcon(level)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {levels.map((level, index) => {
          const data = levelData[level];
          const isUnlocked = index <= currentLevelIndex;
          const isCurrent = level === currentLevel;
          const progress = isUnlocked ? 100 : getProgressToNextLevel(levels[index - 1] || 'newbie');
          
          return (
            <div 
              key={level}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                isCurrent 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : isUnlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Current
                </div>
              )}
              
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{getLevelIcon(level)}</span>
                <div>
                  <h4 className={`font-bold capitalize ${
                    isCurrent ? 'text-blue-900' : isUnlocked ? 'text-green-900' : 'text-gray-600'
                  }`}>
                    {level}
                  </h4>
                  <p className="text-sm text-gray-600">{data.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Privileges:</span>
                  <ul className="mt-1 space-y-1">
                    {data.privileges.map((privilege, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                        {privilege}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {!isUnlocked && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-600">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{data.requirements}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};