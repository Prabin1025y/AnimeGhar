'use client'
import AnimeContainer from '@/components/AnimeListingHomePage/AnimeContainer'
import AnimeLists from '@/components/AnimeLists'
import AnimeContainerSkeleton from '@/components/Skeleton/AnimeContainerSkeleton'
import AnimeListsSkeleton from '@/components/Skeleton/AnimeListSkeleton'
import SpotlightSkeleton from '@/components/Skeleton/SpotlightSkeleton'
import TrendingAnimeSkeleton from '@/components/Skeleton/TrendingSkeleton'
import Spotlight from '@/components/Spotlight'
import TrendingAnime from '@/components/TrendingAnime'
import { HomeDataType } from '@/types'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false)
    const [homeData, setHomeData] = useState<HomeDataType>({} as HomeDataType)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home`,{headers:{"god-key": process.env.NEXT_PUBLIC_GOD_KEY || ""}});
                const data = await response.json()

                if (data.data)
                    setHomeData(data.data);
            } catch (error) {
                console.log("Error: " + error)
            } finally {
                setIsMounted(true)
            }
        }
        fetchdata();
    }, [])

    if (!isMounted)
        return (
            <>
                <SpotlightSkeleton />
                <TrendingAnimeSkeleton />
                <AnimeListsSkeleton />
                <AnimeContainerSkeleton/>
                <AnimeContainerSkeleton />
            </>
        )

    return (
        <>
            <Spotlight spotlightAnimes={homeData.spotlightAnimes} />
            <TrendingAnime animes={homeData.trendingAnimes} />
            <AnimeLists popularAnimes={homeData.mostPopularAnimes} top10animes={homeData.top10Animes} topAiring={homeData.topAiringAnimes} mostFavourite={homeData.mostFavoriteAnimes} latestCompleted={homeData.latestCompletedAnimes} />
            <AnimeContainer animes={homeData.latestEpisodeAnimes} title="Latest Episode" />
            <AnimeContainer animes={homeData.topUpcomingAnimes} title="Top Upcoming" />
        </>
    )
}

export default HomePage