"use client";
import AnimeLists from "@/components/AnimeLists";
import AnimeContainerSkeleton from "@/components/Skeleton/AnimeContainerSkeleton";
import AnimeListsSkeleton from "@/components/Skeleton/AnimeListSkeleton";
import SpotlightSkeleton from "@/components/Skeleton/SpotlightSkeleton";
import TrendingAnimeSkeleton from "@/components/Skeleton/TrendingSkeleton";
import Spotlight from "@/components/Spotlight";
import TrendingAnime from "@/components/TrendingAnime";
import { useAppStore } from "@/context/AppContext";
import { getHomeQuery } from "@/lib/queries";
import { getCurrentYearSeason } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setHomeData } = useAppStore();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setIsLoading(true);
                const currentYearSeason = getCurrentYearSeason();
                const query = getHomeQuery(
                    currentYearSeason.year,
                    currentYearSeason.season,
                );

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ANILIST_URL}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({ query }),
                    },
                );
                const { data } = await response.json();
                if (data) setHomeData(data);
                else throw new Error("No data found from backend!");
            } catch (error) {
                if (process.env.NODE_ENV === "development")
                    console.log("Error: " + error);

                toast.error("Error fetching data");
            } finally {
                setIsMounted(true);
                setIsLoading(false);
            }
        };
        fetchdata();
    }, [setHomeData]);

    if (!isMounted || isLoading)
        return (
            <>
                <SpotlightSkeleton />
                <TrendingAnimeSkeleton />
                <AnimeListsSkeleton />
                <AnimeContainerSkeleton />
                <AnimeContainerSkeleton />
            </>
        );

    return (
        <>
            <Spotlight />
            <TrendingAnime />
            <AnimeLists />
        </>
    );
};

export default HomePage;
