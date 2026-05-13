import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import AnimeTips from "./AnimeTips";
import { Badge } from "./ui/badge";
import { Calendar, Captions, Mic } from "lucide-react";
import Link from "next/link";

interface AnimeCardProps {
    animeId: number;
    animePoster: string;
    animeName: string;
    animeType: string;
    animeEpisodes: string;
    animeDuration?: string;
    className?: string;
}

const AnimeCard = ({
    animeId,
    animePoster,
    animeName,
    animeType,
    animeEpisodes,
    animeDuration = "",
    className = "",
}: AnimeCardProps) => {
    return (
        <HoverCard openDelay={1000}>
            <div
                // key={anime.id}
                className={`${className} group cursor-pointer transition-all duration-300 hover:scale-105 w-32 sm:w-44 md:w-52  max-w-52`}
            >
                <div className="bg-card dark:bg-slate-800/50 border rounded-md overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    <div className="relative">
                        <HoverCardTrigger asChild>
                            <Link href={`/anime/${animeId}`}>
                                <Image
                                    src={animePoster}
                                    alt={animeName}
                                    width={200}
                                    height={300}
                                    className="w-full h-52 md:h-64 object-cover"
                                />
                            </Link>
                        </HoverCardTrigger>
                    </div>
                    <Link href={`/anime/${animeId}`}>
                        <div className="p-2 md:p-4">
                            <h4 className="font-semibold text-xs md:text-sm truncate mb-2 text-slate-900 dark:text-white">
                                {animeName}
                            </h4>
                            <div className="flex items-center justify-between text-[0.6rem] md:text-xs text-muted-foreground">
                                <span>{animeType}</span>
                                <div className="flex gap-[2px]">
                                    {
                                    animeEpisodes && (
                                        <Badge
                                            className={`bg-green-700 text-white px-1 py-1`}
                                        >
                                            <Captions className="w-4 h-4" />
                                            {animeEpisodes}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <HoverCardContent className="hidden md:block p-0 bg-transparent border-none">
                <AnimeTips
                    animeid={animeId}
                    image={animePoster}
                />
            </HoverCardContent>
        </HoverCard>
    );
};

export default AnimeCard;
