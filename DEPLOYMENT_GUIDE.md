# 🚀 DAO Governance Platform Deployment Guide

## Overview
This DAO supports **Ugly Unicorns NFT** (0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F) and **Minchyn Token** (0x91738EE7A9b54eb810198cefF5549ca5982F47B3) governance integration.

## Quick Start (Recommended)

### Option 1: Using WSL (Linux Subsystem) - EASIEST
```bash
# Open WSL terminal
wsl

# Install Foundry in WSL
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup

# Navigate to your project (adjust path as needed)
cd /mnt/c/Users/kstep/Documents/GitHub/dao-governance-platform

# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test -vvv

# Start local network (in separate terminal)
anvil

# Deploy to local network
forge script script/DeployContractsV2.s.sol --rpc-url http://localhost:8545 --broadcast --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Option 2: Using Remix IDE (Browser-based) - NO INSTALLATION NEEDED

1. **Go to https://remix.ethereum.org**

2. **Upload your contracts:**
   - Create new workspace
   - Upload all files from `src/` folder
   - Upload `lib/` dependencies (OpenZeppelin contracts)

3. **Compile contracts:**
   - Select Solidity 0.8.24
   - Compile all contracts

4. **Deploy step by step:**
   ```solidity
   // 1. Deploy GovToken first
   // 2. Deploy MinchynGovernanceWrapper with Minchyn token address
   // 3. Deploy UglyUnicornsGovernance with NFT address  
   // 4. Deploy VotingPowerExchangeV2 with all token addresses
   // 5. Grant necessary roles
   ```

### Option 3: Using Hardhat (Alternative)

Create `hardhat.config.js`:
```javascript
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: "YOUR_SEPOLIA_RPC_URL",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};
```

## Contract Deployment Order

### 1. Core Contracts
```solidity
// Deploy in this exact order:
1. GovToken.sol
2. MinchynGovernanceWrapper.sol 
3. UglyUnicornsGovernance.sol
4. VotingPowerExchangeV2.sol
5. DaoGovernor.sol
6. Timelock.sol
```

### 2. Configuration Parameters

**Mainnet Addresses:**
- Ugly Unicorns NFT: `0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F`
- Minchyn Token: `0x91738EE7A9b54eb810198cefF5549ca5982F47B3`

**Local Testing (Mock Contracts):**
- Use the deployment script to create mock versions for testing

### 3. Role Setup (Critical!)
```solidity
// After deployment, grant these roles:
- MINTER_ROLE to VotingPowerExchangeV2
- BURNER_ROLE to VotingPowerExchangeV2
- MANAGER_ROLE to admin address
- EXCHANGER_ROLE to VotingPowerExchangeV2
```

## Network Options

### Local Development (Anvil/Hardhat)
```bash
# Start local blockchain
anvil --host 0.0.0.0 --port 8545

# Network details:
RPC URL: http://localhost:8545
Chain ID: 31337
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Testnet Deployment (Sepolia)
```bash
# Deploy to Sepolia testnet
forge script script/DeployContractsV2.s.sol \
  --rpc-url https://sepolia.infura.io/v3/YOUR_API_KEY \
  --broadcast \
  --private-key YOUR_PRIVATE_KEY \
  --verify \
  --etherscan-api-key YOUR_ETHERSCAN_API_KEY
```

### Mainnet Deployment (Production)
```bash
# Deploy to Ethereum mainnet
forge script script/DeployContractsV2.s.sol \
  --rpc-url https://mainnet.infura.io/v3/YOUR_API_KEY \
  --broadcast \
  --private-key YOUR_PRIVATE_KEY \
  --verify \
  --etherscan-api-key YOUR_ETHERSCAN_API_KEY \
  --slow
```

## Testing Scenarios

### 1. Basic Functionality Test
```bash
# Test core contracts
forge test --match-contract "UglyUnicorns" -vvv
forge test --match-contract "Minchyn" -vvv
forge test --match-contract "VotingPowerExchange" -vvv
```

### 2. Integration Test
```bash
# Test complete governance workflow
forge test --match-path test/integration/UglyUnicornsIntegration.t.sol -vvv
```

### 3. Governance Simulation
```bash
# Test proposal creation and voting
forge test --match-contract "DAOGovernor" -vvv
```

## Verification Commands

### After Deployment, Verify:
```bash
# Check contract deployment
cast code CONTRACT_ADDRESS --rpc-url YOUR_RPC_URL

# Verify roles are set correctly
cast call CONTRACT_ADDRESS "hasRole(bytes32,address)" ROLE_HASH ADMIN_ADDRESS --rpc-url YOUR_RPC_URL

# Test basic functions
cast call UGLY_UNICORNS_GOVERNANCE_ADDRESS "name()" --rpc-url YOUR_RPC_URL
cast call MINCHYN_WRAPPER_ADDRESS "symbol()" --rpc-url YOUR_RPC_URL
```

## Common Issues & Solutions

### 1. Compilation Errors
- Ensure Solidity version 0.8.24
- Check all imports are correct
- Verify OpenZeppelin version compatibility

### 2. Deployment Failures
- Check gas limits
- Verify private key has sufficient ETH
- Ensure constructor parameters are correct

### 3. Role Setup Issues
- Grant roles in correct order
- Use proper role hashes
- Verify admin addresses

## Security Checklist

Before mainnet deployment:
- [ ] All tests pass
- [ ] Security audit completed
- [ ] Role permissions reviewed
- [ ] Emergency controls tested
- [ ] Upgrade mechanisms validated
- [ ] Timelock delays configured
- [ ] Multi-sig setup for admin functions

## Example Usage After Deployment

```solidity
// 1. Wrap Ugly Unicorns NFT for governance
uglyUnicornsGovernance.wrapNFT(tokenId);

// 2. Deposit Minchyn tokens
minchynWrapper.deposit(amount);

// 3. Exchange for governance tokens
votingPowerExchange.exchangeMinchyn(amount, nonce, deadline, signature);

// 4. Delegate voting power
govToken.delegate(delegatee);

// 5. Create proposal (via Governor)
governor.propose(targets, values, calldatas, description);

// 6. Vote on proposal
governor.castVote(proposalId, support);
```

## Support Resources

- Foundry Documentation: https://book.getfoundry.sh/
- OpenZeppelin Docs: https://docs.openzeppelin.com/
- Ethereum Development: https://ethereum.org/developers/

---

**Ready to deploy?** Start with Option 1 (WSL) for the smoothest experience!