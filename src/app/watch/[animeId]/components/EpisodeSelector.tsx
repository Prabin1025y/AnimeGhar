'use client';
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EpisodeType } from "../page";

interface EpisodeSelectorProps {
    className?: string;
    animeId: string;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
    className = "",
    animeId,
}) => {
    const [episodeRange, setEpisodeRange] = useState<{
        start: number;
        end: number;
    }>({ start: 0, end: 100 });
    const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/anime/${animeId}/episodes`
            );
            const result = await response.json();
            setEpisodes(result.data.episodes);
            if (!searchParams.get("ep")) {
                router.push(`/watch/${result.data.episodes[0].episodeId}`);
            }
            setIsLoading(false);
        }
        fetchData();

    }, []);


    // const currentSeasonEpisodes = data.episodes[currentSeason] || [];
    const totalEpisodes = episodes.length;
    // Calculate episode ranges for dropdown
    const rangeSize = 100;
    const episodeRanges = Array.from(
        { length: Math.ceil(totalEpisodes / rangeSize) },
        (_, i) => {
            const start = i * rangeSize;
            const end = Math.min(totalEpisodes, start + rangeSize);
            return { start, end };
        }
    );

    const displayedEpisodes = episodes.slice(
        episodeRange.start,
        episodeRange.end
    );

    const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idx = Number(e.target.value);
        setEpisodeRange(episodeRanges[idx]);
        // setCurrentEpisode(episodeRanges[idx].start + 1);
    };

    if (isLoading) {
        return <EpisodeSelectorSkeleton />;
    }

    return (
        <div className={`${className} bg-white dark:bg-gray-900 rounded-lg p-4 h-fit`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-primary font-semibold text-lg">Episodes</h2>
                <div className="text-sm text-gray-700 dark:text-gray-400">{totalEpisodes} episodes</div>
            </div>
            {/* Episode Range Dropdown */}
            <div className="mb-4">
                <select
                    value={episodeRanges.findIndex(
                        (r) => r.start === episodeRange.start && r.end === episodeRange.end
                    )}
                    onChange={handleRangeChange}
                    className="w-full dark:bg-gray-800 text-primary rounded-lg px-3 py-2 border dark:border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                    {episodeRanges.map((range, idx) => (
                        <option key={idx} value={idx}>
                            {range.start + 1}-{range.end}
                        </option>
                    ))}
                </select>
            </div>
            {/* Episode Grid */}
            <div className="grid grid-cols-5 gap-2 overflow-y-auto">
                {displayedEpisodes.map((episode) => (
                    <Link
                        key={episode.episodeId}
                        href={`/watch/${episode.episodeId}`}
                        className={`w-[60px] h-10 p-0 backdrop-blur-sm border  transition-all duration-200 rounded-md flex items-center justify-center text-sm ${`${animeId}?ep=${searchParams.get("ep")}` === episode.episodeId ? "border-emerald-700/50 text-emerald-400 bg-emerald-500/20" : "bg-gray-600/20 dark:bg-gray-800/20 border-gray-600/30 dark:border-gray-700/30 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 hover:border-cyan-300/50 dark:hover:border-cyan-700/50 text-gray-900 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"}`}
                    >
                        {episode.number}
                    </Link>

                ))}
            </div>
        </div>
    );
};

// Skeleton loader for EpisodeSelector
const EpisodeSelectorSkeleton: React.FC = () => {
    return (
        <div className="bg-gray-900 rounded-lg p-4 h-fit animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-24 bg-gray-700 rounded" />
                <div className="h-4 w-16 bg-gray-800 rounded" />
            </div>
            <div className="mb-4">
                <div className="h-10 w-full bg-gray-800 rounded-lg" />
            </div>
            <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-[60px] h-10 bg-gray-800 rounded-md" />
                ))}
            </div>
        </div>
    );
};

export default EpisodeSelector;