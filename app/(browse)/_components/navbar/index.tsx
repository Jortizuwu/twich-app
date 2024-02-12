import Search from './search'
import Logo from './logo'
import React from 'react'
import Actions from './actions'

function Navbar() {
  return (
    <nav className="fixed w-full top-0 h-14 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}

export default Navbar
