import React, { useState } from "react"

const CreateProposal = ({ onCreateProposal }) => {
  const [proposal, setProposal] = useState({
    name: "",
    address: "",
    amount: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(proposal)
    await onCreateProposal(proposal)
    setProposal({ name: "", address: "", amount: "" })
  }
  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='d-flex flex-column my-2'>
        <div className='d-flex justify-content-center '>
          <div className='d-flex flex-column justify-content-center align-items-center ms-1'>
            <label htmlFor='name'>Proposal Name</label>
            <input
              id='name'
              className='form-control'
              value={proposal.name}
              onChange={(e) => {
                setProposal({
                  ...proposal,
                  [e.target.id]: e.target.value,
                })
              }}
            ></input>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center ms-1'>
            <label htmlFor='address'>Recipient Address</label>
            <input
              id='address'
              className='form-control'
              value={proposal.address}
              placeholder='0x...'
              onChange={(e) => {
                setProposal({
                  ...proposal,
                  [e.target.id]: e.target.value,
                })
              }}
            ></input>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center ms-1'>
            <label htmlFor='amount'>ETH Amount</label>
            <input
              id='amount'
              className='form-control'
              value={proposal.amount}
              onChange={(e) => {
                setProposal({
                  ...proposal,
                  [e.target.id]: e.target.value,
                })
              }}
            ></input>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-primary btn-sm mt-1'>
            Create
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateProposal
