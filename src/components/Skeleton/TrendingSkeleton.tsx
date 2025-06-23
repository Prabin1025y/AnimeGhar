const TrendingAnimeSkeleton: React.FC = () => {
    return (
        <section className="py-12 max-w-7xl mx-auto animate-pulse">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    </div>
                </div>
                {/* Anime Scroll Area Skeleton */}
                <div className="relative group">
                    <div className="flex space-x-4 pb-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="relative w-[200px] flex-shrink-0">
                                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-800" />
                                <div className="absolute top-2 left-2 w-12 h-6 bg-cyan-400/60 rounded" />
                                <div className="mt-2 h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingAnimeSkeleton;