// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

// These are the interfaces which got used in the VotingPowerExchange contracts
interface IERC20UpgradeableTokenV1 {
    function mint(address account, uint256 amount) external;
    function burnByBurner(address account, uint256 amount) external;
    function approve(address spender, uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external;
}

interface IGovToken {
    function mint(address account, uint256 amount) external;
    function burnByBurner(address account, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
    function burnedAmountOfUtilToken(address account) external view returns (uint256);
    function setBurnedAmountOfUtilToken(address account, uint256 amount) external;
}

// Interface for Minchyn Governance Wrapper - wraps the existing Minchyn token
interface IMinchynGovernanceWrapper {
    function deposit(uint256 amount) external;
    function withdraw(uint256 wrappedAmount) external;
    function burnByBurner(address account, uint256 amount) external;
    function mint(address account, uint256 amount) external;
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function getMinchynBalance() external view returns (uint256);
    function calculateWrappedAmount(uint256 minchynAmount) external view returns (uint256);
    function calculateMinchynAmount(uint256 wrappedAmount) external view returns (uint256);
}

// Interface for Ugly Unicorns Governance - wraps the existing Ugly Unicorns NFT
interface IUglyUnicornsGovernance {
    function wrapNFT(uint256 tokenId) external;
    function unwrapNFT(uint256 tokenId) external;
    function getVotes(address account) external view returns (uint256);
    function getPastVotes(address account, uint256 blockNumber) external view returns (uint256);
    function setCustomVotingPower(uint256[] calldata tokenIds, uint256[] calldata votingPowers) external;
    function setBaseVotingPower(uint256 _baseVotingPower) external;
    function balanceOf(address account) external view returns (uint256);
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);
    function isWrapped(uint256 tokenId) external view returns (bool);
    function originalOwner(uint256 tokenId) external view returns (address);
}
