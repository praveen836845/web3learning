import { ConnectButton } from '@rainbow-me/rainbowkit'
// import React from 'react'
// import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' flex justify-around shadow items-center   bg-black text-white h-[80px] '>
        <h2 className=' text-2xl font-bold'><b>Web3 Learing</b></h2>
        {/* <ul className=' hidden  md:flex gap-10'>
          <Link to="/">Home</Link>
          <Link to="/Listing">Listing</Link>
          
        </ul> */}
        <div className=' flex gap-10'> 
        {/* <Link to="/Login">
          <button className=' h-[40px]   rounded-full'>Login</button>
        </Link> */}
          {/* <button className=' h-[50px] w-[180px] backdrop-blur-md bg-white/10 shadow-2xl rounded-full'>Connect Wallet</button> */}
          <ConnectButton />
        </div>
    </div>
  )
}

export default Header