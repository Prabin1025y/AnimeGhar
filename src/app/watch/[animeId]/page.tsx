"use client";
import React, { useEffect, useState } from "react";
import {
  Play,
  Check,
} from "lucide-react";
import { useParams } from "next/navigation";
import VideoInfo from "./components/VideoInfo";

// Type definitions
interface Episode {
  id: number;
  title: string;
  duration: string;
  watched: boolean;
}

type EpisodeType = {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}

interface AnimeData {
  title: string;
  description: string;
  rating: number;
  year: number;
  studio: string;
  genres: string[];
  totalSeasons: number;
  posterUrl?: string;
  episodes: {
    [season: number]: Episode[];
  };
}

interface EpisodeSelectorProps {
  currentSeason: number;
  setCurrentSeason: React.Dispatch<React.SetStateAction<number>>;
  currentEpisode: number;
  setCurrentEpisode: React.Dispatch<React.SetStateAction<number>>;
}

// Mock data for demonstration
const mockAnimeData: AnimeData = {
  title: "Attack on Titan",
  description:
    "Humanity fights for survival against giant humanoid Titans behind enormous walls. When the walls are breached, Eren Yeager and his friends join the military to fight back and uncover the truth about the Titans.",
  rating: 9.0,
  year: 2013,
  studio: "Mappa, Studio WIT",
  genres: ["Action", "Drama", "Fantasy"],
  totalSeasons: 4,
  posterUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
  episodes: {
    1: Array.from({ length: 125 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "24:30",
      watched: i < 12,
    })),
    2: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "24:30",
      watched: i < 8,
    })),
    3: Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "24:30",
      watched: i < 15,
    })),
    4: Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "24:30",
      watched: i < 20,
    })),
  },
};

const VideoPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg flex items-center justify-center">
      <div className="text-white text-center">
        <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
        <p className="text-xl">Video Player Component</p>
        <p className="text-sm opacity-70 mt-2">
          Implement your video player here
        </p>
      </div>
    </div>
  );
};

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  currentSeason,
  setCurrentSeason,
  currentEpisode,
  setCurrentEpisode,
}) => {
  const params = useParams<{ animeId: string }>();
  const animeId = params.animeId;

  const [episodeRange, setEpisodeRange] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: 50 });
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/anime/${animeId}/episodes`
      );
      const result = await response.json();
      setEpisodes(result.data.episodes);
      setIsLoading(false);
      // console.log(result.data)
    }
    fetchData();
  }, []);


  // const currentSeasonEpisodes = data.episodes[currentSeason] || [];
  const totalEpisodes = episodes.length;
  // Calculate episode ranges for dropdown
  const rangeSize = 50;
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
    setCurrentEpisode(episodeRanges[idx].start + 1);
  };
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Episodes</h2>
        <div className="text-sm text-gray-400">{totalEpisodes} episodes</div>
      </div>
      {/* Episode Range Dropdown */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">
          Episode
        </label>
        <select
          value={episodeRanges.findIndex(
            (r) => r.start === episodeRange.start && r.end === episodeRange.end
          )}
          onChange={handleRangeChange}
          className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          {episodeRanges.map((range, idx) => (
            <option key={idx} value={idx}>
              {range.start + 1}-{range.end}
            </option>
          ))}
        </select>
      </div>
      {/* Episode Grid */}
      <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto">
        {displayedEpisodes.map((episode) => (
          <button
            key={episode.episodeId}
            onClick={() => setCurrentEpisode(episode.number)}
            className={`aspect-square rounded-lg text-sm font-medium transition-colors border relative ${currentEpisode === episode.number
                ? "bg-blue-600 border-blue-500 text-white"
                : false
                  ? "bg-green-600 border-green-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
              }`}
            type="button"
          >
            {episode.number}
          </button>
        ))}
      </div>
    </div>
  );
};

const VideoPlayerPage: React.FC = () => {
  const [currentSeason, setCurrentSeason] = useState<number>(1);
  const [currentEpisode, setCurrentEpisode] = useState<number>(1);
  const [isDub, setIsDub] = useState<boolean>(false);
  const [autoSkip, setAutoSkip] = useState<boolean>(true);

  const params = useParams<{ animeId: string }>();
  const animeId = params.animeId;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/hianime/anime/${animeId}/episodes`
  //     ); // Replace with your API endpoint
  //     const data = await response.json();
  //     setEpisodes(data.data.episodes);
  //     // console.log(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Video Player and Info */}
          <div className="flex-1 space-y-6">
            <VideoPlayer />
            <VideoInfo
              isDub={isDub}
              setIsDub={setIsDub}
              autoSkip={autoSkip}
              setAutoSkip={setAutoSkip}
            />
          </div>

          {/* Right Section - Episode Selector */}
          <div className="w-full lg:w-80 xl:w-96">
            <EpisodeSelector
              currentSeason={currentSeason}
              setCurrentSeason={setCurrentSeason}
              currentEpisode={currentEpisode}
              setCurrentEpisode={setCurrentEpisode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
