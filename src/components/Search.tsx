"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { ArrowRight, Search } from 'lucide-react'
import { Popover, PopoverContent, PopoverAnchor } from './ui/popover';
import Image from 'next/image';
import { SearchSuggestionType } from '@/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<SearchSuggestionType[]>([])
    const searchRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim() !== "") {
                setIsPopoverOpen(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search/suggestion?q=${searchTerm}`,{headers:{"god-key": process.env.NEXT_PUBLIC_GOD_KEY || ""}});
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


    const onOpenChange = () => {
        // setIsPopoverOpen(open);
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPopoverOpen(false);
        setSearchTerm("");
        router.push(`/search/${searchTerm}`);
    }

    const handleOnBlur = () => {
        setTimeout(() => {
                setIsPopoverOpen(false);
        }, 100);
    }
    return (
        <div>
            <Popover open={isPopoverOpen && suggestions.length > 0 && searchTerm.trim() !== ""} onOpenChange={onOpenChange}>
                {/* <PopoverTrigger asChild> */}
                <PopoverAnchor asChild className='relative flex items-center'>
                    <form onSubmit={handleOnSubmit}>
                        <Input onFocus={() => setIsPopoverOpen(true)} onBlur={handleOnBlur} ref={searchRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='pl-10 w-xs peer focus-visible:ring-0 focus-visible:border-cyan-500' />
                        <Search className="absolute left-2 h-4 w-4 text-slate-700 dark:text-slate-300 peer-focus:text-cyan-500 dark:peer-focus:text-cyan-400 " />
                        <Button asChild className={`absolute right-0 h-full hover:bg-cyan-600 rounded-l-none bg-cyan-500 transition-opacity ${searchTerm.trim() !== "" ? "opacity-100" : "opacity-0"}`}><Link href={`/search/${searchTerm}`}><ArrowRight /></Link></Button>
                    </form>
                </PopoverAnchor>
                {/* </PopoverTrigger> */}
                <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-80 p-1 bg-cyan-50 dark:bg-[#061e2e] border-cyan-600">
                    <div className="grid gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Link href={`/anime/${suggestion.id}`} key={suggestion.id + index} className='w-full h-16 hover:bg-cyan-100 cursor-pointer rounded-md flex items-center gap-2'>
                                <Image src={suggestion.poster} alt={suggestion.name} width={40} height={60} className='bg-gray-500 object-cover' />
                                <div>
                                    <p className='font-semibold line-clamp-1'>{suggestion.name}</p>
                                    <div className='flex items-center gap-2 text-sm text-slate-700 dark:text-slate-400'>
                                        <span>{suggestion.moreInfo[0]}</span><span>{suggestion.moreInfo[1]}</span><span>{suggestion.moreInfo[2]}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SearchInput  