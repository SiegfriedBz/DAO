import { ethers } from "ethers"
import { spinner } from "../helpers/loadingSpinner"

const ContractData = ({
  admin,
  contract,
  totalShares,
  availableFunds,
  contributionEnd,
  voteDuration,
  quorum,
}) => {
  //** 1 ETH => 1000 Shares

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <div className='card shadow p-3 mb-5 bg-white rounded w-75'>
        <div className='card-body'>
          <h5 className='card-title fw-bolder'>Contract Info</h5>
          <h6 className='card-subtitle mt-3 text-muted'>Admin</h6>
          <div className='card-text mb-3'>
            {typeof admin == "undefined"
              ? spinner("blue")
              : `${admin.slice(0, 4)}...${admin.slice(38, 42)}`}
          </div>
          <h6 className='card-subtitle text-muted'>Contract Address</h6>
          <div className='card-text mb-3'>
            {typeof contract == "undefined" ? (
              spinner("blue")
            ) : (
              <a
                href={`https://rinkeby.etherscan.io/address/${contract.address}`}
                target='_blank'
                rel='noopener noreferrer'
                className='card-link text-decoration-none'
              >
                Etherscan
              </a>
            )}
          </div>
          <h6 className='card-subtitle text-muted'>Total Shares</h6>
          <div className='card-text mb-3'>
            {typeof totalShares == "undefined"
              ? spinner("blue")
              : ethers.utils.formatEther(totalShares)}
          </div>
          <h6 className='card-subtitle text-muted'>Available Funds</h6>
          <div className='card-text mb-3'>
            {typeof availableFunds == "undefined"
              ? spinner("blue")
              : availableFunds}{" "}
            ethers
          </div>
          <h6 className='card-subtitle text-muted'>Contribution End</h6>
          <div className='card-text mb-3'>
            {typeof contributionEnd == "undefined"
              ? spinner("blue")
              : new Date(parseInt(contributionEnd * 1000)).toLocaleString()}
          </div>
          <h6 className='card-subtitle text-muted'>
            Vote Duration per Proposal
          </h6>
          <div className='card-text mb-3'>
            {typeof voteDuration == "undefined"
              ? spinner("blue")
              : `${voteDuration / 100} min`}
          </div>
          <h6 className='card-subtitle text-muted'>Quorum</h6>
          <div className='card-text mb-3'>
            {typeof quorum == "undefined" ? spinner("blue") : `${quorum}%`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractData
