// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Simple interface for the original Ugly Unicorns NFT
interface IUglyUnicorns {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
}

contract UglyUnicornsNFTWrapper {
    string public name = "Wrapped Ugly Unicorns";
    string public symbol = "wUGLY";
    
    // Original Ugly Unicorns contract address
    address public constant UGLY_UNICORNS_ADDRESS = 0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F;
    IUglyUnicorns public uglyUnicornsContract = IUglyUnicorns(UGLY_UNICORNS_ADDRESS);
    
    // NFT data
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => address) public getApproved;
    mapping(address => mapping(address => bool)) public isApprovedForAll;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => bool) public isWrapped;
    mapping(uint256 => uint256) public votingPower;
    
    address public owner;
    address public govTokenAddress;
    uint256 public totalSupply;
    uint256 public defaultVotingPower = 1000;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event NFTWrapped(address indexed owner, uint256 indexed tokenId);
    event NFTUnwrapped(address indexed owner, uint256 indexed tokenId);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function setGovTokenAddress(address _govToken) external onlyOwner {
        govTokenAddress = _govToken;
    }
    
    function wrapNFT(uint256 tokenId) external {
        require(uglyUnicornsContract.ownerOf(tokenId) == msg.sender, "Not owner of original NFT");
        require(!isWrapped[tokenId], "Already wrapped");
        
        // Transfer original NFT to this contract
        uglyUnicornsContract.transferFrom(msg.sender, address(this), tokenId);
        
        // Mint wrapped NFT
        ownerOf[tokenId] = msg.sender;
        balanceOf[msg.sender]++;
        isWrapped[tokenId] = true;
        totalSupply++;
        
        if (votingPower[tokenId] == 0) {
            votingPower[tokenId] = defaultVotingPower;
        }
        
        emit Transfer(address(0), msg.sender, tokenId);
        emit NFTWrapped(msg.sender, tokenId);
    }
    
    function unwrapNFT(uint256 tokenId) external {
        require(ownerOf[tokenId] == msg.sender, "Not owner");
        require(isWrapped[tokenId], "Not wrapped");
        
        ownerOf[tokenId] = address(0);
        balanceOf[msg.sender]--;
        isWrapped[tokenId] = false;
        totalSupply--;
        
        uglyUnicornsContract.transferFrom(address(this), msg.sender, tokenId);
        
        emit Transfer(msg.sender, address(0), tokenId);
        emit NFTUnwrapped(msg.sender, tokenId);
    }
    
    function getVotingPower(address user) external view returns (uint256) {
        return balanceOf[user] * defaultVotingPower;
    }
    
    function setVotingPower(uint256 tokenId, uint256 power) external onlyOwner {
        votingPower[tokenId] = power;
    }
}