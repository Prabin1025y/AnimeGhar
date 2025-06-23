// Skeleton loader for AnimeContainer
const AnimeContainerSkeleton: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="max-w-7xl mx-auto py-6 animate-pulse">
      <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default AnimeContainerSkeleton;