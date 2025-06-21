"use client";
import Link from "next/link";
import ReactPlayer from "react-player";

const url =
  "https://ec.netmagcdn.com:2228/hls-playback/d8e56d406f04d29b74b4e03042fca324d71f0cd196c65f1fcb9c6d27377df7bd17b6ce13536ee8f21bbfe92902b58f637bf972b8708d2e71584983981cdfc9cb9a04eff785733555b4ada2c589e6f4be945594357514993de60b5a330372d24385de9113a8f18e54036d92a1d4af66986238cd930e5628561efc03d97f10fc7cee8c0d50f5e040f230f82e936ce02661ea3fe707e5ecf3204a0bfbc614539310ef11ed59239f180f0303735084d6bd73/master.m3u8";

export default function Home() {
  return (
    // <Spotlight />
    <ReactPlayer
      url={`https://anime-ghar-proxy.vercel.app/m3u8-proxy?url=${url}`}
      playing
      controls
    />
    // <div>
    //   <Link href={"/home"}>Home</Link>
    // </div>
  );
}
