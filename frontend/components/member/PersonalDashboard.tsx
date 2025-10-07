import React, { useState } from 'react';
import { MemberProfile, VotingHistory, DelegationRelationship, GovernanceReward, ImpactMetrics } from '@/types/dao-features';

interface PersonalDashboardProps {
  profile: MemberProfile;
  votingHistory: VotingHistory[];
  delegations: DelegationRelationship[];
  rewards: GovernanceReward[];
  impactMetrics: ImpactMetrics;
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({
  profile,
  votingHistory,
  delegations,
  rewards,
  impactMetrics
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'voting' | 'delegation' | 'rewards' | 'impact'>('overview');

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{profile.username}</h3>
            <p className="text-gray-600">{profile.ens || profile.address}</p>
            <p className="text-sm text-gray-500">Member since {profile.joinDate.toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              profile.membershipLevel === 'elder' ? 'bg-yellow-100 text-yellow-800' :
              profile.membershipLevel === 'guardian' ? 'bg-purple-100 text-purple-800' :
              profile.membershipLevel === 'contributor' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {profile.membershipLevel.charAt(0).toUpperCase() + profile.membershipLevel.slice(1)}
            </div>
            <div className="text-lg font-bold text-gray-900 mt-1">
              {profile.stats.reputationScore} Rep
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{profile.stats.totalVotes}</div>
          <div className="text-sm text-gray-600">Total Votes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{profile.stats.proposalsCreated}</div>
          <div className="text-sm text-gray-600">Proposals Created</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{profile.stats.proposalsPassed}</div>
          <div className="text-sm text-gray-600">Proposals Passed</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">{profile.stats.discussionPosts}</div>
          <div className="text-sm text-gray-600">Discussion Posts</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-indigo-600">{profile.achievements.length}</div>
          <div className="text-sm text-gray-600">Achievements</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.achievements.slice(0, 3).map(achievement => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{achievement.name}</div>
                <div className="text-sm text-gray-600">{achievement.points} points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const VotingTab = () => (
    <div className="space-y-6">
      {/* Voting Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {votingHistory.filter(v => v.onWinningSide).length}
          </div>
          <div className="text-sm text-green-700">Winning Votes</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {((votingHistory.filter(v => v.onWinningSide).length / votingHistory.length) * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-blue-700">Success Rate</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {votingHistory.reduce((sum, v) => sum + v.votingPower, 0).toLocaleString()}
          </div>
          <div className="text-sm text-purple-700">Total Voting Power</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {votingHistory.filter(v => v.vote === 'for').length}
          </div>
          <div className="text-sm text-orange-700">For Votes</div>
        </div>
      </div>

      {/* Voting History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Voting History</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {votingHistory.slice(0, 10).map(vote => (
            <div key={`${vote.proposalId}-${vote.timestamp.getTime()}`} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{vote.proposalTitle}</div>
                <div className="text-sm text-gray-500">
                  {vote.timestamp.toLocaleDateString()} • {vote.votingPower.toLocaleString()} voting power
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vote.vote === 'for' ? 'bg-green-100 text-green-800' :
                  vote.vote === 'against' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {vote.vote.toUpperCase()}
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  vote.outcome === 'passed' ? 'bg-green-100 text-green-800' :
                  vote.outcome === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {vote.outcome.toUpperCase()}
                </div>
                {vote.onWinningSide && (
                  <span className="text-green-500">✅</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DelegationTab = () => (
    <div className="space-y-6">
      {/* Delegation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Delegating To</h4>
          {delegations.filter(d => d.delegator === profile.address).map(delegation => (
            <div key={delegation.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <div className="font-medium text-gray-900">{delegation.delegatee}</div>
                <div className="text-sm text-gray-600">{delegation.votingPower.toLocaleString()} voting power</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                delegation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {delegation.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Delegated From</h4>
          {delegations.filter(d => d.delegatee === profile.address).map(delegation => (
            <div key={delegation.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <div className="font-medium text-gray-900">{delegation.delegator}</div>
                <div className="text-sm text-gray-600">{delegation.votingPower.toLocaleString()} voting power</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                delegation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {delegation.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Delegation Network</h4>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🌐</div>
          <p>Interactive delegation network visualization coming soon!</p>
        </div>
      </div>
    </div>
  );

  const RewardsTab = () => (
    <div className="space-y-6">
      {/* Reward Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {rewards.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
          </div>
          <div className="text-sm text-yellow-700">Total Earned</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {rewards.filter(r => r.claimed).reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
          </div>
          <div className="text-sm text-green-700">Claimed</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {rewards.filter(r => !r.claimed).reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
          </div>
          <div className="text-sm text-blue-700">Pending</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{rewards.length}</div>
          <div className="text-sm text-purple-700">Total Rewards</div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Reward History</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {rewards.slice(0, 10).map(reward => (
            <div key={reward.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{reward.description}</div>
                <div className="text-sm text-gray-500">
                  {reward.earnedAt.toLocaleDateString()} • {reward.type}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {reward.amount} {reward.token}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  reward.claimed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {reward.claimed ? 'Claimed' : 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ImpactTab = () => (
    <div className="space-y-6">
      {/* Impact Score Overview */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-lg border border-purple-200">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">{impactMetrics.impactScore}</div>
          <div className="text-lg text-purple-700 mb-4">Overall Impact Score</div>
          <div className="w-full bg-purple-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(impactMetrics.impactScore / 100) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{impactMetrics.treasuryInfluence}</div>
          <div className="text-sm text-gray-600">Treasury Influence</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{impactMetrics.communityEngagement}</div>
          <div className="text-sm text-gray-600">Community Engagement</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{impactMetrics.proposalInfluence}</div>
          <div className="text-sm text-gray-600">Proposal Influence</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">{impactMetrics.mentorshipImpact}</div>
          <div className="text-sm text-gray-600">Mentorship Impact</div>
        </div>
      </div>

      {/* Impact Trend */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Impact Trend</h4>
        <div className="relative h-32">
          <div className="absolute inset-0 flex items-end justify-between">
            {impactMetrics.monthlyTrend.map((trend, index) => (
              <div key={trend.month} className="flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-purple-400 to-purple-600 rounded-t w-8 transition-all duration-500 hover:from-purple-500 hover:to-purple-700"
                  style={{ height: `${(trend.score / 100) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">
                  {trend.month.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤', component: OverviewTab },
    { id: 'voting', label: 'Voting History', icon: '🗳️', component: VotingTab },
    { id: 'delegation', label: 'Delegation', icon: '🤝', component: DelegationTab },
    { id: 'rewards', label: 'Rewards', icon: '🏆', component: RewardsTab },
    { id: 'impact', label: 'Impact', icon: '💫', component: ImpactTab },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">📊</span>
        Personal Dashboard
      </h3>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </div>
    </div>
  );
};