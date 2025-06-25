import { AnimeDetailsDataType } from "@/types";
import { Building2, Calendar, Check, SkipForward, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SeasonCard from "./SeasonCard";

interface VideoInfoProps {
  className?: string;
  animeId: string;
  isDub: boolean;
  setIsDub: React.Dispatch<React.SetStateAction<boolean>>;
  autoSkip: boolean;
  setAutoSkip: React.Dispatch<React.SetStateAction<boolean>>;
}


const VideoInfo: React.FC<VideoInfoProps> = ({
  className = "",
  animeId,
  isDub,
  setIsDub,
  autoSkip,
  setAutoSkip,
}) => {
  const [animeDetail, setAnimeDetail] = useState<AnimeDetailsDataType | null>(
    null
  );
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/anime/${animeId}`
      );
      const result = await response.json();
      setAnimeDetail(result.data);
      console.log(result.data);
      setLoading(false);
    };
    fetchData();

  }, []);

  if (loading)
    return <VideoInfoSkeleton className={className} />;

  return (
    animeDetail === null ? (
      <VideoInfoSkeleton />
    ) : (
      <div className={`${className} bg-white dark:bg-gray-900 rounded-lg p-6 grid gap-6 grid-cols-4 grid-rows-[auto auto] items-start`}>
        {/* Poster */}
        {animeDetail?.anime.info.poster && (
          <div className="row-start-1 col-start-1 col-span-1 w-32 md:w-40 lg:w-48 aspect-[2/3] overflow-hidden">
            <img
              src={animeDetail.anime.info.poster}
              alt={animeDetail.anime.info.name + " Poster"}
              className="rounded-lg w-full h-full object-cover shadow-lg border border-gray-800"
            />
          </div>
        )}
        {/* Info */}
        <div className="row-start-1 col-start-2 col-span-3 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">
                {animeDetail?.anime.info.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-800 dark:text-gray-100 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{animeDetail?.anime.moreInfo.malscore}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{animeDetail?.anime.moreInfo.aired}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>{animeDetail?.anime.moreInfo.studios}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{`${animeDetail?.anime.info.stats.type}-${animeDetail?.anime.info.stats.rating}`}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-800 dark:text-gray-100 leading-relaxed line-clamp-3">
            {animeDetail?.anime.info.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {animeDetail?.anime.moreInfo.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <label className="text-primary font-medium">Audio:</label>
              <div className="flex bg-cyan-700/20 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setIsDub(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!isDub
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                      : "text-gray-800 dark:text-gray-400"
                    }`}
                  type="button"
                >
                  Subtitle
                </button>
                <button
                  onClick={() => setIsDub(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDub
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                      : "text-gray-800 dark:text-gray-400"
                    }`}
                  type="button"
                >
                  Dubbed
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoSkip}
                    onChange={(e) => setAutoSkip(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${autoSkip ? "bg-gradient-to-r from-cyan-400 to-blue-500 border-blue-600" : "border-gray-400"
                      }`}
                  >
                    {autoSkip && <Check className="w-3 h-3 text-primary" />}
                  </div>
                </div>
                <span className="text-primary font-medium flex items-center space-x-1">
                  <SkipForward className="w-4 h-4" />
                  <span>Auto Skip Intro</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* Seasons - only takes necessary width */}
        <div className="row-start-2 col-start-1 flex flex-wrap col-span-4 gap-3 mt-2">
          {animeDetail?.seasons.map((season) => (
            <Link key={season.id} href={`/watch/${season.id}`}>
              <SeasonCard poster={season.poster} name={season.title} isCurrent={season.isCurrent} />
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

const VideoInfoSkeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={` ${className} bg-gray-900 rounded-lg p-6 grid gap-6 grid-cols-4 grid-rows-[auto auto] items-start animate-pulse`}>
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
          <span key={i} className="px-6 py-2 bg-gray-800 rounded-full inline-block" />
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
        <div key={i} className="flex flex-col items-center w-48 space-y-2 rounded-md border border-blue-500 bg-gray-800">
          <div className="object-cover rounded w-full h-24 bg-gray-700" />
        </div>
      ))}
    </div>
  </div>
);

export default VideoInfo;