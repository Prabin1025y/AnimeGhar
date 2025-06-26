import { Slider } from '@/components/ui/slider'
import { parseVTT } from '@/utilities'
import { Captions, Expand, Minimize, Pause,  Play, Volume2, VolumeOff } from 'lucide-react'
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { MdSpeed } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
// import { Poppins } from 'next/font/google'

type PlayerProps = {
    className?: string;
    url: string;
    tracks?: {
        url: string;
        lang: string;
    }[];
    title?: string;
    isDub: boolean;
}

// const roboto = Roboto({
//     subsets: ['latin'],
//     weight: '600'
// })


const Player: React.FC<PlayerProps> = ({ className = "", url, tracks, isDub }) => {
    const search_params = useSearchParams()
    const episodeId = search_params.get("ep") || "";
    const videoPlayer = useRef<ReactPlayer>(null)
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSubtitle, setCurrentSubtitle] = useState('');
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [selectedLanguage, setSelectedLanguage] = useState(isDub ? "None" : (tracks?.filter(t => t.lang == "English")[0] ? "English" : tracks?.[0]?.lang || "None"));
    const [subtitleTracks, setSubtitleTracks] = useState<{ [key: string]: { start: number; end: number; text: string }[] }>({});
    const [loadingSubtitles, setLoadingSubtitles] = useState(false);

    // console.log(url, tracks)

    useEffect(() => {
        tracks?.forEach(source => {
            loadSubtitleFile(source.url, source.lang);
        });
    }, [tracks]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, [isPlaying]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger shortcuts if user is typing in an input
            if ((e.target instanceof Element) && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
                return;
            }

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    setIsPlaying(!isPlaying);
                    break;

                case 'KeyK':
                    e.preventDefault();
                    setIsPlaying(!isPlaying);
                    break;

                case 'ArrowLeft':
                    e.preventDefault();
                    // Seek backward 10 seconds
                    handleSkip('backward');
                    break;

                case 'ArrowRight':
                    e.preventDefault();
                    // Seek forward 10 seconds
                    handleSkip('forward');
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    // Volume up
                    const newVolumeUp = Math.min(1, volume + 0.1);
                    setVolume(newVolumeUp);
                    setMuted(false);
                    break;

                case 'ArrowDown':
                    e.preventDefault();
                    // Volume down
                    const newVolumeDown = Math.max(0, volume - 0.1);
                    setVolume(newVolumeDown);
                    break;

                case 'KeyM':
                    e.preventDefault();
                    setMuted(!muted);
                    break;

                case 'KeyF':
                    e.preventDefault();
                    toggleFullscreen();
                    break;

                case 'KeyC':
                    e.preventDefault();
                    setSelectedLanguage("None");
                    break;

                case 'Comma':
                    if (e.shiftKey) {
                        e.preventDefault();
                        // Decrease playback speed
                        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
                        const currentIndex = speeds.indexOf(playbackRate);
                        if (currentIndex > 0) {
                            setPlaybackRate(speeds[currentIndex - 1]);
                        }
                    }
                    break;

                case 'Period':
                    if (e.shiftKey) {
                        e.preventDefault();
                        // Increase playback speed
                        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
                        const currentIndex = speeds.indexOf(playbackRate);
                        if (currentIndex < speeds.length - 1) {
                            setPlaybackRate(speeds[currentIndex + 1]);
                        }
                    }
                    break;

                case 'Digit0':
                case 'Digit1':
                case 'Digit2':
                case 'Digit3':
                case 'Digit4':
                case 'Digit5':
                case 'Digit6':
                case 'Digit7':
                case 'Digit8':
                case 'Digit9':
                    e.preventDefault();
                    // Jump to percentage of video (0-9 = 0%-90%)
                    const percentage = parseInt(e.code.slice(-1)) / 10;
                    setPlayed(percentage);
                    videoPlayer.current?.seekTo(percentage);
                    break;

                case 'Home':
                    e.preventDefault();
                    // Go to beginning
                    setPlayed(0);
                    videoPlayer.current?.seekTo(0);
                    break;

                case 'End':
                    e.preventDefault();
                    // Go to end
                    setPlayed(0.99);
                    videoPlayer.current?.seekTo(0.99);
                    break;

                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, volume, muted, played, duration, playbackRate, selectedLanguage]);

    interface ProgressProps {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }

    const handleProgress = (progress: ProgressProps) => {
        setPlayed(progress.played);
        // console.log("Coming")

        if (selectedLanguage !== "None" && subtitleTracks[selectedLanguage]) {
            const timeDelay = 0.2 //to synchronize subtitles with video
            const currentTime = progress.playedSeconds + timeDelay;
            const subtitle = subtitleTracks[selectedLanguage].find((sub: { start: number; end: number; text: string }) =>
                currentTime >= sub.start && currentTime <= sub.end
            );
            // console.log(selectedLanguage)
            // console.log(subtitleTracks[selectedLanguage])
            setCurrentSubtitle(subtitle ? subtitle.text : '');
        } else {
            setCurrentSubtitle('');
        }
    }

    const handleSkip = (direction: 'forward' | 'backward') => {
        if (videoPlayer.current) {
            const skipAmount = direction === 'forward' ? 10 : -10;
            const newPlayed = Math.min(Math.max(played + skipAmount / duration, 0), 1);
            setPlayed(newPlayed);
            videoPlayer.current.seekTo(newPlayed);
        }
    };

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

    const loadSubtitleFile = async (url: string, languageCode: string) => {
        try {

            if (languageCode == "thumbnails")
                return;

            setLoadingSubtitles(true);
            const response = await fetch(url);
            const vttContent = await response.text();
            const parsedSubtitles = parseVTT(vttContent);
            // console.log(vttContent)

            setSubtitleTracks(prev => ({
                ...prev,
                [languageCode]: parsedSubtitles
            }));
        } catch (error) {
            console.error(`Error loading subtitles for ${languageCode}:`, error);
            // Fallback to demo subtitles if loading fails
            // if (demoSubtitles[languageCode]) {
            //     setSubtitleTracks(prev => ({
            //         ...prev,
            //         [languageCode]: demoSubtitles[languageCode]
            //     }));
            // }
        } finally {
            setLoadingSubtitles(false);
        }
    };

    const handleLanguageSelect = (value: string) => {
        setSelectedLanguage(value);

        // Load subtitles if not already loaded
        if (!subtitleTracks[value]) {
            const source = tracks?.find(s => s.lang === value);
            if (source) {
                loadSubtitleFile(source.url, value);
            }
        }
    };

    // const getCurrentLanguageName = () => {
    //     const source = tracks?.find(s => s.lang === selectedLanguage);
    //     return source ? source.lang : 'English';
    // };

    return (
        <div className={`w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center ${className}`}>
            {/* <ReactPlayer key={episodeId} width="100%" height="100%" url={`https://anime-ghar-proxy.vercel.app/m3u8-proxy?url=${url}`} controls /> */}
            <div ref={playerContainerRef} className="relative w-full h-full aspect-video bg-black">
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
                    url={`${process.env.NEXT_PUBLIC_PROXY_URL}${url}`}
                />

                {/* PlayPauseClick */}
                <div onClick={() => setIsPlaying(!isPlaying)} className={`absolute bg-transparent left-0 top-10 w-full min-h-[80%] }`} />

                {/* Subtitles Overlay */}
                {selectedLanguage !== "None" && currentSubtitle && (
                    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2  text-white px-4 text-center max-w-3xl w-fit mx-4">
                        <p
                            className={`text-outline-black font-bold text-3xl leading-snug whitespace-pre-line`}
                            dangerouslySetInnerHTML={{ __html: currentSubtitle }}
                        />
                    </div>
                )}

                {/* Loading Subtitles Indicator */}
                {loadingSubtitles && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded text-sm">
                        Loading subtitles...
                    </div>
                )}

                <div className={`${showControls ? 'opacity-100' : 'opacity-0'} absolute bottom-0 left-0 right-0 flex flex-col bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300`}>
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
                            <TbRewindBackward10 onClick={() => handleSkip("backward")} className='cursor-pointer' size={24} />
                            <TbRewindForward10 onClick={() => handleSkip("forward")} className='cursor-pointer' size={24} />
                            {(tracks?.filter(t => t.lang !== "thumbnails") ?? []).length > 0 && <Select onValueChange={handleLanguageSelect} value={selectedLanguage}>
                                <SelectTrigger className="w-[180px]">
                                    <Captions className='cursor-pointer text-white size-6' size={24} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Languages</SelectLabel>
                                        <SelectItem key={"None"} value={"None"}>None</SelectItem>
                                        {tracks?.map((track, index) => (track.lang !== "thumbnails" &&
                                            <SelectItem key={track.lang + index} value={track.lang}>{track.lang}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>}
                            <Select onValueChange={(value) => setPlaybackRate(parseFloat(value))} value={playbackRate.toString()}>
                                <SelectTrigger className="w-[180px]">
                                    <MdSpeed className='cursor-pointer text-white size-6' size={24} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Playback Speed</SelectLabel>
                                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                            <SelectItem key={rate} value={rate.toString()}>{rate}x</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* <PictureInPicture className='cursor-pointer' size={24} /> */}
                            {isFullscreen ? <Minimize onClick={toggleFullscreen} className='cursor-pointer' size={24} /> : <Expand onClick={toggleFullscreen} className='cursor-pointer' size={24} />}
                        </div>
                    </div>
                </div>

                {/* <div className={`${showControls ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 right-0 flex flex-col bg-gradient-to-b from-black to-transparent p-4 transition-opacity duration-300 }`}>
                    <p className='text-2xl'>{title}</p>
                </div> */}
            </div>
        </div>
    )
}

export default Player