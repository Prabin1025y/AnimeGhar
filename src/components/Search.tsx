"use client";
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className='relative flex items-center'>
            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='pl-10 peer focus-visible:ring-0 focus-visible:border-cyan-500' />
            <Search className="absolute left-2 h-4 w-4 text-slate-700 dark:text-slate-300 peer-focus:text-cyan-500 dark:peer-focus:text-cyan-400 peer-focus:bg-slate-100 dark:peer-focus:bg-slate-800" />
        </div>
    )
}

export default SearchInput  