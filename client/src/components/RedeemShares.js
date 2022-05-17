import React, { useState, useEffect } from "react"
import { ethers } from "ethers"

const RedeemShares = ({
  investorShareCount,
  availableFunds,
  onRedeemShares,
}) => {
  const [isRedeemable, setIsRedeemable] = useState(false)
  const [isEnoughETHInDAO, setIsEnoughETHInDAO] = useState(false)

  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (investorShareCount && availableFunds && onRedeemShares) {
      checkIfIsRedeemable()
      checkIfIsEnoughETHInDAO()
    }
  }, [investorShareCount, availableFunds, onRedeemShares])

  const checkIfIsRedeemable = () => {
    setIsRedeemable(parseInt(investorShareCount) > 0)
  }

  const checkIfIsEnoughETHInDAO = () => {
    setIsEnoughETHInDAO(amount / 1000 <= parseInt(availableFunds))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isRedeemable && isEnoughETHInDAO) {
      await onRedeemShares(amount)
    } else {
      alert("Check available ETH in DAO & Your Shares'balance")
    }
    setAmount("")
  }

  const btnRedeemClass = () => {
    return isRedeemable
      ? "btn btn-primary btn-sm"
      : "btn btn-warning btn-sm text-decoration-line-through"
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='d-flex flex-column my-2'>
        <div className='d-flex'>
          <input
            className='form-control'
            value={amount}
            placeholder='Shares amount'
            onChange={(e) => {
              setAmount(e.target.value)
            }}
          ></input>
        </div>
        <div className='d-flex justify-content-center mt-1'>
          <button type='submit' className={btnRedeemClass()}>
            RedeemShares
          </button>
        </div>
      </div>
    </form>
  )
}

export default RedeemShares
