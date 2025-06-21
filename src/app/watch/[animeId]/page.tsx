"use client";
import React, { useEffect, useState } from "react";
import {
  Play,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import VideoInfo from "./components/VideoInfo";
import EpisodeSelector from "./components/EpisodeSelector";
import RelatedAnime from "@/app/anime/[animeId]/_components/RelatedAnime";
import { AnimeDetailsDataType, EpisodeSourceType } from "@/types";
import { removeDuplicateRelatedAnimes } from "@/utilities";
import VideoPlayer from "./components/videoPlayer";
import Player from "./components/Player";

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
  const [currentEpisode, setCurrentEpisode] = useState<string>("");
  const [isDub, setIsDub] = useState<boolean>(false);
  const [autoSkip, setAutoSkip] = useState<boolean>(true);
  const [animeDetail, setAnimeDetail] = useState<AnimeDetailsDataType | null>(
    null
  );
  const [loading, setLoading] = useState(true)
  const [EpisodeInfo, setEpisodeInfo] = useState<EpisodeSourceType | null>(null)


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

  const params = useParams<{ animeId: string }>();
  const animeId = params.animeId;
  const searchParams = useSearchParams();
  const episodeNumber = searchParams.get("ep");
  console.log(episodeNumber)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${animeId}?ep=${searchParams.get("ep")}&server=hd-2&category=dub`
      );
      const data = await response.json();
      setEpisodeInfo(data.data)
    };
    fetchData();
  }, [episodeNumber]);

  return (
    <div className="min-h-screen bg-gray-950 p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 auto-rows-auto gap-6">
          {/* Left Section - Video Player and Info */}
          {/* <VideoPlayer className="col-span-3 row-span-1" /> */}
          {/* <VideoPlayer
            className="col-span-3 row-span-1"
            src={EpisodeInfo?.sources?.[0]?.url || ""}
            autoSkip={false}
            title={animeDetail?.anime.info.name || "Anime Video"}
          /> */}
          <Player url={EpisodeInfo?.sources?.[0]?.url || ""} className="col-span-3 row-span-1"/>
          {/* Right Section - Episode Selector */}
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
