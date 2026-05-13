import AnimeCard from "../AnimeCard";

const LatestEpisodesContainer = ({
    animes,
    title,
}: {
    animes: AnimeData["latestEpisodes"]["airingSchedules"];
    title: string;
}) => {
    return (
        <div
            className="max-w-7xl mx-auto flex flex-col justify-center py-6 px-3"
            style={{ gridArea: "collections" }}
        >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
                {title}
            </h2>
            {/* <div className=" gap-3 grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(176px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(208px,1fr))]"> */}
            <div className="w-auto grid grid-cols-4 gap-3 mx-auto">
                {animes.map((anime, index) => (
                    <AnimeCard
                        className=""
                        key={anime.media.id + index}
                        animeId={anime.media.id}
                        animePoster={anime.media.coverImage.large}
                        animeName={anime.media.title.english || anime.media.title.romaji || "No Title"}
                        animeType={anime.media.format}
                        animeEpisodes={anime.episode.toString()}
                        animeDuration={"24"}
                        airingTime={anime.airingAt.toString()}
                        type="latest"
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestEpisodesContainer;
