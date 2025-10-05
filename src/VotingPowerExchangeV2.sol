// SPDX-License-Identifier: BUSL-1.1
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {SignatureChecker} from "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IGovToken} from "./Interfaces.sol";

// Interface for Minchyn wrapper
interface IMinchynGovernanceWrapper {
    function burnByBurner(address account, uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

// Interface for Ugly Unicorns governance wrapper
interface IUglyUnicornsGovernance {
    function getVotes(address account) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);
}

/**
 * @title VotingPowerExchangeV2
 * @dev Enhanced contract that allows users to exchange Minchyn tokens and Ugly Unicorns NFTs for GovToken (voting power token).
 * @custom:security-contact dev@codefox.co.jp
 */
contract VotingPowerExchangeV2 is AccessControl, EIP712 {
    using SignatureChecker for address;

    // Errors
    error VotingPowerExchange__DefaultAdminCannotBeZero();
    error VotingPowerExchange__AddressIsZero();
    error VotingPowerExchange__TokenAddressIsZero();
    error VotingPowerExchange__AmountIsTooSmall();
    error VotingPowerExchange__InvalidNonce();
    error VotingPowerExchange__SignatureExpired();
    error VotingPowerExchange__InvalidSignature(bytes32 digest, bytes signature);
    error VotingPowerExchange__LevelIsLowerThanExisting();
    error VotingPowerExchange__VotingPowerIsHigherThanCap(uint256 currentVotingPower);
    error VotingPowerExchange__NoNFTsToExchange();
    error VotingPowerExchange__InvalidExchangeType();

    // Events
    event VotingPowerReceived(address indexed user, uint256 utilityTokenAmount, uint256 votingPowerAmount);
    event NFTVotingPowerReceived(address indexed user, uint256 nftCount, uint256 votingPowerAmount);
    event VotingPowerCapSet(uint256 votingPowerCap);
    event NFTVotingPowerRateSet(uint256 newRate);

    // EIP-712 domain separator and type hash for the message
    bytes32 private constant _EXCHANGE_TYPEHASH =
        keccak256("Exchange(address sender,uint256 amount,bytes32 nonce,uint256 expiration)");
    
    bytes32 private constant _NFT_EXCHANGE_TYPEHASH =
        keccak256("NFTExchange(address sender,uint256[] tokenIds,bytes32 nonce,uint256 expiration)");

    // Roles for the contract. Default admin holds the highest authority to set the manager and exchanger.
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant EXCHANGER_ROLE = keccak256("EXCHANGER_ROLE");
    
    // PRECISION values for the calculation
    uint256 private constant PRECISION_FIX = 1e9;
    uint256 private constant PRECISION = 1e18;
    uint256 private constant ALLOWED_EXCHANGING_MINIMUM_AMOUNT = 1e18;

    // token instances
    IGovToken private immutable govToken;
    IMinchynGovernanceWrapper private immutable minchynWrapper;
    IUglyUnicornsGovernance private immutable uglyUnicornsGovernance;

    // mapping to store the nonce of the user
    mapping(address => mapping(bytes32 => bool)) private _authorizationStates;
    
    // voting power cap for limiting the voting power
    uint256 private votingPowerCap;
    
    // NFT voting power rate (voting power per NFT)
    uint256 public nftVotingPowerRate = 5e18; // 5 voting power per NFT by default
    
    // Track exchanged NFTs to prevent double exchange
    mapping(uint256 => bool) public exchangedNFTs;

    /// @notice The constructor of the VotingPowerExchangeV2 contract
    /// @param _govToken The address of the GovToken contract
    /// @param _minchynWrapper The address of the Minchyn wrapper contract
    /// @param _uglyUnicornsGovernance The address of the Ugly Unicorns governance contract
    /// @param defaultAdmin The address of the default admin
    /// @param manager The address of the manager
    /// @param exchanger The address of the exchanger
    constructor(
        address _govToken, 
        address _minchynWrapper, 
        address _uglyUnicornsGovernance,
        address defaultAdmin, 
        address manager, 
        address exchanger
    ) EIP712("VotingPowerExchangeV2", "1") {
        if (defaultAdmin == address(0)) revert VotingPowerExchange__DefaultAdminCannotBeZero();
        if (_govToken == address(0) || _minchynWrapper == address(0) || _uglyUnicornsGovernance == address(0)) {
            revert VotingPowerExchange__TokenAddressIsZero();
        }

        govToken = IGovToken(_govToken);
        minchynWrapper = IMinchynGovernanceWrapper(_minchynWrapper);
        uglyUnicornsGovernance = IUglyUnicornsGovernance(_uglyUnicornsGovernance);
        
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MANAGER_ROLE, manager);
        _grantRole(EXCHANGER_ROLE, exchanger);
        _setVotingPowerCap(49 * 1e18);
    }

    ////////////////////////////////////////////
    /////// External & Public functions ////////
    ////////////////////////////////////////////
    
    /**
     * @notice Exchanges Minchyn tokens for voting power token using sender's signature.
     * @param sender The address of the user who wants to exchange tokens.
     * @param amount The amount of Minchyn tokens to exchange.
     * @param nonce The nonce which is used to prevent replay attacks.
     * @param expiration The expiration time of the signature.
     * @param signature The signature of the user to validate the exchange intention.
     */
    function exchangeMinchyn(
        address sender, 
        uint256 amount, 
        bytes32 nonce, 
        uint256 expiration, 
        bytes calldata signature
    ) external onlyRole(EXCHANGER_ROLE) {
        if (sender == address(0)) revert VotingPowerExchange__AddressIsZero();
        if (amount < ALLOWED_EXCHANGING_MINIMUM_AMOUNT) revert VotingPowerExchange__AmountIsTooSmall();
        if (authorizationState(sender, nonce)) revert VotingPowerExchange__InvalidNonce();
        if (block.timestamp > expiration) revert VotingPowerExchange__SignatureExpired();
        
        // Check current voting power
        uint256 currentVotingPower = govToken.balanceOf(sender);
        if (currentVotingPower >= votingPowerCap) {
            revert VotingPowerExchange__VotingPowerIsHigherThanCap(currentVotingPower);
        }

        // Validate signature
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(_EXCHANGE_TYPEHASH, sender, amount, nonce, expiration)));
        if (!sender.isValidSignatureNow(digest, signature)) {
            revert VotingPowerExchange__InvalidSignature(digest, signature);
        }

        // Set nonce as used
        _authorizationStates[sender][nonce] = true;
        
        // Get current burned amount
        uint256 currentBurnedAmount = govToken.burnedAmountOfUtilToken(sender);

        // Calculate voting power to mint
        uint256 incrementedVotingPower = calculateIncrementedVotingPower(amount, currentBurnedAmount);
        uint256 burningTokenAmount = amount;

        // Check voting power cap
        if (currentVotingPower + incrementedVotingPower > votingPowerCap) {
            incrementedVotingPower = votingPowerCap - currentVotingPower;
            burningTokenAmount = calculateIncrementedBurningAmount(incrementedVotingPower, currentVotingPower);
        }

        // Transfer and burn Minchyn tokens
        minchynWrapper.transferFrom(msg.sender, sender, burningTokenAmount);
        minchynWrapper.burnByBurner(sender, burningTokenAmount);

        // Update burned amount
        govToken.setBurnedAmountOfUtilToken(sender, currentBurnedAmount + burningTokenAmount);

        // Mint governance tokens
        govToken.mint(sender, incrementedVotingPower);
        emit VotingPowerReceived(sender, burningTokenAmount, incrementedVotingPower);
    }

    /**
     * @notice Exchanges Ugly Unicorns NFTs for voting power tokens.
     * @param sender The address of the user who wants to exchange NFTs.
     * @param tokenIds Array of NFT token IDs to exchange.
     * @param nonce The nonce which is used to prevent replay attacks.
     * @param expiration The expiration time of the signature.
     * @param signature The signature of the user to validate the exchange intention.
     */
    function exchangeUglyUnicorns(
        address sender,
        uint256[] calldata tokenIds,
        bytes32 nonce,
        uint256 expiration,
        bytes calldata signature
    ) external onlyRole(EXCHANGER_ROLE) {
        if (sender == address(0)) revert VotingPowerExchange__AddressIsZero();
        if (tokenIds.length == 0) revert VotingPowerExchange__NoNFTsToExchange();
        if (authorizationState(sender, nonce)) revert VotingPowerExchange__InvalidNonce();
        if (block.timestamp > expiration) revert VotingPowerExchange__SignatureExpired();

        // Check current voting power
        uint256 currentVotingPower = govToken.balanceOf(sender);
        if (currentVotingPower >= votingPowerCap) {
            revert VotingPowerExchange__VotingPowerIsHigherThanCap(currentVotingPower);
        }

        // Validate signature
        bytes32 digest = _hashTypedDataV4(
            keccak256(abi.encode(_NFT_EXCHANGE_TYPEHASH, sender, keccak256(abi.encodePacked(tokenIds)), nonce, expiration))
        );
        if (!sender.isValidSignatureNow(digest, signature)) {
            revert VotingPowerExchange__InvalidSignature(digest, signature);
        }

        // Set nonce as used
        _authorizationStates[sender][nonce] = true;

        // Verify NFTs haven't been exchanged before and mark them
        uint256 validNFTCount = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (!exchangedNFTs[tokenIds[i]]) {
                exchangedNFTs[tokenIds[i]] = true;
                validNFTCount++;
            }
        }

        if (validNFTCount == 0) revert VotingPowerExchange__NoNFTsToExchange();

        // Calculate voting power based on NFT count
        uint256 nftVotingPower = validNFTCount * nftVotingPowerRate;

        // Check voting power cap
        if (currentVotingPower + nftVotingPower > votingPowerCap) {
            nftVotingPower = votingPowerCap - currentVotingPower;
        }

        // Mint governance tokens
        govToken.mint(sender, nftVotingPower);
        emit NFTVotingPowerReceived(sender, validNFTCount, nftVotingPower);
    }

    /**
     * @notice Set the voting power cap
     * @param _votingPowerCap The new voting power cap
     */
    function setVotingPowerCap(uint256 _votingPowerCap) external onlyRole(MANAGER_ROLE) {
        _setVotingPowerCap(_votingPowerCap);
    }

    /**
     * @notice Set the NFT voting power rate
     * @param _nftVotingPowerRate The new NFT voting power rate
     */
    function setNFTVotingPowerRate(uint256 _nftVotingPowerRate) external onlyRole(MANAGER_ROLE) {
        nftVotingPowerRate = _nftVotingPowerRate;
        emit NFTVotingPowerRateSet(_nftVotingPowerRate);
    }

    ////////////////////////////////////////////
    /////////// Internal functions /////////////
    ////////////////////////////////////////////

    /**
     * @notice Internal function to set the voting power cap
     * @param _votingPowerCap The new voting power cap
     */
    function _setVotingPowerCap(uint256 _votingPowerCap) internal {
        votingPowerCap = _votingPowerCap;
        emit VotingPowerCapSet(_votingPowerCap);
    }

    ////////////////////////////////////////////
    //////////// View functions ////////////////
    ////////////////////////////////////////////

    /**
     * @notice Get the authorization state of a user with a specific nonce
     * @param user The user address
     * @param nonce The nonce
     * @return The authorization state
     */
    function authorizationState(address user, bytes32 nonce) public view returns (bool) {
        return _authorizationStates[user][nonce];
    }

    /**
     * @notice Get the voting power cap
     * @return The voting power cap
     */
    function getVotingPowerCap() external view returns (uint256) {
        return votingPowerCap;
    }

    /**
     * @notice Calculate the incremented voting power based on the amount and current burned amount
     * @param amount The amount of utility token to exchange
     * @param currentBurnedAmount The current burned amount of utility token
     * @return The incremented voting power
     */
    function calculateIncrementedVotingPower(uint256 amount, uint256 currentBurnedAmount)
        public
        pure
        returns (uint256)
    {
        uint256 newLevel = Math.sqrt((currentBurnedAmount + amount) / PRECISION) * PRECISION_FIX;
        uint256 currentLevel = Math.sqrt(currentBurnedAmount / PRECISION) * PRECISION_FIX;
        return newLevel - currentLevel;
    }

    /**
     * @notice Calculate the incremented burning amount based on the incremented voting power and current voting power
     * @param incrementedVotingPower The incremented voting power
     * @param currentVotingPower The current voting power
     * @return The incremented burning amount
     */
    function calculateIncrementedBurningAmount(uint256 incrementedVotingPower, uint256 currentVotingPower)
        public
        pure
        returns (uint256)
    {
        uint256 newLevel = currentVotingPower + incrementedVotingPower;
        uint256 newBurnedAmount = (newLevel / PRECISION_FIX) ** 2 * PRECISION;
        uint256 currentBurnedAmount = (currentVotingPower / PRECISION_FIX) ** 2 * PRECISION;
        return newBurnedAmount - currentBurnedAmount;
    }
}