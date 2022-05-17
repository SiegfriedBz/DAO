import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { ProgressBar } from "react-bootstrap"
import Action from "../Action"

const Proposal = ({
  account,
  isInvestor,
  proposal,
  quorum,
  totalShares,
  onVote,
  onExecute,
}) => {
  const { propId, name, recipient, amount, votes, executed, killed } = proposal
  const id = parseInt(propId)

  const [distanceToQuorum, setDistanceToQuorum] = useState(0)

  useEffect(() => {
    refreshDistanceToQuorum()
  }, [proposal, quorum, totalShares])

  const refreshDistanceToQuorum = () => {
    if (proposal && quorum && totalShares) {
      setDistanceToQuorum(
        parseFloat((votes / totalShares) * 100) / (parseFloat(quorum) / 100)
      )
    }
  }

  return (
    <tr className='text-center'>
      <th scope='row'>{id}</th>
      <td>{name}</td>
      <td>
        {recipient.slice(0, 4)}...{recipient.slice(38, 42)}
      </td>
      <td>{ethers.utils.formatEther(amount)}</td>
      <td>{ethers.utils.formatEther(votes)}</td>
      <td>
        {
          <div className='progressBar'>
            {distanceToQuorum < 100 ? (
              <ProgressBar now={distanceToQuorum} />
            ) : (
              <ProgressBar variant='success' now={distanceToQuorum} />
            )}
          </div>
        }
      </td>
      <td>
        {!(executed || killed) ? (
          <span className='badge bg-primary'>Active</span>
        ) : (
          <span className='badge bg-secondary'>Inactive</span>
        )}
      </td>
      <td>
        <Action
          account={account}
          isInvestor={isInvestor}
          proposal={proposal}
          quorum={quorum}
          totalShares={totalShares}
          onVote={onVote}
          onExecute={onExecute}
        />
      </td>
    </tr>
  )
}

export default Proposal
