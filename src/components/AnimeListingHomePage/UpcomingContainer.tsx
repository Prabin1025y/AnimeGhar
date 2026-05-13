import { formatDate } from "@/lib/utils";
import AnimeCard from "../AnimeCard";

const UpcomingContainer = ({
    animes,
    title,
}: {
    animes: AnimeData["upcoming"]["media"];
    title: string;
}) => {
    console.log(animes)
    return (
        <div
            className="max-w-7xl mx-auto flex flex-col justify-center py-6 px-3"
            style={{ gridArea: "collections" }}
        >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
                {title}
            </h2>
            {/* <div className=" gap-3 grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(176px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(208px,1fr))]"> */}
            <div className="w-auto grid grid-cols-6 gap-3 mx-auto">
                {animes.map((anime, index) => (
                    <AnimeCard
                        className=""
                        type="upcoming"
                        key={anime.id + index}
                        animeId={anime.id}
                        animePoster={anime.coverImage.large}
                        animeName={anime.title.english || anime.title.romaji || "No Title"}
                        animeType={anime.format}
                        airingTime={formatDate(anime.startDate.day, anime.startDate.month, anime.startDate.year)}
                        animeDuration={"24"}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpcomingContainer;
