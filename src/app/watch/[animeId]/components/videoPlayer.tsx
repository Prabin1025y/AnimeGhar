"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import ReactPlayer from "react-player"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, FastForward, Subtitles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VideoPlayerProps {
  src: string
  title?: string
  introEnd?: number
  outroStart?: number
  autoSkip?: boolean
  subtitles?: Array<{
    src: string
    label: string
    language: string
  }>
  className?: string
}

export default function VideoPlayer({
  src,
  title = "HLS Video Player",
  introEnd = 0,
  outroStart = 0,
  autoSkip = true,
  subtitles = [],
  className = "",
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] = useState<number>(-1)
  const [isReady, setIsReady] = useState(false)

  // Auto skip intro/outro
  useEffect(() => {
    if (!autoSkip || !isReady) return

    const checkSkip = () => {
      const time = currentTime

      // Skip intro
      if (introEnd > 0 && time < introEnd && time > 0.5) {
        console.log(`Skipping intro: jumping from ${time}s to ${introEnd}s`)
        playerRef.current?.seekTo(introEnd, "seconds")
      }

      // Skip outro
      if (outroStart > 0 && time >= outroStart && time < duration - 1) {
        console.log(`Skipping outro: jumping from ${time}s to end`)
        playerRef.current?.seekTo(duration - 1, "seconds")
      }
    }

    checkSkip()
  }, [currentTime, introEnd, outroStart, autoSkip, duration, isReady])

  // Controls visibility
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return

      switch (e.code) {
        case "Space":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowLeft":
          e.preventDefault()
          playerRef.current.seekTo(Math.max(0, currentTime - 10), "seconds")
          break
        case "ArrowRight":
          e.preventDefault()
          playerRef.current.seekTo(Math.min(duration, currentTime + 10), "seconds")
          break
        case "KeyM":
          e.preventDefault()
          toggleMute()
          break
        case "KeyF":
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentTime, duration])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    if (!playerRef.current || !duration) return
    const time = (value[0] / 100) * duration
    playerRef.current.seekTo(time, "seconds")
  }

  const handleVolumeChange = (value: number[]) => {
    const vol = value[0] / 100
    setVolume(vol)
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const skipForward = () => {
    if (!playerRef.current) return
    playerRef.current.seekTo(Math.min(currentTime + 10, duration), "seconds")
  }

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate)
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00"

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // ReactPlayer event handlers
  const handleReady = () => {
    setIsReady(true)
    setIsLoading(false)
    setError(null)
    console.log("Player is ready")
  }

  const handleStart = () => {
    setIsLoading(false)
    console.log("Playback started")
  }

  const handleBuffer = () => {
    setIsLoading(true)
    console.log("Buffering...")
  }

  const handleBufferEnd = () => {
    setIsLoading(false)
    console.log("Buffer ended")
  }

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setCurrentTime(state.playedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
    console.log("Duration:", duration)
  }

  const handleError = (error: any) => {
    console.error("Player error:", error)
    setError("Failed to load video stream")
    setIsLoading(false)
  }

  if (error) {
    return (
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="text-red-400 mb-4 text-4xl">⚠️</div>
          <div className="text-lg mb-2">Video Stream Error</div>
          <div className="text-sm text-gray-300 mb-4">{error}</div>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
              Reload Player
            </Button>
            <div className="text-xs text-gray-400">Make sure the video URL is accessible</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer ${className}`}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={togglePlay}
    >
      {/* ReactPlayer */}
      <ReactPlayer
        ref={playerRef}
        url={`${process.env.NEXT_PUBLIC_PROXY_URL}https://ec.netmagcdn.com:2228/hls-playback/d8e56d406f04d29b74b4e03042fca324d71f0cd196c65f1fcb9c6d27377df7bd17b6ce13536ee8f21bbfe92902b58f637bf972b8708d2e71584983981cdfc9cb9a04eff785733555b4ada2c589e6f4be945594357514993de60b5a330372d24385de9113a8f18e54036d92a1d4af66986238cd930e5628561efc03d97f10fc7cee8c0d50f5e040f230f82e936ce02661ea3fe707e5ecf3204a0bfbc614539310ef11ed59239f180f0303735084d6bd73/master.m3u8`}
        width="100%"
        height="100%"
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        playbackRate={playbackRate}
        onReady={handleReady}
        onStart={handleStart}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onError={handleError}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
              playsInline: true,
            },
            tracks: subtitles.map((subtitle, index) => ({
              kind: "subtitles",
              src: subtitle.src,
              srcLang: subtitle.language,
              label: subtitle.label,
              default: index === selectedSubtitleTrack,
            })),
          }
        }}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <div className="text-white text-sm">Loading stream...</div>
          </div>
        </div>
      )}

      {/* Title Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 z-20 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
        <div className="text-white/70 text-sm">{src.includes(".m3u8") ? "HLS Stream" : "Video Stream"}</div>
      </div>

      {/* Controls Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 z-20 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <Slider
            value={[duration ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              className="text-white hover:bg-white/20 w-10 h-10"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            {/* Skip Forward */}
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                skipForward()
              }}
              className="text-white hover:bg-white/20 w-10 h-10"
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleMute()
                }}
                className="text-white hover:bg-white/20 w-10 h-10"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Time Display */}
            <div className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Auto-skip indicator */}
            {autoSkip && (introEnd > 0 || outroStart > 0) && (
              <div className="text-white/70 text-xs bg-black/50 rounded px-2 py-1">
                Auto-skip: {introEnd > 0 && `Intro ${introEnd}s`} {outroStart > 0 && `Outro ${outroStart}s`}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Playback Speed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20 w-10 h-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FastForward className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <DropdownMenuItem
                    key={rate}
                    onClick={() => changePlaybackRate(rate)}
                    className={playbackRate === rate ? "bg-accent" : ""}
                  >
                    {rate}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Subtitles */}
            {subtitles.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20 w-10 h-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Subtitles className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setSelectedSubtitleTrack(-1)}
                    className={selectedSubtitleTrack === -1 ? "bg-accent" : ""}
                  >
                    Off
                  </DropdownMenuItem>
                  {subtitles.map((subtitle, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setSelectedSubtitleTrack(index)}
                      className={selectedSubtitleTrack === index ? "bg-accent" : ""}
                    >
                      {subtitle.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Fullscreen */}
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              className="text-white hover:bg-white/20 w-10 h-10"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      {showControls && (
        <div className="absolute top-16 right-4 text-white text-xs bg-black/50 rounded px-2 py-1 z-20">
          Space: Play/Pause | ←→: Seek | M: Mute | F: Fullscreen
        </div>
      )}
    </div>
  )
}
