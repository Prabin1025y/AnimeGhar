import { Captions, Mic, Trophy } from "lucide-react";
import Image from "next/image";
import { Londrina_Shadow } from "next/font/google";
import React from "react";
import { Badge } from "../ui/badge";
import { HomeDataType } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import AnimeTips from "../AnimeTips";
import Link from "next/link";

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  subsets: ["latin"],
});

const Top10 = ({
  top10animes,
}: {
  top10animes: HomeDataType["top10Animes"];
}) => {
  return (
    <div style={{ gridArea: "ranked" }} className="space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-cyan-500" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          Top 10 Ranked
        </h2>
      </div>
      <div className="space-y-2">
        {top10animes["today"].map((anime) => (
          <div
            key={anime.id}
            className="flex items-center max-w-screen px-2 lg:p-0 gap-3 rounded-sm p-1 bg-white hover:dark:bg-slate-800 dark:bg-slate-800/50 hover:bg-cyan-800/10 transition-all duration-300 cursor-pointer group"
          >
            <div
              className={`flex-shrink-0 w-5 md:w-8 h-8 rounded-sm flex items-center justify-center font-bold text-xl md:text-2xl ${londrinaShadow.className
                } ${anime.rank === 1
                  ? "text-yellow-500"
                  : anime.rank === 2
                    ? "text-blue-500"
                    : anime.rank === 3
                      ? "text-orange-500"
                      : "text-white"
                }`}
            >
              {anime.rank}
            </div>
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Link href={`/anime/${anime.id}`} >
                  <Image
                    src={anime.poster}
                    alt={anime.name}
                    width={60}
                    height={80}
                    className="rounded-sm object-cover h-[50px] w-[38] md:h-[80px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="p-0 bg-transparent border-none hidden sm:block">
                <AnimeTips animeid={anime.id} image={anime.poster} />
              </HoverCardContent>
            </HoverCard>

            <Link href={`/anime/${anime.id}`} className="flex-1 w-[10px]">
              <h4 className="font-medium text-xs md:text-sm truncate text-slate-900 dark:text-white">
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
    </div>
  );
};

export default Top10;
