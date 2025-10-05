// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import {DeployContractsV2, DeploymentResultV2} from "script/DeployContractsV2.s.sol";
import {Test, console} from "forge-std/Test.sol";

import {VotingPowerExchange} from "src/VotingPowerExchange.sol";
import {MessageHashUtils} from "lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";

contract VotingPowerExchangeTestHelper is Test {
    bytes32 public constant _EXCHANGE_TYPEHASH =
        keccak256("Exchange(address sender,uint256 amount,bytes32 nonce,uint256 expiration)");

    function generateSignatureFromPrivateKey(
        uint256 privateKey,
        uint256 amount,
        bytes32 nonce,
        uint256 expiration,
        address exchangeAddr
    ) public view returns (bytes memory, bytes32) {
        address sender = vm.addr(privateKey);
        console.log("sender", sender);
        bytes32 structHash = keccak256(abi.encode(_EXCHANGE_TYPEHASH, sender, amount, nonce, expiration));

        bytes32 domainSeparator = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("VotingPowerExchange")),
                keccak256(bytes("1")),
                block.chainid,
                exchangeAddr
            )
        );

        bytes32 hash = MessageHashUtils.toTypedDataHash(domainSeparator, structHash);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, hash);

        return (abi.encodePacked(r, s, v), hash);
    }

    /**
     * @dev Creates a digest for EIP-712
     * @param sender The address of the sender
     * @param amount The amount of utility token to be exchanged
     * @param nonce The nonce used in the exchange transaction
     * @param expiration The expiration time of the signature
     * @return The digest of the EIP-712
     */
    function createDigest(address sender, uint256 amount, bytes32 nonce, uint256 expiration, address exchangeAddr)
        public
        view
        returns (bytes32)
    {
        bytes32 structHash = keccak256(abi.encode(_EXCHANGE_TYPEHASH, sender, amount, nonce, expiration));
        bytes32 domainSeparator = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("VotingPowerExchange")),
                keccak256(bytes("1")),
                block.chainid,
                exchangeAddr
            )
        );
        return MessageHashUtils.toTypedDataHash(domainSeparator, structHash);
    }
}
