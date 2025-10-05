// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {IGovToken} from "./Interfaces.sol";

/**
 * @title SimpleProposalManager
 * @dev A simplified proposal management system for the DAO
 */
contract SimpleProposalManager is AccessControl, ReentrancyGuard, Pausable {
    // Roles
    bytes32 public constant PROPOSAL_CREATOR_ROLE = keccak256("PROPOSAL_CREATOR_ROLE");
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Proposal Types
    enum ProposalType {
        TREASURY_SPENDING,
        PARAMETER_CHANGE,
        EMERGENCY_ACTION,
        MEMBERSHIP_CHANGE,
        UPGRADE_CONTRACT
    }

    // Proposal Status
    enum ProposalStatus {
        ACTIVE,
        SUCCEEDED,
        FAILED,
        EXECUTED,
        CANCELLED
    }

    // Vote Choice
    enum VoteChoice {
        ABSTAIN,
        FOR,
        AGAINST
    }

    // Simple Proposal Structure
    struct Proposal {
        uint256 id;
        address proposer;
        ProposalType proposalType;
        ProposalStatus status;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        uint256 votingEnd;
        bool executed;
    }

    // Vote tracking
    struct Vote {
        VoteChoice choice;
        uint256 votingPower;
        uint256 timestamp;
    }

    // State variables
    IGovToken public immutable govToken;
    uint256 public proposalCounter;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_PROPOSAL_THRESHOLD = 1000e18;

    // Mappings
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => string) public proposalTitles;
    mapping(uint256 => string) public proposalDescriptions;
    mapping(uint256 => mapping(address => Vote)) public votes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalType proposalType,
        string title,
        uint256 votingEnd
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        VoteChoice choice,
        uint256 votingPower
    );

    event ProposalStatusChanged(
        uint256 indexed proposalId,
        ProposalStatus newStatus
    );

    // Errors
    error SimpleProposalManager__InsufficientVotingPower();
    error SimpleProposalManager__ProposalNotFound();
    error SimpleProposalManager__VotingNotActive();
    error SimpleProposalManager__AlreadyVoted();
    error SimpleProposalManager__InvalidAddress();

    modifier proposalExists(uint256 proposalId) {
        if (proposalId == 0 || proposalId > proposalCounter) {
            revert SimpleProposalManager__ProposalNotFound();
        }
        _;
    }

    constructor(address _govToken, address _admin) {
        if (_govToken == address(0) || _admin == address(0)) {
            revert SimpleProposalManager__InvalidAddress();
        }

        govToken = IGovToken(_govToken);
        
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(ADMIN_ROLE, _admin);
        _grantRole(PROPOSAL_CREATOR_ROLE, _admin);
        _grantRole(EXECUTOR_ROLE, _admin);
    }

    /**
     * @dev Create a new proposal
     */
    function createProposal(
        ProposalType proposalType,
        string calldata title,
        string calldata description
    ) external whenNotPaused returns (uint256) {
        // Check voting power threshold
        uint256 voterPower = govToken.getVotes(msg.sender);
        if (voterPower < MIN_PROPOSAL_THRESHOLD) {
            revert SimpleProposalManager__InsufficientVotingPower();
        }

        proposalCounter++;
        uint256 proposalId = proposalCounter;
        uint256 votingEnd = block.timestamp + VOTING_PERIOD;

        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            proposalType: proposalType,
            status: ProposalStatus.ACTIVE,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0,
            votingEnd: votingEnd,
            executed: false
        });

        proposalTitles[proposalId] = title;
        proposalDescriptions[proposalId] = description;

        emit ProposalCreated(proposalId, msg.sender, proposalType, title, votingEnd);

        return proposalId;
    }

    /**
     * @dev Cast a vote on a proposal
     */
    function castVote(
        uint256 proposalId,
        VoteChoice choice
    ) external proposalExists(proposalId) whenNotPaused {
        Proposal storage proposal = proposals[proposalId];
        
        // Check if proposal is active and within voting period
        if (proposal.status != ProposalStatus.ACTIVE || block.timestamp > proposal.votingEnd) {
            revert SimpleProposalManager__VotingNotActive();
        }

        // Check if already voted
        if (hasVoted[proposalId][msg.sender]) {
            revert SimpleProposalManager__AlreadyVoted();
        }

        // Get voting power
        uint256 votingPower = govToken.getVotes(msg.sender);
        if (votingPower == 0) {
            revert SimpleProposalManager__InsufficientVotingPower();
        }

        // Record vote
        votes[proposalId][msg.sender] = Vote({
            choice: choice,
            votingPower: votingPower,
            timestamp: block.timestamp
        });
        
        hasVoted[proposalId][msg.sender] = true;

        // Update vote tallies
        if (choice == VoteChoice.FOR) {
            proposal.forVotes += votingPower;
        } else if (choice == VoteChoice.AGAINST) {
            proposal.againstVotes += votingPower;
        } else {
            proposal.abstainVotes += votingPower;
        }

        emit VoteCast(proposalId, msg.sender, choice, votingPower);
    }

    /**
     * @dev Update proposal status based on voting results
     */
    function updateProposalStatus(uint256 proposalId) external proposalExists(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.status != ProposalStatus.ACTIVE) {
            return;
        }

        // Check if voting period has ended
        if (block.timestamp <= proposal.votingEnd) {
            return;
        }

        // Simple majority rule
        if (proposal.forVotes > proposal.againstVotes) {
            proposal.status = ProposalStatus.SUCCEEDED;
            emit ProposalStatusChanged(proposalId, ProposalStatus.SUCCEEDED);
        } else {
            proposal.status = ProposalStatus.FAILED;
            emit ProposalStatusChanged(proposalId, ProposalStatus.FAILED);
        }
    }

    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) external view proposalExists(proposalId) returns (
        Proposal memory proposal,
        string memory title,
        string memory description
    ) {
        return (proposals[proposalId], proposalTitles[proposalId], proposalDescriptions[proposalId]);
    }

    /**
     * @dev Get vote details
     */
    function getVote(uint256 proposalId, address voter) external view returns (Vote memory) {
        return votes[proposalId][voter];
    }

    /**
     * @dev Get current proposal count
     */
    function getProposalCount() external view returns (uint256) {
        return proposalCounter;
    }

    /**
     * @dev Emergency pause function
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Emergency unpause function
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
}