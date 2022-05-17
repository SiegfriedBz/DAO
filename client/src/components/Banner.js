import { spinner } from "../helpers/loadingSpinner"

const Banner = ({ account, isInvestor }) => {
  return (
    <div id='banner'>
      <div className='d-flex justify-content-between align-items-center mx-3'>
        <div className='d-flex'>
          <span className='border rounded-3 border-3 border-dark p-3'>
            <h1>DAO App</h1>
          </span>
        </div>
        <div className='d-flex flex-column align-items-around btn-primary rounded p-3'>
          <div className='d-flex justify-content-center'>Account</div>
          <div className='d-flex justify-content-center'>
            {!account
              ? spinner("blue")
              : `${account.slice(0, 4)}...${account.slice(38, 42)}`}
          </div>
          <div className='d-flex justify-content-center'>
            {typeof isInvestor == "undefined"
              ? spinner("white")
              : isInvestor
              ? "Investor"
              : "Non-Investor"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
