// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title DAOTreasury
 * @dev Manages DAO treasury funds with multi-token support and governance integration
 * @notice This contract handles treasury operations including deposits, withdrawals, and yield strategies
 */
contract DAOTreasury is AccessControl, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // Roles
    bytes32 public constant TREASURY_MANAGER_ROLE = keccak256("TREASURY_MANAGER_ROLE");
    bytes32 public constant PROPOSAL_EXECUTOR_ROLE = keccak256("PROPOSAL_EXECUTOR_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Asset Types
    enum AssetType {
        ETH,
        ERC20,
        ERC721
    }

    // Transaction Types
    enum TransactionType {
        DEPOSIT,
        WITHDRAWAL,
        TRANSFER,
        YIELD_DEPOSIT,
        YIELD_WITHDRAWAL,
        EMERGENCY_WITHDRAWAL
    }

    // Asset Information
    struct AssetInfo {
        AssetType assetType;
        address contractAddress;
        uint256 balance;
        bool isActive;
        uint256 lastUpdated;
    }

    // Transaction Record
    struct Transaction {
        uint256 id;
        TransactionType transactionType;
        address asset;
        uint256 amount;
        address from;
        address to;
        uint256 timestamp;
        uint256 proposalId; // 0 if not from proposal
        string description;
    }

    // Yield Strategy
    struct YieldStrategy {
        address strategyContract;
        address asset;
        uint256 allocatedAmount;
        uint256 expectedAPY; // in basis points (e.g., 500 = 5%)
        bool isActive;
        uint256 lastHarvest;
    }

    // State variables
    uint256 public transactionCounter;
    uint256 public strategyCounter;
    
    // Asset tracking
    mapping(address => AssetInfo) public assets;
    address[] public assetList;
    
    // Transaction history
    mapping(uint256 => Transaction) public transactions;
    
    // Yield strategies
    mapping(uint256 => YieldStrategy) public yieldStrategies;
    
    // Spending limits (per asset, per month)
    mapping(address => uint256) public monthlySpendingLimits;
    mapping(address => mapping(uint256 => uint256)) public monthlySpending; // asset => month => amount
    
    // Emergency settings
    bool public emergencyMode;
    uint256 public emergencyWithdrawalLimit = 100 ether; // Max emergency withdrawal

    // Events
    event AssetDeposited(
        address indexed asset,
        uint256 amount,
        address indexed depositor,
        uint256 transactionId
    );

    event AssetWithdrawn(
        address indexed asset,
        uint256 amount,
        address indexed recipient,
        uint256 transactionId,
        uint256 proposalId
    );

    event YieldStrategyAdded(
        uint256 indexed strategyId,
        address indexed asset,
        address indexed strategyContract,
        uint256 allocatedAmount
    );

    event YieldHarvested(
        uint256 indexed strategyId,
        address indexed asset,
        uint256 yieldAmount,
        uint256 timestamp
    );

    event EmergencyModeToggled(bool enabled);

    event SpendingLimitSet(
        address indexed asset,
        uint256 newLimit
    );

    event AssetAdded(
        address indexed asset,
        AssetType assetType
    );

    // Errors
    error DAOTreasury__InsufficientBalance();
    error DAOTreasury__AssetNotSupported();
    error DAOTreasury__SpendingLimitExceeded();
    error DAOTreasury__InvalidAssetType();
    error DAOTreasury__EmergencyModeActive();
    error DAOTreasury__StrategyNotActive();
    error DAOTreasury__InvalidAmount();
    error DAOTreasury__TransferFailed();

    modifier onlyInEmergency() {
        if (!emergencyMode) {
            revert DAOTreasury__EmergencyModeActive();
        }
        _;
    }

    modifier onlyNotInEmergency() {
        if (emergencyMode) {
            revert DAOTreasury__EmergencyModeActive();
        }
        _;
    }

    modifier supportedAsset(address asset) {
        if (!assets[asset].isActive && asset != address(0)) {
            revert DAOTreasury__AssetNotSupported();
        }
        _;
    }

    constructor(address _admin) {
        if (_admin == address(0)) {
            revert DAOTreasury__InvalidAmount();
        }

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(ADMIN_ROLE, _admin);
        _grantRole(TREASURY_MANAGER_ROLE, _admin);
        _grantRole(PROPOSAL_EXECUTOR_ROLE, _admin);
        _grantRole(EMERGENCY_ROLE, _admin);

        // Add ETH as supported asset
        assets[address(0)] = AssetInfo({
            assetType: AssetType.ETH,
            contractAddress: address(0),
            balance: 0,
            isActive: true,
            lastUpdated: block.timestamp
        });
        assetList.push(address(0));
    }

    /**
     * @dev Add a new supported asset
     */
    function addAsset(
        address asset,
        AssetType assetType
    ) external onlyRole(TREASURY_MANAGER_ROLE) {
        if (assets[asset].isActive) {
            return; // Asset already exists
        }

        assets[asset] = AssetInfo({
            assetType: assetType,
            contractAddress: asset,
            balance: 0,
            isActive: true,
            lastUpdated: block.timestamp
        });
        
        assetList.push(asset);
        emit AssetAdded(asset, assetType);
    }

    /**
     * @dev Deposit ETH to treasury
     */
    function depositETH() external payable whenNotPaused {
        if (msg.value == 0) {
            revert DAOTreasury__InvalidAmount();
        }

        _updateAssetBalance(address(0), assets[address(0)].balance + msg.value);
        
        uint256 transactionId = _recordTransaction(
            TransactionType.DEPOSIT,
            address(0),
            msg.value,
            msg.sender,
            address(this),
            0,
            "ETH deposit"
        );

        emit AssetDeposited(address(0), msg.value, msg.sender, transactionId);
    }

    /**
     * @dev Deposit ERC20 tokens to treasury
     */
    function depositERC20(
        address token,
        uint256 amount
    ) external supportedAsset(token) whenNotPaused {
        if (amount == 0) {
            revert DAOTreasury__InvalidAmount();
        }

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        _updateAssetBalance(token, assets[token].balance + amount);
        
        uint256 transactionId = _recordTransaction(
            TransactionType.DEPOSIT,
            token,
            amount,
            msg.sender,
            address(this),
            0,
            "ERC20 deposit"
        );

        emit AssetDeposited(token, amount, msg.sender, transactionId);
    }

    /**
     * @dev Withdraw assets (only through governance proposals)
     */
    function withdrawAsset(
        address asset,
        uint256 amount,
        address recipient,
        uint256 proposalId,
        string calldata description
    ) external supportedAsset(asset) onlyRole(PROPOSAL_EXECUTOR_ROLE) onlyNotInEmergency nonReentrant {
        if (amount == 0 || recipient == address(0)) {
            revert DAOTreasury__InvalidAmount();
        }

        if (assets[asset].balance < amount) {
            revert DAOTreasury__InsufficientBalance();
        }

        // Check monthly spending limits
        _checkSpendingLimit(asset, amount);

        // Update balance before transfer
        _updateAssetBalance(asset, assets[asset].balance - amount);

        // Execute transfer
        if (asset == address(0)) {
            // ETH transfer
            (bool success, ) = payable(recipient).call{value: amount}("");
            if (!success) {
                revert DAOTreasury__TransferFailed();
            }
        } else {
            // ERC20 transfer
            IERC20(asset).safeTransfer(recipient, amount);
        }

        uint256 transactionId = _recordTransaction(
            TransactionType.WITHDRAWAL,
            asset,
            amount,
            address(this),
            recipient,
            proposalId,
            description
        );

        emit AssetWithdrawn(asset, amount, recipient, transactionId, proposalId);
    }

    /**
     * @dev Emergency withdrawal (limited amount)
     */
    function emergencyWithdraw(
        address asset,
        uint256 amount,
        address recipient
    ) external supportedAsset(asset) onlyRole(EMERGENCY_ROLE) onlyInEmergency nonReentrant {
        if (amount > emergencyWithdrawalLimit) {
            revert DAOTreasury__SpendingLimitExceeded();
        }

        if (assets[asset].balance < amount) {
            revert DAOTreasury__InsufficientBalance();
        }

        _updateAssetBalance(asset, assets[asset].balance - amount);

        if (asset == address(0)) {
            (bool success, ) = payable(recipient).call{value: amount}("");
            if (!success) {
                revert DAOTreasury__TransferFailed();
            }
        } else {
            IERC20(asset).safeTransfer(recipient, amount);
        }

        uint256 transactionId = _recordTransaction(
            TransactionType.EMERGENCY_WITHDRAWAL,
            asset,
            amount,
            address(this),
            recipient,
            0,
            "Emergency withdrawal"
        );

        emit AssetWithdrawn(asset, amount, recipient, transactionId, 0);
    }

    /**
     * @dev Add a yield strategy
     */
    function addYieldStrategy(
        address strategyContract,
        address asset,
        uint256 allocatedAmount,
        uint256 expectedAPY
    ) external supportedAsset(asset) onlyRole(TREASURY_MANAGER_ROLE) onlyNotInEmergency {
        if (assets[asset].balance < allocatedAmount) {
            revert DAOTreasury__InsufficientBalance();
        }

        strategyCounter++;
        
        yieldStrategies[strategyCounter] = YieldStrategy({
            strategyContract: strategyContract,
            asset: asset,
            allocatedAmount: allocatedAmount,
            expectedAPY: expectedAPY,
            isActive: true,
            lastHarvest: block.timestamp
        });

        // Transfer assets to strategy (simplified - would need actual strategy interface)
        _updateAssetBalance(asset, assets[asset].balance - allocatedAmount);

        emit YieldStrategyAdded(strategyCounter, asset, strategyContract, allocatedAmount);
    }

    /**
     * @dev Set monthly spending limit for an asset
     */
    function setSpendingLimit(
        address asset,
        uint256 limit
    ) external supportedAsset(asset) onlyRole(TREASURY_MANAGER_ROLE) {
        monthlySpendingLimits[asset] = limit;
        emit SpendingLimitSet(asset, limit);
    }

    /**
     * @dev Toggle emergency mode
     */
    function toggleEmergencyMode() external onlyRole(EMERGENCY_ROLE) {
        emergencyMode = !emergencyMode;
        emit EmergencyModeToggled(emergencyMode);
    }

    /**
     * @dev Set emergency withdrawal limit
     */
    function setEmergencyWithdrawalLimit(uint256 newLimit) external onlyRole(ADMIN_ROLE) {
        emergencyWithdrawalLimit = newLimit;
    }

    /**
     * @dev Pause contract
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Get asset balance
     */
    function getAssetBalance(address asset) external view returns (uint256) {
        return assets[asset].balance;
    }

    /**
     * @dev Get all supported assets
     */
    function getSupportedAssets() external view returns (address[] memory) {
        return assetList;
    }

    /**
     * @dev Get transaction details
     */
    function getTransaction(uint256 transactionId) external view returns (Transaction memory) {
        return transactions[transactionId];
    }

    /**
     * @dev Get yield strategy details
     */
    function getYieldStrategy(uint256 strategyId) external view returns (YieldStrategy memory) {
        return yieldStrategies[strategyId];
    }

    /**
     * @dev Get current month spending for an asset
     */
    function getCurrentMonthSpending(address asset) external view returns (uint256) {
        uint256 currentMonth = block.timestamp / 30 days;
        return monthlySpending[asset][currentMonth];
    }

    /**
     * @dev Internal function to update asset balance
     */
    function _updateAssetBalance(address asset, uint256 newBalance) internal {
        assets[asset].balance = newBalance;
        assets[asset].lastUpdated = block.timestamp;
    }

    /**
     * @dev Internal function to record transaction
     */
    function _recordTransaction(
        TransactionType transactionType,
        address asset,
        uint256 amount,
        address from,
        address to,
        uint256 proposalId,
        string memory description
    ) internal returns (uint256) {
        transactionCounter++;
        
        transactions[transactionCounter] = Transaction({
            id: transactionCounter,
            transactionType: transactionType,
            asset: asset,
            amount: amount,
            from: from,
            to: to,
            timestamp: block.timestamp,
            proposalId: proposalId,
            description: description
        });

        return transactionCounter;
    }

    /**
     * @dev Internal function to check spending limits
     */
    function _checkSpendingLimit(address asset, uint256 amount) internal {
        uint256 limit = monthlySpendingLimits[asset];
        if (limit == 0) return; // No limit set

        uint256 currentMonth = block.timestamp / 30 days;
        uint256 currentSpending = monthlySpending[asset][currentMonth];
        
        if (currentSpending + amount > limit) {
            revert DAOTreasury__SpendingLimitExceeded();
        }

        monthlySpending[asset][currentMonth] = currentSpending + amount;
    }

    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        _updateAssetBalance(address(0), assets[address(0)].balance + msg.value);
        
        uint256 transactionId = _recordTransaction(
            TransactionType.DEPOSIT,
            address(0),
            msg.value,
            msg.sender,
            address(this),
            0,
            "Direct ETH deposit"
        );

        emit AssetDeposited(address(0), msg.value, msg.sender, transactionId);
    }
}