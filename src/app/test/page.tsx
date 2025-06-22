'use client'
import React from 'react'
import Player from '../watch/[animeId]/components/Player'

const page = () => {
    const mocktrack = [
        {
            "url": "https://s.megastatics.com/subtitle/cdb54415f5cbeb5e077b9415e4811199/eng-0.vtt",
            "lang": "English"
        },
        {
            "url": "https://s.megastatics.com/subtitle/cdb54415f5cbeb5e077b9415e4811199/por-2.vtt",
            "lang": "Portuguese"
        },
        {
            "url": "https://s.megastatics.com/subtitle/cdb54415f5cbeb5e077b9415e4811199/spa-1.vtt",
            "lang": "Spanish"
        },
        {
            "url": "https://s.megastatics.com/thumbnails/d097cbb43670302ef00e4a51a1cac2ad/thumbnails.vtt",
            "lang": "thumbnails"
        }
    ]
    return (
        <div className=" pt-20 w-full h-screen flex items-center justify-center bg-gray-900">
            <Player url="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" tracks={mocktrack} />
        </div>
    )
}

export default page