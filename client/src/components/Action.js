import React, { useState, useEffect } from "react"
import { getContract } from "../helpers/contractConfig"

/////// mapping(address => mapping(uint256 => bool)) public investorToProposalVoted;

const Action = ({
  account,
  isInvestor,
  proposal,
  quorum,
  totalShares,
  onVote,
  onExecute,
}) => {
  const { propId, votes, end, executed } = proposal
  const id = parseInt(propId)

  const [voteDurationEnded, setVoteDurationEnded] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [quorumReached, setQuorumReached] = useState(false)
  const [isExecuted, setIsExecuted] = useState(false)

  useEffect(() => {
    checkIfVoteDurationEnded()
    checkIfHasVoted()
    checkIfQuorumReached()
    checkIfIsExecuted()
  })

  const checkIfVoteDurationEnded = () => {
    const voteDurationEnded = new Date(parseInt(end) * 1000) < new Date()
    setVoteDurationEnded(voteDurationEnded)
  }
  const checkIfHasVoted = async () => {
    const contract = getContract()
    const hasVoted = await contract.investorToProposalVoted(account, id)
    setHasVoted(hasVoted)
  }
  const checkIfQuorumReached = () => {
    const quorumReached =
      parseFloat((votes / totalShares) * 100) / (parseFloat(quorum) / 100) >= 25
    setQuorumReached(quorumReached)
  }
  const checkIfIsExecuted = () => {
    setIsExecuted(executed)
  }

  const btnText = () => {
    return !isInvestor
      ? "Investors Only"
      : voteDurationEnded && quorumReached && isExecuted
      ? "Executed"
      : voteDurationEnded && quorumReached && !isExecuted
      ? "Execute"
      : !voteDurationEnded && hasVoted
      ? "Already Voted"
      : !voteDurationEnded && !hasVoted
      ? "Vote"
      : "Quorum not reached, Proposal abandonned"
  }

  const btnClick = (id) => {
    return !isInvestor
      ? ""
      : voteDurationEnded && quorumReached && isExecuted
      ? ""
      : voteDurationEnded && quorumReached && !isExecuted
      ? onExecute(id)
      : !voteDurationEnded && hasVoted
      ? ""
      : !voteDurationEnded && !hasVoted
      ? onVote(id)
      : ""
  }

  const btnClass = () => {
    return !isInvestor
      ? "btn btn-warning btn-sm"
      : voteDurationEnded && quorumReached && isExecuted
      ? "btn btn-success btn-sm"
      : voteDurationEnded && quorumReached && !isExecuted
      ? "btn btn-primary btn-sm"
      : !voteDurationEnded && hasVoted
      ? "btn btn-warning btn-sm"
      : !voteDurationEnded && !hasVoted
      ? "btn btn-primary btn-sm"
      : "btn btn-warning btn-sm"
  }

  console.log(!isInvestor)
  console.log(!voteDurationEnded && !hasVoted)
  console.log(!voteDurationEnded && hasVoted)
  console.log(voteDurationEnded && quorumReached && !isExecuted)
  console.log(voteDurationEnded && quorumReached && isExecuted)

  // Vote
  // require(investorToProposalVoted[msg.sender][_propId] ==
  //   false, "Investor can vote only once per proposal")
  // require(proposal.end >= block.timestamp, "Vote period must be opened")

  // Execute
  // require((proposal.votes / totalShares) * 100 >= quorum,
  //   "Quorum must be reached")
  // require(proposal.end < block.timestamp, "Vote period must be closed");
  // require(proposal.executed == false, "Proposal must be active");

  return (
    <button
      onClick={() => {
        btnClick(id)
      }}
      className={btnClass()}
    >
      {btnText()}
    </button>
  )
}

export default Action
