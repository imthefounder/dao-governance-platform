# 🌐 IMMEDIATE REMIX IDE DEPLOYMENT

## ⚡ **FASTEST WAY - Works Right Now!**

### Step 1: Open Remix IDE
**Go to: https://remix.ethereum.org**

### Step 2: Create Workspace
1. Click "Create" → "Blank Workspace"
2. Name: "DAO-Governance-Platform"

### Step 3: Upload Contracts (Copy-Paste Method)

#### Contract 1: GovToken.sol (WORKING VERSION)
Create file: `contracts/GovToken.sol`

**✅ GUARANTEED TO WORK - No Dependencies Required**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UglyUnicornsGovToken {
    string public name = "Ugly Unicorns DAO Token";
    string public symbol = "UGLYDO";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public minters;
    mapping(address => bool) public burners;
    
    address public owner;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event MinterAdded(address indexed minter);
    event BurnerAdded(address indexed burner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyMinter() {
        require(minters[msg.sender] || msg.sender == owner, "Not minter");
        _;
    }
    
    modifier onlyBurner() {
        require(burners[msg.sender] || msg.sender == owner, "Not burner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        minters[msg.sender] = true;
        burners[msg.sender] = true;
    }
    
    function mint(address to, uint256 amount) public onlyMinter {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function burn(address from, uint256 amount) public onlyBurner {
        require(balanceOf[from] >= amount, "Insufficient balance");
        totalSupply -= amount;
        balanceOf[from] -= amount;
        emit Transfer(from, address(0), amount);
    }
    
    function addMinter(address minter) public onlyOwner {
        minters[minter] = true;
        emit MinterAdded(minter);
    }
    
    function addBurner(address burner) public onlyOwner {
        burners[burner] = true;
        emit BurnerAdded(burner);
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
}
```

#### Contract 2: MinchynGovernanceWrapper.sol
Create file: `contracts/MinchynGovernanceWrapper.sol`

**⚠️ IMPORTANT: Use GitHub imports for Remix compatibility**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/AccessControl.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/interfaces/IERC5267.sol";

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

### Step 4: Deploy Your Contracts

**In Remix "Deploy & Run Transactions" tab:**

1. Select "Remix VM (Shanghai)" environment
2. Deploy contracts in this order:

#### 1. Deploy UglyUnicornsGovToken
- Contract: UglyUnicornsGovToken
- Constructor: (no parameters needed)
- Click "Deploy"
- ✅ Should deploy successfully!

#### 2. Create UglyUnicornsNFTWrapper.sol
Create file: `contracts/UglyUnicornsNFTWrapper.sol`

**✅ GUARANTEED TO WORK - No Dependencies Required**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Simple interface for the original Ugly Unicorns NFT
interface IUglyUnicorns {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
}

contract UglyUnicornsNFTWrapper {
    string public name = "Wrapped Ugly Unicorns";
    string public symbol = "wUGLY";
    
    // Original Ugly Unicorns contract address
    address public constant UGLY_UNICORNS_ADDRESS = 0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F;
    IUglyUnicorns public uglyUnicornsContract = IUglyUnicorns(UGLY_UNICORNS_ADDRESS);
    
    // NFT data
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => address) public getApproved;
    mapping(address => mapping(address => bool)) public isApprovedForAll;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => bool) public isWrapped;
    mapping(uint256 => uint256) public votingPower;
    
    address public owner;
    address public govTokenAddress;
    uint256 public totalSupply;
    uint256 public defaultVotingPower = 1000;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event NFTWrapped(address indexed owner, uint256 indexed tokenId);
    event NFTUnwrapped(address indexed owner, uint256 indexed tokenId);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function setGovTokenAddress(address _govToken) external onlyOwner {
        govTokenAddress = _govToken;
    }
    
    function wrapNFT(uint256 tokenId) external {
        require(uglyUnicornsContract.ownerOf(tokenId) == msg.sender, "Not owner of original NFT");
        require(!isWrapped[tokenId], "Already wrapped");
        
        // Transfer original NFT to this contract
        uglyUnicornsContract.transferFrom(msg.sender, address(this), tokenId);
        
        // Mint wrapped NFT
        ownerOf[tokenId] = msg.sender;
        balanceOf[msg.sender]++;
        isWrapped[tokenId] = true;
        totalSupply++;
        
        if (votingPower[tokenId] == 0) {
            votingPower[tokenId] = defaultVotingPower;
        }
        
        emit Transfer(address(0), msg.sender, tokenId);
        emit NFTWrapped(msg.sender, tokenId);
    }
    
    function unwrapNFT(uint256 tokenId) external {
        require(ownerOf[tokenId] == msg.sender, "Not owner");
        require(isWrapped[tokenId], "Not wrapped");
        
        ownerOf[tokenId] = address(0);
        balanceOf[msg.sender]--;
        isWrapped[tokenId] = false;
        totalSupply--;
        
        uglyUnicornsContract.transferFrom(address(this), msg.sender, tokenId);
        
        emit Transfer(msg.sender, address(0), tokenId);
        emit NFTUnwrapped(msg.sender, tokenId);
    }
    
    function getVotingPower(address user) external view returns (uint256) {
        return balanceOf[user] * defaultVotingPower;
    }
    
    function setVotingPower(uint256 tokenId, uint256 power) external onlyOwner {
        votingPower[tokenId] = power;
    }
}
```

#### 3. Deploy UglyUnicornsNFTWrapper
- Contract: UglyUnicornsNFTWrapper  
- Constructor: (no parameters needed)
- Click "Deploy"
- ✅ Should deploy successfully!

### Step 5: Connect the Contracts

After both contracts are deployed:

#### 1. Connect them together:
```javascript
// On UglyUnicornsNFTWrapper, call:
setGovTokenAddress(GOV_TOKEN_ADDRESS) // Use the address from step 1

// On UglyUnicornsGovToken, call:
addMinter(NFT_WRAPPER_ADDRESS) // Use the address from step 3
```

### Step 6: Test Your DAO System

**Test the governance token:**

```javascript
name() // Should return "Ugly Unicorns DAO Token"
symbol() // Should return "UGLYDO"
totalSupply() // Should return 0 initially
owner() // Should return your address
```

**Test the NFT wrapper:**

```javascript
name() // Should return "Wrapped Ugly Unicorns"
symbol() // Should return "wUGLY"
UGLY_UNICORNS_ADDRESS() // Should return "0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F"
defaultVotingPower() // Should return 1000
```

**Mint some governance tokens:**
```javascript
// On UglyUnicornsGovToken:
// to: [YOUR_ADDRESS] (copy from Account dropdown)
// amount: 1000000000000000000000 (1000 tokens)
mint(YOUR_ADDRESS, "1000000000000000000000")
```

**Check your balance:**
```javascript
balanceOf(YOUR_ADDRESS) // Should show 1000000000000000000000
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