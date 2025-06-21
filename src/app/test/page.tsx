'use client'
import React from 'react'
import Player from '../watch/[animeId]/components/Player'

const page = () => {
    return (
        <div className=" pt-20 w-full h-screen flex items-center justify-center bg-gray-900">
            <Player url="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" />
        </div>
    )
}

export default page