"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from './ui/popover';
import Image from 'next/image';
import { SearchSuggestionType } from '@/types';
import { Button } from './ui/button';
import Link from 'next/link';

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<SearchSuggestionType[]>([])
    // const [isFocused, setIsFocused] = useState(false)
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim() !== "" ) {
                setIsPopoverOpen(true);
                // Simulate fetching search results
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/search/suggestion?q=${searchTerm}`);
                const data = await response.json();
                setSuggestions(data.data.suggestions);
            } else {
                setSuggestions([]);
                setIsPopoverOpen(false);
            }
        }

        // Debounce the API call to limit requests to once every 500 milliseconds
        const timeoutId = setTimeout(fetchData, 200);

        // Cleanup timeout if searchTerm changes before 500 milliseconds
        return () => clearTimeout(timeoutId);
    }, [searchTerm])


    const onOpenChange = (open: boolean) => {
        // setIsPopoverOpen(open);
    }
    return (
        <div>
            <Popover open={isPopoverOpen && suggestions.length > 0} onOpenChange={onOpenChange}>
                {/* <PopoverTrigger asChild> */}
                <PopoverAnchor className='relative flex items-center'>
                    <Input onFocus={()=>setIsPopoverOpen(true)} onBlur={()=>setIsPopoverOpen(false)} ref={searchRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='pl-10 peer focus-visible:ring-0 focus-visible:border-cyan-500' />
                    <Search className="absolute left-2 h-4 w-4 text-slate-700 dark:text-slate-300 peer-focus:text-cyan-500 dark:peer-focus:text-cyan-400 peer-focus:bg-slate-100 dark:peer-focus:bg-slate-800" />
                </PopoverAnchor>
                {/* </PopoverTrigger> */}
                <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-80 p-1 bg-[#061e2e] border-cyan-600">
                    <div className="grid gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Link href={`/anime/${suggestion.id}`} key={suggestion.id + index} className='w-full h-16 hover:bg-cyan-200/10 cursor-pointer rounded-md flex items-center gap-2'>
                                <Image src={suggestion.poster} alt={suggestion.name} width={40} height={60} className='bg-blue-500 object-cover' />
                                <div>
                                    <p className='font-semibold line-clamp-1'>{suggestion.name}</p>
                                    <div className='flex items-center gap-2 text-sm text-slate-400'>
                                        <span>{suggestion.moreInfo[0]}</span><span>{suggestion.moreInfo[1]}</span><span>{suggestion.moreInfo[2]}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            {/* <Popover defaultOpen={true} open={isPopoverOpen} onOpenChange={onOpenChange}>
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='pl-10 peer focus-visible:ring-0 focus-visible:border-cyan-500' />
                <Search className="absolute left-2 h-4 w-4 text-slate-700 dark:text-slate-300 peer-focus:text-cyan-500 dark:peer-focus:text-cyan-400 peer-focus:bg-slate-100 dark:peer-focus:bg-slate-800" />
                <PopoverContent>
                    <div className='w-full h-20 bg-red-500'>Search items here</div>
                </PopoverContent>
            </Popover> */}
        </div>
    )
}

export default SearchInput  