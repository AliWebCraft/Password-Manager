import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex text-white justify-around bg-slate-800 list-none h-10 w-full items-center'>
        <div className="logo font-bold">
          <span className='text-green-500'>&lt;</span>
          <span>Pass<span className='text-green-500'>Op/</span></span>
          <span className='text-green-500'>&gt;</span>
        </div>
        <ul className='flex gap-4 text-sm cursor-pointer'>
        <a className='hover:font-bold ' href="/">Home</a>
        <a className='hover:font-bold ' href="#">About</a>
        <a className='hover:font-bold ' href="#">Contact</a>
        </ul>
        <a href="https://github.com/AliWebCraft?tab=repositories" target='_blank'><button className='flex btn-css text-black'><img width={"30px"} src="icons/github.png" alt="github" />Github</button></a>
        
      </nav>
    </div>
  )
}

export default Navbar
