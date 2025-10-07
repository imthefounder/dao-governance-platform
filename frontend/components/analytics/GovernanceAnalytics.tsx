import React, { useState } from 'react';
import { GovernanceHealthMetrics } from '@/types/dao-features';

interface GovernanceAnalyticsProps {
  data: GovernanceHealthMetrics;
}

export const GovernanceAnalytics: React.FC<GovernanceAnalyticsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'participation' | 'decentralization' | 'success' | 'engagement'>('participation');

  const ParticipationTrends = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.participationTrends.slice(-3).map((trend, index) => (
          <div key={trend.period} className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">{trend.period}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Participation Rate</span>
                <span className="font-bold text-blue-600">{trend.participationRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Votes</span>
                <span className="font-bold text-gray-900">{trend.totalVotes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Unique Voters</span>
                <span className="font-bold text-gray-900">{trend.uniqueVoters.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Trend Visualization */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Participation Trend</h4>
        <div className="relative h-32">
          <div className="absolute inset-0 flex items-end justify-between">
            {data.participationTrends.map((trend, index) => (
              <div key={trend.period} className="flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-blue-400 to-blue-600 rounded-t w-8 transition-all duration-500 hover:from-blue-500 hover:to-blue-700"
                  style={{ height: `${(trend.participationRate / 100) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1 rotate-45 origin-left">
                  {trend.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DecentralizationMetrics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gini Coefficient */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Gini Coefficient</h4>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - data.decentralizationMetrics.giniCoefficient)}`}
                className="text-purple-500"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{data.decentralizationMetrics.giniCoefficient}</div>
                <div className="text-xs text-gray-500">Equality</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            Lower is better (0 = perfect equality)
          </p>
        </div>

        {/* Nakamoto Coefficient */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Nakamoto Coefficient</h4>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {data.decentralizationMetrics.nakamotoCoefficient}
            </div>
            <div className="text-sm text-gray-600">
              Number of entities needed to control 51%
            </div>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded ${
                      i < data.decentralizationMetrics.nakamotoCoefficient
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Power Distribution */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Voting Power Distribution</h4>
        <div className="space-y-3">
          {data.decentralizationMetrics.votingPowerDistribution.map((dist, index) => (
            <div key={dist.range} className="flex items-center">
              <div className="w-24 text-sm text-gray-600">{dist.range}</div>
              <div className="flex-1 mx-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${dist.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-900 text-right">
                {dist.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProposalSuccess = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{data.proposalSuccess.totalProposals}</div>
          <div className="text-sm text-blue-700">Total Proposals</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{data.proposalSuccess.passedProposals}</div>
          <div className="text-sm text-green-700">Passed</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{data.proposalSuccess.successRate}%</div>
          <div className="text-sm text-purple-700">Success Rate</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{data.proposalSuccess.averageParticipation}%</div>
          <div className="text-sm text-orange-700">Avg Participation</div>
        </div>
      </div>

      {/* Success Rate Donut Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Proposal Outcomes</h4>
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - data.proposalSuccess.successRate / 100)}`}
                className="text-green-500"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{data.proposalSuccess.successRate}%</div>
                <div className="text-xs text-gray-500">Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MemberEngagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <div className="text-2xl font-bold text-indigo-600">{data.memberEngagement.activeMembers}</div>
          <div className="text-sm text-indigo-700">Active Members</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{data.memberEngagement.retentionRate}%</div>
          <div className="text-sm text-green-700">Retention Rate</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{data.memberEngagement.averageActivityScore}</div>
          <div className="text-sm text-purple-700">Avg Activity Score</div>
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Engagement Trend</h4>
        <div className="relative h-32">
          <div className="absolute inset-0 flex items-end justify-between">
            {data.memberEngagement.engagementTrend.map((trend, index) => (
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
    { id: 'participation', label: 'Participation', icon: '📊', component: ParticipationTrends },
    { id: 'decentralization', label: 'Decentralization', icon: '🌐', component: DecentralizationMetrics },
    { id: 'success', label: 'Proposal Success', icon: '✅', component: ProposalSuccess },
    { id: 'engagement', label: 'Engagement', icon: '🤝', component: MemberEngagement },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">📈</span>
        Governance Analytics
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