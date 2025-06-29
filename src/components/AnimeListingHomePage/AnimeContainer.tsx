import React from 'react'
import { HomeDataType } from "@/types";
import AnimeCard from '../AnimeCard';

const AnimeContainer = ({ animes, title }: { animes: HomeDataType["latestEpisodeAnimes"] | HomeDataType["topUpcomingAnimes"], title: string }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center py-6 px-3">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"> */}
      <div className="flex flex-wrap justify-center gap-3">
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
        ))}
      </div>
    </div>
  )
}

export default AnimeContainer