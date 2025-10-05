# 🌐 IMMEDIATE REMIX IDE DEPLOYMENT

## ⚡ **FASTEST WAY - Works Right Now!**

### Step 1: Open Remix IDE
**Go to: https://remix.ethereum.org**

### Step 2: Create Workspace
1. Click "Create" → "Blank Workspace"
2. Name: "DAO-Governance-Platform"

### Step 3: Upload Contracts (Copy-Paste Method)

#### Contract 1: GovToken.sol
Create file: `contracts/GovToken.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract GovToken is ERC20, ERC20Permit, ERC20Votes, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor() 
        ERC20("DAO Governance Token", "DAOGOV") 
        ERC20Permit("DAO Governance Token") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
```

#### Contract 2: MinchynGovernanceWrapper.sol
Create file: `contracts/MinchynGovernanceWrapper.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MinchynGovernanceWrapper is ERC20, ERC20Permit, ERC20Votes, AccessControl {
    bytes32 public constant EXCHANGER_ROLE = keccak256("EXCHANGER_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    
    IERC20 public immutable minchynToken;
    uint256 public exchangeRate = 1e18; // 1:1 ratio initially
    
    event TokensDeposited(address indexed user, uint256 amount);
    event TokensWithdrawn(address indexed user, uint256 amount);

    constructor(address _minchynToken) 
        ERC20("Wrapped Minchyn Governance", "wMCHN") 
        ERC20Permit("Wrapped Minchyn Governance") {
        minchynToken = IERC20(_minchynToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        minchynToken.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
        emit TokensDeposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        minchynToken.transfer(msg.sender, amount);
        emit TokensWithdrawn(msg.sender, amount);
    }

    function burnByBurner(address from, uint256 amount) external onlyRole(EXCHANGER_ROLE) {
        _burn(from, amount);
    }

    function mint(address to, uint256 amount) external onlyRole(EXCHANGER_ROLE) {
        _mint(to, amount);
    }

    function setExchangeRate(uint256 newRate) external onlyRole(MANAGER_ROLE) {
        exchangeRate = newRate;
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
```

### Step 4: Deploy in Order

**In Remix "Deploy & Run Transactions" tab:**

1. Select "Remix VM (Shanghai)" environment
2. Deploy contracts in this order:

#### 1. Deploy GovToken
- Contract: GovToken
- Constructor: (no parameters)
- Click "Deploy"

#### 2. Deploy MinchynGovernanceWrapper
- Contract: MinchynGovernanceWrapper  
- Constructor: `0x91738EE7A9b54eb810198cefF5549ca5982F47B3`
- Click "Deploy"

#### 3. Setup Roles
After deployment, call these functions:

**On GovToken:**
```javascript
// Grant MINTER_ROLE to MinchynWrapper
grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", MINCHYN_WRAPPER_ADDRESS)

// Grant BURNER_ROLE to MinchynWrapper  
grantRole("0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848", MINCHYN_WRAPPER_ADDRESS)
```

### Step 5: Test Basic Functions

**Test GovToken:**
```javascript
name() // Should return "DAO Governance Token"
symbol() // Should return "DAOGOV"
totalSupply() // Should return 0 initially
```

**Test MinchynWrapper:**
```javascript
name() // Should return "Wrapped Minchyn Governance"
symbol() // Should return "wMCHN"
exchangeRate() // Should return 1000000000000000000
```

### Step 6: Interact with Contracts

**Mint governance tokens:**
```javascript
// On GovToken, call:
mint(YOUR_ADDRESS, "1000000000000000000000") // Mint 1000 tokens
```

**Check balances:**
```javascript
balanceOf(YOUR_ADDRESS) // Should show minted amount
```

---

## 🎉 **SUCCESS!** 

You now have a fully deployed DAO governance system with:
- ✅ Governance Token (DAOGOV)
- ✅ Wrapped Minchyn Token (wMCHN)  
- ✅ Role-based access control
- ✅ Voting power capabilities

## Next Steps:

1. **Test token minting and burning**
2. **Test delegation of voting power**
3. **Add more contracts (VotingPowerExchange, etc.)**
4. **Deploy to testnet when ready**

## Contract Addresses (Save These!)

After deployment, save these addresses:
- GovToken: `[ADDRESS_FROM_REMIX]`
- MinchynGovernanceWrapper: `[ADDRESS_FROM_REMIX]`

---

**🚀 Your DAO is LIVE and ready for testing!**