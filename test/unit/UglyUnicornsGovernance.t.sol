// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {UglyUnicornsGovernance} from "src/UglyUnicornsGovernance.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";

// Mock ERC721 contract for testing
contract MockUglyUnicornsNFT {
    string public name = "Ugly Unicorns";
    string public symbol = "UGLY";
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    constructor() {
        // Mint some test NFTs
        _mint(address(0x123), 1);
        _mint(address(0x456), 2);
        _mint(address(0x789), 3);
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
    
    function setApprovalForAll(address operator, bool approved) external {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }
    
    function getApproved(uint256 tokenId) external view returns (address) {
        return _tokenApprovals[tokenId];
    }
    
    function isApprovedForAll(address owner, address operator) external view returns (bool) {
        return _operatorApprovals[owner][operator];
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
    
    // Helper function for testing
    function mintTo(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}

contract UglyUnicornsGovernanceTest is Test {
    UglyUnicornsGovernance public uglyUnicornsGovernance;
    MockUglyUnicornsNFT public mockNFT;
    
    address public admin = makeAddr("admin");
    address public governance = makeAddr("governance");
    address public manager = makeAddr("manager");
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    address public user3 = makeAddr("user3");
    
    function setUp() public {
        // Deploy mock NFT contract
        mockNFT = new MockUglyUnicornsNFT();
        
        // Deploy UglyUnicornsGovernance contract
        uglyUnicornsGovernance = new UglyUnicornsGovernance(
            address(mockNFT),
            admin,
            governance,
            manager
        );
        
        // Mint some test NFTs to users
        mockNFT.mintTo(user1, 10);
        mockNFT.mintTo(user1, 11);
        mockNFT.mintTo(user2, 20);
        mockNFT.mintTo(user3, 30);
        
        console.log("UglyUnicornsGovernance deployed at:", address(uglyUnicornsGovernance));
        console.log("Mock NFT deployed at:", address(mockNFT));
    }
    
    function testContractInitialization() public view {
        assertEq(uglyUnicornsGovernance.name(), "Ugly Unicorns Governance");
        assertEq(uglyUnicornsGovernance.symbol(), "UUGOV");
        assertEq(address(uglyUnicornsGovernance.uglyUnicornsContract()), address(mockNFT));
        assertEq(uglyUnicornsGovernance.baseVotingPower(), 1e18);
        
        // Check roles
        assertTrue(uglyUnicornsGovernance.hasRole(uglyUnicornsGovernance.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(uglyUnicornsGovernance.hasRole(uglyUnicornsGovernance.GOVERNANCE_ROLE(), governance));
        assertTrue(uglyUnicornsGovernance.hasRole(uglyUnicornsGovernance.MANAGER_ROLE(), manager));
    }
    
    function testWrapNFTSuccessfully() public {
        uint256 tokenId = 10;
        
        // User1 owns token 10
        assertEq(mockNFT.ownerOf(tokenId), user1);
        assertFalse(uglyUnicornsGovernance.isWrapped(tokenId));
        
        // Approve governance contract
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        
        // Wrap the NFT
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
        
        // Check state after wrapping
        assertTrue(uglyUnicornsGovernance.isWrapped(tokenId));
        assertEq(uglyUnicornsGovernance.originalOwner(tokenId), user1);
        assertEq(uglyUnicornsGovernance.ownerOf(tokenId), user1);
        assertEq(mockNFT.ownerOf(tokenId), address(uglyUnicornsGovernance));
        assertEq(uglyUnicornsGovernance.balanceOf(user1), 1);
    }
    
    function testWrapNFTFailsIfNotOwner() public {
        uint256 tokenId = 10;
        
        // User2 tries to wrap user1's NFT
        vm.startPrank(user2);
        vm.expectRevert(UglyUnicornsGovernance.NotOwnerOfOriginalNFT.selector);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
    }
    
    function testWrapNFTFailsIfAlreadyWrapped() public {
        uint256 tokenId = 10;
        
        // Wrap the NFT first
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        
        // Try to wrap again
        vm.expectRevert(UglyUnicornsGovernance.AlreadyWrapped.selector);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
    }
    
    function testUnwrapNFTSuccessfully() public {
        uint256 tokenId = 10;
        
        // Wrap first
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        
        assertTrue(uglyUnicornsGovernance.isWrapped(tokenId));
        
        // Unwrap
        uglyUnicornsGovernance.unwrapNFT(tokenId);
        vm.stopPrank();
        
        // Check state after unwrapping
        assertFalse(uglyUnicornsGovernance.isWrapped(tokenId));
        assertEq(uglyUnicornsGovernance.originalOwner(tokenId), address(0));
        assertEq(mockNFT.ownerOf(tokenId), user1);
        assertEq(uglyUnicornsGovernance.balanceOf(user1), 0);
    }
    
    function testUnwrapNFTFailsIfNotOwner() public {
        uint256 tokenId = 10;
        
        // User1 wraps NFT
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
        
        // User2 tries to unwrap
        vm.startPrank(user2);
        vm.expectRevert();
        uglyUnicornsGovernance.unwrapNFT(tokenId);
        vm.stopPrank();
    }
    
    function testGetVotesWithSingleNFT() public {
        uint256 tokenId = 10;
        
        // Initially no votes
        assertEq(uglyUnicornsGovernance.getVotes(user1), 0);
        
        // Wrap NFT
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
        
        // Check voting power
        assertEq(uglyUnicornsGovernance.getVotes(user1), 1e18); // Base voting power
    }
    
    function testGetVotesWithMultipleNFTs() public {
        uint256 tokenId1 = 10;
        uint256 tokenId2 = 11;
        
        // Wrap both NFTs
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId2);
        uglyUnicornsGovernance.wrapNFT(tokenId1);
        uglyUnicornsGovernance.wrapNFT(tokenId2);
        vm.stopPrank();
        
        // Check voting power (2 NFTs * base voting power)
        assertEq(uglyUnicornsGovernance.getVotes(user1), 2e18);
        assertEq(uglyUnicornsGovernance.balanceOf(user1), 2);
    }
    
    function testSetCustomVotingPower() public {
        uint256 tokenId = 10;
        uint256 customPower = 5e18;
        
        // Wrap NFT first
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
        
        // Set custom voting power
        uint256[] memory tokenIds = new uint256[](1);
        uint256[] memory votingPowers = new uint256[](1);
        tokenIds[0] = tokenId;
        votingPowers[0] = customPower;
        
        vm.startPrank(manager);
        uglyUnicornsGovernance.setCustomVotingPower(tokenIds, votingPowers);
        vm.stopPrank();
        
        // Check updated voting power
        assertEq(uglyUnicornsGovernance.getVotes(user1), customPower);
    }
    
    function testSetCustomVotingPowerFailsForNonManager() public {
        uint256[] memory tokenIds = new uint256[](1);
        uint256[] memory votingPowers = new uint256[](1);
        tokenIds[0] = 10;
        votingPowers[0] = 5e18;
        
        vm.startPrank(user1);
        vm.expectRevert();
        uglyUnicornsGovernance.setCustomVotingPower(tokenIds, votingPowers);
        vm.stopPrank();
    }
    
    function testSetBaseVotingPower() public {
        uint256 newBasePower = 2e18;
        
        vm.startPrank(manager);
        uglyUnicornsGovernance.setBaseVotingPower(newBasePower);
        vm.stopPrank();
        
        assertEq(uglyUnicornsGovernance.baseVotingPower(), newBasePower);
        
        // Test with wrapped NFT
        uint256 tokenId = 10;
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
        
        assertEq(uglyUnicornsGovernance.getVotes(user1), newBasePower);
    }
    
    function testSetBaseVotingPowerFailsForNonManager() public {
        vm.startPrank(user1);
        vm.expectRevert();
        uglyUnicornsGovernance.setBaseVotingPower(2e18);
        vm.stopPrank();
    }
    
    function testEmergencyRescue() public {
        uint256 tokenId = 10;
        
        // Wrap NFT
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), tokenId);
        uglyUnicornsGovernance.wrapNFT(tokenId);
        vm.stopPrank();
        
        // Emergency rescue
        vm.startPrank(admin);
        uglyUnicornsGovernance.emergencyRescue(tokenId, user2);
        vm.stopPrank();
        
        // Check NFT was rescued to user2
        assertEq(mockNFT.ownerOf(tokenId), user2);
    }
    
    function testEmergencyRescueFailsForNonAdmin() public {
        uint256 tokenId = 10;
        
        vm.startPrank(user1);
        vm.expectRevert();
        uglyUnicornsGovernance.emergencyRescue(tokenId, user2);
        vm.stopPrank();
    }
    
    function testSupportsInterface() public view {
        // Test ERC721 interface
        assertTrue(uglyUnicornsGovernance.supportsInterface(0x80ac58cd));
        // Test AccessControl interface
        assertTrue(uglyUnicornsGovernance.supportsInterface(0x7965db0b));
        // Test ERC165 interface
        assertTrue(uglyUnicornsGovernance.supportsInterface(0x01ffc9a7));
    }
}