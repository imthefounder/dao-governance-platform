// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {MinchynGovernanceWrapper} from "src/MinchynGovernanceWrapper.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Mock ERC20 contract for testing
contract MockMinchynToken {
    string public name = "Minchyn";
    string public symbol = "MCHN";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000000 * 1e18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
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
    
    // Helper function for testing
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
    }
}

contract MinchynGovernanceWrapperTest is Test {
    MinchynGovernanceWrapper public wrapper;
    MockMinchynToken public mockMinchyn;
    
    address public admin = makeAddr("admin");
    address public manager = makeAddr("manager");
    address public votingPowerExchange = makeAddr("votingPowerExchange");
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    
    uint256 public constant INITIAL_BALANCE = 1000e18;
    uint256 public constant DEPOSIT_AMOUNT = 100e18;
    
    function setUp() public {
        // Deploy mock Minchyn token
        mockMinchyn = new MockMinchynToken();
        
        // Deploy wrapper contract
        wrapper = new MinchynGovernanceWrapper(
            address(mockMinchyn),
            admin,
            manager,
            votingPowerExchange
        );
        
        // Mint tokens to users for testing
        mockMinchyn.mint(user1, INITIAL_BALANCE);
        mockMinchyn.mint(user2, INITIAL_BALANCE);
        
        console.log("MinchynGovernanceWrapper deployed at:", address(wrapper));
        console.log("Mock Minchyn token deployed at:", address(mockMinchyn));
    }
    
    function testContractInitialization() public view {
        assertEq(address(wrapper.minchynToken()), address(mockMinchyn));
        assertEq(wrapper.exchangeRate(), 1e18); // 1:1 default rate
        assertEq(wrapper.totalSupply(), 0);
        assertEq(wrapper.name(), "Wrapped Minchyn");
        assertEq(wrapper.symbol(), "wMCHN");
        assertEq(wrapper.decimals(), 18);
        
        // Check roles
        assertTrue(wrapper.hasRole(wrapper.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(wrapper.hasRole(wrapper.MANAGER_ROLE(), manager));
        assertTrue(wrapper.hasRole(wrapper.BURNER_ROLE(), admin));
        assertTrue(wrapper.hasRole(wrapper.VOTING_POWER_EXCHANGE_ROLE(), votingPowerExchange));
    }
    
    function testDepositSuccessfully() public {
        // User1 approves wrapper to spend Minchyn tokens
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        
        uint256 expectedWrapped = wrapper.calculateWrappedAmount(DEPOSIT_AMOUNT);
        
        // Deposit Minchyn tokens
        wrapper.deposit(DEPOSIT_AMOUNT);
        vm.stopPrank();
        
        // Check balances
        assertEq(wrapper.balanceOf(user1), expectedWrapped);
        assertEq(wrapper.totalSupply(), expectedWrapped);
        assertEq(mockMinchyn.balanceOf(user1), INITIAL_BALANCE - DEPOSIT_AMOUNT);
        assertEq(wrapper.getMinchynBalance(), DEPOSIT_AMOUNT);
    }
    
    function testDepositFailsWithInsufficientAmount() public {
        uint256 smallAmount = wrapper.MINIMUM_DEPOSIT() - 1;
        
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), smallAmount);
        
        vm.expectRevert(MinchynGovernanceWrapper.AmountTooSmall.selector);
        wrapper.deposit(smallAmount);
        vm.stopPrank();
    }
    
    function testDepositFailsWithInsufficientAllowance() public {
        vm.startPrank(user1);
        // Don't approve enough tokens
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT - 1);
        
        vm.expectRevert();
        wrapper.deposit(DEPOSIT_AMOUNT);
        vm.stopPrank();
    }
    
    function testWithdrawSuccessfully() public {
        // First deposit
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        
        uint256 wrappedBalance = wrapper.balanceOf(user1);
        uint256 withdrawAmount = wrappedBalance / 2; // Withdraw half
        uint256 expectedMinchyn = wrapper.calculateMinchynAmount(withdrawAmount);
        
        // Withdraw
        wrapper.withdraw(withdrawAmount);
        vm.stopPrank();
        
        // Check balances
        assertEq(wrapper.balanceOf(user1), wrappedBalance - withdrawAmount);
        assertEq(wrapper.totalSupply(), wrappedBalance - withdrawAmount);
        assertEq(mockMinchyn.balanceOf(user1), INITIAL_BALANCE - DEPOSIT_AMOUNT + expectedMinchyn);
    }
    
    function testWithdrawFailsWithInsufficientBalance() public {
        vm.startPrank(user1);
        
        vm.expectRevert(MinchynGovernanceWrapper.InsufficientBalance.selector);
        wrapper.withdraw(100e18);
        vm.stopPrank();
    }
    
    function testWithdrawFailsWithInsufficientAmount() public {
        // First deposit
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        
        uint256 smallAmount = wrapper.MINIMUM_WITHDRAWAL() - 1;
        
        vm.expectRevert(MinchynGovernanceWrapper.AmountTooSmall.selector);
        wrapper.withdraw(smallAmount);
        vm.stopPrank();
    }
    
    function testBurnByBurnerSuccessfully() public {
        // First deposit
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        vm.stopPrank();
        
        uint256 wrappedBalance = wrapper.balanceOf(user1);
        uint256 burnAmount = wrappedBalance / 2;
        
        // Burn by admin (has BURNER_ROLE)
        vm.startPrank(admin);
        wrapper.burnByBurner(user1, burnAmount);
        vm.stopPrank();
        
        // Check balances
        assertEq(wrapper.balanceOf(user1), wrappedBalance - burnAmount);
        assertEq(wrapper.totalSupply(), wrappedBalance - burnAmount);
    }
    
    function testBurnByBurnerFailsForNonBurner() public {
        vm.startPrank(user1);
        vm.expectRevert();
        wrapper.burnByBurner(user2, 100e18);
        vm.stopPrank();
    }
    
    function testMintByVotingPowerExchange() public {
        uint256 mintAmount = 50e18;
        
        vm.startPrank(votingPowerExchange);
        wrapper.mint(user1, mintAmount);
        vm.stopPrank();
        
        assertEq(wrapper.balanceOf(user1), mintAmount);
        assertEq(wrapper.totalSupply(), mintAmount);
    }
    
    function testMintFailsForNonVotingPowerExchange() public {
        vm.startPrank(user1);
        vm.expectRevert();
        wrapper.mint(user2, 100e18);
        vm.stopPrank();
    }
    
    function testTransferSuccessfully() public {
        // First deposit
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        
        uint256 transferAmount = 25e18;
        wrapper.transfer(user2, transferAmount);
        vm.stopPrank();
        
        assertEq(wrapper.balanceOf(user1), wrapper.calculateWrappedAmount(DEPOSIT_AMOUNT) - transferAmount);
        assertEq(wrapper.balanceOf(user2), transferAmount);
    }
    
    function testTransferFailsWithInsufficientBalance() public {
        vm.startPrank(user1);
        vm.expectRevert(MinchynGovernanceWrapper.InsufficientBalance.selector);
        wrapper.transfer(user2, 100e18);
        vm.stopPrank();
    }
    
    function testTransferFromSuccessfully() public {
        // User1 deposits and approves user2
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        
        uint256 transferAmount = 25e18;
        wrapper.approve(user2, transferAmount);
        vm.stopPrank();
        
        // User2 transfers from user1
        vm.startPrank(user2);
        wrapper.transferFrom(user1, user2, transferAmount);
        vm.stopPrank();
        
        assertEq(wrapper.balanceOf(user1), wrapper.calculateWrappedAmount(DEPOSIT_AMOUNT) - transferAmount);
        assertEq(wrapper.balanceOf(user2), transferAmount);
        assertEq(wrapper.allowance(user1, user2), 0);
    }
    
    function testTransferFromFailsWithInsufficientAllowance() public {
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        vm.stopPrank();
        
        vm.startPrank(user2);
        vm.expectRevert(MinchynGovernanceWrapper.InsufficientAllowance.selector);
        wrapper.transferFrom(user1, user2, 25e18);
        vm.stopPrank();
    }
    
    function testSetExchangeRate() public {
        uint256 newRate = 2e18; // 2:1 ratio
        
        vm.startPrank(manager);
        wrapper.setExchangeRate(newRate);
        vm.stopPrank();
        
        assertEq(wrapper.exchangeRate(), newRate);
        
        // Test with new rate
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        vm.stopPrank();
        
        uint256 expectedWrapped = (DEPOSIT_AMOUNT * 1e18) / newRate;
        assertEq(wrapper.balanceOf(user1), expectedWrapped);
    }
    
    function testSetExchangeRateFailsForNonManager() public {
        vm.startPrank(user1);
        vm.expectRevert();
        wrapper.setExchangeRate(2e18);
        vm.stopPrank();
    }
    
    function testCalculationFunctions() public view {
        uint256 minchynAmount = 100e18;
        uint256 wrappedAmount = 50e18;
        
        uint256 calculatedWrapped = wrapper.calculateWrappedAmount(minchynAmount);
        uint256 calculatedMinchyn = wrapper.calculateMinchynAmount(wrappedAmount);
        
        assertEq(calculatedWrapped, minchynAmount); // 1:1 rate
        assertEq(calculatedMinchyn, wrappedAmount); // 1:1 rate
    }
    
    function testEmergencyWithdraw() public {
        // First deposit some tokens
        vm.startPrank(user1);
        mockMinchyn.approve(address(wrapper), DEPOSIT_AMOUNT);
        wrapper.deposit(DEPOSIT_AMOUNT);
        vm.stopPrank();
        
        uint256 emergencyAmount = DEPOSIT_AMOUNT / 2;
        uint256 initialBalance = mockMinchyn.balanceOf(user2);
        
        // Emergency withdraw by admin
        vm.startPrank(admin);
        wrapper.emergencyWithdraw(user2, emergencyAmount);
        vm.stopPrank();
        
        assertEq(mockMinchyn.balanceOf(user2), initialBalance + emergencyAmount);
        assertEq(wrapper.getMinchynBalance(), DEPOSIT_AMOUNT - emergencyAmount);
    }
    
    function testEmergencyWithdrawFailsForNonAdmin() public {
        vm.startPrank(user1);
        vm.expectRevert();
        wrapper.emergencyWithdraw(user2, 100e18);
        vm.stopPrank();
    }
    
    function testApproveAndAllowance() public {
        uint256 approvalAmount = 50e18;
        
        vm.startPrank(user1);
        wrapper.approve(user2, approvalAmount);
        vm.stopPrank();
        
        assertEq(wrapper.allowance(user1, user2), approvalAmount);
    }
    
    function testConstants() public view {
        assertEq(wrapper.MINIMUM_DEPOSIT(), 1e18);
        assertEq(wrapper.MINIMUM_WITHDRAWAL(), 1e18);
    }
}