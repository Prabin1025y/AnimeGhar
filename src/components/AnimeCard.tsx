import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import Image from 'next/image'
import AnimeTips from './AnimeTips'
import { Badge } from './ui/badge'
import { Captions, Mic } from 'lucide-react'

interface AnimeCardProps {
    animeId: string,
    animePoster: string,
    animeName: string,
    animeType: string,
    animeEpisodes: {
        sub: number,
        dub: number
    }
}

const AnimeCard = ({animeId, animePoster, animeName, animeType, animeEpisodes}: AnimeCardProps) => {
  return (
    <div
                  // key={anime.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    <div className="relative">
                      <HoverCard openDelay={200} >
                        <HoverCardTrigger>
                          <Image
                            src={animePoster}
                            alt={animeName}
                            width={200}
                            height={300}
                            className="w-full h-64 object-cover"
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="p-0 bg-transparent border-none">
                          <AnimeTips animeid={animeId} image={animePoster} />
                        </HoverCardContent>
                      </HoverCard>

                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Button
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                            size="sm"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Now
                          </Button>
                        </div>
                      </div> */}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm truncate mb-2 text-slate-900 dark:text-white">
                        {animeName}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{animeType}</span>
                        <div className="flex gap-[2px]">
                          <Badge className={`bg-green-700 text-white px-1 py-1 ${animeEpisodes.dub && "rounded-r-none"}`}>
                            <Captions />
                            {animeEpisodes.sub}
                          </Badge>
                          {animeEpisodes.dub && <Badge className="bg-cyan-700 text-white px-1 py-1 rounded-l-none">
                            <Mic />
                            {animeEpisodes.dub}
                          </Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  )
}

export default AnimeCard