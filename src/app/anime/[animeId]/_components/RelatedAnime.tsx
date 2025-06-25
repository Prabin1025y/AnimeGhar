'use client'
import AnimeCard from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import { AnimeDetailsDataType } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const RelatedAnime = ({relatedAnimes, className="", gridClasses=""}: {relatedAnimes: AnimeDetailsDataType['relatedAnimes'], className?: string, gridClasses?: string}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const needsSeeMore = relatedAnimes.length > 12;
    const displayedAnimes = isExpanded ? relatedAnimes : relatedAnimes.slice(0, 12);
  return (
    <section className={`max-w-7xl container mx-auto mt-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Related Animes
      </h2>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"> */}
      <div className={`grid ${gridClasses ? gridClasses : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"} gap-4`}>
        {displayedAnimes.map((anime) => (
          <AnimeCard
            key={anime.id}
            animeId={anime.id}
            animePoster={anime.poster}
            animeName={anime.name}
            animeType={anime.type}
            animeEpisodes={anime.episodes}
          />
        ))}
      </div>
      {needsSeeMore && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                See More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

export default RelatedAnime;
