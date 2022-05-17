import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { connect } from "./helpers/connect"
import { getContract, getContractWithS } from "./helpers/contractConfig"
import Banner from "./components/Banner"
import ContractData from "./components/ContractData"
import Investor from "./components/Investor"
import ProposalsList from "./components/proposals/ProposalsList"

function App() {
  const [account, setAccount] = useState(undefined)
  const [contract, setContract] = useState(undefined)
  const [contractWithS, setContractWithS] = useState(undefined)

  const [admin, setAdmin] = useState(undefined)
  const [totalShares, setTotalShares] = useState(undefined)
  const [availableFunds, setAvailableFunds] = useState(undefined)
  const [contributionEnd, setContributionEnd] = useState(undefined)
  const [voteDuration, setVoteDuration] = useState(undefined)
  const [quorum, setQuorum] = useState(undefined)

  const [isInvestor, setIsInvestor] = useState(undefined)
  const [investorShareCount, setInvestorShareCount] = useState(undefined)
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    ;(async () => {
      const account = await connect()
      const contract = getContract()
      const contractWithS = getContractWithS()
      setAccount(account)
      setContract(contract)
      setContractWithS(contractWithS)
    })()
  }, [account])

  useEffect(() => {
    ;(async () => {
      if (typeof contract !== "undefined") {
        const admin = await contract.admin()
        const totalShares = await contract.totalShares()
        const availableFunds = await contract.availableFunds()
        const contributionEnd = await contract.contributionEnd()
        const voteDuration = await contract.voteDuration()
        const quorum = await contract.quorum()
        setAdmin(admin)
        setTotalShares(totalShares)
        setAvailableFunds(ethers.utils.formatEther(availableFunds))
        setContributionEnd(contributionEnd)
        setVoteDuration(parseInt(voteDuration))
        setQuorum(quorum)
      }
    })()
  }, [contract])

  useEffect(() => {
    ;(async () => {
      if (
        typeof contract !== "undefined" &&
        typeof contractWithS !== "undefined"
      ) {
        await refreshTotalShares()
        await refreshAvailableFunds()
        await checkIfInvestor()
        await refreshInvestorShareCount()
        await refreshProposals()
      }
    })()
  }, [contract, contractWithS])

  const refreshTotalShares = async () => {
    const totalShares = await contract.totalShares()
    setTotalShares(totalShares)
  }

  const refreshAvailableFunds = async () => {
    const availableFunds = await contract.availableFunds()
    setAvailableFunds(ethers.utils.formatEther(availableFunds))
  }

  const checkIfInvestor = async () => {
    let check = await contract.investors(account)
    setIsInvestor(check)
  }

  const refreshInvestorShareCount = async () => {
    const investorShareCount = await contract.investorToShare(account)
    setInvestorShareCount(ethers.utils.formatEther(investorShareCount))
  }

  const onContribute = async (amount) => {
    let trx = await contractWithS.contribute({
      value: ethers.utils.parseEther(amount),
      gasLimit: 3000000,
    })
    await trx.wait()
    await refreshTotalShares()
    await refreshAvailableFunds()
    await checkIfInvestor()
    await refreshInvestorShareCount()
  }

  const refreshProposals = async () => {
    let proposals = []
    const proposalsCount = await contract.nextPropId()
    for (let i = 0; i < proposalsCount; i++) {
      let proposal = await Promise.all([contract.idToProposal(i)])
      proposals.push(...proposal)
    }
    setProposals(proposals)
  }

  const onCreateProposal = async (proposal) => {
    const name = proposal.name
    const address = proposal.address
    const amount = ethers.utils.parseEther(proposal.amount)
    let trx = await contractWithS.createProposal(name, address, amount, {
      gasLimit: 3000000,
    })
    await trx.wait()
    await refreshProposals()
    await refreshAvailableFunds()
  }

  const onVote = async (id) => {
    let trx = await contractWithS.voteProposal(id, { gasLimit: 3000000 })
    await trx.wait()
    await refreshProposals()
    await refreshInvestorShareCount()
  }

  const onExecute = async (id) => {
    let trx = await contractWithS.excecuteProposal(id, { gasLimit: 3000000 })
    await trx.wait()
    await refreshProposals()
    await refreshAvailableFunds()
  }

  const onRedeemShares = async (amount) => {
    let _amount = ethers.utils.parseEther(amount)
    let trx = await contractWithS.redeemShares(_amount, { gasLimit: 3000000 })
    await trx.wait()
    await refreshInvestorShareCount()
    await refreshTotalShares()
    await refreshAvailableFunds()
    await refreshProposals()
  }

  return (
    <div>
      <Banner account={account} isInvestor={isInvestor} />
      <div className='container'>
        <ContractData
          admin={admin}
          account={account}
          contract={contract}
          totalShares={totalShares}
          availableFunds={availableFunds}
          contributionEnd={contributionEnd}
          voteDuration={voteDuration}
          quorum={quorum}
        />
        <Investor
          contributionEnd={contributionEnd}
          isInvestor={isInvestor}
          investorShareCount={investorShareCount}
          availableFunds={availableFunds}
          onContribute={onContribute}
          onCreateProposal={onCreateProposal}
          onRedeemShares={onRedeemShares}
        />
        <ProposalsList
          admin={admin}
          account={account}
          isInvestor={isInvestor}
          proposals={proposals}
          quorum={quorum}
          totalShares={totalShares}
          onVote={onVote}
          onExecute={onExecute}
        />
      </div>
    </div>
  )
}

export default App
