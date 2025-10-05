// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleGovToken {
    string public name = "Ugly Unicorns DAO Token";
    string public symbol = "UGLYDO";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public minters;
    
    address public owner;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyMinter() {
        require(minters[msg.sender] || msg.sender == owner, "Not minter");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        minters[msg.sender] = true;
    }
    
    function mint(address to, uint256 amount) public onlyMinter {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function burn(address from, uint256 amount) public onlyMinter {
        require(balanceOf[from] >= amount, "Insufficient balance");
        totalSupply -= amount;
        balanceOf[from] -= amount;
        emit Transfer(from, address(0), amount);
    }
    
    function addMinter(address minter) public onlyOwner {
        minters[minter] = true;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
}