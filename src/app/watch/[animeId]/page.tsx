'use client'
import React, { useState } from 'react';
import { Play, Star, Calendar, Building2, Users, ChevronLeft, ChevronRight, Check, SkipForward } from 'lucide-react';

// Type definitions
interface Episode {
  id: number;
  title: string;
  duration: string;
  watched: boolean;
}

interface AnimeData {
  title: string;
  description: string;
  rating: number;
  year: number;
  studio: string;
  genres: string[];
  totalSeasons: number;
  episodes: {
    [season: number]: Episode[];
  };
}

interface VideoInfoProps {
  data: AnimeData;
  isDub: boolean;
  setIsDub: React.Dispatch<React.SetStateAction<boolean>>;
  autoSkip: boolean;
  setAutoSkip: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EpisodeSelectorProps {
  data: AnimeData;
  currentSeason: number;
  setCurrentSeason: React.Dispatch<React.SetStateAction<number>>;
  currentEpisode: number;
  setCurrentEpisode: React.Dispatch<React.SetStateAction<number>>;
}

// Mock data for demonstration
const mockAnimeData: AnimeData = {
  title: "Attack on Titan",
  description: "Humanity fights for survival against giant humanoid Titans behind enormous walls. When the walls are breached, Eren Yeager and his friends join the military to fight back and uncover the truth about the Titans.",
  rating: 9.0,
  year: 2013,
  studio: "Mappa, Studio WIT",
  genres: ["Action", "Drama", "Fantasy"],
  totalSeasons: 4,
  episodes: {
    1: Array.from({length: 25}, (_, i) => ({id: i + 1, title: `Episode ${i + 1}`, duration: "24:30", watched: i < 12})),
    2: Array.from({length: 12}, (_, i) => ({id: i + 1, title: `Episode ${i + 1}`, duration: "24:30", watched: i < 8})),
    3: Array.from({length: 22}, (_, i) => ({id: i + 1, title: `Episode ${i + 1}`, duration: "24:30", watched: i < 15})),
    4: Array.from({length: 28}, (_, i) => ({id: i + 1, title: `Episode ${i + 1}`, duration: "24:30", watched: i < 20}))
  }
};

const VideoPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg flex items-center justify-center">
      <div className="text-white text-center">
        <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
        <p className="text-xl">Video Player Component</p>
        <p className="text-sm opacity-70 mt-2">Implement your video player here</p>
      </div>
    </div>
  );
};

const VideoInfo: React.FC<VideoInfoProps> = ({ data, isDub, setIsDub, autoSkip, setAutoSkip }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{data.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{data.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{data.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Building2 className="w-4 h-4" />
              <span>{data.studio}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>TV-14</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed">{data.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {data.genres.map(genre => (
          <span key={genre} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            {genre}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6 pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <label className="text-white font-medium">Audio:</label>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setIsDub(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isDub ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              type="button"
            >
              Subtitle
            </button>
            <button
              onClick={() => setIsDub(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isDub ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
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
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                autoSkip ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
              }`}>
                {autoSkip && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
            <span className="text-white font-medium flex items-center space-x-1">
              <SkipForward className="w-4 h-4" />
              <span>Auto Skip Intro</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  data,
  currentSeason,
  setCurrentSeason,
  currentEpisode,
  setCurrentEpisode
}) => {
  const [episodeRange, setEpisodeRange] = useState<{ start: number; end: number }>({ start: 0, end: 50 });

  const currentSeasonEpisodes = data.episodes[currentSeason] || [];
  const displayedEpisodes = currentSeasonEpisodes.slice(episodeRange.start, episodeRange.end);

  const totalEpisodes = currentSeasonEpisodes.length;
  const canGoBack = episodeRange.start > 0;
  const canGoForward = episodeRange.end < totalEpisodes;

  const handleRangeBack = () => {
    if (canGoBack) {
      const newStart = Math.max(0, episodeRange.start - 50);
      setEpisodeRange({ start: newStart, end: newStart + 50 });
    }
  };

  const handleRangeForward = () => {
    if (canGoForward) {
      const newStart = episodeRange.start + 50;
      setEpisodeRange({ start: newStart, end: Math.min(totalEpisodes, newStart + 50) });
    }
  };

  const handleSeasonChange = (season: number) => {
    setCurrentSeason(season);
    setEpisodeRange({ start: 0, end: 50 });
    setCurrentEpisode(1);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Episodes</h2>
        <div className="text-sm text-gray-400">
          {totalEpisodes} episodes
        </div>
      </div>

      {/* Season Selector */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">Season</label>
        <select
          value={currentSeason}
          onChange={(e) => handleSeasonChange(Number(e.target.value))}
          className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          {Array.from({ length: data.totalSeasons }, (_, i) => i + 1).map(season => (
            <option key={season} value={season}>
              Season {season} ({data.episodes[season]?.length || 0} episodes)
            </option>
          ))}
        </select>
      </div>

      {/* Episode Range Controls */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <button
          onClick={handleRangeBack}
          disabled={!canGoBack}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
            canGoBack 
              ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <span className="text-gray-400">
          {episodeRange.start + 1}-{Math.min(episodeRange.end, totalEpisodes)} of {totalEpisodes}
        </span>
        
        <button
          onClick={handleRangeForward}
          disabled={!canGoForward}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
            canGoForward 
              ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
          type="button"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Episode Grid */}
      <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto">
        {displayedEpisodes.map((episode) => (
          <button
            key={episode.id}
            onClick={() => setCurrentEpisode(episode.id)}
            className={`aspect-square rounded-lg text-sm font-medium transition-colors border relative ${
              currentEpisode === episode.id
                ? 'bg-blue-600 border-blue-500 text-white'
                : episode.watched 
                  ? 'bg-green-600 border-green-500 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
            }`}
            type="button"
          >
            {episode.id}
            {episode.watched && currentEpisode !== episode.id && (
              <Check className="w-3 h-3 absolute top-0.5 right-0.5 text-white" />
            )}
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

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Video Player and Info */}
          <div className="flex-1 space-y-6">
            <VideoPlayer />
            <VideoInfo 
              data={mockAnimeData}
              isDub={isDub}
              setIsDub={setIsDub}
              autoSkip={autoSkip}
              setAutoSkip={setAutoSkip}
            />
          </div>

          {/* Right Section - Episode Selector */}
          <div className="w-full lg:w-80 xl:w-96">
            <EpisodeSelector
              data={mockAnimeData}
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