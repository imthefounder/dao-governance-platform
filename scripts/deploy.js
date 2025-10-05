import hre from "hardhat";

async function main() {
  console.log("🚀 Starting DAO Governance Platform Deployment...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔑 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  // Mock addresses for local testing (replace with real addresses for mainnet)
  const MINCHYN_TOKEN_ADDRESS = "0x91738EE7A9b54eb810198cefF5549ca5982F47B3";
  const UGLY_UNICORNS_NFT_ADDRESS = "0xA548fa1D539cab8D78163CB064F7b22E6eF34b2F";
  
  // For local testing, we'll use mock contracts
  const useRealContracts = false; // Set to true for mainnet deployment

  console.log("\n📋 Deployment Configuration:");
  console.log("- Minchyn Token:", MINCHYN_TOKEN_ADDRESS);
  console.log("- Ugly Unicorns NFT:", UGLY_UNICORNS_NFT_ADDRESS);
  console.log("- Using real contracts:", useRealContracts);

  // 1. Deploy GovToken
  console.log("\n🪙 Deploying GovToken...");
  const GovToken = await hre.ethers.getContractFactory("GovToken");
  const govToken = await GovToken.deploy();
  await govToken.deployed();
  console.log("✅ GovToken deployed to:", govToken.address);

  // 2. Deploy MinchynGovernanceWrapper
  console.log("\n💰 Deploying MinchynGovernanceWrapper...");
  const MinchynGovernanceWrapper = await hre.ethers.getContractFactory("MinchynGovernanceWrapper");
  const minchynWrapper = await MinchynGovernanceWrapper.deploy(MINCHYN_TOKEN_ADDRESS);
  await minchynWrapper.deployed();
  console.log("✅ MinchynGovernanceWrapper deployed to:", minchynWrapper.address);

  // 3. Deploy UglyUnicornsGovernance
  console.log("\n🦄 Deploying UglyUnicornsGovernance...");
  const UglyUnicornsGovernance = await hre.ethers.getContractFactory("UglyUnicornsGovernance");
  const uglyUnicornsGovernance = await UglyUnicornsGovernance.deploy(UGLY_UNICORNS_NFT_ADDRESS);
  await uglyUnicornsGovernance.deployed();
  console.log("✅ UglyUnicornsGovernance deployed to:", uglyUnicornsGovernance.address);

  // 4. Deploy VotingPowerExchangeV2
  console.log("\n🔄 Deploying VotingPowerExchangeV2...");
  const VotingPowerExchangeV2 = await hre.ethers.getContractFactory("VotingPowerExchangeV2");
  const votingPowerExchange = await VotingPowerExchangeV2.deploy(
    govToken.address,
    minchynWrapper.address,
    uglyUnicornsGovernance.address
  );
  await votingPowerExchange.deployed();
  console.log("✅ VotingPowerExchangeV2 deployed to:", votingPowerExchange.address);

  // 5. Grant necessary roles
  console.log("\n🔐 Setting up roles and permissions...");
  
  // Grant MINTER_ROLE to VotingPowerExchange
  const MINTER_ROLE = await govToken.MINTER_ROLE();
  await govToken.grantRole(MINTER_ROLE, votingPowerExchange.address);
  console.log("✅ Granted MINTER_ROLE to VotingPowerExchange");

  // Grant BURNER_ROLE to VotingPowerExchange
  const BURNER_ROLE = await govToken.BURNER_ROLE();
  await govToken.grantRole(BURNER_ROLE, votingPowerExchange.address);
  console.log("✅ Granted BURNER_ROLE to VotingPowerExchange");

  // Grant EXCHANGER_ROLE to VotingPowerExchange on MinchynWrapper
  const EXCHANGER_ROLE = await minchynWrapper.EXCHANGER_ROLE();
  await minchynWrapper.grantRole(EXCHANGER_ROLE, votingPowerExchange.address);
  console.log("✅ Granted EXCHANGER_ROLE to VotingPowerExchange on MinchynWrapper");

  // Grant EXCHANGER_ROLE to VotingPowerExchange on UglyUnicorns
  const EXCHANGER_ROLE_UGLY = await uglyUnicornsGovernance.EXCHANGER_ROLE();
  await uglyUnicornsGovernance.grantRole(EXCHANGER_ROLE_UGLY, votingPowerExchange.address);
  console.log("✅ Granted EXCHANGER_ROLE to VotingPowerExchange on UglyUnicornsGovernance");

  // 6. Test basic functionality
  console.log("\n🧪 Testing basic functionality...");
  
  try {
    const govTokenName = await govToken.name();
    const govTokenSymbol = await govToken.symbol();
    console.log(`✅ GovToken: ${govTokenName} (${govTokenSymbol})`);

    const minchynName = await minchynWrapper.name();
    const minchynSymbol = await minchynWrapper.symbol();
    console.log(`✅ MinchynWrapper: ${minchynName} (${minchynSymbol})`);

    const uglyName = await uglyUnicornsGovernance.name();
    const uglySymbol = await uglyUnicornsGovernance.symbol();
    console.log(`✅ UglyUnicornsGovernance: ${uglyName} (${uglySymbol})`);

    console.log("✅ All contracts deployed and configured successfully!");

  } catch (error) {
    console.log("⚠️ Some basic tests failed:", error.message);
  }

  // 7. Display summary
  console.log("\n📊 Deployment Summary:");
  console.log("========================");
  console.log("🪙 GovToken:", govToken.address);
  console.log("💰 MinchynGovernanceWrapper:", minchynWrapper.address);
  console.log("🦄 UglyUnicornsGovernance:", uglyUnicornsGovernance.address);
  console.log("🔄 VotingPowerExchangeV2:", votingPowerExchange.address);
  console.log("🔑 Deployer:", deployer.address);
  console.log("========================");

  // 8. Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      GovToken: govToken.address,
      MinchynGovernanceWrapper: minchynWrapper.address,
      UglyUnicornsGovernance: uglyUnicornsGovernance.address,
      VotingPowerExchangeV2: votingPowerExchange.address
    },
    externalContracts: {
      MinchynToken: MINCHYN_TOKEN_ADDRESS,
      UglyUnicornsNFT: UGLY_UNICORNS_NFT_ADDRESS
    }
  };

  console.log("\n💾 Deployment complete! Save this information:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("💥 Deployment failed:", error);
    process.exit(1);
  });