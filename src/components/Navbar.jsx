import React from 'react'

const Navbar = () => {
  return (
 
    <div className="fixed w-full h-20 shadow-md bg-white z-50">
      <nav className="flex justify-between items-center px-6 h-full">
  <div className="text-primary m-2 p-2 text-2xl font-bold">AutoCap</div>
  <ul className="flex flex-row justify-evenly items-center ">
    <li className=' text-style m-3 hidden min-lg:block min-md:block'><a href="#">Home</a></li>
    <li className='text-style m-3'><a href="#">Generate</a></li>
    <li className='text-style m-3'><a href="#">How it works</a></li>
  
  </ul>
</nav>
 </div>

  )
}

export default Navbar 