import type React from "react";
import { HomeDataType } from "@/types";
import AnimeGrid from "./AnimeListingHomePage/AnimeGrid";
import AnimeColumns from "./AnimeListingHomePage/AnimeColumns";
import Top10 from "./AnimeListingHomePage/Top10";

interface AnimeListsProps {
  popularAnimes: HomeDataType["mostPopularAnimes"];
  top10animes: HomeDataType["top10Animes"];
  topAiring: HomeDataType["topAiringAnimes"];
  mostFavourite: HomeDataType["mostFavoriteAnimes"];
  latestCompleted: HomeDataType["latestCompletedAnimes"];
}

export default function AnimeLists({
  popularAnimes,
  top10animes,
  topAiring,
  mostFavourite,
  latestCompleted,
}: AnimeListsProps) {
  const animeColumns = [
    {
      title: "Top Airing",
      animes: topAiring.slice(0, 5),
    },
    {
      title: "Most Favorite",
      animes: mostFavourite,
    },
    {
      title: "Latest Completed",
      animes: latestCompleted,
    },
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 relative">
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
        <AnimeGrid popularAnimes={popularAnimes} />

        {/* Section 2: Anime Collections - 70% width, below featured */}
        <AnimeColumns animeColumns={animeColumns} />

        {/* Section 3: Top 10 Ranked List - 30% width, spans both rows */}
        <Top10 top10animes={top10animes} />
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
