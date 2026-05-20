"use client";
import Link from "next/link";
import {  useSearchParams } from "next/navigation";
import {  useState } from "react";

interface EpisodeSelectorProps {
    className?: string;
    episodes: number;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
    className = "",
    episodes,
}) => {
    const [episodeRange, setEpisodeRange] = useState<{
        start: number;
        end: number;
    }>({ start: 0, end: Math.min(100, episodes) });

    const searchParams = useSearchParams();

    // Calculate episode ranges for dropdown
    const rangeSize = 100;
    const episodeRanges = Array.from(
        { length: Math.ceil(episodes / rangeSize) },
        (_, i) => {
            const start = i * rangeSize;
            const end = Math.min(episodes, start + rangeSize);
            return { start, end };
        },
    );



    const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idx = Number(e.target.value);
        setEpisodeRange(episodeRanges[idx]);
    };


    return (
        <div
            className={`${className} bg-white dark:bg-gray-900 rounded-lg p-4 h-fit`}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-primary font-semibold text-lg">Episodes</h2>
                <div className="text-sm text-gray-700 dark:text-gray-400">
                    {episodes} episodes
                </div>
            </div>
            {/* Episode Range Dropdown */}
            <div className="mb-4">
                <select
                    value={episodeRanges.findIndex(
                        (r) =>
                            r.start === episodeRange.start &&
                            r.end === episodeRange.end,
                    )}
                    onChange={handleRangeChange}
                    className="w-full dark:bg-gray-800 text-primary rounded-lg px-3 py-2 border dark:border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                    {episodeRanges.map((range, idx) => (
                        <option
                            key={idx}
                            value={idx}
                        >
                            {range.start + 1}-{range.end}
                        </option>
                    ))}
                </select>
            </div>
            {/* Episode Grid */}
            <div className="flex flex-wrap justify-center-safe gap-2 overflow-y-auto">
                {Array.from(
                    { length: episodeRange.end - episodeRange.start},
                    (_, i) => episodeRange.start + i,
                ).map((episode) => (
                    <Link
                        key={episode}
                        prefetch={false}
                        href={`?ep=${episode + 1}`}
                        className={`min-w-[60px] h-10 px-3 backdrop-blur-sm border transition-all duration-200 rounded-md flex items-center justify-center text-sm flex-shrink-0 ${Number(searchParams.get("ep")) === episode + 1 ? "border-emerald-700/50 text-emerald-400 bg-emerald-500/20" : "bg-gray-600/20 dark:bg-gray-800/20 border-gray-600/30 dark:border-gray-700/30 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 hover:border-cyan-300/50 dark:hover:border-cyan-700/50 text-gray-900 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"}`}
                    >
                        {episode + 1}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EpisodeSelector;
