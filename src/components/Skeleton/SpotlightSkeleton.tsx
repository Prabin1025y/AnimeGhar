const SpotlightSkeleton: React.FC = () => {
    return (
        <section className="relative h-[80vh] overflow-hidden px-10 animate-pulse">
            <div className="absolute inset-y-0 inset-x-20">
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-800 rounded-xl" />
            </div>
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20">
                <div className="w-10 h-10 bg-gray-400 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20">
                <div className="w-10 h-10 bg-gray-400 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="w-8 h-3 bg-gray-400 dark:bg-gray-700 rounded-full" />
                ))}
            </div>
            <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6 overflow-hidden">
                <div className="flex w-full">
                    <div className="flex items-center space-x-12 w-full flex-shrink-0 min-w-full">
                        <div className="hidden lg:block flex-shrink-0">
                            <div className="relative">
                                <div className="w-[350px] h-[500px] bg-gray-400 dark:bg-gray-700 rounded-xl" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6 max-w-3xl">
                            <div className="space-y-4">
                                <div className="h-6 w-24 bg-gray-400 dark:bg-gray-700 rounded" />
                                <div className="h-12 w-64 bg-gray-300 dark:bg-gray-800 rounded" />
                                <div className="flex items-center space-x-6">
                                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-800 rounded" />
                                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-800 rounded" />
                                    <div className="h-6 w-24 bg-gray-400 dark:bg-gray-700 rounded" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="h-6 w-16 bg-gray-300 dark:bg-gray-800 rounded-full" />
                                    ))}
                                </div>
                            </div>
                            <div className="h-20 w-full bg-gray-200 dark:bg-gray-900 rounded" />
                            <div className="flex items-center space-x-4 pt-4">
                                <div className="h-12 w-32 bg-gray-400 dark:bg-gray-700 rounded" />
                                <div className="h-12 w-32 bg-gray-300 dark:bg-gray-800 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpotlightSkeleton;