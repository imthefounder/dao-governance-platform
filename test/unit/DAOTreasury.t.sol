// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {DAOTreasury} from "src/DAOTreasury.sol";
import {GovToken} from "src/GovToken.sol";

// Mock ERC20 for testing
contract MockERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        
        _transfer(from, to, amount);
        _approve(from, msg.sender, currentAllowance - amount);
        
        return true;
    }

    function mint(address to, uint256 amount) external {
        _totalSupply += amount;
        _balances[to] += amount;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: transfer from zero address");
        require(to != address(0), "ERC20: transfer to zero address");
        require(_balances[from] >= amount, "ERC20: transfer amount exceeds balance");

        _balances[from] -= amount;
        _balances[to] += amount;
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from zero address");
        require(spender != address(0), "ERC20: approve to zero address");

        _allowances[owner][spender] = amount;
    }
}

contract DAOTreasuryTest is Test {
    DAOTreasury public treasury;
    MockERC20 public mockToken;
    
    address public admin = makeAddr("admin");
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    address public proposalExecutor = makeAddr("proposalExecutor");
    
    // Events to test
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

    event AssetAdded(
        address indexed asset,
        DAOTreasury.AssetType assetType
    );

    event SpendingLimitSet(
        address indexed asset,
        uint256 newLimit
    );

    event YieldStrategyAdded(
        uint256 indexed strategyId,
        address indexed asset,
        address indexed strategyContract,
        uint256 allocatedAmount
    );

    function setUp() public {
        // Deploy contracts
        vm.startPrank(admin);
        treasury = new DAOTreasury(admin);
        mockToken = new MockERC20("Test Token", "TEST");
        
        // Grant roles
        treasury.grantRole(treasury.PROPOSAL_EXECUTOR_ROLE(), proposalExecutor);
        
        vm.stopPrank();
        
        // Setup users with funds
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
        
        mockToken.mint(user1, 10000e18);
        mockToken.mint(user2, 10000e18);
    }

    function testContractInitialization() public view {
        assertEq(treasury.transactionCounter(), 0);
        assertEq(treasury.strategyCounter(), 0);
        assertTrue(treasury.hasRole(treasury.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(treasury.hasRole(treasury.ADMIN_ROLE(), admin));
        assertTrue(treasury.hasRole(treasury.TREASURY_MANAGER_ROLE(), admin));
        
        // ETH should be added by default
        assertEq(treasury.getAssetBalance(address(0)), 0);
        address[] memory assets = treasury.getSupportedAssets();
        assertEq(assets.length, 1);
        assertEq(assets[0], address(0));
    }

    function testAddAsset() public {
        vm.startPrank(admin);
        
        vm.expectEmit(true, false, false, true);
        emit AssetAdded(address(mockToken), DAOTreasury.AssetType.ERC20);
        
        treasury.addAsset(address(mockToken), DAOTreasury.AssetType.ERC20);
        
        // Check asset was added
        address[] memory assets = treasury.getSupportedAssets();
        assertEq(assets.length, 2);
        assertEq(assets[1], address(mockToken));
        assertEq(treasury.getAssetBalance(address(mockToken)), 0);
        
        vm.stopPrank();
    }

    function testDepositETH() public {
        uint256 depositAmount = 10 ether;
        
        vm.startPrank(user1);
        
        vm.expectEmit(true, false, false, true);
        emit AssetDeposited(address(0), depositAmount, user1, 1);
        
        treasury.depositETH{value: depositAmount}();
        
        // Check balance updated
        assertEq(treasury.getAssetBalance(address(0)), depositAmount);
        assertEq(address(treasury).balance, depositAmount);
        
        // Check transaction recorded
        DAOTreasury.Transaction memory txn = treasury.getTransaction(1);
        assertEq(txn.id, 1);
        assertEq(uint256(txn.transactionType), uint256(DAOTreasury.TransactionType.DEPOSIT));
        assertEq(txn.asset, address(0));
        assertEq(txn.amount, depositAmount);
        assertEq(txn.from, user1);
        assertEq(txn.to, address(treasury));
        
        vm.stopPrank();
    }

    function testDepositERC20() public {
        // First add the token as supported asset
        vm.prank(admin);
        treasury.addAsset(address(mockToken), DAOTreasury.AssetType.ERC20);
        
        uint256 depositAmount = 1000e18;
        
        vm.startPrank(user1);
        mockToken.approve(address(treasury), depositAmount);
        
        vm.expectEmit(true, false, false, true);
        emit AssetDeposited(address(mockToken), depositAmount, user1, 1);
        
        treasury.depositERC20(address(mockToken), depositAmount);
        
        // Check balances
        assertEq(treasury.getAssetBalance(address(mockToken)), depositAmount);
        assertEq(mockToken.balanceOf(address(treasury)), depositAmount);
        assertEq(mockToken.balanceOf(user1), 10000e18 - depositAmount);
        
        vm.stopPrank();
    }

    function testDepositFailsForUnsupportedAsset() public {
        MockERC20 unsupportedToken = new MockERC20("Unsupported", "UNSUP");
        unsupportedToken.mint(user1, 1000e18);
        
        vm.startPrank(user1);
        unsupportedToken.approve(address(treasury), 1000e18);
        
        vm.expectRevert(DAOTreasury.DAOTreasury__AssetNotSupported.selector);
        treasury.depositERC20(address(unsupportedToken), 1000e18);
        
        vm.stopPrank();
    }

    function testWithdrawAsset() public {
        // Setup: deposit ETH first
        vm.prank(user1);
        treasury.depositETH{value: 10 ether}();
        
        uint256 withdrawAmount = 5 ether;
        uint256 proposalId = 123;
        
        vm.startPrank(proposalExecutor);
        
        vm.expectEmit(true, false, false, true);
        emit AssetWithdrawn(address(0), withdrawAmount, user2, 2, proposalId);
        
        treasury.withdrawAsset(
            address(0),
            withdrawAmount,
            user2,
            proposalId,
            "Test withdrawal"
        );
        
        // Check balances
        assertEq(treasury.getAssetBalance(address(0)), 10 ether - withdrawAmount);
        assertEq(user2.balance, 100 ether + withdrawAmount);
        
        // Check transaction recorded
        DAOTreasury.Transaction memory txn = treasury.getTransaction(2);
        assertEq(uint256(txn.transactionType), uint256(DAOTreasury.TransactionType.WITHDRAWAL));
        assertEq(txn.proposalId, proposalId);
        
        vm.stopPrank();
    }

    function testWithdrawFailsInsufficientBalance() public {
        vm.prank(proposalExecutor);
        
        vm.expectRevert(DAOTreasury.DAOTreasury__InsufficientBalance.selector);
        treasury.withdrawAsset(
            address(0),
            10 ether,
            user2,
            123,
            "Test withdrawal"
        );
    }

    function testWithdrawFailsUnauthorized() public {
        vm.prank(user1);
        treasury.depositETH{value: 10 ether}();
        
        vm.prank(user1);
        vm.expectRevert();
        treasury.withdrawAsset(
            address(0),
            5 ether,
            user2,
            123,
            "Unauthorized withdrawal"
        );
    }

    function testSetSpendingLimit() public {
        uint256 limit = 100 ether;
        
        vm.startPrank(admin);
        
        vm.expectEmit(true, false, false, true);
        emit SpendingLimitSet(address(0), limit);
        
        treasury.setSpendingLimit(address(0), limit);
        assertEq(treasury.monthlySpendingLimits(address(0)), limit);
        
        vm.stopPrank();
    }

    function testSpendingLimitEnforcement() public {
        // Setup: deposit and set limit
        vm.prank(user1);
        treasury.depositETH{value: 10 ether}();
        
        vm.prank(admin);
        treasury.setSpendingLimit(address(0), 5 ether);
        
        // First withdrawal should succeed
        vm.prank(proposalExecutor);
        treasury.withdrawAsset(address(0), 3 ether, user2, 123, "First withdrawal");
        
        // Second withdrawal should fail (would exceed limit)
        vm.prank(proposalExecutor);
        vm.expectRevert(DAOTreasury.DAOTreasury__SpendingLimitExceeded.selector);
        treasury.withdrawAsset(address(0), 3 ether, user2, 124, "Second withdrawal");
    }

    function testEmergencyMode() public {
        // Setup: deposit funds
        vm.prank(user1);
        treasury.depositETH{value: 10 ether}();
        
        // Enable emergency mode
        vm.prank(admin);
        treasury.toggleEmergencyMode();
        assertTrue(treasury.emergencyMode());
        
        // Normal withdrawal should fail in emergency mode
        vm.prank(proposalExecutor);
        vm.expectRevert(DAOTreasury.DAOTreasury__EmergencyModeActive.selector);
        treasury.withdrawAsset(address(0), 1 ether, user2, 123, "Normal withdrawal");
        
        // Emergency withdrawal should succeed
        vm.prank(admin);
        treasury.emergencyWithdraw(address(0), 1 ether, user2);
        
        assertEq(treasury.getAssetBalance(address(0)), 9 ether);
        assertEq(user2.balance, 101 ether);
    }

    function testEmergencyWithdrawalLimit() public {
        vm.deal(user1, 200 ether); // Give user1 enough ETH
        
        vm.prank(user1);
        treasury.depositETH{value: 200 ether}();
        
        vm.prank(admin);
        treasury.toggleEmergencyMode();
        
        // Should fail if exceeding emergency limit
        vm.prank(admin);
        vm.expectRevert(DAOTreasury.DAOTreasury__SpendingLimitExceeded.selector);
        treasury.emergencyWithdraw(address(0), 150 ether, user2);
    }

    function testAddYieldStrategy() public {
        // Setup: deposit funds
        vm.prank(user1);
        treasury.depositETH{value: 10 ether}();
        
        address mockStrategy = makeAddr("mockStrategy");
        uint256 allocatedAmount = 5 ether;
        uint256 expectedAPY = 500; // 5%
        
        vm.startPrank(admin);
        
        vm.expectEmit(true, true, true, true);
        emit YieldStrategyAdded(1, address(0), mockStrategy, allocatedAmount);
        
        treasury.addYieldStrategy(mockStrategy, address(0), allocatedAmount, expectedAPY);
        
        // Check strategy was added
        DAOTreasury.YieldStrategy memory strategy = treasury.getYieldStrategy(1);
        assertEq(strategy.strategyContract, mockStrategy);
        assertEq(strategy.asset, address(0));
        assertEq(strategy.allocatedAmount, allocatedAmount);
        assertEq(strategy.expectedAPY, expectedAPY);
        assertTrue(strategy.isActive);
        
        // Check treasury balance reduced
        assertEq(treasury.getAssetBalance(address(0)), 5 ether);
        
        vm.stopPrank();
    }

    function testReceiveFunctionETHDeposit() public {
        uint256 sendAmount = 5 ether;
        
        vm.expectEmit(true, false, false, true);
        emit AssetDeposited(address(0), sendAmount, user1, 1);
        
        vm.prank(user1);
        (bool success, ) = address(treasury).call{value: sendAmount}("");
        assertTrue(success);
        
        assertEq(treasury.getAssetBalance(address(0)), sendAmount);
        assertEq(address(treasury).balance, sendAmount);
    }

    function testPauseUnpause() public {
        vm.startPrank(admin);
        
        treasury.pause();
        assertTrue(treasury.paused());
        
        // Should fail when paused
        vm.stopPrank();
        vm.prank(user1);
        vm.expectRevert();
        treasury.depositETH{value: 1 ether}();
        
        // Unpause
        vm.prank(admin);
        treasury.unpause();
        assertFalse(treasury.paused());
        
        // Should work after unpause
        vm.prank(user1);
        treasury.depositETH{value: 1 ether}();
        assertEq(treasury.getAssetBalance(address(0)), 1 ether);
    }

    function testGetCurrentMonthSpending() public {
        // Setup spending limit and deposit
        vm.prank(admin);
        treasury.setSpendingLimit(address(0), 10 ether);
        
        vm.prank(user1);
        treasury.depositETH{value: 10 ether}();
        
        // Make a withdrawal
        vm.prank(proposalExecutor);
        treasury.withdrawAsset(address(0), 3 ether, user2, 123, "Test");
        
        // Check current month spending
        assertEq(treasury.getCurrentMonthSpending(address(0)), 3 ether);
    }
}