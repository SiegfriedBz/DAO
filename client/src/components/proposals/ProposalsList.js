import Proposal from "./Proposal"

const ProposalsList = ({
  admin,
  account,
  isInvestor,
  proposals,
  quorum,
  totalShares,
  onVote,
  onExecute,
}) => {
  return (
    <div className='d-flex flex-column align-items-center mb-3'>
      <div className='card shadow p-3 mb-5 bg-white rounded w-75'>
        <div className='card-body'>
          <h5 className='card-title fw-bolder'>Proposals</h5>
          <div className='card-text mb-3'>
            <table className='table align-middle'>
              <thead>
                <tr className='text-center'>
                  <th scope='col'>Id</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Ethers</th>
                  <th scope='col'>Votes</th>
                  <th scope='col'>ToQuorum</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {proposals &&
                  proposals.map((proposal) => {
                    const id = parseInt(proposal.propId)
                    return (
                      <Proposal
                        key={id}
                        account={account}
                        isInvestor={isInvestor}
                        proposal={proposal}
                        quorum={quorum}
                        totalShares={totalShares}
                        onVote={onVote}
                        onExecute={onExecute}
                      />
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalsList
