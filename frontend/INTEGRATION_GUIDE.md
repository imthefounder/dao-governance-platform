# DAO Platform Integration Guide

This guide provides step-by-step instructions for integrating your smart contracts, $Minchyn token, and Ugly Unicorns NFT collection with the DAO governance platform.

## 📋 Prerequisites

Before starting the integration, ensure you have:

- [ ] Deployed smart contracts (DAO Governor, Timelock, Treasury, etc.)
- [ ] $Minchyn token contract deployed
- [ ] Ugly Unicorns NFT collection deployed
- [ ] WalletConnect Project ID
- [ ] Alchemy API key
- [ ] Contract addresses and ABIs

## 🔧 Environment Configuration

### Step 1: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in the required environment variables in `.env.local`:

```env
# API Keys and Project IDs
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_ENVIRONMENT=development

# Contract Addresses (Update after deployment)
NEXT_PUBLIC_GOV_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_TIMELOCK_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_PROPOSAL_MANAGER_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_DAO_TREASURY_ADDRESS=0x0000000000000000000000000000000000000000

# Additional Contract Addresses
NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_VOTING_POWER_EXCHANGE_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_AMBASSADOR_NFT_ADDRESS=0x0000000000000000000000000000000000000000

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=sepolia
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key
```

### Step 2: Obtain Required API Keys

#### WalletConnect Project ID
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create an account or sign in
3. Create a new project
4. Copy the Project ID from your project dashboard
5. Replace `your_walletconnect_project_id` in your `.env.local`

#### Alchemy API Key
1. Visit [Alchemy](https://www.alchemy.com/)
2. Create an account or sign in
3. Create a new app for your desired network (e.g., Ethereum Sepolia)
4. Copy the API Key from your app dashboard
5. Replace `your_alchemy_api_key` in your `.env.local`

## 🚀 Contract Integration

### Step 3: Deploy Smart Contracts

If you haven't deployed your contracts yet, follow these steps:

1. **Navigate to the contract directory:**
```bash
cd ../
```

2. **Compile contracts:**
```bash
forge build
```

3. **Deploy to testnet (Sepolia):**
```bash
# Deploy GovToken
forge script script/DeployContracts.s.sol --rpc-url sepolia --broadcast --verify

# Deploy NFT contracts
forge script script/DeployNft.s.sol --rpc-url sepolia --broadcast --verify

# Grant necessary roles
forge script script/GrantRoles.s.sol --rpc-url sepolia --broadcast
```

### Step 4: Update Contract Addresses

After successful deployment, update your `.env.local` with the actual contract addresses:

```env
# Example deployed addresses (replace with your actual addresses)
NEXT_PUBLIC_GOV_TOKEN_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS=0x2345678901234567890123456789012345678901
NEXT_PUBLIC_TIMELOCK_ADDRESS=0x3456789012345678901234567890123456789012
NEXT_PUBLIC_PROPOSAL_MANAGER_ADDRESS=0x4567890123456789012345678901234567890123
NEXT_PUBLIC_DAO_TREASURY_ADDRESS=0x5678901234567890123456789012345678901234
NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS=0x6789012345678901234567890123456789012345
NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS=0x7890123456789012345678901234567890123456
NEXT_PUBLIC_VOTING_POWER_EXCHANGE_ADDRESS=0x8901234567890123456789012345678901234567
NEXT_PUBLIC_AMBASSADOR_NFT_ADDRESS=0x9012345678901234567890123456789012345678
```

## 🔗 Smart Contract Integration

### Step 5: Create Contract Interface Files

1. **Create contract ABIs directory:**
```bash
mkdir -p lib/contracts/abis
```

2. **Copy contract ABIs:**
```bash
# Copy ABIs from forge output
cp ../out/GovToken.sol/GovToken.json lib/contracts/abis/
cp ../out/DaoGovernor.sol/DaoGovernor.json lib/contracts/abis/
cp ../out/Timelock.sol/Timelock.json lib/contracts/abis/
cp ../out/VotingPowerExchange.sol/VotingPowerExchange.json lib/contracts/abis/
cp ../out/AmbassadorNft.sol/AmbassadorNft.json lib/contracts/abis/
```

### Step 6: Create Contract Configuration

Create `lib/contracts/config.ts`:

```typescript
// Contract configuration
export const contracts = {
  govToken: {
    address: process.env.NEXT_PUBLIC_GOV_TOKEN_ADDRESS as `0x${string}`,
    abi: GovTokenABI,
  },
  daoGovernor: {
    address: process.env.NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS as `0x${string}`,
    abi: DaoGovernorABI,
  },
  timelock: {
    address: process.env.NEXT_PUBLIC_TIMELOCK_ADDRESS as `0x${string}`,
    abi: TimelockABI,
  },
  votingPowerExchange: {
    address: process.env.NEXT_PUBLIC_VOTING_POWER_EXCHANGE_ADDRESS as `0x${string}`,
    abi: VotingPowerExchangeABI,
  },
  minchynToken: {
    address: process.env.NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS as `0x${string}`,
    abi: ERC20ABI,
  },
  uglyUnicornsNFT: {
    address: process.env.NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS as `0x${string}`,
    abi: ERC721ABI,
  },
  ambassadorNFT: {
    address: process.env.NEXT_PUBLIC_AMBASSADOR_NFT_ADDRESS as `0x${string}`,
    abi: AmbassadorNftABI,
  },
};

// Network configuration
export const networkConfig = {
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
  name: process.env.NEXT_PUBLIC_NETWORK_NAME || 'sepolia',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
};
```

## 🎨 Frontend Integration

### Step 7: Install Required Dependencies

```bash
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

### Step 8: Set Up Wallet Connection

Create `lib/providers/WalletProvider.tsx`:

```typescript
'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Ugly Unicorns DAO',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## 🔄 Contract Interaction Hooks

### Step 9: Create Custom Hooks

Create `hooks/useContracts.ts`:

```typescript
import { useReadContract, useWriteContract } from 'wagmi';
import { contracts } from '@/lib/contracts/config';

// Example: Gov Token hooks
export function useGovTokenBalance(address: string) {
  return useReadContract({
    ...contracts.govToken,
    functionName: 'balanceOf',
    args: [address],
  });
}

export function useVotingPower(address: string) {
  return useReadContract({
    ...contracts.govToken,
    functionName: 'getVotes',
    args: [address],
  });
}

// Example: DAO Governor hooks
export function useProposalState(proposalId: bigint) {
  return useReadContract({
    ...contracts.daoGovernor,
    functionName: 'state',
    args: [proposalId],
  });
}

export function useCreateProposal() {
  return useWriteContract();
}

// Example: NFT hooks
export function useUglyUnicornsBalance(address: string) {
  return useReadContract({
    ...contracts.uglyUnicornsNFT,
    functionName: 'balanceOf',
    args: [address],
  });
}

export function useMinchynBalance(address: string) {
  return useReadContract({
    ...contracts.minchynToken,
    functionName: 'balanceOf',
    args: [address],
  });
}

// Example: Voting Power Exchange hooks
export function useExchangeRate() {
  return useReadContract({
    ...contracts.votingPowerExchange,
    functionName: 'exchangeRate',
  });
}
```

## 📊 Data Integration

### Step 10: Replace Mock Data with Real Contract Data

Update your components to use real contract data instead of mock data:

```typescript
// Example: Update proposals to use real data
export function useProposals() {
  const { data: proposalCount } = useReadContract({
    ...contracts.daoGovernor,
    functionName: 'proposalCount',
  });

  // Fetch proposal details for each proposal
  const proposals = useQueries({
    queries: Array.from({ length: Number(proposalCount || 0) }, (_, i) => ({
      queryKey: ['proposal', i],
      queryFn: () => fetchProposalDetails(i),
    })),
  });

  return proposals;
}
```

## 🧪 Testing

### Step 11: Test Integration

1. **Start the development server:**
```bash
npm run dev
```

2. **Test wallet connection:**
   - Connect your wallet using the connect button
   - Verify the correct network is selected
   - Check that your wallet address is displayed

3. **Test contract interactions:**
   - View your token balances
   - Check your NFT holdings
   - Test proposal creation (if you have necessary permissions)
   - Test voting on proposals

4. **Test exchange functionality:**
   - Try exchanging MCHN for GOV tokens
   - Verify the exchange rate is correct
   - Check that balances update after transactions

## 🚨 Troubleshooting

### Common Issues:

1. **Contract address not found:**
   - Verify all contract addresses in `.env.local`
   - Ensure contracts are deployed to the correct network

2. **Wallet connection issues:**
   - Check WalletConnect Project ID
   - Verify network configuration

3. **Transaction failures:**
   - Check gas limits and fees
   - Verify contract permissions and roles

4. **API rate limits:**
   - Consider upgrading Alchemy plan for higher limits
   - Implement proper error handling

## 🔄 Deployment to Production

### Step 12: Production Deployment

1. **Update environment for production:**
```env
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_NETWORK_NAME=mainnet
```

2. **Deploy to Vercel:**
```bash
npm run build
vercel --prod
```

3. **Add environment variables to Vercel:**
   - Go to your Vercel project settings
   - Add all environment variables from `.env.local`
   - Redeploy the application

## 📚 Additional Resources

- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Foundry Documentation](https://book.getfoundry.sh/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Support

If you encounter any issues during integration:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure contracts are deployed and verified
4. Test on a local blockchain first (Anvil/Hardhat)

## 🎯 Next Steps

After successful integration:

1. Implement governance proposal creation UI
2. Add real-time proposal status updates
3. Integrate treasury management features
4. Set up notification systems
5. Add advanced analytics with real data
6. Implement delegation features
7. Add NFT staking functionality

---

*This integration guide provides a comprehensive foundation for connecting your DAO platform with real smart contracts. Customize the implementation based on your specific contract architecture and requirements.*