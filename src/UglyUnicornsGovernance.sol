// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721Votes} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

/// @title UglyUnicornsGovernance
/// @notice Wrapper contract for Ugly Unicorns NFT to enable governance participation
/// @dev This contract wraps the existing Ugly Unicorns NFT (0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F) 
///      and provides voting power for DAO governance
/// @custom:security-contact dev@codefox.co.jp
contract UglyUnicornsGovernance is ERC721, ERC721Enumerable, ERC721Votes, AccessControl {
    error DefaultAdminCannotBeZero();
    error UglyUnicornsContractCannotBeZero();
    error NotOwnerOfOriginalNFT();
    error AlreadyWrapped();
    error NotWrapped();
    error CallerNotAuthorized();

    // Events
    event NFTWrapped(address indexed owner, uint256 indexed tokenId);
    event NFTUnwrapped(address indexed owner, uint256 indexed tokenId);
    event VotingPowerCalculated(address indexed owner, uint256 votingPower);

    // Roles
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    // Original Ugly Unicorns contract
    IERC721 public immutable uglyUnicornsContract;
    
    // Mapping to track wrapped NFTs
    mapping(uint256 => bool) public isWrapped;
    mapping(uint256 => address) public originalOwner;
    
    // Voting power configuration
    uint256 public baseVotingPower = 1e18; // 1 vote per NFT by default
    mapping(uint256 => uint256) public customVotingPower; // For special NFTs
    
    constructor(
        address _uglyUnicornsContract,
        address defaultAdmin,
        address governance,
        address manager
    ) 
        ERC721("Ugly Unicorns Governance", "UUGOV") 
        EIP712("UglyUnicornsGovernance", "1") 
    {
        if (defaultAdmin == address(0)) revert DefaultAdminCannotBeZero();
        if (_uglyUnicornsContract == address(0)) revert UglyUnicornsContractCannotBeZero();
        
        uglyUnicornsContract = IERC721(_uglyUnicornsContract);
        
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(GOVERNANCE_ROLE, governance);
        _grantRole(MANAGER_ROLE, manager);
    }

    /// @notice Wrap an Ugly Unicorns NFT to enable governance participation
    /// @param tokenId The token ID to wrap
    function wrapNFT(uint256 tokenId) external {
        if (uglyUnicornsContract.ownerOf(tokenId) != msg.sender) {
            revert NotOwnerOfOriginalNFT();
        }
        if (isWrapped[tokenId]) {
            revert AlreadyWrapped();
        }

        // Transfer the original NFT to this contract
        uglyUnicornsContract.transferFrom(msg.sender, address(this), tokenId);
        
        // Mint governance NFT to the user
        _mint(msg.sender, tokenId);
        
        // Mark as wrapped
        isWrapped[tokenId] = true;
        originalOwner[tokenId] = msg.sender;
        
        emit NFTWrapped(msg.sender, tokenId);
    }

    /// @notice Unwrap an NFT to get back the original Ugly Unicorns NFT
    /// @param tokenId The token ID to unwrap
    function unwrapNFT(uint256 tokenId) external {
        if (ownerOf(tokenId) != msg.sender) {
            revert CallerNotAuthorized();
        }
        if (!isWrapped[tokenId]) {
            revert NotWrapped();
        }

        // Burn the governance NFT
        _burn(tokenId);
        
        // Transfer original NFT back to user
        uglyUnicornsContract.transferFrom(address(this), msg.sender, tokenId);
        
        // Update mappings
        isWrapped[tokenId] = false;
        delete originalOwner[tokenId];
        
        emit NFTUnwrapped(msg.sender, tokenId);
    }

    /// @notice Get voting power for an address
    /// @param account The address to check
    /// @return Total voting power
    function getVotes(address account) public view override returns (uint256) {
        uint256 balance = balanceOf(account);
        if (balance == 0) return 0;
        
        uint256 totalVotingPower = 0;
        
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(account, i);
            uint256 power = customVotingPower[tokenId];
            if (power == 0) {
                power = baseVotingPower;
            }
            totalVotingPower += power;
        }
        
        return totalVotingPower;
    }

    /// @notice Get past voting power for an address at a specific block
    /// @param account The address to check
    /// @param blockNumber The block number to check
    /// @return Total voting power at that block
    function getPastVotes(address account, uint256 blockNumber) public view override returns (uint256) {
        return super.getPastVotes(account, blockNumber);
    }

    /// @notice Set custom voting power for specific NFTs
    /// @param tokenIds Array of token IDs
    /// @param votingPowers Array of voting powers
    function setCustomVotingPower(uint256[] calldata tokenIds, uint256[] calldata votingPowers) 
        external 
        onlyRole(MANAGER_ROLE) 
    {
        require(tokenIds.length == votingPowers.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            customVotingPower[tokenIds[i]] = votingPowers[i];
        }
    }

    /// @notice Set base voting power for all NFTs
    /// @param _baseVotingPower New base voting power
    function setBaseVotingPower(uint256 _baseVotingPower) external onlyRole(MANAGER_ROLE) {
        baseVotingPower = _baseVotingPower;
    }

    /// @notice Emergency function to rescue tokens sent by mistake
    /// @param tokenId Token ID to rescue
    /// @param to Address to send the token to
    function emergencyRescue(uint256 tokenId, address to) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uglyUnicornsContract.transferFrom(address(this), to, tokenId);
    }

    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Votes)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable, ERC721Votes)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}