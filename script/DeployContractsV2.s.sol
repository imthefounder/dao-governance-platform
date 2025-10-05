// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {console, Script} from "forge-std/Script.sol";
import {Upgrades, UnsafeUpgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {IAccessControl} from
    "openzeppelin-contracts-upgradeable/lib/openzeppelin-contracts/contracts/access/IAccessControl.sol";
import {ERC20UpgradeableTokenV1} from "src/ERC20UpgradeableTokenV1.sol";
import {VotingPowerExchangeV2} from "src/VotingPowerExchangeV2.sol";
import {MinchynGovernanceWrapper} from "src/MinchynGovernanceWrapper.sol";
import {UglyUnicornsGovernance} from "src/UglyUnicornsGovernance.sol";
import {GovToken} from "src/GovToken.sol";

struct DeploymentResultV2 {
    address govToken;
    address minchynWrapper;
    address uglyUnicornsGovernance;
    address votingPowerExchange;
    address admin;
    address minter;
    address burner;
    address manager;
    address exchanger;
    uint256 deployerKey;
    uint256 participant;
    // Original contract addresses
    address minchynToken; // 0x91738EE7A9b54eb810198cefF5549ca5982F47B3
    address uglyUnicornsNFT; // 0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F
}

contract DeployContractsV2 is Script {
    // New contract instances
    GovToken public govToken;
    MinchynGovernanceWrapper public minchynWrapper;
    UglyUnicornsGovernance public uglyUnicornsGovernance;
    VotingPowerExchangeV2 public votingPowerExchangeV2;

    DeploymentResultV2 public result;

    // Existing token addresses (mainnet)
    address public constant MINCHYN_TOKEN_ADDRESS = 0x91738EE7A9b54eb810198cefF5549ca5982F47B3;
    address public constant UGLY_UNICORNS_NFT_ADDRESS = 0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F;

    // anvil's default private key
    uint256 public constant DEFAULT_ANVIL_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 public constant DEFAULT_ANVIL_KEY2 = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;

    // admin roles
    address public admin;
    address public minter;
    address public burner;
    address public manager;
    address public exchanger;
    address public upgrader;
    address public defender;
    address public minter2;
    address public burner2;
    address public constant ZERO_ADDRESS = address(0);

    function setUp() public {
        // Set up roles using private keys
        admin = vm.addr(DEFAULT_ANVIL_KEY);
        minter = vm.addr(DEFAULT_ANVIL_KEY);
        burner = vm.addr(DEFAULT_ANVIL_KEY);
        manager = vm.addr(DEFAULT_ANVIL_KEY);
        exchanger = vm.addr(DEFAULT_ANVIL_KEY);
        upgrader = vm.addr(DEFAULT_ANVIL_KEY);
        defender = vm.addr(DEFAULT_ANVIL_KEY);
        minter2 = vm.addr(DEFAULT_ANVIL_KEY2);
        burner2 = vm.addr(DEFAULT_ANVIL_KEY2);
    }

    function run() external {
        vm.startBroadcast(DEFAULT_ANVIL_KEY);

        console.log("Starting deployment with Minchyn and Ugly Unicorns integration...");
        console.log("Deployer address:", msg.sender);
        console.log("Admin address:", admin);

        // For testnet/local development, we need mock contracts for the external tokens
        address minchynTokenAddr = MINCHYN_TOKEN_ADDRESS;
        address uglyUnicornsNFTAddr = UGLY_UNICORNS_NFT_ADDRESS;

        // If we're on a local network, deploy mock contracts
        if (block.chainid == 31337) { // Anvil chain ID
            console.log("Local network detected, deploying mock contracts...");
            minchynTokenAddr = deployMockMinchynToken();
            uglyUnicornsNFTAddr = deployMockUglyUnicornsNFT();
        }

        // 1. Deploy GovToken
        console.log("Deploying GovToken...");
        govToken = new GovToken(
            "Ugly Unicorns DAO Token", // name
            "UUDT", // symbol  
            admin, // defaultAdmin
            minter, // minter
            burner, // burner
            address(0) // votingPowerExchange (will be set later)
        );
        console.log("GovToken deployed at:", address(govToken));

        // 2. Deploy Minchyn Governance Wrapper
        console.log("Deploying MinchynGovernanceWrapper...");
        minchynWrapper = new MinchynGovernanceWrapper(
            minchynTokenAddr, // minchynToken
            admin, // defaultAdmin
            manager, // manager
            address(0) // votingPowerExchange (will be set later)
        );
        console.log("MinchynGovernanceWrapper deployed at:", address(minchynWrapper));

        // 3. Deploy Ugly Unicorns Governance Wrapper
        console.log("Deploying UglyUnicornsGovernance...");
        uglyUnicornsGovernance = new UglyUnicornsGovernance(
            uglyUnicornsNFTAddr, // uglyUnicornsContract
            admin, // defaultAdmin
            address(0), // governance (will be set later)
            manager // manager
        );
        console.log("UglyUnicornsGovernance deployed at:", address(uglyUnicornsGovernance));

        // 4. Deploy VotingPowerExchangeV2
        console.log("Deploying VotingPowerExchangeV2...");
        votingPowerExchangeV2 = new VotingPowerExchangeV2(
            address(govToken),
            address(minchynWrapper),
            address(uglyUnicornsGovernance),
            admin,
            manager,
            exchanger
        );
        console.log("VotingPowerExchangeV2 deployed at:", address(votingPowerExchangeV2));

        // 5. Grant roles and set up permissions
        console.log("Setting up roles and permissions...");
        
        // Grant VOTING_POWER_EXCHANGE_ROLE to the new exchange contract
        govToken.grantRole(govToken.VOTING_POWER_EXCHANGE_ROLE(), address(votingPowerExchangeV2));
        
        // Grant VOTING_POWER_EXCHANGE_ROLE to the Minchyn wrapper
        minchynWrapper.grantRole(minchynWrapper.VOTING_POWER_EXCHANGE_ROLE(), address(votingPowerExchangeV2));
        
        // Grant GOVERNANCE_ROLE to the exchange contract for NFT governance
        uglyUnicornsGovernance.grantRole(uglyUnicornsGovernance.GOVERNANCE_ROLE(), address(votingPowerExchangeV2));

        console.log("All contracts deployed and configured successfully!");
        console.log("=== Deployment Summary ===");
        console.log("GovToken:", address(govToken));
        console.log("MinchynGovernanceWrapper:", address(minchynWrapper));
        console.log("UglyUnicornsGovernance:", address(uglyUnicornsGovernance));
        console.log("VotingPowerExchangeV2:", address(votingPowerExchangeV2));
        console.log("Minchyn Token Address:", minchynTokenAddr);
        console.log("Ugly Unicorns NFT Address:", uglyUnicornsNFTAddr);

        // Store results
        result = DeploymentResultV2({
            govToken: address(govToken),
            minchynWrapper: address(minchynWrapper),
            uglyUnicornsGovernance: address(uglyUnicornsGovernance),
            votingPowerExchange: address(votingPowerExchangeV2),
            admin: admin,
            minter: minter,
            burner: burner,
            manager: manager,
            exchanger: exchanger,
            deployerKey: DEFAULT_ANVIL_KEY,
            participant: DEFAULT_ANVIL_KEY2,
            minchynToken: minchynTokenAddr,
            uglyUnicornsNFT: uglyUnicornsNFTAddr
        });

        vm.stopBroadcast();
    }

    // Mock contracts for local testing
    function deployMockMinchynToken() internal returns (address) {
        // Deploy a simple ERC20 mock for testing
        MockERC20 mockToken = new MockERC20("Minchyn", "MCHN", 1000000000 * 1e18);
        console.log("Mock Minchyn token deployed at:", address(mockToken));
        return address(mockToken);
    }

    function deployMockUglyUnicornsNFT() internal returns (address) {
        // Deploy a simple ERC721 mock for testing
        MockERC721 mockNFT = new MockERC721("Ugly Unicorns", "UGLY");
        console.log("Mock Ugly Unicorns NFT deployed at:", address(mockNFT));
        return address(mockNFT);
    }

    // Getter functions for testing
    function getDeploymentResult() external view returns (DeploymentResultV2 memory) {
        return result;
    }
}

// Mock contracts for local testing
contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}

contract MockERC721 {
    string public name;
    string public symbol;
    uint256 private _tokenIdCounter;
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        // Mint some tokens for testing
        _mint(msg.sender, 1);
        _mint(msg.sender, 2);
        _mint(msg.sender, 3);
    }
    
    function ownerOf(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }
    
    function balanceOf(address owner) external view returns (uint256) {
        return _balances[owner];
    }
    
    function transferFrom(address from, address to, uint256 tokenId) external {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved");
        _transfer(from, to, tokenId);
    }
    
    function approve(address approved, uint256 tokenId) external {
        address owner = _owners[tokenId];
        require(msg.sender == owner || _operatorApprovals[owner][msg.sender], "Not authorized");
        _tokenApprovals[tokenId] = approved;
        emit Approval(owner, approved, tokenId);
    }
    
    function _mint(address to, uint256 tokenId) internal {
        _owners[tokenId] = to;
        _balances[to] += 1;
        emit Transfer(address(0), to, tokenId);
    }
    
    function _transfer(address from, address to, uint256 tokenId) internal {
        _owners[tokenId] = to;
        _balances[from] -= 1;
        _balances[to] += 1;
        emit Transfer(from, to, tokenId);
    }
    
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = _owners[tokenId];
        return (spender == owner || _tokenApprovals[tokenId] == spender || _operatorApprovals[owner][spender]);
    }
}