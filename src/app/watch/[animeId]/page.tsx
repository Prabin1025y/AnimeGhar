"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import VideoInfo from "./components/VideoInfo";
import EpisodeSelector from "./components/EpisodeSelector";
import RelatedAnime from "@/app/anime/[animeId]/_components/RelatedAnime";
import { AnimeDetailsDataType, EpisodeSourceType } from "@/types";
import { removeDuplicateRelatedAnimes } from "@/utilities";
import Player from "./components/Player";
import PlayerSkeleton from "./components/PlayerSkeleton";

export type EpisodeType = {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}

// const VideoPlayer: React.FC<{ className?: string }> = ({ className = "" }) => {
//   return (
//     <div className={`w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center ${className}`}>
//       <div className="text-white text-center">
//         <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
//         <p className="text-xl">Video Player Component</p>
//         <p className="text-sm opacity-70 mt-2">
//           Implement your video player here
//         </p>
//       </div>
//     </div>
//   );
// };



const VideoPlayerPage: React.FC = () => {
  const [isDub, setIsDub] = useState<boolean>(false);
  const [autoSkip, setAutoSkip] = useState<boolean>(true);
  const [animeDetail, setAnimeDetail] = useState<AnimeDetailsDataType | null>(
    null
  );
  const [episodesLoading, setEpisodesLoading] = useState(true)
  const [sourceLoading, setSourceLoading] = useState(true)
  const [EpisodeInfo, setEpisodeInfo] = useState<EpisodeSourceType | null>(null)


  useEffect(() => {
    setEpisodesLoading(true)
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/anime/${animeId}`
      );
      const result = await response.json();
      setAnimeDetail(result.data);
      console.log(result.data);
      setEpisodesLoading(false);
    };
    fetchData();

  }, []);

  const params = useParams<{ animeId: string }>();
  const animeId = params.animeId;
  const searchParams = useSearchParams();
  const episodeNumber = searchParams.get("ep");
  console.log(episodeNumber)

  useEffect(() => {
    const fetchData = async () => {
      setSourceLoading(true);
      if (!animeId || !episodeNumber) {
        setSourceLoading(false);
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${animeId}?ep=${searchParams.get("ep")}&server=hd-2&category=sub`
      );
      const data = await response.json();
      setEpisodeInfo(data.data);
      setSourceLoading(false);
    };
    fetchData();
  }, [episodeNumber]);

  return (
    <div className="min-h-screen bg-gray-950 p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 auto-rows-auto gap-6">
          {!sourceLoading && searchParams.get("ep") ?
            <Player
              url={EpisodeInfo?.sources?.[0]?.url || ""}
              tracks={EpisodeInfo?.tracks || []}
              className="col-span-3 row-span-1"
            />
            :
            <PlayerSkeleton />
          }
          <EpisodeSelector
            animeId={animeId}
            className="col-span-1 row-span-2 col-start-3 row-start-2 overflow-y-auto"
          />
          <VideoInfo
            className="col-span-2 row-span-1 row-start-2"
            animeId={animeId}
            isDub={isDub}
            setIsDub={setIsDub}
            autoSkip={autoSkip}
            setAutoSkip={setAutoSkip}
          />{
            animeDetail?.relatedAnimes && animeDetail.relatedAnimes.length > 0 &&
            <RelatedAnime gridClasses="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" className="col-span-2" relatedAnimes={removeDuplicateRelatedAnimes(animeDetail?.relatedAnimes)} />
          }

        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
