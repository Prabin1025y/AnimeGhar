import React from 'react'
import { HomeDataType } from "@/types";
import AnimeCard from '../AnimeCard';

const AnimeContainer = ({ animes, title }: { animes: HomeDataType["latestEpisodeAnimes"] | HomeDataType["topUpcomingAnimes"], title: string }) => {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animes.map((anime, index) => (
          <AnimeCard
            key={anime.id + index}
            animeId={anime.id}
            animePoster={anime.poster}
            animeName={anime.name}
            animeType={anime.type}
            animeEpisodes={anime.episodes}
            animeDuration={anime.duration}
          />
          // <div
          //   key={anime.id}
          //   className="group cursor-pointer transition-all duration-300 hover:scale-105"
          // >
          //   <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
          //     <div className="relative">
          //       <HoverCard openDelay={200}>
          //         <HoverCardTrigger>
          //           <Image
          //             src={anime.poster}
          //             alt={anime.name}
          //             width={200}
          //             height={300}
          //             className="w-full h-64 object-cover"
          //           />
          //         </HoverCardTrigger>
          //         <HoverCardContent className="p-0 bg-transparent border-none">
          //           <AnimeTips animeid={anime.id} image={anime.poster} />
          //         </HoverCardContent>
          //       </HoverCard>
          //     </div>
          //     <div className="p-4">
          //       <h4 className="font-semibold text-sm truncate mb-2 text-slate-900 dark:text-white">
          //         {anime.name}
          //       </h4>
          //       <div className="flex items-center justify-between text-xs text-muted-foreground">
          //         <span>{anime.type} {anime.duration && `• ${anime.duration}`}</span>
          //         {title !== "Top Upcoming" && <div className="flex gap-[2px]">
          //           <Badge className={`bg-green-700 text-white px-1 py-1 ${anime.episodes.dub && "rounded-r-none" }`}>
          //             <Captions className="w-3 h-3" />
          //             {anime.episodes.sub}
          //           </Badge>
          //           {anime.episodes.dub && <Badge className="bg-cyan-700 text-white px-1 py-1 rounded-l-none">
          //             <Mic className="w-3 h-3" />
          //             {anime.episodes.dub}
          //           </Badge>}
          //         </div>}
          //       </div>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  )
}

export default AnimeContainer