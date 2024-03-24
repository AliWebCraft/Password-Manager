import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full bg-slate-800 flex flex-col text-center p-[1px] z-auto'>
         <div className="logo font-bold">
          <span className='text-green-500'>&lt;</span>
          <span className='text-white'>Pass<span className='text-green-500'>Op/</span></span>
          <span className='text-green-500'>&gt;</span>
        </div>
        <span><p className='flex justify-center text-white font-bold text-sm'>Created with <img width={"20px"} className='m-1' src="icons/heart.png" alt=" love " />by AliWebCraft</p></span>

      </div>
  )
}

export default Footer
