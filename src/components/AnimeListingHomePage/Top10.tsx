import { Captions, Star, Trophy, Video } from "lucide-react";
import Image from "next/image";
import { Londrina_Shadow } from "next/font/google";
import { Badge } from "../ui/badge";
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
    top10animes: AnimeData["popularAllTime"]["media"];
}) => {
    return (
        <div
            style={{ gridArea: "ranked" }}
            className="space-y-6"
        >
            <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-cyan-500" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                    Top 10 Ranked
                </h2>
            </div>
            <div className="space-y-2">
                {top10animes.map((anime, index) => (
                    <div
                        key={anime.id}
                        className="flex items-center max-w-screen px-2 lg:p-0 gap-3 rounded-sm p-1 bg-white hover:dark:bg-slate-800 dark:bg-slate-800/50 hover:bg-cyan-800/10 transition-all duration-300 cursor-pointer group"
                    >
                        <div
                            className={`flex-shrink-0 w-5 md:w-8 h-8 rounded-sm flex items-center justify-center font-bold text-xl md:text-2xl ${
                                londrinaShadow.className
                            } ${
                                index + 1 === 1
                                    ? "text-yellow-500"
                                    : index + 1 === 2
                                      ? "text-blue-500"
                                      : index + 1 === 3
                                        ? "text-orange-500"
                                        : "text-black dark:text-white"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <HoverCard openDelay={200}>
                            <HoverCardTrigger asChild>
                                <Link href={`/anime/${anime.id}`}>
                                    <Image
                                        src={anime.coverImage.large}
                                        alt={`${anime.title.english || anime.title.romaji || "anime"} poster`}
                                        width={60}
                                        height={80}
                                        className="rounded-sm object-cover h-[50px] md:h-[80px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                                    />
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="p-0 bg-transparent border-none hidden sm:block">
                                <AnimeTips
                                    animeid={anime.id}
                                    image={anime.coverImage.large}
                                />
                            </HoverCardContent>
                        </HoverCard>

                        <Link
                            href={`/anime/${anime.id}`}
                            className="flex-1 w-[10px]"
                        >
                            <h4 className="font-medium text-xs md:text-sm truncate text-slate-900 dark:text-white">
                                {anime.title.english ||
                                    anime.title.romaji ||
                                    "No Title"}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <div className="flex gap-2">
                                    {anime.averageScore && (
                                        <div className="flex items-center text-yellow-500 gap-1">
                                            <Star
                                                fill="yellow"
                                                size={15}
                                            />
                                            <p>{anime.averageScore/10}</p>
                                        </div>
                                    )}
                                    {anime.episodes && (
                                        <div className="flex items-center text-cyan-500 gap-1">
                                            <Video size={15} />
                                            <p>{anime.episodes}</p>
                                        </div>
                                    )}
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
