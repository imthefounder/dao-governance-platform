import { Proposal, TreasuryAsset, Transaction, Member, DAOStats } from '../types/dao';

// Sample proposals data
export const sampleProposals: Proposal[] = [
  {
    id: 'prop-001',
    title: 'Allocate 50 ETH for Community Development Fund',
    description: 'This proposal requests allocation of 50 ETH from the treasury to establish a community development fund. The fund will be used to sponsor hackathons, community events, and developer grants to grow the ecosystem.',
    proposer: '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B',
    status: 'active',
    category: 'treasury',
    startTime: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    endTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days from now
    votesFor: 125000,
    votesAgainst: 25000,
    totalVotes: 150000,
    quorumRequired: 100000,
    currentQuorum: 150000,
    actions: [
      {
        target: '0x1234567890123456789012345678901234567890',
        value: '50000000000000000000', // 50 ETH
        signature: 'transfer(address,uint256)',
        calldata: '0x...',
        description: 'Transfer 50 ETH to community fund'
      }
    ]
  },
  {
    id: 'prop-002',
    title: 'Update Governance Voting Period to 7 Days',
    description: 'Currently voting periods are 5 days. This proposal suggests extending them to 7 days to allow more community members to participate in governance decisions.',
    proposer: '0x123d35Cc6634C0532925a3b8D56d8145431C5e5B',
    status: 'active',
    category: 'governance',
    startTime: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    endTime: Date.now() + 6 * 24 * 60 * 60 * 1000, // 6 days from now
    votesFor: 89000,
    votesAgainst: 45000,
    totalVotes: 134000,
    quorumRequired: 100000,
    currentQuorum: 134000
  },
  {
    id: 'prop-003',
    title: 'Partner with Base Protocol for DeFi Integration',
    description: 'Proposal to establish a strategic partnership with Base Protocol to integrate DeFi features into our DAO ecosystem. This would include yield farming opportunities for treasury assets.',
    proposer: '0x987d35Cc6634C0532925a3b8D56d8145431C5e5B',
    status: 'active',
    category: 'technical',
    startTime: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
    endTime: Date.now() + 6.5 * 24 * 60 * 60 * 1000, // 6.5 days from now
    votesFor: 67000,
    votesAgainst: 12000,
    totalVotes: 79000,
    quorumRequired: 100000,
    currentQuorum: 79000
  },
  {
    id: 'prop-004',
    title: 'Implement NFT Staking Rewards Program',
    description: 'Create a staking mechanism where Ugly Unicorns NFT holders can stake their NFTs to earn additional voting power and token rewards.',
    proposer: '0x456d35Cc6634C0532925a3b8D56d8145431C5e5B',
    status: 'passed',
    category: 'membership',
    startTime: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    endTime: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    votesFor: 195000,
    votesAgainst: 35000,
    totalVotes: 230000,
    quorumRequired: 100000,
    currentQuorum: 230000
  }
];

// Sample treasury assets
export const sampleTreasuryAssets: TreasuryAsset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '125.50',
    usdValue: 298750,
    price: 2380,
    change24h: 2.4
  },
  {
    symbol: 'MCHN',
    name: 'Machine Token',
    balance: '50,000',
    usdValue: 125000,
    price: 2.5,
    change24h: -1.2
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '75,000',
    usdValue: 75000,
    price: 1.0,
    change24h: 0.1
  },
  {
    symbol: 'BASE',
    name: 'Base Token',
    balance: '25,000',
    usdValue: 37500,
    price: 1.5,
    change24h: 5.7
  }
];

// Sample transactions
export const sampleTransactions: Transaction[] = [
  {
    id: 'tx-001',
    type: 'incoming',
    amount: '15.5',
    asset: 'ETH',
    from: '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    status: 'completed',
    hash: '0xabc123...def456'
  },
  {
    id: 'tx-002',
    type: 'outgoing',
    amount: '5,000',
    asset: 'MCHN',
    to: '0x123d35Cc6634C0532925a3b8D56d8145431C5e5B',
    timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
    status: 'completed',
    hash: '0xdef456...abc123'
  },
  {
    id: 'tx-003',
    type: 'swap',
    amount: '10,000',
    asset: 'USDC',
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    status: 'completed',
    hash: '0x789abc...123def'
  }
];

// Sample members
export const sampleMembers: Member[] = [
  {
    address: '0x742d35Cc6634C0532925a3b8D56d8145431C5e5B',
    ensName: 'alice.eth',
    votingPower: 25000,
    delegatedPower: 5000,
    nftCount: 3,
    joinDate: Date.now() - 90 * 24 * 60 * 60 * 1000,
    proposalsCreated: 2,
    votesCase: 15
  },
  {
    address: '0x123d35Cc6634C0532925a3b8D56d8145431C5e5B',
    ensName: 'bob.eth',
    votingPower: 18000,
    delegatedPower: 0,
    nftCount: 2,
    joinDate: Date.now() - 60 * 24 * 60 * 60 * 1000,
    proposalsCreated: 1,
    votesCase: 8
  }
];

// Sample DAO stats
export const sampleDAOStats: DAOStats = {
  totalMembers: 1247,
  totalProposals: 23,
  totalVotes: 5670,
  treasuryValue: 536250,
  avgParticipation: 67.5,
  monthlyGrowth: 12.3
};