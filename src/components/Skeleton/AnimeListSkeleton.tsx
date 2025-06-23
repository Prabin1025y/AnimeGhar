// Skeleton loader for AnimeLists
const AnimeListsSkeleton: React.FC = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 relative animate-pulse">
      <div
        className="max-w-7xl mx-auto grid gap-8"
        style={{
          gridTemplateAreas: `
            "featured featured ranked"
            "collections collections ranked"
          `,
          gridTemplateColumns: "1fr 1fr 30%",
          gridTemplateRows: "auto auto",
        }}
      >
        {/* Featured Anime Cards Skeleton */}
        <div className="h-96 bg-gray-800 rounded-lg col-span-2" style={{ gridArea: 'featured' }} />
        {/* Anime Collections Skeleton */}
        <div className="h-80 bg-gray-800 rounded-lg col-span-2" style={{ gridArea: 'collections' }} />
        {/* Top 10 Ranked List Skeleton */}
        <div className="h-full bg-gray-900 rounded-lg" style={{ gridArea: 'ranked', minHeight: 400 }} />
      </div>
    </div>
  );
};

export default AnimeListsSkeleton;