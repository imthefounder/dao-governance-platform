// DAO Gamification Types
export interface DAOGamification {
  membershipLevels: {
    newbie: 'Basic voting rights';
    contributor: 'Proposal creation rights';
    guardian: 'Emergency pause powers';
    elder: 'Treasury oversight privileges';
  };
  achievementSystem: {
    earlyVoter: 'Vote within first 24 hours';
    debater: 'Participate in forum discussions';
    builder: 'Submit successful proposals';
    connector: 'Recruit new members';
  };
  seasonalChallenges: 'Monthly community challenges with rewards';
}

export type MembershipLevel = 'newbie' | 'contributor' | 'guardian' | 'elder';
export type AchievementType = 'earlyVoter' | 'debater' | 'builder' | 'connector';

export interface MembershipLevelData {
  name: string;
  description: string;
  requirements: string;
  privileges: string[];
  color: string;
  icon: string;
  minVotes?: number;
  minProposals?: number;
  minDiscussions?: number;
}

export interface Achievement {
  id: string;
  type: AchievementType;
  name: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface SeasonalChallenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reward: string;
  participants: number;
  maxParticipants: number;
  tasks: ChallengeTask[];
  status: 'upcoming' | 'active' | 'completed';
}

export interface ChallengeTask {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  requirement: string;
}

// Analytics Features Types
export interface AnalyticsFeatures {
  governanceHealth: {
    participationTrends: 'Voting participation over time';
    decentralizationMetrics: 'Measure of voting power distribution';
    proposalSuccess: 'Success rate analytics';
    memberEngagement: 'Activity scoring and retention';
  };
  treasuryAnalytics: {
    assetPerformance: 'ROI tracking per asset class';
    spendingPatterns: 'Categorized expense tracking';
    budgetForecasting: 'Predictive budget planning';
    yieldOptimization: 'Yield farming opportunity scoring';
  };
}

export interface GovernanceHealthMetrics {
  participationTrends: {
    period: string;
    participationRate: number;
    totalVotes: number;
    uniqueVoters: number;
  }[];
  decentralizationMetrics: {
    giniCoefficient: number;
    nakamotoCoefficient: number;
    votingPowerDistribution: { range: string; percentage: number }[];
  };
  proposalSuccess: {
    totalProposals: number;
    passedProposals: number;
    successRate: number;
    averageParticipation: number;
  };
  memberEngagement: {
    activeMembers: number;
    retentionRate: number;
    averageActivityScore: number;
    engagementTrend: { month: string; score: number }[];
  };
}

export interface TreasuryAnalytics {
  assetPerformance: {
    asset: string;
    symbol: string;
    currentValue: number;
    initialValue: number;
    roi: number;
    performance7d: number;
    performance30d: number;
  }[];
  spendingPatterns: {
    category: string;
    amount: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  budgetForecasting: {
    month: string;
    projected: number;
    actual?: number;
    variance?: number;
  }[];
  yieldOptimization: {
    protocol: string;
    apy: number;
    tvl: number;
    risk: 'low' | 'medium' | 'high';
    recommendation: string;
  }[];
}

// Member Features Types
export interface MemberFeatures {
  personalDashboard: {
    votingHistory: 'Personal voting record and performance';
    delegationNetwork: 'Manage delegation relationships';
    rewardTracker: 'Track earned governance rewards';
    impactMetrics: 'Measure your DAO impact';
  };
  socialFeatures: {
    memberProfiles: 'Rich member profiles with contributions';
    discussionForums: 'Threaded discussions per proposal';
    workingGroups: 'Sub-DAOs for specific initiatives';
    mentorship: 'New member onboarding program';
  };
}

export interface MemberProfile {
  id: string;
  address: string;
  ens?: string;
  avatar?: string;
  username: string;
  bio?: string;
  joinDate: Date;
  membershipLevel: MembershipLevel;
  stats: {
    totalVotes: number;
    proposalsCreated: number;
    proposalsPassed: number;
    discussionPosts: number;
    reputationScore: number;
  };
  achievements: Achievement[];
  badges: string[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export interface VotingHistory {
  proposalId: string;
  proposalTitle: string;
  vote: 'for' | 'against' | 'abstain';
  votingPower: number;
  timestamp: Date;
  outcome: 'passed' | 'failed' | 'pending';
  onWinningSide: boolean;
}

export interface DelegationRelationship {
  id: string;
  delegator?: string;
  delegatee?: string;
  votingPower: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'expired' | 'revoked';
}

export interface GovernanceReward {
  id: string;
  type: 'voting' | 'proposal' | 'delegation' | 'discussion' | 'achievement';
  amount: number;
  token: string;
  description: string;
  earnedAt: Date;
  claimed: boolean;
}

export interface ImpactMetrics {
  impactScore: number;
  treasuryInfluence: number;
  communityEngagement: number;
  proposalInfluence: number;
  mentorshipImpact: number;
  monthlyTrend: { month: string; score: number }[];
}

export interface DiscussionThread {
  id: string;
  proposalId?: string;
  title: string;
  author: string;
  authorProfile: MemberProfile;
  content: string;
  timestamp: Date;
  replies: DiscussionReply[];
  upvotes: number;
  downvotes: number;
  tags: string[];
}

export interface DiscussionReply {
  id: string;
  author: string;
  authorProfile: MemberProfile;
  content: string;
  timestamp: Date;
  parentId?: string;
  upvotes: number;
  downvotes: number;
}

export interface WorkingGroup {
  id: string;
  name: string;
  description: string;
  lead: string;
  members: string[];
  status: 'active' | 'completed' | 'paused';
  budget: number;
  budgetUsed: number;
  startDate: Date;
  endDate?: Date;
  goals: string[];
  deliverables: Deliverable[];
  discussions: DiscussionThread[];
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
}

export interface MentorshipProgram {
  id: string;
  mentor: MemberProfile;
  mentee: MemberProfile;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'paused';
  goals: string[];
  sessions: MentorshipSession[];
  progress: number;
}

export interface MentorshipSession {
  id: string;
  date: Date;
  duration: number;
  topics: string[];
  notes?: string;
  completed: boolean;
}