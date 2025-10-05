// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {SimpleProposalManager} from "src/SimpleProposalManager.sol";
import {GovToken} from "src/GovToken.sol";

contract SimpleProposalManagerTest is Test {
    SimpleProposalManager public proposalManager;
    GovToken public govToken;
    
    address public admin = makeAddr("admin");
    address public minter = makeAddr("minter");
    address public burner = makeAddr("burner");
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    address public user3 = makeAddr("user3");
    
    // Events to test
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        SimpleProposalManager.ProposalType proposalType,
        string title,
        uint256 votingEnd
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        SimpleProposalManager.VoteChoice choice,
        uint256 votingPower
    );

    function setUp() public {
        // Deploy GovToken directly for testing
        vm.startPrank(admin);
        govToken = new GovToken(
            "Test Governance Token",
            "TGT",
            admin,  // defaultAdmin
            admin,  // minter (using admin for simplicity)
            burner, // burner
            address(0) // votingPowerExchange (not needed for this test)
        );
        
        // Deploy SimpleProposalManager
        proposalManager = new SimpleProposalManager(address(govToken), admin);
        
        // Grant proposal creator role to users
        proposalManager.grantRole(proposalManager.PROPOSAL_CREATOR_ROLE(), user1);
        proposalManager.grantRole(proposalManager.PROPOSAL_CREATOR_ROLE(), user2);
        
        // Mint tokens to users for voting power
        govToken.mint(user1, 2000e18); // Above threshold
        govToken.mint(user2, 1500e18); // Above threshold
        govToken.mint(user3, 500e18);  // Below threshold
        
        vm.stopPrank();
        
        // Users delegate to themselves to activate voting power
        vm.prank(user1);
        govToken.delegate(user1);
        
        vm.prank(user2);
        govToken.delegate(user2);
        
        vm.prank(user3);
        govToken.delegate(user3);
    }

    function testContractInitialization() public view {
        assertEq(address(proposalManager.govToken()), address(govToken));
        assertEq(proposalManager.getProposalCount(), 0);
        assertTrue(proposalManager.hasRole(proposalManager.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(proposalManager.hasRole(proposalManager.ADMIN_ROLE(), admin));
        assertTrue(proposalManager.hasRole(proposalManager.PROPOSAL_CREATOR_ROLE(), user1));
    }

    function testCreateProposalSuccess() public {
        vm.startPrank(user1);
        
        // Create a treasury spending proposal
        vm.expectEmit(true, true, false, true);
        emit ProposalCreated(
            1,
            user1,
            SimpleProposalManager.ProposalType.TREASURY_SPENDING,
            "Fund Development",
            block.timestamp + 7 days
        );
        
        uint256 proposalId = proposalManager.createProposal(
            SimpleProposalManager.ProposalType.TREASURY_SPENDING,
            "Fund Development",
            "Proposal to fund development team for next quarter"
        );
        
        assertEq(proposalId, 1);
        assertEq(proposalManager.getProposalCount(), 1);
        
        // Check proposal details
        (SimpleProposalManager.Proposal memory proposal, string memory title, string memory description) = 
            proposalManager.getProposal(proposalId);
        assertEq(proposal.id, 1);
        assertEq(proposal.proposer, user1);
        assertEq(uint256(proposal.proposalType), uint256(SimpleProposalManager.ProposalType.TREASURY_SPENDING));
        assertEq(uint256(proposal.status), uint256(SimpleProposalManager.ProposalStatus.ACTIVE));
        assertEq(title, "Fund Development");
        assertEq(description, "Proposal to fund development team for next quarter");
        assertFalse(proposal.executed);
        
        vm.stopPrank();
    }

    function testCreateProposalFailsInsufficientVotingPower() public {
        vm.startPrank(user3); // user3 has only 500 tokens, below 1000 threshold
        
        vm.expectRevert(SimpleProposalManager.SimpleProposalManager__InsufficientVotingPower.selector);
        proposalManager.createProposal(
            SimpleProposalManager.ProposalType.TREASURY_SPENDING,
            "Fund Development",
            "Proposal to fund development team"
        );
        
        vm.stopPrank();
    }

    function testCastVoteSuccess() public {
        // Create proposal first
        vm.prank(user1);
        uint256 proposalId = proposalManager.createProposal(
            SimpleProposalManager.ProposalType.PARAMETER_CHANGE,
            "Change Parameters",
            "Update system parameters"
        );
        
        // Cast vote
        vm.startPrank(user2);
        
        vm.expectEmit(true, true, false, true);
        emit VoteCast(
            proposalId,
            user2,
            SimpleProposalManager.VoteChoice.FOR,
            1500e18
        );
        
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.FOR);
        
        // Check vote was recorded
        SimpleProposalManager.Vote memory vote = proposalManager.getVote(proposalId, user2);
        assertEq(uint256(vote.choice), uint256(SimpleProposalManager.VoteChoice.FOR));
        assertEq(vote.votingPower, 1500e18);
        
        // Check proposal vote tallies
        (SimpleProposalManager.Proposal memory proposal,,) = proposalManager.getProposal(proposalId);
        assertEq(proposal.forVotes, 1500e18);
        assertEq(proposal.againstVotes, 0);
        assertEq(proposal.abstainVotes, 0);
        
        vm.stopPrank();
    }

    function testCastVoteFailsAlreadyVoted() public {
        // Create proposal and cast vote
        vm.prank(user1);
        uint256 proposalId = proposalManager.createProposal(
            SimpleProposalManager.ProposalType.PARAMETER_CHANGE,
            "Change Parameters",
            "Update system parameters"
        );
        
        vm.startPrank(user2);
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.FOR);
        
        // Try to vote again
        vm.expectRevert(SimpleProposalManager.SimpleProposalManager__AlreadyVoted.selector);
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.AGAINST);
        
        vm.stopPrank();
    }

    function testProposalSucceedsWithMajority() public {
        // Create proposal
        vm.prank(user1);
        uint256 proposalId = proposalManager.createProposal(
            SimpleProposalManager.ProposalType.PARAMETER_CHANGE,
            "Change Parameters",
            "Update system parameters"
        );
        
        // Cast votes - user1 (2000) FOR, user2 (1500) AGAINST = FOR wins
        vm.prank(user1);
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.FOR);
        
        vm.prank(user2);
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.AGAINST);
        
        // Fast forward past voting period
        vm.warp(block.timestamp + 8 days);
        
        // Update proposal status
        proposalManager.updateProposalStatus(proposalId);
        
        // Check proposal succeeded (2000 FOR > 1500 AGAINST)
        (SimpleProposalManager.Proposal memory proposal,,) = proposalManager.getProposal(proposalId);
        assertEq(uint256(proposal.status), uint256(SimpleProposalManager.ProposalStatus.SUCCEEDED));
    }

    function testProposalFailsWithMajorityAgainst() public {
        // Create proposal
        vm.prank(user1);
        uint256 proposalId = proposalManager.createProposal(
            SimpleProposalManager.ProposalType.PARAMETER_CHANGE,
            "Change Parameters",
            "Update system parameters"
        );
        
        // Cast votes - user1 (2000) AGAINST, user2 (1500) FOR = AGAINST wins
        vm.prank(user1);
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.AGAINST);
        
        vm.prank(user2);
        proposalManager.castVote(proposalId, SimpleProposalManager.VoteChoice.FOR);
        
        // Fast forward past voting period
        vm.warp(block.timestamp + 8 days);
        
        // Update proposal status
        proposalManager.updateProposalStatus(proposalId);
        
        // Check proposal failed (1500 FOR < 2000 AGAINST)
        (SimpleProposalManager.Proposal memory proposal,,) = proposalManager.getProposal(proposalId);
        assertEq(uint256(proposal.status), uint256(SimpleProposalManager.ProposalStatus.FAILED));
    }

    function testEmergencyFunctions() public {
        // Test pause
        vm.prank(admin);
        proposalManager.pause();
        assertTrue(proposalManager.paused());
        
        // Try to create proposal while paused
        vm.startPrank(user1);
        vm.expectRevert();
        proposalManager.createProposal(
            SimpleProposalManager.ProposalType.PARAMETER_CHANGE,
            "Test",
            "Test proposal"
        );
        vm.stopPrank();
        
        // Test unpause
        vm.prank(admin);
        proposalManager.unpause();
        assertFalse(proposalManager.paused());
    }

    function testGetProposalCount() public {
        assertEq(proposalManager.getProposalCount(), 0);
        
        vm.prank(user1);
        proposalManager.createProposal(
            SimpleProposalManager.ProposalType.PARAMETER_CHANGE,
            "Test 1",
            "First proposal"
        );
        
        assertEq(proposalManager.getProposalCount(), 1);
        
        vm.prank(user2);
        proposalManager.createProposal(
            SimpleProposalManager.ProposalType.TREASURY_SPENDING,
            "Test 2",
            "Second proposal"
        );
        
        assertEq(proposalManager.getProposalCount(), 2);
    }
}