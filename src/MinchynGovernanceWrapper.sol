// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title MinchynGovernanceWrapper
/// @notice Wrapper contract for Minchyn token to enable DAO governance integration
/// @dev This contract wraps the existing Minchyn token (0x91738EE7A9b54eb810198cefF5549ca5982F47B3)
///      and provides utility token functionality for the DAO governance system
/// @custom:security-contact dev@codefox.co.jp
contract MinchynGovernanceWrapper is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    error DefaultAdminCannotBeZero();
    error MinchynContractCannotBeZero();
    error AmountTooSmall();
    error InsufficientBalance();
    error InsufficientAllowance();
    error TransferFailed();
    error CallerNotAuthorized();

    // Events
    event MinchynDeposited(address indexed user, uint256 amount, uint256 wrappedAmount);
    event MinchynWithdrawn(address indexed user, uint256 wrappedAmount, uint256 minchynAmount);
    event UtilityTokenBurned(address indexed user, uint256 amount);
    event ExchangeRateUpdated(uint256 oldRate, uint256 newRate);

    // Roles
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant VOTING_POWER_EXCHANGE_ROLE = keccak256("VOTING_POWER_EXCHANGE_ROLE");

    // Original Minchyn token contract
    IERC20 public immutable minchynToken;
    
    // Wrapped token balances and allowances
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    // Exchange rate: 1 wrapped token = exchangeRate * 1 MCHN (default 1:1)
    uint256 public exchangeRate = 1e18;
    
    // Total supply tracking
    uint256 private _totalSupply;
    
    // Minimum amounts
    uint256 public constant MINIMUM_DEPOSIT = 1e18; // 1 MCHN
    uint256 public constant MINIMUM_WITHDRAWAL = 1e18; // 1 wrapped token

    constructor(
        address _minchynToken,
        address defaultAdmin,
        address manager,
        address votingPowerExchange
    ) {
        if (defaultAdmin == address(0)) revert DefaultAdminCannotBeZero();
        if (_minchynToken == address(0)) revert MinchynContractCannotBeZero();
        
        minchynToken = IERC20(_minchynToken);
        
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MANAGER_ROLE, manager);
        _grantRole(BURNER_ROLE, defaultAdmin);
        _grantRole(VOTING_POWER_EXCHANGE_ROLE, votingPowerExchange);
    }

    /// @notice Deposit Minchyn tokens to get wrapped utility tokens
    /// @param amount Amount of Minchyn tokens to deposit
    function deposit(uint256 amount) external nonReentrant {
        if (amount < MINIMUM_DEPOSIT) revert AmountTooSmall();
        
        // Calculate wrapped amount based on exchange rate
        uint256 wrappedAmount = (amount * 1e18) / exchangeRate;
        
        // Transfer Minchyn tokens to this contract
        minchynToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Mint wrapped tokens
        _balances[msg.sender] += wrappedAmount;
        _totalSupply += wrappedAmount;
        
        emit MinchynDeposited(msg.sender, amount, wrappedAmount);
    }

    /// @notice Withdraw Minchyn tokens by burning wrapped utility tokens
    /// @param wrappedAmount Amount of wrapped tokens to burn
    function withdraw(uint256 wrappedAmount) external nonReentrant {
        if (wrappedAmount < MINIMUM_WITHDRAWAL) revert AmountTooSmall();
        if (_balances[msg.sender] < wrappedAmount) revert InsufficientBalance();
        
        // Calculate Minchyn amount based on exchange rate
        uint256 minchynAmount = (wrappedAmount * exchangeRate) / 1e18;
        
        // Burn wrapped tokens
        _balances[msg.sender] -= wrappedAmount;
        _totalSupply -= wrappedAmount;
        
        // Transfer Minchyn tokens back to user
        minchynToken.safeTransfer(msg.sender, minchynAmount);
        
        emit MinchynWithdrawn(msg.sender, wrappedAmount, minchynAmount);
    }

    /// @notice Burn wrapped tokens from an account (for governance exchange)
    /// @param account Address to burn tokens from
    /// @param amount Amount to burn
    function burnByBurner(address account, uint256 amount) external onlyRole(BURNER_ROLE) {
        if (_balances[account] < amount) revert InsufficientBalance();
        
        _balances[account] -= amount;
        _totalSupply -= amount;
        
        emit UtilityTokenBurned(account, amount);
    }

    /// @notice Mint wrapped tokens to an account (for governance purposes)
    /// @param account Address to mint tokens to
    /// @param amount Amount to mint
    function mint(address account, uint256 amount) external onlyRole(VOTING_POWER_EXCHANGE_ROLE) {
        _balances[account] += amount;
        _totalSupply += amount;
    }

    /// @notice Transfer wrapped tokens
    /// @param to Recipient address
    /// @param amount Amount to transfer
    function transfer(address to, uint256 amount) external returns (bool) {
        if (_balances[msg.sender] < amount) revert InsufficientBalance();
        
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        
        return true;
    }

    /// @notice Transfer wrapped tokens from one account to another
    /// @param from Sender address
    /// @param to Recipient address
    /// @param amount Amount to transfer
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        if (_balances[from] < amount) revert InsufficientBalance();
        if (_allowances[from][msg.sender] < amount) revert InsufficientAllowance();
        
        _allowances[from][msg.sender] -= amount;
        _balances[from] -= amount;
        _balances[to] += amount;
        
        return true;
    }

    /// @notice Approve spending of wrapped tokens
    /// @param spender Address to approve
    /// @param amount Amount to approve
    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        return true;
    }

    /// @notice Set exchange rate between Minchyn and wrapped tokens
    /// @param newRate New exchange rate (1e18 = 1:1 ratio)
    function setExchangeRate(uint256 newRate) external onlyRole(MANAGER_ROLE) {
        uint256 oldRate = exchangeRate;
        exchangeRate = newRate;
        emit ExchangeRateUpdated(oldRate, newRate);
    }

    /// @notice Emergency withdrawal of Minchyn tokens (admin only)
    /// @param to Address to send tokens to
    /// @param amount Amount to withdraw
    function emergencyWithdraw(address to, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minchynToken.safeTransfer(to, amount);
    }

    // View functions
    
    /// @notice Get wrapped token balance of an account
    /// @param account Address to check
    /// @return Balance of wrapped tokens
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    /// @notice Get allowance for spending wrapped tokens
    /// @param owner Token owner
    /// @param spender Approved spender
    /// @return Allowance amount
    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    /// @notice Get total supply of wrapped tokens
    /// @return Total supply
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    /// @notice Get contract's Minchyn token balance
    /// @return Balance of Minchyn tokens held by this contract
    function getMinchynBalance() external view returns (uint256) {
        return minchynToken.balanceOf(address(this));
    }

    /// @notice Calculate how much wrapped tokens user would get for a Minchyn deposit
    /// @param minchynAmount Amount of Minchyn tokens
    /// @return Amount of wrapped tokens
    function calculateWrappedAmount(uint256 minchynAmount) external view returns (uint256) {
        return (minchynAmount * 1e18) / exchangeRate;
    }

    /// @notice Calculate how much Minchyn tokens user would get for wrapped token withdrawal
    /// @param wrappedAmount Amount of wrapped tokens
    /// @return Amount of Minchyn tokens
    function calculateMinchynAmount(uint256 wrappedAmount) external view returns (uint256) {
        return (wrappedAmount * exchangeRate) / 1e18;
    }

    // ERC20-like metadata (for compatibility)
    function name() external pure returns (string memory) {
        return "Wrapped Minchyn";
    }

    function symbol() external pure returns (string memory) {
        return "wMCHN";
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }
}