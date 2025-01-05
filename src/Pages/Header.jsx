import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <div className='flex justify-around items-center bg-black text-white h-[80px] shadow animate-bgColorChange'>
      {/* Slide-in animation for the header text */}
      <h2 className='text-2xl font-bold transition-transform duration-500 ease-out hover:scale-105 animate-slideIn'>
        <b>Referral Races</b>
      </h2>

      <div className='flex gap-10'>
        {/* Animated ConnectButton with hover effects */}
        <ConnectButton className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-xl" />
      </div>
    </div>
  )
}

export default Header;
