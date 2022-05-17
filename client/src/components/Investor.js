import React, { useState } from "react"
import { spinner } from "../helpers/loadingSpinner"
import CreateProposal from "./proposals/CreateProposal"
import RedeemShares from "./RedeemShares"

const Investor = ({
  contributionEnd,
  isInvestor,
  investorShareCount,
  availableFunds,
  onContribute,
  onCreateProposal,
  onRedeemShares,
}) => {
  const [amount, setAmount] = useState("")

  const isActive = () => {
    return new Date() < new Date(parseInt(contributionEnd * 1000))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isActive()) return
    await onContribute(amount)
    setAmount("")
  }

  const btnSendClass = isActive()
    ? "btn btn-primary btn-sm ms-1"
    : "btn btn-warning btn-sm ms-1 text-decoration-line-through"

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='card shadow p-3 mb-5 bg-white rounded w-75'>
        <div className='card-body'>
          <h5 className='card-title fw-bolder'>Investor Corner</h5>
          <h6 className='card-subtitle mt-3 text-muted'>
            Get 1'000 Shares/ETH
          </h6>
          <div className='card-text mb-3'>
            <form onSubmit={handleSubmit} className='form'>
              <div className='d-flex flex-column my-2'>
                <div className='d-flex'>
                  <input
                    className='form-control'
                    value={amount}
                    placeholder='ETH amount'
                    onChange={(e) => {
                      setAmount(e.target.value)
                    }}
                  ></input>
                </div>
                <div className='d-flex justify-content-center mt-1'>
                  <button type='submit' className={btnSendClass}>
                    Contribute
                  </button>
                </div>
              </div>
            </form>
          </div>
          {isInvestor && (
            <>
              <h6 className='card-subtitle text-muted'>Shares</h6>
              <div className='card-text mb-3'>
                {typeof investorShareCount === "undefined" ? (
                  spinner("blue")
                ) : investorShareCount < 1 ? (
                  <span className='badge bg-warning'>
                    {investorShareCount.toString()}
                  </span>
                ) : (
                  <span className='badge bg-success'>
                    {investorShareCount.toString()}
                  </span>
                )}
              </div>
            </>
          )}
          {isInvestor && (
            <>
              <h6 className='card-subtitle text-muted'>Create Proposal</h6>
              <div className='card-text mb-3'>
                <CreateProposal onCreateProposal={onCreateProposal} />
              </div>
            </>
          )}
          {isInvestor && (
            <>
              <h6 className='card-subtitle text-muted'>Redeem Shares</h6>
              <div className='card-text mb-3'>
                <RedeemShares
                  investorShareCount={investorShareCount}
                  availableFunds={availableFunds}
                  onRedeemShares={onRedeemShares}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Investor
