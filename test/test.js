const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Voting", function () {
  it("Should ", async function () {
    const Voting = await hre.ethers.getContractFactory("Voting")
    const contract = await Voting.deploy()
    await contract.deployed()
  })
})
