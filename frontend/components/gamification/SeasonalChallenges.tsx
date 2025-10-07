import React, { useState } from 'react';
import { SeasonalChallenge, ChallengeTask } from '@/types/dao-features';

interface SeasonalChallengesProps {
  challenges: SeasonalChallenge[];
  userParticipation: Record<string, boolean>;
  onJoinChallenge: (challengeId: string) => void;
}

export const SeasonalChallenges: React.FC<SeasonalChallengesProps> = ({
  challenges,
  userParticipation,
  onJoinChallenge
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      active: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || colors.upcoming;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      upcoming: '⏳',
      active: '🔥',
      completed: '✅'
    };
    return icons[status as keyof typeof icons] || '⏳';
  };

  const calculateProgress = (tasks: ChallengeTask[]) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">🎯</span>
        Seasonal Challenges
      </h3>

      <div className="space-y-6">
        {challenges.map(challenge => {
          const isParticipating = userParticipation[challenge.id];
          const progress = calculateProgress(challenge.tasks);
          const daysRemaining = getDaysRemaining(challenge.endDate);
          const isExpanded = selectedChallenge === challenge.id;
          
          return (
            <div 
              key={challenge.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{challenge.title}</h4>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${
                        getStatusColor(challenge.status)
                      }`}>
                        {getStatusIcon(challenge.status)} {challenge.status.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📅 {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</span>
                      <span>👥 {challenge.participants}/{challenge.maxParticipants} participants</span>
                      <span>🎁 {challenge.reward}</span>
                      {challenge.status === 'active' && daysRemaining > 0 && (
                        <span className="text-orange-600 font-medium">
                          ⏰ {daysRemaining} days left
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {challenge.status === 'active' && !isParticipating && (
                      <button
                        onClick={() => onJoinChallenge(challenge.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        disabled={challenge.participants >= challenge.maxParticipants}
                      >
                        {challenge.participants >= challenge.maxParticipants ? 'Full' : 'Join Challenge'}
                      </button>
                    )}
                    
                    {isParticipating && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Participating
                      </div>
                    )}
                    
                    <button
                      onClick={() => setSelectedChallenge(isExpanded ? null : challenge.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {isExpanded ? '🔼' : '🔽'}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {isParticipating && challenge.tasks.length > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Your Progress</span>
                      <span className="text-gray-600">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Participation Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Participation</span>
                    <span className="text-gray-600">
                      {((challenge.participants / challenge.maxParticipants) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Expanded Task List */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Challenge Tasks</h5>
                  <div className="space-y-3">
                    {challenge.tasks.map(task => (
                      <div 
                        key={task.id}
                        className={`p-3 rounded-lg border ${
                          task.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-lg ${task.completed ? '✅' : '⚪'}`}>
                                {task.completed ? '✅' : '⚪'}
                              </span>
                              <h6 className={`font-medium ${
                                task.completed ? 'text-green-800' : 'text-gray-900'
                              }`}>
                                {task.title}
                              </h6>
                            </div>
                            <p className={`text-sm ml-7 ${
                              task.completed ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                            <p className="text-xs text-gray-500 ml-7 mt-1">
                              Requirement: {task.requirement}
                            </p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            task.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {task.points} pts
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {challenge.tasks.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No tasks available for this challenge.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {challenges.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🎯</div>
          <p>No seasonal challenges available at the moment.</p>
          <p className="text-sm mt-1">Check back soon for exciting new challenges!</p>
        </div>
      )}
    </div>
  );
};