import { 
  MembershipLevelData, 
  Achievement, 
  SeasonalChallenge, 
  GovernanceHealthMetrics,
  TreasuryAnalytics,
  MemberProfile,
  VotingHistory,
  DelegationRelationship,
  GovernanceReward,
  ImpactMetrics,
  DiscussionThread,
  MembershipLevel
} from '@/types/dao-features';

// Membership Levels Data
export const membershipLevelsData: Record<MembershipLevel, MembershipLevelData> = {
  newbie: {
    name: 'Newbie',
    description: 'Basic voting rights',
    requirements: 'Join the DAO',
    privileges: ['Vote on proposals', 'Join discussions', 'View treasury'],
    color: 'gray',
    icon: '🌱',
    minVotes: 0
  },
  contributor: {
    name: 'Contributor',
    description: 'Proposal creation rights',
    requirements: 'Cast 10 votes and participate in 5 discussions',
    privileges: ['All Newbie privileges', 'Create proposals', 'Join working groups'],
    color: 'green',
    icon: '⚡',
    minVotes: 10,
    minDiscussions: 5
  },
  guardian: {
    name: 'Guardian',
    description: 'Emergency pause powers',
    requirements: 'Create 3 successful proposals and mentor 2 members',
    privileges: ['All Contributor privileges', 'Emergency pause', 'Moderate discussions'],
    color: 'purple',
    icon: '🛡️',
    minVotes: 50,
    minProposals: 3
  },
  elder: {
    name: 'Elder',
    description: 'Treasury oversight privileges',
    requirements: 'Long-term contribution and community recognition',
    privileges: ['All Guardian privileges', 'Treasury oversight', 'Strategic planning'],
    color: 'yellow',
    icon: '👑',
    minVotes: 100,
    minProposals: 10
  }
};

// Sample Achievements
export const sampleAchievements: Achievement[] = [
  {
    id: 'early-voter-1',
    type: 'earlyVoter',
    name: 'Early Bird',
    description: 'Vote within first 24 hours of proposal creation',
    icon: '⚡',
    points: 50,
    rarity: 'common',
    unlockedAt: new Date('2024-10-01'),
    progress: 5,
    maxProgress: 5
  },
  {
    id: 'debater-1',
    type: 'debater',
    name: 'Discussion Starter',
    description: 'Create 10 meaningful discussion threads',
    icon: '💬',
    points: 100,
    rarity: 'rare',
    unlockedAt: new Date('2024-10-03'),
    progress: 10,
    maxProgress: 10
  },
  {
    id: 'builder-1',
    type: 'builder',
    name: 'Proposal Master',
    description: 'Submit 5 successful proposals',
    icon: '🏗️',
    points: 200,
    rarity: 'epic',
    progress: 3,
    maxProgress: 5
  },
  {
    id: 'connector-1',
    type: 'connector',
    name: 'Community Builder',
    description: 'Recruit 10 new active members',
    icon: '🤝',
    points: 300,
    rarity: 'legendary',
    progress: 7,
    maxProgress: 10
  }
];

// Sample Seasonal Challenges
export const sampleSeasonalChallenges: SeasonalChallenge[] = [
  {
    id: 'october-governance',
    title: 'October Governance Challenge',
    description: 'Boost DAO participation this month with special voting rewards!',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-10-31'),
    reward: '500 GOV tokens + Exclusive NFT',
    participants: 127,
    maxParticipants: 200,
    status: 'active',
    tasks: [
      {
        id: 'vote-5-proposals',
        title: 'Active Voter',
        description: 'Vote on 5 different proposals',
        points: 100,
        completed: true,
        requirement: 'Cast votes on 5 proposals'
      },
      {
        id: 'create-discussion',
        title: 'Discussion Leader',
        description: 'Start a meaningful discussion thread',
        points: 150,
        completed: false,
        requirement: 'Create 1 discussion with 10+ replies'
      },
      {
        id: 'delegate-vote',
        title: 'Delegation Expert',
        description: 'Delegate or receive delegation',
        points: 200,
        completed: false,
        requirement: 'Participate in delegation system'
      }
    ]
  },
  {
    id: 'treasury-optimization',
    title: 'Treasury Optimization Quest',
    description: 'Help optimize DAO treasury management and yield strategies',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2024-11-30'),
    reward: '1000 GOV tokens + Treasury Advisor Badge',
    participants: 45,
    maxParticipants: 100,
    status: 'upcoming',
    tasks: [
      {
        id: 'treasury-proposal',
        title: 'Treasury Strategist',
        description: 'Submit treasury optimization proposal',
        points: 300,
        completed: false,
        requirement: 'Create treasury-related proposal'
      },
      {
        id: 'yield-analysis',
        title: 'Yield Hunter',
        description: 'Research and present yield opportunities',
        points: 250,
        completed: false,
        requirement: 'Submit yield analysis report'
      }
    ]
  }
];

// Sample Governance Health Metrics
export const sampleGovernanceMetrics: GovernanceHealthMetrics = {
  participationTrends: [
    { period: 'Sept 2024', participationRate: 68, totalVotes: 1247, uniqueVoters: 423 },
    { period: 'Aug 2024', participationRate: 72, totalVotes: 1589, uniqueVoters: 467 },
    { period: 'July 2024', participationRate: 65, totalVotes: 1156, uniqueVoters: 398 },
    { period: 'June 2024', participationRate: 71, totalVotes: 1434, uniqueVoters: 445 },
    { period: 'May 2024', participationRate: 59, totalVotes: 987, uniqueVoters: 356 }
  ],
  decentralizationMetrics: {
    giniCoefficient: 0.32,
    nakamotoCoefficient: 7,
    votingPowerDistribution: [
      { range: 'Top 1%', percentage: 15 },
      { range: 'Top 5%', percentage: 35 },
      { range: 'Top 10%', percentage: 52 },
      { range: 'Others', percentage: 48 }
    ]
  },
  proposalSuccess: {
    totalProposals: 47,
    passedProposals: 34,
    successRate: 72,
    averageParticipation: 68
  },
  memberEngagement: {
    activeMembers: 542,
    retentionRate: 87,
    averageActivityScore: 73,
    engagementTrend: [
      { month: 'September', score: 73 },
      { month: 'August', score: 76 },
      { month: 'July', score: 68 },
      { month: 'June', score: 71 },
      { month: 'May', score: 65 }
    ]
  }
};

// Sample Treasury Analytics
export const sampleTreasuryAnalytics: TreasuryAnalytics = {
  assetPerformance: [
    {
      asset: 'Ethereum',
      symbol: 'ETH',
      currentValue: 2847650,
      initialValue: 2456000,
      roi: 15.94,
      performance7d: 2.34,
      performance30d: 8.67
    },
    {
      asset: 'USD Coin',
      symbol: 'USDC',
      currentValue: 1500000,
      initialValue: 1500000,
      roi: 0,
      performance7d: 0,
      performance30d: 0
    },
    {
      asset: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      currentValue: 987543,
      initialValue: 856000,
      roi: 15.37,
      performance7d: 1.89,
      performance30d: 12.45
    },
    {
      asset: 'Governance Token',
      symbol: 'GOV',
      currentValue: 234567,
      initialValue: 189000,
      roi: 24.11,
      performance7d: -0.87,
      performance30d: 18.92
    }
  ],
  spendingPatterns: [
    { category: 'Development', amount: 125000, percentage: 45, trend: 'up' },
    { category: 'Marketing', amount: 67500, percentage: 24, trend: 'stable' },
    { category: 'Operations', amount: 48750, percentage: 17, trend: 'down' },
    { category: 'Treasury Management', amount: 25000, percentage: 9, trend: 'up' },
    { category: 'Legal & Compliance', amount: 13750, percentage: 5, trend: 'stable' }
  ],
  budgetForecasting: [
    { month: 'October 2024', projected: 280000, actual: 267500, variance: -12500 },
    { month: 'November 2024', projected: 295000, actual: 302000, variance: 7000 },
    { month: 'December 2024', projected: 310000 },
    { month: 'January 2025', projected: 325000 },
    { month: 'February 2025', projected: 340000 }
  ],
  yieldOptimization: [
    {
      protocol: 'Aave V3',
      apy: 4.25,
      tvl: 12500000,
      risk: 'low',
      recommendation: 'Stable lending protocol with consistent returns'
    },
    {
      protocol: 'Compound III',
      apy: 3.87,
      tvl: 8900000,
      risk: 'low',
      recommendation: 'Conservative option for treasury stability'
    },
    {
      protocol: 'Curve Finance',
      apy: 8.65,
      tvl: 2100000,
      risk: 'medium',
      recommendation: 'Higher yield with acceptable smart contract risk'
    },
    {
      protocol: 'Convex Finance',
      apy: 12.34,
      tvl: 890000,
      risk: 'high',
      recommendation: 'High yield but requires active management'
    }
  ]
};

// Sample Member Profile
export const sampleMemberProfile: MemberProfile = {
  id: 'member-1',
  address: '0x1234...5678',
  ens: 'alice.eth',
  username: 'Alice Chen',
  bio: 'Passionate about DeFi governance and sustainable treasury management. Building the future of decentralized organizations.',
  joinDate: new Date('2024-03-15'),
  membershipLevel: 'contributor',
  stats: {
    totalVotes: 47,
    proposalsCreated: 8,
    proposalsPassed: 6,
    discussionPosts: 23,
    reputationScore: 742
  },
  achievements: sampleAchievements.filter(a => a.unlockedAt),
  badges: ['Early Adopter', 'Active Voter', 'Community Builder'],
  socialLinks: {
    twitter: '@alicechen_dao',
    github: 'alicechen',
    website: 'https://alice.dev'
  }
};

// Sample Voting History
export const sampleVotingHistory: VotingHistory[] = [
  {
    proposalId: 'prop-1',
    proposalTitle: 'Increase Treasury Diversification',
    vote: 'for',
    votingPower: 1250,
    timestamp: new Date('2024-10-05'),
    outcome: 'passed',
    onWinningSide: true
  },
  {
    proposalId: 'prop-2',
    proposalTitle: 'New Marketing Initiative',
    vote: 'against',
    votingPower: 1250,
    timestamp: new Date('2024-10-03'),
    outcome: 'failed',
    onWinningSide: true
  },
  {
    proposalId: 'prop-3',
    proposalTitle: 'Update Governance Parameters',
    vote: 'for',
    votingPower: 1100,
    timestamp: new Date('2024-09-28'),
    outcome: 'passed',
    onWinningSide: true
  }
];

// Sample Delegations
export const sampleDelegations: DelegationRelationship[] = [
  {
    id: 'del-1',
    delegator: '0xabcd...efgh',
    delegatee: sampleMemberProfile.address,
    votingPower: 2500,
    startDate: new Date('2024-09-15'),
    status: 'active'
  },
  {
    id: 'del-2',
    delegator: sampleMemberProfile.address,
    delegatee: '0x9876...5432',
    votingPower: 500,
    startDate: new Date('2024-08-20'),
    status: 'active'
  }
];

// Sample Governance Rewards
export const sampleGovernanceRewards: GovernanceReward[] = [
  {
    id: 'reward-1',
    type: 'voting',
    amount: 25.5,
    token: 'GOV',
    description: 'Active voting participation bonus',
    earnedAt: new Date('2024-10-01'),
    claimed: true
  },
  {
    id: 'reward-2',
    type: 'proposal',
    amount: 100,
    token: 'GOV',
    description: 'Successful proposal creation',
    earnedAt: new Date('2024-09-28'),
    claimed: false
  },
  {
    id: 'reward-3',
    type: 'achievement',
    amount: 50,
    token: 'GOV',
    description: 'Discussion Starter achievement',
    earnedAt: new Date('2024-09-25'),
    claimed: true
  }
];

// Sample Impact Metrics
export const sampleImpactMetrics: ImpactMetrics = {
  impactScore: 78,
  treasuryInfluence: 85,
  communityEngagement: 73,
  proposalInfluence: 82,
  mentorshipImpact: 67,
  monthlyTrend: [
    { month: 'September', score: 78 },
    { month: 'August', score: 75 },
    { month: 'July', score: 71 },
    { month: 'June', score: 69 },
    { month: 'May', score: 64 }
  ]
};

// Sample Discussion Threads
export const sampleDiscussions: DiscussionThread[] = [
  {
    id: 'thread-1',
    proposalId: 'prop-1',
    title: 'Treasury Diversification Strategy Discussion',
    author: sampleMemberProfile.address,
    authorProfile: sampleMemberProfile,
    content: 'I believe we should consider diversifying our treasury holdings beyond ETH and USDC. What are your thoughts on adding BTC and some DeFi yield-generating positions?',
    timestamp: new Date('2024-10-04'),
    replies: [
      {
        id: 'reply-1',
        author: '0xabcd...efgh',
        authorProfile: {
          ...sampleMemberProfile,
          id: 'member-2',
          username: 'Bob Wilson',
          address: '0xabcd...efgh'
        },
        content: 'Great idea! BTC would provide good hedge against ETH correlation. Have you considered the gas costs for rebalancing?',
        timestamp: new Date('2024-10-04'),
        upvotes: 5,
        downvotes: 0
      }
    ],
    upvotes: 12,
    downvotes: 1,
    tags: ['treasury', 'diversification', 'strategy']
  },
  {
    id: 'thread-2',
    title: 'Gamification Features Feedback',
    author: '0x9876...5432',
    authorProfile: {
      ...sampleMemberProfile,
      id: 'member-3',
      username: 'Carol Smith',
      address: '0x9876...5432'
    },
    content: 'The new membership levels and achievements system looks amazing! I love how it encourages participation. What other gamification features are we considering?',
    timestamp: new Date('2024-10-05'),
    replies: [],
    upvotes: 8,
    downvotes: 0,
    tags: ['gamification', 'features', 'feedback']
  }
];