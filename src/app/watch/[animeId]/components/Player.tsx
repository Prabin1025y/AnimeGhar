import { Slider } from "@/components/ui/slider";
import { parseVTT } from "@/utilities";
import {
    Captions,
    Expand,
    Loader2,
    Minimize,
    Pause,
    Play,
    Volume2,
    VolumeOff,
} from "lucide-react";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { MdSpeed } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

type PlayerProps = {
    className?: string;
    url: string;
    tracks?: {
        url: string;
        lang: string;
    }[];
    title?: string;
    isDub: boolean;
};

const Player: React.FC<PlayerProps> = ({
    className = "",
    url,
    tracks,
    isDub,
}) => {
    const search_params = useSearchParams();
    const episodeId = search_params.get("ep") || "";

    const videoPlayer = useRef<ReactPlayer>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false); // is video playing?
    const [volume, setVolume] = useState(0.8); // volume level from 0 to 1
    const [muted, setMuted] = useState(false); // is video muted?
    const [played, setPlayed] = useState(0); // played fraction from 0 to 1
    const [duration, setDuration] = useState(0); // video duration in seconds
    const [currentSubtitle, setCurrentSubtitle] = useState(""); // current line subtitle text to display
    const [showControls, setShowControls] = useState(true); // show/hide video controls
    const [isFullscreen, setIsFullscreen] = useState(false); // is video in fullscreen mode?
    const [playbackRate, setPlaybackRate] = useState<number>(1); // playback speed of the video
    const [selectedLanguage, setSelectedLanguage] = useState(
        isDub
            ? "None"
            : tracks?.filter((t) => t.lang == "English")[0]
              ? "English"
              : tracks?.[0]?.lang || "None",
    ); // selected subtitle language, default to English if available, otherwise first track or None
    const [subtitleTracks, setSubtitleTracks] = useState<{
        [key: string]: { start: number; end: number; text: string }[];
    }>({}); // store subtitle tracks by language code
    const [isLoading, setIsLoading] = useState(true); // is video loading?

    useEffect(() => {
        tracks?.forEach((source) => {
            loadSubtitleFile(source.url, source.lang);
        });
    }, [tracks]);

    useEffect(() => {
        // Show/hide video controls on mouse or touch movement (desktop & mobile)
        // On desktop: listen for mousemove
        // On mobile: listen for touchstart/touchmove
        // Controls auto-hide after 3s of inactivity while playing

        let timeout: NodeJS.Timeout;

        // Handler to show controls and reset hide timer
        const showAndAutoHideControls = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        // Attach both mouse and touch listeners for cross-device support
        document.addEventListener("mousemove", showAndAutoHideControls);
        document.addEventListener("touchstart", showAndAutoHideControls);
        document.addEventListener("touchmove", showAndAutoHideControls);

        return () => {
            document.removeEventListener("mousemove", showAndAutoHideControls);
            document.removeEventListener("touchstart", showAndAutoHideControls);
            document.removeEventListener("touchmove", showAndAutoHideControls);
            clearTimeout(timeout);
        };
    }, [isPlaying]);

    interface ProgressProps {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }

    const handleProgress = (progress: ProgressProps) => {
        setPlayed(progress.played);
        // console.log("Coming")

        // Update current subtitle line based on the current time
        if (selectedLanguage !== "None" && subtitleTracks[selectedLanguage]) {
            const timeDelay = 0.2; //to synchronize subtitles with video
            const currentTime = progress.playedSeconds + timeDelay;

            //todo: need adjustment, this brings only one line, not effective for multiple lines
            const subtitle = subtitleTracks[selectedLanguage].find(
                (sub: { start: number; end: number; text: string }) =>
                    currentTime >= sub.start && currentTime <= sub.end,
            );
            setCurrentSubtitle(subtitle ? subtitle.text : "");
        } else {
            setCurrentSubtitle("");
        }
    };

    //todo: need adjustment, right now it is working in fractions not in seconds
    const handleSkip = useCallback((direction: "forward" | "backward") => {
        if (videoPlayer.current) {
            const skipAmount = direction === "forward" ? 10 : -10;
            const newPlayed = Math.min(
                Math.max(played + skipAmount / duration, 0),
                1,
            );
            setPlayed(newPlayed);
            videoPlayer.current.seekTo(newPlayed);
        }
    }, [duration, played]);

    // Handle seeking through the slider
    const handleSeek = useCallback((value: number[]) => {
        //convert to fraction value
        const newPlayed = value[0] / 100;
        setPlayed(newPlayed);
        videoPlayer.current?.seekTo(newPlayed);
    }, []);

    //format time for showing track time
    const formatTime = (seconds: number): string => {
        const mins: number = Math.floor(seconds / 60);
        const secs: number = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Function to check if the device is iOS
    // This is used to handle fullscreen and orientation lock issues on iOS devices
    function isIOS(): boolean {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    const toggleFullscreen = useCallback(async () => {
        if (!isFullscreen) {
            if (isIOS()) {
                toast.error(
                    "Please rotate your phone to landscape mode to enter fullscreen.",
                );
            }

            // Enter fullscreen
            if (playerContainerRef.current?.requestFullscreen) {
                playerContainerRef.current.requestFullscreen();
                setIsFullscreen(true);
            }

            //try auto rotating screen to landscape mode in mobile devices
            try {
                const orientation = screen.orientation as ScreenOrientation & {
                    lock: (orientation: string) => Promise<void>;
                };
                if (orientation) {
                    await orientation.lock("landscape");
                }
            } catch (err) {
                console.warn("Orientation lock failed:", err);
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }

            //try auto unlocking screen orientation in mobile devices
            try {
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            } catch (err) {
                console.warn("Orientation unlock failed:", err);
            }
        }
    }, [isFullscreen]);

    //fetch subtitle from url, parse it and set it to the state
    const loadSubtitleFile = async (url: string, languageCode: string) => {
        try {
            // Ignore the thumbnails track. It is for displaying timestamp images, not subtitles.
            if (languageCode == "thumbnails") return;

            // setLoadingSubtitles(true);
            //fetch data from subtitle url
            const response = await fetch(url);
            const vttContent = await response.text();
            if (!response.ok || !vttContent) {
                if (process.env.NODE_ENV === "development")
                    console.warn(
                        `Failed to load subtitles for ${languageCode} from ${url}`,
                    );
                return;
            }

            //parse the vtt content to individual lines with start and end times
            const parsedSubtitles = parseVTT(vttContent);
            if (!parsedSubtitles || parsedSubtitles.length === 0) {
                if (process.env.NODE_ENV === "development") {
                    console.warn(
                        `No valid subtitles found for ${languageCode} in ${url}`,
                    );
                }
                return;
            }

            //set the subtitles to the state
            setSubtitleTracks((prev) => ({
                ...prev,
                [languageCode]: parsedSubtitles,
            }));
        } catch (error) {
            console.error(
                `Error loading subtitles for ${languageCode}:`,
                error,
            );
        }
    };

    // Handle language selection through the Select component
    const handleLanguageSelect = (value: string) => {
        setSelectedLanguage(value);

        // Load subtitles if not already loaded
        if (!subtitleTracks[value]) {
            const source = tracks?.find((s) => s.lang === value);
            if (source) {
                loadSubtitleFile(source.url, value);
            }
        }
    };

    // Handle keydown events for keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger shortcuts if user is typing in an input
            if (
                e.target instanceof Element &&
                (e.target.tagName === "INPUT" ||
                    e.target.tagName === "TEXTAREA")
            ) {
                return;
            }

            switch (e.code) {
                case "Space":
                    e.preventDefault();
                    setIsPlaying(!isPlaying);
                    break;

                case "KeyK":
                    e.preventDefault();
                    setIsPlaying(!isPlaying);
                    break;

                case "ArrowLeft":
                    e.preventDefault();
                    // Seek backward 10 seconds
                    handleSkip("backward");
                    break;

                case "ArrowRight":
                    e.preventDefault();
                    // Seek forward 10 seconds
                    handleSkip("forward");
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    // Volume up
                    const newVolumeUp = Math.min(1, volume + 0.1);
                    setVolume(newVolumeUp);
                    setMuted(false);
                    break;

                case "ArrowDown":
                    e.preventDefault();
                    // Volume down
                    const newVolumeDown = Math.max(0, volume - 0.1);
                    setVolume(newVolumeDown);
                    break;

                case "KeyM":
                    e.preventDefault();
                    setMuted(!muted);
                    break;

                case "KeyF":
                    e.preventDefault();
                    toggleFullscreen();
                    break;

                // case 'KeyC':
                //     e.preventDefault();
                //     setSelectedLanguage("None");
                //     break;

                case "Comma":
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

                case "Period":
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

                case "Digit0":
                case "Digit1":
                case "Digit2":
                case "Digit3":
                case "Digit4":
                case "Digit5":
                case "Digit6":
                case "Digit7":
                case "Digit8":
                case "Digit9":
                    e.preventDefault();
                    // Jump to percentage of video (0-9 = 0%-90%)
                    const percentage = parseInt(e.code.slice(-1)) / 10;
                    setPlayed(percentage);
                    videoPlayer.current?.seekTo(percentage);
                    break;

                case "Home":
                    e.preventDefault();
                    // Go to beginning
                    setPlayed(0);
                    videoPlayer.current?.seekTo(0);
                    break;

                case "Escape":
                    setIsFullscreen(false);
                    break;

                case "End":
                    e.preventDefault();
                    // Go to end
                    setPlayed(0.99);
                    videoPlayer.current?.seekTo(0.99);
                    break;

                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        isPlaying,
        volume,
        muted,
        played,
        duration,
        playbackRate,
        selectedLanguage,
        handleSeek,
        handleSkip,
        toggleFullscreen,
    ]);

    return (
        <div
            className={`w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center ${className}`}
        >
            <div
                ref={playerContainerRef}
                className={`relative w-full h-full aspect-video bg-black ${showControls ? "cursor-auto" : "cursor-none"}`}
            >
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-16 h-16 text-gray-500 animate-spin" />
                    </div>
                )}

                {/* Actual Video Player */}
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
                    onReady={() => setIsLoading(false)}
                    onBuffer={() => setIsLoading(true)}
                    onBufferEnd={() => setIsLoading(false)}
                />

                {/* PlayPauseClick Sensor */}
                <div
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`absolute bg-transparent left-0 top-10 w-full min-h-[80%] }`}
                />

                {/* Subtitles Overlay */}
                {selectedLanguage !== "None" && currentSubtitle && (
                    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2  text-white lg:px-4 w-full text-center mx-4">
                        <p
                            className={`text-outline-black font-bold text-xl sm:text-2xl lg:text-3xl leading-snug whitespace-pre-line`}
                            dangerouslySetInnerHTML={{
                                __html: currentSubtitle,
                            }}
                        />
                    </div>
                )}

                {/* Video Controls */}
                <div
                    className={`${showControls ? "opacity-100" : "opacity-0"} absolute bottom-0 left-0 right-0 flex flex-col bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300`}
                >
                    {/* Slider for duration of video */}
                    <div className="mb-4">
                        <Slider
                            colorClass="bg-cyan-600/70"
                            defaultValue={[0]}
                            value={played ? [played * 100] : [0]}
                            max={100}
                            step={1}
                            onValueChange={handleSeek}
                        />
                    </div>

                    {/* Control buttons */}
                    <div className="w-full flex justify-between items-center text-white">
                        <div className="flex items-center gap-2 sm:gap-4">
                            {isPlaying ? (
                                <Pause
                                    onClick={() => setIsPlaying(false)}
                                    className="size-6 cursor-pointer"
                                />
                            ) : (
                                <Play
                                    onClick={() => setIsPlaying(true)}
                                    className="size-4 sm:size-6 cursor-pointer"
                                />
                            )}

                            {muted || volume == 0 ? (
                                <VolumeOff
                                    onClick={() => setMuted(!muted)}
                                    className="size-4 sm:size-6 cursor-pointer"
                                />
                            ) : (
                                <Volume2
                                    onClick={() => setMuted(!muted)}
                                    className="size-4 sm:size-6 cursor-pointer"
                                />
                            )}

                            {/* Volume slider */}
                            <Slider
                                colorClass="bg-yellow-600/70"
                                className="h-4 w-12 sm:w-20"
                                defaultValue={[0.8]}
                                value={muted ? [0] : [volume]}
                                onValueChange={(v) => {
                                    setMuted(false);
                                    setVolume(v[0]);
                                }}
                                max={1}
                                step={0.1}
                            />
                            <span className="text-xs sm:text-base">
                                {formatTime(played * duration)} /{" "}
                                {formatTime(duration)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <TbRewindBackward10
                                onClick={() => handleSkip("backward")}
                                className="cursor-pointer size-4 sm:size-6"
                                size={24}
                            />
                            <TbRewindForward10
                                onClick={() => handleSkip("forward")}
                                className="cursor-pointer size-4 sm:size-6"
                                size={24}
                            />

                            {/* Subtitle selection dropdown */}
                            {(
                                tracks?.filter(
                                    (t) => t.lang !== "thumbnails",
                                ) ?? []
                            ).length > 0 && (
                                <Select
                                    onValueChange={handleLanguageSelect}
                                    value={selectedLanguage}
                                >
                                    <SelectTrigger className="w-[130px] sm:w-[180px]">
                                        <Captions
                                            className="cursor-pointer text-white size-4 sm:size-6"
                                            size={24}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Languages</SelectLabel>
                                            <SelectItem
                                                key={"None"}
                                                value={"None"}
                                            >
                                                None
                                            </SelectItem>
                                            {tracks?.map(
                                                (track, index) =>
                                                    track.lang !==
                                                        "thumbnails" && (
                                                        <SelectItem
                                                            key={
                                                                track.lang +
                                                                index
                                                            }
                                                            value={track.lang}
                                                        >
                                                            {track.lang}
                                                        </SelectItem>
                                                    ),
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}

                            {/* Playback speed selection dropdown */}
                            <Select
                                onValueChange={(value) =>
                                    setPlaybackRate(parseFloat(value))
                                }
                                value={playbackRate.toString()}
                            >
                                <SelectTrigger className="w-[130px] sm:w-[180px]">
                                    <MdSpeed
                                        className="cursor-pointer text-white size-4 sm:size-6"
                                        size={24}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Playback Speed
                                        </SelectLabel>
                                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map(
                                            (rate) => (
                                                <SelectItem
                                                    key={rate}
                                                    value={rate.toString()}
                                                >
                                                    {rate}x
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {/* <PictureInPicture className='cursor-pointer' size={24} /> */}
                            {isFullscreen ? (
                                <Minimize
                                    onClick={toggleFullscreen}
                                    className="cursor-pointer size-4 sm:size-6"
                                    size={24}
                                />
                            ) : (
                                <Expand
                                    onClick={toggleFullscreen}
                                    className="cursor-pointer size-4 sm:size-6"
                                    size={24}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {/*Video control ends*/}
            </div>
        </div>
    );
};

export default Player;
