import { ethers } from "ethers"
import contractArtifact from "../artifacts/contracts/DAO.sol/DAO.json"
const contractAddress = "0x0037DB926C211FBBad561DDcADf6B0dFD4060d94"
const contractABI = contractArtifact.abi

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(contractAddress, contractABI, provider)
  return contract
}
export const getContractWithS = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractWithS = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  return contractWithS
}
