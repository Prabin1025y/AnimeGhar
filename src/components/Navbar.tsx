import React from 'react'
import { DarkModeSwitch } from './DarkModeSwitch'
import Link from 'next/link';
import SearchInput from './Search';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-cyan-50/50 dark:bg-gray-900/50 backdrop-blur-md shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/home" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div> */}
            <Image src="/Logo3.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              AnimeGhar
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchInput />
            <Link href={"/about"} className='text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 '>
              About
            </Link>
            <DarkModeSwitch />
          </div>

        </div>
      </div>


    </nav>
  )
}

export default Navbar