// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {VotingPowerExchangeV2} from "src/VotingPowerExchangeV2.sol";
import {MinchynGovernanceWrapper} from "src/MinchynGovernanceWrapper.sol";
import {UglyUnicornsGovernance} from "src/UglyUnicornsGovernance.sol";
import {GovToken} from "src/GovToken.sol";
import {MessageHashUtils} from "lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";

// Mock contracts for testing
contract MockMinchynToken {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    constructor() {
        balanceOf[msg.sender] = 1000000 * 1e18;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }
}

contract MockUglyUnicornsNFT {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    
    constructor() {
        _mint(address(0x123), 1);
        _mint(address(0x456), 2);
    }
    
    function ownerOf(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }
    
    function balanceOf(address owner) external view returns (uint256) {
        return _balances[owner];
    }
    
    function transferFrom(address from, address to, uint256 tokenId) external {
        _owners[tokenId] = to;
        _balances[from] -= 1;
        _balances[to] += 1;
    }
    
    function approve(address approved, uint256 tokenId) external {
        _tokenApprovals[tokenId] = approved;
    }
    
    function _mint(address to, uint256 tokenId) internal {
        _owners[tokenId] = to;
        _balances[to] += 1;
    }
    
    function mintTo(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}

contract VotingPowerExchangeV2Test is Test {
    VotingPowerExchangeV2 public exchange;
    MinchynGovernanceWrapper public minchynWrapper;
    UglyUnicornsGovernance public uglyUnicornsGovernance;
    GovToken public govToken;
    MockMinchynToken public mockMinchyn;
    MockUglyUnicornsNFT public mockNFT;
    
    address public admin = makeAddr("admin");
    address public manager = makeAddr("manager");
    address public exchanger = makeAddr("exchanger");
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    
    uint256 public user1PrivateKey = 0x1111;
    uint256 public user2PrivateKey = 0x2222;
    
    function setUp() public {
        // Overwrite user addresses with ones derived from private keys for signing
        user1 = vm.addr(user1PrivateKey);
        user2 = vm.addr(user2PrivateKey);
        
        // Deploy mock tokens
        mockMinchyn = new MockMinchynToken();
        mockNFT = new MockUglyUnicornsNFT();
        
        // Deploy GovToken
        govToken = new GovToken(
            "Ugly Unicorns DAO Token",
            "UUDT",
            admin,
            admin, // minter
            admin, // burner
            address(0) // will be set later
        );
        
        // Deploy Minchyn wrapper
        minchynWrapper = new MinchynGovernanceWrapper(
            address(mockMinchyn),
            admin,
            manager,
            address(0) // will be set later
        );
        
        // Deploy Ugly Unicorns governance
        uglyUnicornsGovernance = new UglyUnicornsGovernance(
            address(mockNFT),
            admin,
            address(0), // will be set later
            manager
        );
        
        // Deploy VotingPowerExchangeV2
        exchange = new VotingPowerExchangeV2(
            address(govToken),
            address(minchynWrapper),
            address(uglyUnicornsGovernance),
            admin,
            manager,
            exchanger
        );
        
        // Grant roles
        vm.startPrank(admin);
        govToken.grantRole(govToken.VOTING_POWER_EXCHANGE_ROLE(), address(exchange));
        minchynWrapper.grantRole(minchynWrapper.VOTING_POWER_EXCHANGE_ROLE(), address(exchange));
        uglyUnicornsGovernance.grantRole(uglyUnicornsGovernance.GOVERNANCE_ROLE(), address(exchange));
        vm.stopPrank();
        
        // Setup test tokens
        mockMinchyn.mint(user1, 1000e18);
        mockMinchyn.mint(user2, 1000e18);
        mockNFT.mintTo(user1, 10);
        mockNFT.mintTo(user1, 11);
        mockNFT.mintTo(user2, 20);
        
        console.log("VotingPowerExchangeV2 deployed at:", address(exchange));
    }
    
    function testContractInitialization() public view {
        assertEq(address(exchange.govToken()), address(govToken));
        assertEq(address(exchange.minchynWrapper()), address(minchynWrapper));
        assertEq(address(exchange.uglyUnicornsGovernance()), address(uglyUnicornsGovernance));
        assertEq(exchange.getVotingPowerCap(), 49e18);
        assertEq(exchange.nftVotingPowerRate(), 5e18);
        
        // Check roles
        assertTrue(exchange.hasRole(exchange.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(exchange.hasRole(exchange.MANAGER_ROLE(), manager));
        assertTrue(exchange.hasRole(exchange.EXCHANGER_ROLE(), exchanger));
    }
    
    function testExchangeMinchynSuccessfully() public {
        uint256 depositAmount = 100e18;
        uint256 exchangeAmount = 50e18;
        
        // User1 deposits Minchyn to wrapper
        vm.startPrank(user1);
        mockMinchyn.approve(address(minchynWrapper), depositAmount);
        minchynWrapper.deposit(depositAmount);
        vm.stopPrank();
        
        // Prepare signature for exchange
        bytes32 nonce = keccak256("test_nonce_1");
        uint256 expiration = block.timestamp + 1 hours;
        
        bytes32 digest = _getMinchynExchangeDigest(user1, exchangeAmount, nonce, expiration);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1PrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        // Exchanger transfers wrapped tokens and calls exchange
        vm.startPrank(exchanger);
        minchynWrapper.transfer(exchanger, exchangeAmount);
        minchynWrapper.approve(address(exchange), exchangeAmount);
        
        exchange.exchangeMinchyn(user1, exchangeAmount, nonce, expiration, signature);
        vm.stopPrank();
        
        // Check results
        assertTrue(govToken.balanceOf(user1) > 0);
        assertTrue(exchange.authorizationState(user1, nonce));
    }
    
    function testExchangeUglyUnicornsSuccessfully() public {
        uint256[] memory tokenIds = new uint256[](2);
        tokenIds[0] = 10;
        tokenIds[1] = 11;
        
        // User1 wraps NFTs
        vm.startPrank(user1);
        mockNFT.approve(address(uglyUnicornsGovernance), 10);
        mockNFT.approve(address(uglyUnicornsGovernance), 11);
        uglyUnicornsGovernance.wrapNFT(10);
        uglyUnicornsGovernance.wrapNFT(11);
        vm.stopPrank();
        
        // Prepare signature for NFT exchange
        bytes32 nonce = keccak256("test_nonce_nft_1");
        uint256 expiration = block.timestamp + 1 hours;
        
        bytes32 digest = _getNFTExchangeDigest(user1, tokenIds, nonce, expiration);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1PrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        // Exchange NFT voting power
        vm.startPrank(exchanger);
        exchange.exchangeUglyUnicorns(user1, tokenIds, nonce, expiration, signature);
        vm.stopPrank();
        
        // Check results - should get 2 NFTs * 5e18 voting power per NFT = 10e18
        assertEq(govToken.balanceOf(user1), 10e18);
        assertTrue(exchange.authorizationState(user1, nonce));
        assertTrue(exchange.exchangedNFTs(10));
        assertTrue(exchange.exchangedNFTs(11));
    }
    
    function testExchangeMinchynFailsWithExpiredSignature() public {
        uint256 exchangeAmount = 50e18;
        bytes32 nonce = keccak256("test_nonce_expired");
        uint256 expiration = block.timestamp - 1; // Already expired
        
        bytes32 digest = _getMinchynExchangeDigest(user1, exchangeAmount, nonce, expiration);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1PrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        vm.startPrank(exchanger);
        vm.expectRevert(VotingPowerExchangeV2.VotingPowerExchange__SignatureExpired.selector);
        exchange.exchangeMinchyn(user1, exchangeAmount, nonce, expiration, signature);
        vm.stopPrank();
    }
    
    function testExchangeMinchynFailsWithInvalidSignature() public {
        uint256 exchangeAmount = 50e18;
        bytes32 nonce = keccak256("test_nonce_invalid");
        uint256 expiration = block.timestamp + 1 hours;
        
        // Sign with wrong private key
        bytes32 digest = _getMinchynExchangeDigest(user1, exchangeAmount, nonce, expiration);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user2PrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        vm.startPrank(exchanger);
        vm.expectRevert();
        exchange.exchangeMinchyn(user1, exchangeAmount, nonce, expiration, signature);
        vm.stopPrank();
    }
    
    function testExchangeMinchynFailsWithReusedNonce() public {
        uint256 depositAmount = 100e18;
        uint256 exchangeAmount = 25e18;
        
        // Setup
        vm.startPrank(user1);
        mockMinchyn.approve(address(minchynWrapper), depositAmount);
        minchynWrapper.deposit(depositAmount);
        vm.stopPrank();
        
        bytes32 nonce = keccak256("test_nonce_reuse");
        uint256 expiration = block.timestamp + 1 hours;
        
        bytes32 digest = _getMinchynExchangeDigest(user1, exchangeAmount, nonce, expiration);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1PrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        // First exchange should succeed
        vm.startPrank(exchanger);
        minchynWrapper.transfer(exchanger, exchangeAmount * 2); // Get enough for both attempts
        minchynWrapper.approve(address(exchange), exchangeAmount * 2);
        
        exchange.exchangeMinchyn(user1, exchangeAmount, nonce, expiration, signature);
        
        // Second exchange with same nonce should fail
        vm.expectRevert(VotingPowerExchangeV2.VotingPowerExchange__InvalidNonce.selector);
        exchange.exchangeMinchyn(user1, exchangeAmount, nonce, expiration, signature);
        vm.stopPrank();
    }
    
    function testSetVotingPowerCap() public {
        uint256 newCap = 100e18;
        
        vm.startPrank(manager);
        exchange.setVotingPowerCap(newCap);
        vm.stopPrank();
        
        assertEq(exchange.getVotingPowerCap(), newCap);
    }
    
    function testSetVotingPowerCapFailsForNonManager() public {
        vm.startPrank(user1);
        vm.expectRevert();
        exchange.setVotingPowerCap(100e18);
        vm.stopPrank();
    }
    
    function testSetNFTVotingPowerRate() public {
        uint256 newRate = 10e18;
        
        vm.startPrank(manager);
        exchange.setNFTVotingPowerRate(newRate);
        vm.stopPrank();
        
        assertEq(exchange.nftVotingPowerRate(), newRate);
    }
    
    function testSetNFTVotingPowerRateFailsForNonManager() public {
        vm.startPrank(user1);
        vm.expectRevert();
        exchange.setNFTVotingPowerRate(10e18);
        vm.stopPrank();
    }
    
    function testExchangeMinchynRespectsCap() public {
        // Set a low cap
        vm.startPrank(manager);
        exchange.setVotingPowerCap(5e18);
        vm.stopPrank();
        
        uint256 depositAmount = 100e18;
        uint256 exchangeAmount = 100e18; // Large amount that would exceed cap
        
        // Setup
        vm.startPrank(user1);
        mockMinchyn.approve(address(minchynWrapper), depositAmount);
        minchynWrapper.deposit(depositAmount);
        vm.stopPrank();
        
        bytes32 nonce = keccak256("test_nonce_cap");
        uint256 expiration = block.timestamp + 1 hours;
        
        bytes32 digest = _getMinchynExchangeDigest(user1, exchangeAmount, nonce, expiration);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(user1PrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        vm.startPrank(exchanger);
        minchynWrapper.transfer(exchanger, exchangeAmount);
        minchynWrapper.approve(address(exchange), exchangeAmount);
        
        exchange.exchangeMinchyn(user1, exchangeAmount, nonce, expiration, signature);
        vm.stopPrank();
        
        // Should not exceed the cap
        assertLe(govToken.balanceOf(user1), 5e18);
    }
    
    function testCalculationFunctions() public view {
        uint256 amount = 100e18;
        uint256 currentBurned = 0;
        
        uint256 votingPower = exchange.calculateIncrementedVotingPower(amount, currentBurned);
        uint256 burnAmount = exchange.calculateIncrementedBurningAmount(votingPower, 0);
        
        assertTrue(votingPower > 0);
        assertTrue(burnAmount > 0);
    }
    
    // Helper functions for signature generation
    function _getMinchynExchangeDigest(
        address sender,
        uint256 amount,
        bytes32 nonce,
        uint256 expiration
    ) internal view returns (bytes32) {
        bytes32 structHash = keccak256(
            abi.encode(
                keccak256("Exchange(address sender,uint256 amount,bytes32 nonce,uint256 expiration)"),
                sender,
                amount,
                nonce,
                expiration
            )
        );
        
        return MessageHashUtils.toTypedDataHash(_getDomainSeparator(), structHash);
    }
    
    function _getNFTExchangeDigest(
        address sender,
        uint256[] memory tokenIds,
        bytes32 nonce,
        uint256 expiration
    ) internal view returns (bytes32) {
        bytes32 structHash = keccak256(
            abi.encode(
                keccak256("NFTExchange(address sender,uint256[] tokenIds,bytes32 nonce,uint256 expiration)"),
                sender,
                keccak256(abi.encodePacked(tokenIds)),
                nonce,
                expiration
            )
        );
        
        return MessageHashUtils.toTypedDataHash(_getDomainSeparator(), structHash);
    }
    
    function _getDomainSeparator() internal view returns (bytes32) {
        return keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256("VotingPowerExchangeV2"),
                keccak256("1"),
                block.chainid,
                address(exchange)
            )
        );
    }
}