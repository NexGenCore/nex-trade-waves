const hre = require("hardhat")

async function main() {
  console.log("Deploying Nex Trade Wave contracts...")

  // Deploy NexTradeToken
  const NexTradeToken = await hre.ethers.getContractFactory("NexTradeToken")
  const token = await NexTradeToken.deploy()
  await token.deployed()
  console.log("NexTradeToken deployed to:", token.address)

  // Deploy NexTradingEngine
  const NexTradingEngine = await hre.ethers.getContractFactory("NexTradingEngine")
  const feeCollector = process.env.FEE_COLLECTOR_ADDRESS || (await hre.ethers.getSigner()).address
  const tradingEngine = await NexTradingEngine.deploy(feeCollector)
  await tradingEngine.deployed()
  console.log("NexTradingEngine deployed to:", tradingEngine.address)

  // Deploy NexDAOGovernance
  const NexDAOGovernance = await hre.ethers.getContractFactory("NexDAOGovernance")
  const dao = await NexDAOGovernance.deploy(token.address)
  await dao.deployed()
  console.log("NexDAOGovernance deployed to:", dao.address)

  // Deploy NexStakingRewards
  const NexStakingRewards = await hre.ethers.getContractFactory("NexStakingRewards")
  const staking = await NexStakingRewards.deploy(token.address, token.address)
  await staking.deployed()
  console.log("NexStakingRewards deployed to:", staking.address)

  // Deploy NexLearningSimulation
  const NexLearningSimulation = await hre.ethers.getContractFactory("NexLearningSimulation")
  const learning = await NexLearningSimulation.deploy(token.address)
  await learning.deployed()
  console.log("NexLearningSimulation deployed to:", learning.address)

  // Deploy NexMultiSigWallet
  const NexMultiSigWallet = await hre.ethers.getContractFactory("NexMultiSigWallet")
  const signers = await hre.ethers.getSigners()
  const owners = [signers[0].address, signers[1].address, signers[2].address]
  const multiSig = await NexMultiSigWallet.deploy(owners, 2)
  await multiSig.deployed()
  console.log("NexMultiSigWallet deployed to:", multiSig.address)

  // Deploy NexAPIKeyManager
  const NexAPIKeyManager = await hre.ethers.getContractFactory("NexAPIKeyManager")
  const apiKeyManager = await NexAPIKeyManager.deploy()
  await apiKeyManager.deployed()
  console.log("NexAPIKeyManager deployed to:", apiKeyManager.address)

  console.log("\nAll contracts deployed successfully!")
  console.log({
    token: token.address,
    tradingEngine: tradingEngine.address,
    dao: dao.address,
    staking: staking.address,
    learning: learning.address,
    multiSig: multiSig.address,
    apiKeyManager: apiKeyManager.address,
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
