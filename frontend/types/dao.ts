export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'failed' | 'pending' | 'executed';
  category: 'treasury' | 'governance' | 'membership' | 'technical' | 'other';
  startTime: number;
  endTime: number;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorumRequired: number;
  currentQuorum: number;
  actions?: ProposalAction[];
}

export interface ProposalAction {
  target: string;
  value: string;
  signature: string;
  calldata: string;
  description: string;
}

export interface Vote {
  proposalId: string;
  voter: string;
  support: boolean;
  weight: number;
  reason?: string;
  timestamp: number;
}

export interface TreasuryAsset {
  symbol: string;
  name: string;
  balance: string;
  usdValue: number;
  price: number;
  change24h: number;
  logoUrl?: string;
}

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing' | 'swap' | 'stake';
  amount: string;
  asset: string;
  to?: string;
  from?: string;
  timestamp: number;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
}

export interface Member {
  address: string;
  ensName?: string;
  votingPower: number;
  delegatedPower: number;
  nftCount: number;
  joinDate: number;
  proposalsCreated: number;
  votesCase: number;
}

export interface DAOStats {
  totalMembers: number;
  totalProposals: number;
  totalVotes: number;
  treasuryValue: number;
  avgParticipation: number;
  monthlyGrowth: number;
}