import React, { useState, useRef } from 'react'
import { Star, Clock, Calendar, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { HomeDataType } from '@/types'

interface TrendingAnimeProps {
    animes: HomeDataType['trendingAnimes']
}

const TrendingAnime = ({ animes }: TrendingAnimeProps) => {
    const [hoveredAnime, setHoveredAnime] = useState<string | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const itemWidth = 200 + 16 // card width + gap
            const containerWidth = container.clientWidth
            const scrollAmount = containerWidth - itemWidth // Show one less item to indicate more content
            
            const currentScroll = container.scrollLeft
            const maxScroll = container.scrollWidth - container.clientWidth
            
            let targetScroll: number
            
            if (direction === 'left') {
                targetScroll = Math.max(0, currentScroll - scrollAmount)
            } else {
                // When scrolling right, ensure we don't overshoot the end
                targetScroll = Math.min(maxScroll, currentScroll + scrollAmount)
            }

            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="py-12 max-w-7xl mx-auto">
            <div className=" mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                        Trending Now
                    </h2>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll('left')}
                            className="border-slate-800/30 text-slate-800 hover:bg-slate-800/10 hover:border-slate-800/50 dark:border-white/30 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll('right')}
                            className="border-slate-800/30 text-slate-800 hover:bg-slate-800/10 hover:border-slate-800/50 dark:border-white/30 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Anime Scroll Area */}
                <div className="relative group">
                    {/* Scroll Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {animes.map((anime, index) => (
                            <div
                                key={anime.id}
                                className="relative w-[200px] flex-shrink-0"
                                onMouseEnter={() => setHoveredAnime(anime.id)}
                                onMouseLeave={() => setHoveredAnime(null)}
                            >
                                {/* Anime Card */}
                                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                                    {/* Rank Badge */}
                                    <div className="absolute top-2 left-2 z-10">
                                        <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-2 py-1 text-sm font-medium">
                                            #{index + 1}
                                        </Badge>
                                    </div>

                                    {/* Anime Poster */}
                                    <Image
                                        src={anime.poster}
                                        alt={anime.name}
                                        fill
                                        className={`object-cover transition-transform duration-300 ${
                                            hoveredAnime === anime.id ? 'scale-110' : ''
                                        }`}
                                    />

                                    {/* Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                                        hoveredAnime === anime.id ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                                                {anime.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 text-white/80 text-sm mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                                                    <span>4.5</span>
                                                </div>
                                                <span>•</span>
                                                <span>24m</span>
                                            </div>
                                            <Button 
                                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                                                size="sm"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Play Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Anime Title */}
                                <h3 className="mt-2 text-slate-900 dark:text-white font-medium text-sm line-clamp-1">
                                    {anime.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrendingAnime