import React from 'react';

const Login = () => {
  return (
    <div>
      {/* <div className=" bg-black flex justify-center items-center h-[600px]   md:h-[700px]  ">
          <div className=' flex  items-center flex-col backdrop-blur-md bg-white/10 shadow-2xl  h-[80%] rounded-[16px] w-[99%]   md:w-[30%] -mt-10 p-1 md:p-4'>
          <div className=' flex mt-10 flex-col w-full    '>
          <p className='  text-white font-bold mb-2 px-1 text-lg '>Email</p>
          <input className=' bg-white p-2 h-[50px] rounded-[8px]  w-[100%] px-3 outline-none shadow-md' placeholder='example@gmail.com' />

          <p className='  text-white font-bold mb-2 px-1 text-lg mt-6 '>Password</p>
          <input type="password" className=' bg-white p-2 h-[50px] rounded-[8px]  w-[100%] px-3 outline-none shadow-md' placeholder='***********' />
          <button className=' bg-purple-600 shadow-2xl h-[50px] text-white  mt-8 md:mt-12 mb-4 rounded-md'>Login</button>
          </div>

          </div>
      </div> */}
      <div
        className="  bg-[url('https://i.pinimg.com/736x/09/ab/9e/09ab9e6bdc50efdca343f2953b84a87b.jpg')] bg-cover bg-center flex justify-center items-center h-[600px] md:h-[700px]  ">
        <div className='flex items-center flex-col backdrop-blur-md bg-white/10 shadow-2xl h-[80%] rounded-[16px] w-[99%] md:w-[30%] -mt-10 p-1 md:p-4'>
          <div className='flex mt-10 flex-col w-full'>
            <p className='text-white font-bold mb-2 px-1 text-lg'>Email</p>
            <input
              className='bg-white p-2 h-[50px] rounded-[8px] w-[100%] px-3 outline-none shadow-md'
              placeholder='example@gmail.com'
            />
            <p className='text-white font-bold mb-2 px-1 text-lg mt-6'>Password</p>
            <input
              type="password"
              className='bg-white p-2 h-[50px] rounded-[8px] w-[100%] px-3 outline-none shadow-md'
              placeholder='***********'
            />
            <button className='bg-purple-600 shadow-2xl h-[50px] text-white mt-8 md:mt-12 mb-4 rounded-md'>
              Login
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};


export default Login;
