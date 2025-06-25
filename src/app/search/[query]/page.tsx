'use client'
import AnimeCard from '@/components/AnimeCard'
import AnimeTips from '@/components/AnimeTips'
import AnimeCardSkeleton from '@/components/Skeleton/AnimeCardSkeleton'
import Top10Skeleton from '@/components/Skeleton/Top10Skeleton'
import { Badge } from '@/components/ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { SearchResultType } from '@/types'
import { Captions, Mic } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const { query } = useParams<{ query: string }>();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [searchResult, setSearchResult] = useState<SearchResultType | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    if (query.trim() === "") {
      setSearchResult(null);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/search?q=${query}&page=${page}`);
        const data = await response.json();
        setSearchResult(data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  if (loading)
    return (
      <div className='w-full pt-10'>

        <div className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-5'>
          {/* <p className='py-4 grid-cols-4 text-2xl text-cyan-500 font-semibold'>Search Result for : {query}</p> */}
          <div className='col-span-3 grid grid-cols-4 gap-3'>
            <p className='col-span-4 py-4 text-2xl text-cyan-500 font-semibold'>Searching...</p>
            {Array.from({ length: 15 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))}
          </div>
          <div className='col-span-1'>
            <p className='py-4 text-2xl text-cyan-500 font-semibold'>Most Popular Animes</p>
            {/* {Array.from({length: 10}).map((_, index) => ( */}
            <Top10Skeleton />
            {/* ))} */}
          </div>
        </div>
      </div>
    )



  return (
    <div className='w-full pt-10'>

      <div className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-5'>
        {/* <p className='py-4 grid-cols-4 text-2xl text-cyan-500 font-semibold'>Search Result for : {query}</p> */}
        <div className='col-span-3 grid grid-cols-4 gap-3'>
          {searchResult && searchResult.animes.length == 0 ? <p className='col-span-4 py-4 text-2xl text-cyan-500 font-semibold'>No result found.</p>
            : <p className='col-span-4 py-4 text-2xl text-cyan-500 font-semibold'>Search Result For: {query.replace("%20", " ")}</p>}
          {searchResult && searchResult.animes.length > 0 && searchResult.animes.map((anime, index) => (
            <AnimeCard
              key={anime.id + index}
              animeId={anime.id}
              animeName={anime.name}
              animePoster={anime.poster}
              animeType={anime.type}
              animeEpisodes={anime.episodes}
              animeDuration={anime.duration}
            />
          ))}
        </div>
        <div className='col-span-1'>
          <p className='py-4 text-2xl text-cyan-500 font-semibold'>Most Popular Animes</p>
          {searchResult && searchResult.mostPopularAnimes.length > 0 && searchResult.mostPopularAnimes.map((anime, index) => (
            <div
              key={anime.id + index}
              className="flex items-center gap-3 rounded-sm p-1 bg-white hover:dark:bg-slate-800 dark:bg-slate-800/50 hover:bg-cyan-800/10 transition-all duration-300 cursor-pointer group"
            >
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Link href={`/anime/${anime.id}`} >
                    <Image
                      src={anime.poster}
                      alt={anime.name}
                      width={60}
                      height={80}
                      className="rounded-sm object-cover h-[80px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="p-0 bg-transparent border-none">
                  <AnimeTips animeid={anime.id} image={anime.poster} />
                </HoverCardContent>
              </HoverCard>

              <Link href={`/anime/${anime.id}`} className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate text-slate-900 dark:text-white">
                  {anime.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <div className="flex gap-[2px]">
                    <Badge className={`bg-green-700 text-white text-[0.65rem] px-[2px] py-0 rounded-l-xs ${anime.episodes.dub ? "rounded-r-none" : "rounded-r-xs"}`}>
                      <Captions className="w-3 h-3" />
                      {anime.episodes.sub}
                    </Badge>
                    {anime.episodes.dub && <Badge className="bg-cyan-700 text-white px-1 text-[0.65rem] py-1 rounded-r-xs rounded-l-none">
                      <Mic className="w-3 h-3" />
                      {anime.episodes.dub}
                    </Badge>}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {
          searchResult && searchResult.totalPages > 1 &&
          <Pagination className='col-span-4 mt-5'>
            <PaginationContent>
              {searchResult?.currentPage && searchResult.currentPage > 1 && <PaginationItem>
                <PaginationPrevious href={`/search/${query}?page=${searchResult.currentPage - 1}`} />
              </PaginationItem>}

              {(searchResult && (searchResult.currentPage - 2) > 1) && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {searchResult && Array.from({ length: searchResult.totalPages }, (_, i) => i + 1).filter(item => (item >= searchResult.currentPage - 2) && (item <= searchResult.currentPage + 2)).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink href={`/search/${query}?page=${pageNum}`} isActive={pageNum === searchResult.currentPage}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {(searchResult && (searchResult.currentPage + 2) < searchResult.totalPages) && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {searchResult && searchResult.currentPage < searchResult.totalPages &&
                <PaginationItem>
                  <PaginationNext href={`/search/${query}?page=${searchResult.currentPage + 1}`} />
                </PaginationItem>}
            </PaginationContent>
          </Pagination>
        }
      </div>
    </div>
  )
}

export default page