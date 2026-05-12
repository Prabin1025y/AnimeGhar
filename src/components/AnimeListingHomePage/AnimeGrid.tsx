import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import AnimeCard from "../AnimeCard";

const AnimeGrid = ({
    popularAnimes,
}: {
    popularAnimes: AnimeData["topAiring"]["media"];
}) => {
    return (
        <div
            style={{ gridArea: "featured" }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Most Popular
            </h2>
            <div className="grid grid-cols-1 gap-6">
                <Carousel opts={{ dragThreshold: 40 }}>
                    <CarouselContent>
                        {popularAnimes.map((anime) => (
                            <CarouselItem
                                key={anime.id}
                                className="basis-auto"
                            >
                                <AnimeCard
                                    animeId={anime.id}
                                    animePoster={anime.coverImage.large}
                                    animeName={
                                        anime.title.english ||
                                        anime.title.romaji ||
                                        "No Title"
                                    }
                                    animeType={anime.format}
                                    animeEpisodes={anime.episodes?.toString() || '0'}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="top-[-30px] right-0 rounded-md" />
                    <CarouselPrevious className="top-[-30px] left-auto right-[40px] rounded-md" />
                </Carousel>
            </div>
        </div>
    );
};

export default AnimeGrid;
