# 📄 Contract Deployment Instructions

This guide provides detailed instructions for deploying your DAO smart contracts and integrating them with the frontend.

## 🏗 Smart Contract Deployment

### Prerequisites

1. **Install Foundry:**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. **Set up environment variables:**
```bash
# In the root directory, create .env
PRIVATE_KEY=0x1234567890abcdef... # Your deployer private key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

# For mainnet deployment
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

### Step 1: Deploy Core DAO Contracts

```bash
# Navigate to the project root
cd ../

# Compile contracts
forge build

# Deploy to Sepolia testnet
forge script script/DeployContracts.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast \
  --verify \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

**Expected output:**
```
== Logs ==
GovToken deployed at: 0x1234567890123456789012345678901234567890
DaoGovernor deployed at: 0x2345678901234567890123456789012345678901
Timelock deployed at: 0x3456789012345678901234567890123456789012
```

### Step 2: Deploy NFT Contracts

```bash
# Deploy Ambassador NFT and related contracts
forge script script/DeployNft.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast \
  --verify \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

**Expected output:**
```
== Logs ==
AmbassadorNft deployed at: 0x4567890123456789012345678901234567890123
VotingPowerExchange deployed at: 0x5678901234567890123456789012345678901234
```

### Step 3: Grant Necessary Roles

```bash
# Grant roles and set up permissions
forge script script/GrantRoles.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast
```

## 💰 Token & NFT Integration

### $Minchyn Token Integration

If you have an existing $Minchyn token:

1. **Get the contract address** from your deployment
2. **Verify it's ERC20 compatible**
3. **Update the frontend environment**

```env
NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS=0x6789012345678901234567890123456789012345
```

### Ugly Unicorns NFT Integration

If you have an existing NFT collection:

1. **Get the contract address**
2. **Verify it's ERC721 compatible**
3. **Check if it has staking functionality**

```env
NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS=0x7890123456789012345678901234567890123456
```

### Deploy New Token/NFT (Optional)

If you need to deploy new tokens:

```solidity
// Deploy ERC20 token for $Minchyn
forge create src/ERC20Token.sol:MinchynToken \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args "Minchyn" "MCHN" 1000000000000000000000000

// Deploy ERC721 NFT for Ugly Unicorns
forge create src/ERC721Token.sol:UglyUnicornsNFT \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args "Ugly Unicorns" "UU" "https://api.uglyunicorns.com/metadata/"
```

## 🔧 Frontend Integration

### Step 1: Update Environment Variables

Copy all deployed contract addresses to your frontend `.env.local`:

```env
# Core DAO Contracts
NEXT_PUBLIC_GOV_TOKEN_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS=0x2345678901234567890123456789012345678901
NEXT_PUBLIC_TIMELOCK_ADDRESS=0x3456789012345678901234567890123456789012
NEXT_PUBLIC_VOTING_POWER_EXCHANGE_ADDRESS=0x5678901234567890123456789012345678901234
NEXT_PUBLIC_AMBASSADOR_NFT_ADDRESS=0x4567890123456789012345678901234567890123

# Token & NFT Contracts
NEXT_PUBLIC_MINCHYN_TOKEN_ADDRESS=0x6789012345678901234567890123456789012345
NEXT_PUBLIC_UGLY_UNICORNS_NFT_ADDRESS=0x7890123456789012345678901234567890123456
```

### Step 2: Create Contract Configuration

Create `lib/contracts/config.ts`:

```typescript
export const contracts = {
  govToken: {
    address: process.env.NEXT_PUBLIC_GOV_TOKEN_ADDRESS as `0x${string}`,
    abi: GovTokenABI,
  },
  daoGovernor: {
    address: process.env.NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS as `0x${string}`,
    abi: DaoGovernorABI,
  },
  // ... add other contracts
} as const;
```

### Step 3: Copy Contract ABIs

```bash
# From the project root
cd frontend
mkdir -p lib/contracts/abis

# Copy ABIs from forge output
cp ../out/GovToken.sol/GovToken.json lib/contracts/abis/
cp ../out/DaoGovernor.sol/DaoGovernor.json lib/contracts/abis/
cp ../out/Timelock.sol/Timelock.json lib/contracts/abis/
cp ../out/VotingPowerExchange.sol/VotingPowerExchange.json lib/contracts/abis/
cp ../out/AmbassadorNft.sol/AmbassadorNft.json lib/contracts/abis/
```

## 🧪 Testing Your Deployment

### Test on Sepolia Testnet

1. **Get testnet ETH:**
   - Use [Sepolia Faucet](https://sepoliafaucet.com/)
   - Or [Alchemy Faucet](https://sepoliafaucet.com/)

2. **Test contract interactions:**
```bash
# Check token balance
cast call $GOV_TOKEN_ADDRESS "balanceOf(address)" $YOUR_ADDRESS --rpc-url $SEPOLIA_RPC_URL

# Check total supply
cast call $GOV_TOKEN_ADDRESS "totalSupply()" --rpc-url $SEPOLIA_RPC_URL

# Test governance functions
cast call $DAO_GOVERNOR_ADDRESS "proposalCount()" --rpc-url $SEPOLIA_RPC_URL
```

3. **Test frontend integration:**
   - Connect wallet
   - Check token balances display correctly
   - Test proposal creation (if you have permissions)
   - Verify NFT holdings appear

## 🚀 Mainnet Deployment

### Security Checklist

Before mainnet deployment:

- [ ] All contracts audited
- [ ] Multisig setup for admin functions
- [ ] Time delays configured
- [ ] Emergency pause mechanisms tested
- [ ] Documentation complete
- [ ] Community tested on testnet

### Deploy to Mainnet

```bash
# Update environment for mainnet
export MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Deploy with caution
forge script script/DeployContracts.s.sol \
  --rpc-url $MAINNET_RPC_URL \
  --broadcast \
  --verify \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --gas-estimate-multiplier 120
```

### Update Frontend for Mainnet

```env
# Frontend .env.local for production
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_NETWORK_NAME=mainnet
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Update with mainnet contract addresses
NEXT_PUBLIC_GOV_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_DAO_GOVERNOR_ADDRESS=0x...
# ... etc
```

## 📊 Contract Verification

### Verify on Etherscan

If auto-verification fails:

```bash
# Verify manually
forge verify-contract \
  --chain-id 11155111 \
  --num-of-optimizations 200 \
  --watch \
  --constructor-args $(cast abi-encode "constructor(string,string)" "GovToken" "GOV") \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --compiler-version v0.8.19+commit.7dd6d404 \
  $CONTRACT_ADDRESS \
  src/GovToken.sol:GovToken
```

## 🔄 Contract Upgrades

For upgradeable contracts:

```bash
# Deploy new implementation
forge script script/UpgradeContracts.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast

# Verify upgrade
cast call $PROXY_ADDRESS "implementation()" --rpc-url $SEPOLIA_RPC_URL
```

## 🛠 Troubleshooting

### Common Issues:

1. **Deployment fails with "out of gas":**
   - Increase gas limit: `--gas-limit 3000000`
   - Use gas multiplier: `--gas-estimate-multiplier 150`

2. **Verification fails:**
   - Check compiler version matches
   - Verify constructor arguments
   - Ensure optimization settings match

3. **Contract not appearing on Etherscan:**
   - Wait a few minutes for indexing
   - Check transaction was successful
   - Verify correct network

4. **Frontend can't connect to contracts:**
   - Verify addresses in `.env.local`
   - Check network configuration
   - Ensure ABIs are correct

## 📝 Deployment Checklist

- [ ] Contracts compiled successfully
- [ ] Tests passing
- [ ] Environment variables set
- [ ] Testnet deployment successful
- [ ] Contracts verified on Etherscan
- [ ] Frontend integration tested
- [ ] Permissions and roles configured
- [ ] Documentation updated
- [ ] Community notified

## 📚 Additional Resources

- [Foundry Documentation](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Etherscan Verification Guide](https://docs.etherscan.io/tutorials/verifying-contracts-programmatically)
- [Alchemy Developer Docs](https://docs.alchemy.com/)

---

**🎉 Your contracts are now deployed and integrated!**

*Remember to always test thoroughly on testnet before mainnet deployment.*