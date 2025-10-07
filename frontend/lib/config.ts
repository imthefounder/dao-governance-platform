// Smart Contract Addresses (Update these with your deployed contracts)
export const CONTRACT_ADDRESSES = {
  // Core Governance Contracts
  GOV_TOKEN: "0x0000000000000000000000000000000000000000", // Replace with deployed GovToken
  DAO_GOVERNOR: "0x0000000000000000000000000000000000000000", // Replace with deployed DaoGovernor
  TIMELOCK: "0x0000000000000000000000000000000000000000", // Replace with deployed Timelock
  
  // Token System
  UGLY_UNICORNS_GOVERNANCE: "0x0000000000000000000000000000000000000000", // Replace with deployed UglyUnicornsGovernance
  MINCHYN_WRAPPER: "0x0000000000000000000000000000000000000000", // Replace with deployed MinchynGovernanceWrapper
  VOTING_POWER_EXCHANGE: "0x0000000000000000000000000000000000000000", // Replace with deployed VotingPowerExchangeV2
  
  // Additional Features
  PROPOSAL_MANAGER: "0x0000000000000000000000000000000000000000", // Replace with deployed SimpleProposalManager
  DAO_TREASURY: "0x0000000000000000000000000000000000000000", // Replace with deployed DAOTreasury
  
  // External Contracts (Base Mainnet)
  UGLY_UNICORNS_NFT: "0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F",
  MINCHYN_TOKEN: "0x91738EE7A9b54eb810198cefF5549ca5982F47B3"
} as const;

// Network Configuration
export const SUPPORTED_CHAINS = {
  BASE_MAINNET: {
    id: 8453,
    name: 'Base',
    network: 'base',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://mainnet.base.org'] },
      default: { http: ['https://mainnet.base.org'] },
    },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://basescan.org' },
    },
  },
  BASE_SEPOLIA: {
    id: 84532,
    name: 'Base Sepolia',
    network: 'base-sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://sepolia.base.org'] },
      default: { http: ['https://sepolia.base.org'] },
    },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' },
    },
  }
} as const;

// Application Configuration
export const APP_CONFIG = {
  name: "Ugly Unicorns DAO",
  description: "Decentralized governance platform for the Ugly Unicorns community",
  version: "1.0.0",
  defaultChain: SUPPORTED_CHAINS.BASE_MAINNET,
  walletConnectProjectId: typeof window !== 'undefined' ? process?.env?.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "" : "",
  
  // Governance Parameters
  governance: {
    proposalThreshold: "1000000000000000000", // 1 UUDT
    votingDelay: 86400, // 1 day in seconds
    votingPeriod: 604800, // 1 week in seconds
    quorumPercentage: 1, // 1% of total supply
  },
  
  // Treasury Configuration
  treasury: {
    emergencyWithdrawalLimit: "100000000000000000000", // 100 ETH
    defaultSpendingLimit: "50000000000000000000", // 50 ETH per month
  }
} as const;

// Contract ABIs (simplified - you'll need to add full ABIs from your compiled contracts)
export const CONTRACT_ABIS = {
  GOV_TOKEN: [
    "function balanceOf(address account) view returns (uint256)",
    "function delegate(address delegatee)",
    "function delegates(address account) view returns (address)",
    "function getVotes(address account) view returns (uint256)",
    "function mint(address to, uint256 amount)",
    "function burn(address from, uint256 amount)"
  ],
  
  PROPOSAL_MANAGER: [
    "function createProposal(uint8 proposalType, string title, string description, address[] targets, uint256[] values, bytes[] calldatas) returns (uint256)",
    "function castVote(uint256 proposalId, uint8 support)",
    "function getProposal(uint256 proposalId) view returns (tuple)",
    "function getProposalCount() view returns (uint256)",
    "function updateProposalStatus(uint256 proposalId)"
  ],
  
  DAO_TREASURY: [
    "function depositETH() payable",
    "function depositERC20(address token, uint256 amount)",
    "function withdrawAsset(address asset, uint256 amount, address recipient, uint256 proposalId, string description)",
    "function getAssetBalance(address asset) view returns (uint256)",
    "function getSupportedAssets() view returns (address[])",
    "function monthlySpendingLimits(address asset) view returns (uint256)",
    "function getCurrentMonthSpending(address asset) view returns (uint256)"
  ],
  
  VOTING_POWER_EXCHANGE: [
    "function exchangeMinchyn(uint256 amount, uint256 nonce, uint256 expiry, bytes signature)",
    "function exchangeUglyUnicorns(uint256[] tokenIds, uint256 nonce, uint256 expiry, bytes signature)",
    "function getVotingPowerCap() view returns (uint256)"
  ]
} as const;