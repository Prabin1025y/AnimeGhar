import React from "react";
import { Badge } from "../ui/badge";
import { Captions, Mic } from "lucide-react";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import AnimeTips from "../AnimeTips";
import Link from "next/link";

interface AnimeColumnsProps {
  animeColumns: {
    title: string;
    animes: {
      id: string;
      name: string;
      poster: string;
      type: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }[];
  }[];
}

const AnimeColumns = ({ animeColumns }: AnimeColumnsProps) => {
  return (
    <div style={{ gridArea: "collections" }} className="hidden md:block space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        Anime Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {animeColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              {column.title}
            </h3>
            <div className="space-y-2">
              {column.animes.map((anime) => (
                <div
                  key={anime.id}
                  className="flex items-center gap-3 rounded-sm p-1 border bg-white hover:dark:bg-slate-800 dark:bg-slate-800/50 hover:bg-cyan-800/10 transition-all duration-300 cursor-pointer group"
                >
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Link href={`/anime/${anime.id}`}>
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
                      <p>{anime.type}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeColumns;
