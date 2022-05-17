const hre = require("hardhat")

async function main() {
  const DAO = await hre.ethers.getContractFactory("DAO")
  const contract = await DAO.deploy(
    7200000, // uint256 _contributionTime
    3600, // uint256 _voteDuration
    25 // uint256 _quorum
  )

  await contract.deployed()

  console.log("DAO deployed to:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
