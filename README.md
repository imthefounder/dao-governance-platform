# Smart Contracts for DAO community

This is a repository for the smart contracts of the DAO community. The smart contracts are written in Solidity and developed and tested using the Foundry framework.

## Introduction

DAO community contracts are public goods for community governance. They record the social capital of community participants and can be used to represent membership, manage voting power, and oversee governance within the community. The protocol is designed to publicly and transparently record the achievements of community participants, while also allowing composability with other on-chain protocols. This opens new opportunities for managing and governing communities. When used properly, the protocol can bring significant benefits to both the community as a whole and its individual participants.

This is a repository for the smart contracts of the DAO community governance, which is some basic tools for the community.
There are separated tools for the community governance. It will be explained here based on the smart contracts.

All the contracts are sitting in the `src/` folder. These are the core contracts of the protocol.

This repository consists of the following smart contracts:

- `UglyUnicornsGovernance`
  - The smart contract wrapper for the existing Ugly Unicorns NFT collection at 0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F.
  - Enables Ugly Unicorns NFT holders to participate in DAO governance with voting power.
  - Provides wrapping/unwrapping functionality to preserve original NFT ownership.
- `MinchynGovernanceWrapper`
  - The smart contract wrapper for the existing Minchyn token (MCHN) at 0x91738EE7A9b54eb810198cefF5549ca5982F47B3.
  - Enables Minchyn token holders to participate in DAO governance by wrapping their tokens.
  - Provides utility token functionality for exchange with governance tokens.
  - Enables Ugly Unicorns NFT holders to participate in DAO governance with voting power.
  - Provides wrapping/unwrapping functionality to preserve original NFT ownership.
- `ERC20UpgradeableTokenV1`
  - The legacy smart contract for ERC20 tokens (maintained for backward compatibility).
  - Replaced by MinchynGovernanceWrapper for new implementations.
  - The contract is based on the ERC20Upgradeable contract of the OpenZeppelin.
- `GovToken`
  - The smart contract functioning as the governance token of the community (Ugly Unicorns DAO Token - UUDT).
  - The token is used to represent the voting power of the holder which is not transferable.
  - The contract is based on the ERC20Votes contract of the OpenZeppelin.
- `VotingPowerExchangeV2`
  - The enhanced smart contract for voting power exchange supporting both Minchyn tokens and Ugly Unicorns NFTs.
  - Allows users to exchange Minchyn (MCHN) tokens for governance tokens with quadratic voting power scaling.
  - Enables Ugly Unicorns NFT holders to gain voting power by participating in governance.
  - Replaces the original VotingPowerExchange contract with enhanced multi-token support.
- `DaoGovernor`
  - The smart contract for the DAO governance of the community.
  - The contract is used to manage the proposal of the community in a more decentralized manner.
  - The contract is based on the Governor contract of the OpenZeppelin.
- `Timelock`
  - The smart contract for the timelock of the community.
  - This contract will become the owner of the DaoGovernor contract.

## Roles

The system is managed by different roles. The roles are managed by the default admin role.

- DEFAULT_ADMIN_ROLE: The default admin role is the owner of the contract.
  - This is the highest authority role in the contract.
  - Responsibilities: Has the power to manage all other roles.
  - Functions: Can grant and revoke all other roles.
- MANAGER_ROLE:
  - Responsibilities: Can manage the contract and call some special functions.
  - Functions: `setVotingPowerCap()`
- EXCHANGER_ROLE: Exchanger role is the role that can exchange the governance token for the utility token. This role holds the utility token on behalf of the user on the web2 side.
  - Responsibilities: Can exchange the governance token for the utility token.
  - Functions: `exchange()`
- MINTER_ROLE: The minter role is the role that can mint new tokens.
  - Responsibilities: Can mint new tokens for the ambassador NFT, the utility token and the governance token.
  - Functions: `mint()`, `mintBatch()`
- BURNER_ROLE: The burner role is the role that can burn the tokens for the ambassador NFT, the utility token and the governance token.
  - Responsibilities: Can burn the tokens.
  - Functions: `burn()`, `burnBatch()`,`burnByBurner()`
- URI_SETTER_ROLE: The URI setter role is the role that can set the URI of the token.
  - Responsibilities: Can set the URI of the token.
  - Functions: `setURI()`
- UPGRADER_ROLE: The upgrader role is the role that can upgrade the contract.
  - Responsibilities: Can upgrade the contract.
  - Functions: `upgradeToAndCall()`

## Smart Contracts

### `UglyUnicornsGovernance.sol`

This is the smart contract wrapper for the existing Ugly Unicorns NFT collection that enables governance participation and serves as the primary NFT system for the DAO.

#### Contract Address and Integration

- **Original Ugly Unicorns NFT**: `0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F`
- **Collection Name**: Ugly Unicorns
- **Max Supply**: 1,013 NFTs
- **Governance Token Symbol**: UUGOV

#### Use cases and functions explanation

The wrapper allows Ugly Unicorns NFT holders to participate in DAO governance by:

1. **Wrapping original NFTs** to receive governance-enabled NFTs
2. **Maintaining original ownership** while enabling voting capabilities
3. **Configurable voting power** per NFT (default: 1 vote = 1e18 voting power)
4. **Special NFT bonuses** through custom voting power settings
5. **Unwrapping functionality** to retrieve original NFTs

Key features:
- **Non-custodial wrapping**: Original NFTs are held securely in the contract
- **Flexible voting power**: Base voting power + custom bonuses for special NFTs
- **ERC721Votes compliance**: Full integration with OpenZeppelin governance standards
- **Emergency rescue functions**: Admin controls for safety
- **Enumerable tracking**: Easy querying of wrapped NFT holdings

The contract integrates with `VotingPowerExchangeV2` to enable NFT holders to exchange their voting power for governance tokens.

### `MinchynGovernanceWrapper.sol`

This is the smart contract wrapper for the existing Minchyn token (MCHN) that enables integration with the DAO governance system.

#### Contract Address and Integration

- **Original Minchyn Token**: `0x91738EE7A9b54eb810198cefF5549ca5982F47B3`
- **Token Symbol**: MCHN
- **Decimals**: 18
- **Wrapper Token Symbol**: wMCHN

#### Use cases and functions explanation

The wrapper allows Minchyn token holders to participate in DAO governance by:

1. **Depositing Minchyn tokens** to receive wrapped utility tokens (wMCHN)
2. **Using wrapped tokens** for voting power exchange through the governance system
3. **Withdrawing original Minchyn tokens** by burning wrapped tokens
4. **Exchange rate management** for flexible token economics

Key features:
- **1:1 default exchange rate** between MCHN and wMCHN (configurable)
- **Minimum deposit/withdrawal amounts** to prevent spam transactions
- **Role-based access control** for governance integration
- **Emergency withdrawal functionality** for admin safety

The contract integrates with `VotingPowerExchangeV2` to enable Minchyn holders to gain voting power in the DAO through quadratic scaling mechanisms.

### `UglyUnicornsGovernance.sol`

This is the smart contract wrapper for the existing Ugly Unicorns NFT collection that enables governance participation.

#### Contract Address and Integration

- **Original Ugly Unicorns NFT**: `0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F`
- **Collection Name**: Ugly Unicorns
- **Max Supply**: 1,013 NFTs
- **Governance Token Symbol**: UUGOV

#### Use cases and functions explanation

The wrapper allows Ugly Unicorns NFT holders to participate in DAO governance by:

1. **Wrapping original NFTs** to receive governance-enabled NFTs
2. **Maintaining original ownership** while enabling voting capabilities
3. **Configurable voting power** per NFT (default: 1 vote = 1e18 voting power)
4. **Special NFT bonuses** through custom voting power settings
5. **Unwrapping functionality** to retrieve original NFTs

Key features:
- **Non-custodial wrapping**: Original NFTs are held securely in the contract
- **Flexible voting power**: Base voting power + custom bonuses for special NFTs
- **ERC721Votes compliance**: Full integration with OpenZeppelin governance standards
- **Emergency rescue functions**: Admin controls for safety
- **Enumerable tracking**: Easy querying of wrapped NFT holdings

The contract integrates with `VotingPowerExchangeV2` to enable NFT holders to exchange their voting power for governance tokens.

### `ERC20UpgradeableTokenV1.sol` (Legacy)

This is the legacy smart contract for ERC20 tokens, maintained for backward compatibility but replaced by MinchynGovernanceWrapper for new implementations.

This is the smart contract for the ERC20 token that is used to represent the utility token of the community. This utility token is transferable.

#### Use cases and functions explanation

This token is used as the utility token for the community, which can be earned by doing missions or other activities for the community. The users can use utility token to exchange the governance token.

The default admin role has the right to set the minter and the burner role. The minter role is the role that can mint new tokens. The burner role is the role that can burn the tokens from the specified account.

The contract itself is pausable. The pauser role is the role that can pause and unpause the contract. When the contract is paused, the minting and transferring of the token are disabled.

#### Notes

- The contract is upgradable, pausable, and ERC20Permit compliant.

### `GovToken.sol`

This is the smart contract for the governance token of the community (Ugly Unicorns DAO Token - UUDT). The contract is based on the ERC20Votes contract of the OpenZeppelin and records the amount of utility tokens that holders have burned for voting power.

Only the voting power exchange contract has the right to update the amount of utility tokens that holders have burned.

#### Use cases and functions explanation

The token represents voting power in the Ugly Unicorns DAO. Key characteristics:
- **Non-transferable**: Prevents vote buying and ensures merit-based governance
- **Level-based system**: Token balance represents user level and voting power
- **Achievement tracking**: Records burned utility tokens as permanent achievement markers

Token mechanics:
- Holding 1 UUDT token = Level 2 governance participant
- Holding 0 UUDT tokens = Level 1 governance participant  
- Quadratic scaling rewards long-term community participation

The token integrates with both Minchyn token holders and Ugly Unicorns NFT holders through the enhanced exchange system.

#### Integration with Minchyn and Ugly Unicorns

The governance token can be earned through:
1. **Minchyn Token Exchange**: Burn wMCHN (wrapped Minchyn) to earn UUDT with quadratic scaling
2. **Ugly Unicorns NFT Participation**: Exchange NFT voting power for UUDT governance tokens
3. **Community Activities**: Traditional utility token burning (legacy support)

#### Governance Phases

- **Phase 1**: Off-chain governance using UUDT token balances with Minchyn and NFT integration
- **Phase 2**: Full on-chain governance with multi-token voting power aggregation

<div style="text-align: center;">
  <img src="./images/phaseOneImage.png" alt="Phase 1" width="80%"/>
</div>

<div style="text-align: center;">
  <img src="./images/phaseTwoImage.png" alt="Phase 2" width="80%"/>
</div>

### `VotingPowerExchangeV2.sol`

This enhanced contract enables users to exchange both Minchyn tokens and Ugly Unicorns NFTs for governance tokens (UUDT). It replaces the original VotingPowerExchange with multi-token support and improved functionality.

#### Multi-Token Exchange System

The contract supports three exchange methods:

1. **Minchyn Token Exchange** (`exchangeMinchyn`)
   - Burn wrapped Minchyn tokens (wMCHN) for governance tokens
   - Quadratic scaling: `newLevel = √(burnedAmount)` 
   - Signature-based validation for security
   - Voting power cap enforcement

2. **Ugly Unicorns NFT Exchange** (`exchangeUglyUnicorns`)
   - Exchange NFT voting power for governance tokens
   - Configurable voting power per NFT (default: 5 UUDT per NFT)
   - Anti-double-spending protection
   - Batch NFT processing support

3. **Legacy Token Support**
   - Maintains backward compatibility with existing utility tokens
   - Gradual migration path to new system

#### Key Features

- **EIP-712 signature validation** for secure off-chain to on-chain transitions
- **Voting power caps** to prevent governance concentration
- **Role-based access control** with EXCHANGER_ROLE for trusted operators
- **Emergency controls** and admin functions for safety
- **Gas-optimized calculations** for cost-effective exchanges

#### Use Cases

The contract enables:
- Minchyn holders to gain DAO voting power proportional to token commitment
- Ugly Unicorns NFT collectors to participate in governance decisions  
- Flexible voting power economics through configurable exchange rates
- Secure bridging between different token ecosystems and DAO governance
Exchanger role is the role that supposed to be managed by the protocol owner.

The function first checks the validity of the input which includes the sender's signature. The signature is generated off-chain and it can only be generated by the sender himself.

This makes sure that the sender himself has the intention to exchange such amount of token. In this way, we want to prevent the case that the exchanger role is abused.

Furthermore, the function checks the nonce and the expiration of the signature to make sure that the signature is fresh and valid.

Then it calculates the amount of the governance token that the holder deserve to get.

The calculation is based on the mathematical formula in the _References_ section.

The contract sets a cap for the amount of the governance token that the holder can get.

If someone is below the cap and has the utility token to exchange more than the cap, the function will only exchange the amount of the token that the cap allows.

If someone has already reached the cap, the function will not allow the exchange.

No one is allowed to get more voting power than the cap.

After the calculation, the function will mint the governance token to the holder and burn the utility token from the holder.

The function also updates the amount of the utility token that the holder has burned in the GovToken contract.

#### Notes

- The contract is created from scratch.
- There are some variables which are used to for the precision of the calculation.
- `SafeERC20` is not used because the token contract we are using is known to be safe.

### `DaoGovernor.sol`

This is the smart contract for the DAO governance of the community. The contract is based on the Governor contract of OpenZeppelin.

This contract will be used in the Phase 2 of the community governance.

#### Use cases and functions explanation

- Basic governor functionality (proposal creation, voting, execution)
- Configurable governance settings (voting delay, voting period, proposal threshold)
- Integration with an ERC20Votes token for voting power
- Quorum requirements based on a fraction of total supply
- Timelock integration for delayed execution

Key features and parameters:

- Voting delay: 1 day (time between proposal creation and voting start)
  - can be changed later
- Voting period: 1 week (duration of the voting phase)
  - can be changed later
- Proposal threshold: 1e18 tokens (minimum tokens required to create a proposal)
  - can be changed later
- Quorum: 1% of total token supply (minimum participation for a valid vote)

#### Notes

- The contract is designed to work with a specific ERC20Votes token (likely the GovToken mentioned earlier) and a TimelockController.
- Some parameters (voting delay, voting period, proposal threshold, quorum) are hardcoded in the constructor for the set up when the contract is deployed.
- The contract uses OpenZeppelin's latest contracts (v5.0.0), ensuring up-to-date security features and best practices.
- This contract is supposed to be used when the community governance is ready to be fully decentralized in the phase 2 of the community governance.

### `Timelock.sol`

The `Timelock.sol` contract is a time-lock controller based on OpenZeppelin's `TimelockController`.

This contract will be used in the Phase 2 of the community governance.

#### Use cases and functions explanation

Its main purposes and functionalities include:

1. Delayed Execution: Provides a mandatory waiting period for passed proposals, enhancing governance security.
2. Access Control: Manages which addresses can propose, execute, or cancel operations. If address(0) is set as the proposer or executor, then anyone can propose or execute.
3. Transparency: All pending operations are publicly viewable, giving community members time to review and react.

When the proposal is passed in the DaoGovernor, it will be queued in the timelock. After a predetermined delay, the actual execution is done by the timelock.

#### Notes

- The contract's admin role is set in the beginning and it is recommended to be revoked later.
- We suppose the executor role can be set as address(0) in the beginning which means anyone can execute. And the proposer role is set as the governor contract in the beginning. It means the governor contract only has the right to propose.
- Why we need to grant the timelock the minter role to mint gov token in the test case:
  - When the proposal is passed, the queue operation will be called and the actual called function of timelock is `scheduledBatch()`. After that, the DaoGovernor's `execute()` function can be called by anyone to execute the proposal. And this function will call the timelock's `executeBatch()` function to execute the proposal. The real executor is the timelock.

#### Governance flow

As the code is written in the test case of using the governance to mint some gov token to user A, the flow of the governance is as follows:

Preparation:

- User A has some voting power.

1. Prepare the values, targets, calldatas, and description of the proposal.
2. After a while, User A creates the proposal: `daoGovernor.propose()`.
3. Some users cast votes for the proposal: `daoGovernor.castVote()`.
4. The proposal is queued in the timelock: `daoGovernor.queue()`.
5. After the delay, anyone can call this function: `daoGovernor.execute()`.
6. The token is minted to User A.

## About auditing

### Scope

- src/
  - UglyUnicornsGovernance.sol
  - MinchynGovernanceWrapper.sol
  - ERC20UpgradeableTokenV1.sol
  - GovToken.sol
  - VotingPowerExchangeV2.sol
  - DaoGovernor.sol
  - Timelock.sol

### Out of Scope

Any file except for the files in the above Scope.

### Known issues

- Two step ownership transfer process is a known issue. We accept the risk of it.
- The precision loss in the calculation of the voting power and the burned token is existing but the precision loss will not be a problem because the value loss caused by it is very small, e.g. 1e9 token. It is ignorable.

### Some notes

- Because we are using a mathematical formula(mentioned in the _Reference_ section) which including square root calculation, some precision loss happens in the calculation. e.g. if we exchange 1e9 utility token for the governance token theoretically, what we get is zero token. And a user can spam the requests to make the system cost gas fee for no reason. In light of this, we made the value of the utility token to be 1e18 at least if someone wants to call the `exchange` function.
- Maybe the tests, also fuzz tests, are not able to cover all the edge cases. if you find any issues, please let us know.

## Tests

The tests are written in the `test/` directory. And it consists of the following tests:

- unit tests: `test/unit/`
- integration tests: `test/integration/`
- fuzz tests: `test/fuzz/`

More information about the tests is written in the `test/readme.md`. Please refer to it for more details about the tests.

The test coverage is 100% for the main contracts.

## How to Start

1. Clone the repository

```shell
git clone https://github.com/codefox-inc/dao-community-contracts.git
```

2. Update the foundry dependencies by running

```shell
foundryup
```

3. Install the dependencies by running

```shell
make install
```

4. Compile the contracts by running

```shell
forge compile
```

5. Run the test by running

```shell
make test
```

6. Run the coverage by running

```shell
make coverage
```

7. Deploy the contracts on the base sepolia network by running

```shell
make deploy ARGS="--network basesepolia"
```

```shell
make deploy ARGS="--network basemainnet"
```

1. Deploy the nft contract on the base sepolia network by running

```shell
make deploy-nft ARGS="--network basesepolia"
```

## References

### Mathematical Formula and tables

These are the values we used in the exchange function and tests for voting power <-> burned token calculation.

```
x = (2 \* sqrt(306.25 + 30y) - 5) / 30 - 1
y = (15*x^2+35*x)/2

x: mintedToken
y: burnedToken
```

| Minted Token (lvl) | Level | Burned Token |
| ------------------ | ----- | ------------ |
| 0                  | 1     | 0            |
| 1                  | 2     | 25           |
| 2                  | 3     | 65           |
| 3                  | 4     | 120          |
| 4                  | 5     | 190          |
| 5                  | 6     | 275          |
| 6                  | 7     | 375          |
| 7                  | 8     | 490          |
| 8                  | 9     | 620          |
| 9                  | 10    | 765          |
| 10                 | 11    | 925          |
| 11                 | 12    | 1100         |
| 12                 | 13    | 1290         |
| 13                 | 14    | 1495         |
| 14                 | 15    | 1715         |
| 15                 | 16    | 1950         |
| 16                 | 17    | 2200         |
| 17                 | 18    | 2465         |
| 18                 | 19    | 2745         |
| 19                 | 20    | 3040         |
| 20                 | 21    | 3350         |
| 21                 | 22    | 3675         |
| 22                 | 23    | 4015         |
| 23                 | 24    | 4370         |
| 24                 | 25    | 4740         |
| 25                 | 26    | 5125         |
| 26                 | 27    | 5525         |
| 27                 | 28    | 5940         |
| 28                 | 29    | 6370         |
| 29                 | 30    | 6815         |
| 30                 | 31    | 7275         |
| 31                 | 32    | 7750         |
| 32                 | 33    | 8240         |
| 33                 | 34    | 8745         |
| 34                 | 35    | 9265         |
| 35                 | 36    | 9800         |
| 36                 | 37    | 10350        |
| 37                 | 38    | 10915        |
| 38                 | 39    | 11495        |
| 39                 | 40    | 12090        |
| 40                 | 41    | 12700        |
| 41                 | 42    | 13325        |
| 42                 | 43    | 13965        |
| 43                 | 44    | 14620        |
| 44                 | 45    | 15290        |
| 45                 | 46    | 15975        |
| 46                 | 47    | 16675        |
| 47                 | 48    | 17390        |
| 48                 | 49    | 18120        |
| 49                 | 50    | 18865        |
| 50                 | 51    | 19625        |
| 51                 | 52    | 20400        |
| 52                 | 53    | 21190        |
| 53                 | 54    | 21995        |
| 54                 | 55    | 22815        |
| 55                 | 56    | 23650        |
| 56                 | 57    | 24500        |
| 57                 | 58    | 25365        |
| 58                 | 59    | 26245        |
| 59                 | 60    | 27140        |
| 60                 | 61    | 28050        |
| 61                 | 62    | 28975        |
| 62                 | 63    | 29915        |
| 63                 | 64    | 30870        |
| 64                 | 65    | 31840        |
| 65                 | 66    | 32825        |
| 66                 | 67    | 33825        |
| 67                 | 68    | 34840        |
| 68                 | 69    | 35870        |
| 69                 | 70    | 36915        |
| 70                 | 71    | 37975        |
| 71                 | 72    | 39050        |
| 72                 | 73    | 40140        |
| 73                 | 74    | 41245        |
| 74                 | 75    | 42365        |
| 75                 | 76    | 43500        |
| 76                 | 77    | 44650        |
| 77                 | 78    | 45815        |
| 78                 | 79    | 46995        |
| 79                 | 80    | 48190        |
| 80                 | 81    | 49400        |
| 81                 | 82    | 50625        |
| 82                 | 83    | 51865        |
| 83                 | 84    | 53120        |
| 84                 | 85    | 54390        |
| 85                 | 86    | 55675        |
| 86                 | 87    | 56975        |
| 87                 | 88    | 58290        |
| 88                 | 89    | 59620        |
| 89                 | 90    | 60965        |
| 90                 | 91    | 62325        |
| 91                 | 92    | 63700        |
| 92                 | 93    | 65090        |
| 93                 | 94    | 66495        |
| 94                 | 95    | 67915        |
| 95                 | 96    | 69350        |
| 96                 | 97    | 70800        |
| 97                 | 98    | 72265        |
| 98                 | 99    | 73745        |
| 99                 | 100   | 75240        |
| 100                | 101   | 76750        |
| 101                | 102   | 78275        |
| 102                | 103   | 79815        |
| 103                | 104   | 81370        |
| 104                | 105   | 82940        |
| 105                | 106   | 84525        |
| 106                | 107   | 86125        |
| 107                | 108   | 87740        |
| 108                | 109   | 89370        |
| 109                | 110   | 91015        |
| 110                | 111   | 92675        |

....

### Documents

- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin](https://docs.openzeppelin.com/)

## Some notes for Dev

1. All contracts must be deployed. After that we can connect it from the web2 side.
   1. What Phase 1 looks like is as the image below.
2. The main function which needs to be called by relayer on behalf of the user is the `exchange()` function.
   1. There is an exchanger role who is responsible for calling the `exchange()` function. He holds the utility token and the exchanger role in the votingPowerExchange contract. The exchanger holds the utility token on behalf of the user, so the exchanger will call the `exchange()` function using the signature of the user and send the token to the user to be used to mint the gov token in one transaction.
   2. In order to call it, the user needs to generate his own signature by signing with his private keys.
   3. The trusted relayer will then call the function with the signed message. Gas fee will be paid by the relayer instead of the user.
3. Some of the data is stored in the contract in nature. But the dev can decide if they want to store the data also in DB or not.
4. Some accounts with special roles are initialized in the contract in the beginning. Needless to say, the accounts with special roles are supposed to be handled very carefully.

<div style="text-align: center;">
  <img src="./images/phaseOneImage.png" alt="フェーズ1" width="80%"/>
</div>

### Some more notes for the deployment

- When setting up the system, we need to:

  - Deploy the contracts.
  - Set up the defender.
  - Mint enough token for defender. The default minting amount is 0 after the deployment.
  - Make the defender approve the amount needed for the contracts to use.

- When doing the deployment, we need to set the name and symbol of the utility token.
- The name and symbol of the gov token is fixed.
- The default admin of the contracts is the deployer himself.
