import { Slider } from '@/components/ui/slider'
import { Captions, Maximize2, Pause, PictureInPicture, Play, Redo2, Settings, Undo2, Volume2, VolumeOff } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

const Player: React.FC<{ className?: string, url: string }> = ({ className = "", url }) => {
    const search_params = useSearchParams()
    const episodeId = search_params.get("ep") || "";
    const videoPlayer = useRef<ReactPlayer>(null)
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showSubtitles, setShowSubtitles] = useState(true);
    const [currentSubtitle, setCurrentSubtitle] = useState('');
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    interface ProgressProps {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }

    const handleProgress = (progress: ProgressProps) => {
        setPlayed(progress.played);
    }

    const handleSeek = (value: number[]) => {
        const newPlayed = value[0] / 100;
        setPlayed(newPlayed);
        videoPlayer.current?.seekTo(newPlayed);
    };

    interface FormatTime {
        (seconds: number): string;
    }

    const formatTime: FormatTime = (seconds: number): string => {
        const mins: number = Math.floor(seconds / 60);
        const secs: number = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            // Enter fullscreen
            if (playerContainerRef.current?.requestFullscreen) {
                playerContainerRef.current.requestFullscreen();
                setIsFullscreen(true);
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className={`w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center ${className}`}>
            {/* <ReactPlayer key={episodeId} width="100%" height="100%" url={`https://anime-ghar-proxy.vercel.app/m3u8-proxy?url=${url}`} controls /> */}
            <div ref={playerContainerRef} className="relative w-full h-full aspect-video bg-gray-400">
                <ReactPlayer
                    ref={videoPlayer}
                    playing={isPlaying}
                    volume={muted ? 0 : volume}
                    playbackRate={playbackRate}
                    onProgress={handleProgress}
                    onDuration={setDuration}
                    key={episodeId}
                    width="100%"
                    height="100%"
                    url={`https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8`}
                />

                <div className={`absolute bottom-0 left-0 right-0 flex flex-col bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 }`}>
                    <div className="mb-4">
                        <Slider
                            colorClass='bg-cyan-600/70'
                            defaultValue={[0]}
                            value={played ? [played * 100] : [0]}
                            max={100}
                            step={1}
                            onValueChange={handleSeek}
                        />
                    </div>
                    <div className='w-full flex justify-between items-center text-white'>
                        <div className='flex items-center gap-4'>
                            {isPlaying ? <Pause onClick={() => setIsPlaying(false)} className='size-6 cursor-pointer' />
                                : <Play onClick={() => setIsPlaying(true)} className='size-6 cursor-pointer' />}

                            {muted || volume == 0 ?
                                <VolumeOff onClick={() => setMuted(!muted)} className='size-6 cursor-pointer' />
                                : <Volume2 onClick={() => setMuted(!muted)} className='size-6 cursor-pointer' />}
                            <Slider
                                colorClass='bg-yellow-600/70'
                                className='h-4 w-20'
                                defaultValue={[0.8]}
                                value={muted ? [0] : [volume]}
                                onValueChange={(v) => { setMuted(false); setVolume(v[0]) }}
                                max={1}
                                step={0.1}
                            />
                            <span>{formatTime(played * duration)} / {formatTime(duration)}</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Undo2 className='cursor-pointer' size={24} />
                            <Redo2 className='cursor-pointer' size={24} />
                            <Captions className='cursor-pointer' size={24} />
                            <Settings className='cursor-pointer' size={24} />
                            <PictureInPicture className='cursor-pointer' size={24} />
                            <Maximize2 onClick={toggleFullscreen} className='cursor-pointer' size={24} />
                        </div>
                    </div>
                </div>

                <div className={`absolute top-0 left-0 right-0 flex flex-col bg-gradient-to-b from-black to-transparent p-4 transition-opacity duration-300 }`}>
                    <p>Title of episode</p>
                </div>
            </div>
        </div>
    )
}

export default Player