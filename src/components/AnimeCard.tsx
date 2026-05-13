import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import AnimeTips from "./AnimeTips";
import { Calendar, Clock, FilePlay, Star, Video } from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";

interface AnimeCardProps {
    animeId: number;
    animePoster: string;
    animeName: string;
    animeType: string;
    animeEpisodes?: string | null;
    airingTime?: string;
    averageScore?: number;
    className?: string;
    type?: "most popular" | "upcoming" | "latest" | "general";
}

const AnimeCard = ({
    animeId,
    animePoster,
    animeName,
    airingTime,
    averageScore,
    animeType,
    animeEpisodes,
    className = "",
    type = "general",
}: AnimeCardProps) => {
    return (
        <HoverCard openDelay={1000}>
            <div
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
                                {(() => {
                                    if (type === "most popular" || type == "general") {
                                        return (
                                            <div className="flex gap-2">
                                                {averageScore && (
                                                    <div className="flex items-center text-yellow-500 gap-1">
                                                        <Star
                                                            fill="yellow"
                                                            size={15}
                                                        />
                                                        <p>
                                                            {averageScore
                                                                ? averageScore /
                                                                  10
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                )}
                                                {animeEpisodes && (
                                                    <div className="flex items-center text-cyan-500 gap-1">
                                                        <Video size={15} />
                                                        <p>
                                                            {animeEpisodes
                                                                ? animeEpisodes
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    } else if (type === "latest") {
                                        return (
                                            <div className="flex gap-2">
                                                {animeEpisodes && (
                                                    <div className="flex items-center text-yellow-500 gap-1">
                                                        <FilePlay size={15} />
                                                        <p>{animeEpisodes}</p>
                                                    </div>
                                                )}
                                                {airingTime && (
                                                    <div className="flex items-center text-cyan-500 gap-1">
                                                        <Clock size={15} />
                                                        <p>
                                                            {timeAgo(
                                                                Number(
                                                                    airingTime,
                                                                ),
                                                            )}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    } else if (type === "upcoming") {
                                        return (
                                            <div className="flex gap-2">
                                                {airingTime &&
                                                    airingTime !==
                                                        "unknown" && (
                                                        <div className="flex items-center text-cyan-500 gap-1">
                                                            <Calendar
                                                                size={15}
                                                            />
                                                            <p>{airingTime}</p>
                                                        </div>
                                                    )}
                                            </div>
                                        );
                                    }
                                })()}
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
