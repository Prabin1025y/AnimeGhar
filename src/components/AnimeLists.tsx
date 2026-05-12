import type React from "react";
import AnimeGrid from "./AnimeListingHomePage/AnimeGrid";
import AnimeColumns from "./AnimeListingHomePage/AnimeColumns";
import Top10 from "./AnimeListingHomePage/Top10";
import { useAppStore } from "@/context/AppContext";

export default function AnimeLists() {
    const { homeData } = useAppStore();

    // const animeColumns = [
    //     {
    //         title: "Top Airing",
    //         animes: topAiring.slice(0, 5),
    //     },
    //     {
    //         title: "Most Favorite",
    //         animes: mostFavourite,
    //     },
    //     {
    //         title: "Latest Completed",
    //         animes: latestCompleted,
    //     },
    // ];

    return (
        <div className="w-full py-12 px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 relative">
            <div
                className="max-w-7xl mx-auto grid gap-8"
                style={{
                    gridTemplateAreas: `
            "featured featured ranked"
            "collections collections ranked"
          `,
                    gridTemplateColumns: "1fr 1fr 30%",
                    gridTemplateRows: "auto auto",
                }}
            >
                {/* Section 1: Featured Anime Cards - 70% width */}
                <AnimeGrid popularAnimes={homeData.topAiring.media} />

                {/* Section 2: Anime Collections - 70% width, below featured */}
                <AnimeColumns />

                {/* Section 3: Top 10 Ranked List - 30% width, spans both rows */}
                <Top10 top10animes={homeData.popularAllTime.media} />
            </div>

            {/* Responsive Grid Areas for Mobile */}
            <style jsx>{`
                @media (max-width: 1024px) {
                    .max-w-7xl.mx-auto.grid {
                        grid-template-areas:
                            "featured"
                            "collections"
                            "ranked" !important;
                        grid-template-columns: 1fr !important;
                        grid-template-rows: auto auto auto !important;
                    }
                }
            `}</style>
        </div>
    );
}
