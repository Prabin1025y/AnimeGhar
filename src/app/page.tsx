"use client";
import Link from "next/link";
import ReactPlayer from "react-player";

const url =
  "https://ef.netmagcdn.com:2228/hls-playback/d8e56d406f04d29b74b4e03042fca324d71f0cd196c65f1fcb9c6d27377df7bd17b6ce13536ee8f21bbfe92902b58f635cfaad4064c11b9405b6bdbbbae4d75a1095ad132eac8c83a51f8618cd2ae93343bd92ce3b6f5a49af30faa77ab5aa0354fa350a34bfa5ff6bd79d845c1439b48d7372f4c1fecd3bf96eb61b47c324e234bb259658243095ff6289e5ecf04bbf295b006f4f5ef3c0c5daef1f975d3daae7a5c31147e9ae9491cbca57e1464044/master.m3u8";

export default function Home() {
  return (
    // <Spotlight />
    <ReactPlayer
      url={`https://gogoanime-and-hianime-proxy.vercel.app/m3u8-proxy?url=${url}`}
      playing
      controls
    />
    // <div>
    //   <Link href={"/home"}>Home</Link>
    // </div>
  );
}
