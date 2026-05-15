import { Skeleton } from "@/components/ui/skeleton";

export const VideoInfoSkeleton: React.FC<{ className?: string }> = ({
    className = "",
}) => (
    <div
        className={` ${className} bg-gray-900 rounded-lg p-6 grid gap-6 grid-cols-4 grid-rows-[auto auto] items-start animate-pulse`}
    >
        {/* Poster Skeleton */}
        <div className="row-start-1 col-start-1 col-span-1 w-32 md:w-40 lg:w-48 aspect-[2/3] overflow-hidden bg-gray-800 rounded-lg" />
        {/* Info Skeleton */}
        <div className="row-start-1 col-start-2 col-span-3 space-y-4">
            <div className="h-7 w-1/2 bg-gray-800 rounded mb-2" />
            <div className="flex items-center space-x-4 mb-4">
                <div className="h-4 w-12 bg-gray-800 rounded" />
                <div className="h-4 w-16 bg-gray-800 rounded" />
                <div className="h-4 w-20 bg-gray-800 rounded" />
                <div className="h-4 w-14 bg-gray-800 rounded" />
            </div>
            <div className="h-5 w-full bg-gray-800 rounded" />
            <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <span
                        key={i}
                        className="px-6 py-2 bg-gray-800 rounded-full inline-block"
                    />
                ))}
            </div>
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-700">
                <div className="h-8 w-32 bg-gray-800 rounded" />
                <div className="h-8 w-32 bg-gray-800 rounded" />
            </div>
        </div>
        {/* Seasons Skeleton */}
        <div className="row-start-2 col-start-1 col-span-4 flex gap-3 mt-2">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col items-center w-48 space-y-2 rounded-md border border-blue-500 bg-gray-800"
                >
                    <div className="object-cover rounded w-full h-24 bg-gray-700" />
                </div>
            ))}
        </div>
    </div>
);

// Skeleton loader for EpisodeSelector
export const EpisodeSelectorSkeleton: React.FC<{ className?: string }> = ({
    className = "",
}) => {
    return (
        <div
            className={`${className} bg-white dark:bg-gray-900 rounded-lg p-4 h-fit animate-pulse`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
            <div className="mb-4">
                <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded-lg" />
            </div>
            <div className="flex flex-wrap justify-center-safe gap-2 overflow-y-auto">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="min-w-[60px] h-10 px-3 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center"
                    />
                ))}
            </div>
        </div>
    );
};

export default function AnimeCardsGridSkeleton({
    noOfElements,
}: {
    noOfElements: number;
}) {
    return (
        <section className="max-w-7xl container mx-auto mt-6 mb-4">
            {/* Heading */}
            <Skeleton className="h-8 w-48 rounded-md mb-6" />

            {/* Cards */}
            <div className="gw-auto flex flex-wrap gap-3 mx-auto justify-center xl:justify-start">
                {Array.from({ length: noOfElements }).map((_, index) => (
                    <div
                        key={index}
                        className="w-32 sm:w-44 md:w-52 max-w-52"
                    >
                        <div className="border rounded-md overflow-hidden shadow-lg">
                            {/* Poster */}
                            <Skeleton className="w-full h-52 md:h-64" />

                            {/* Content */}
                            <div className="p-2 md:p-4 space-y-3">
                                {/* Title */}
                                <Skeleton className="h-4 w-3/4" />

                                {/* Bottom Info */}
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-3 w-12" />

                                    <div className="flex gap-2">
                                        <Skeleton className="h-3 w-10" />
                                        <Skeleton className="h-3 w-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
