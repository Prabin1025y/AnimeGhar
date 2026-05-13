import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, Play } from "lucide-react";
import AnimeCard from "@/components/AnimeCard";
import Description from "./_components/Description";
import Link from "next/link";
import { Metadata } from "next";
import { AnimeDetails } from "@/types/animeDetails";
import { ANIME_DETAILS_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

const fetchData = async (animeId: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ANILIST_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: ANIME_DETAILS_QUERY,
                variables: {
                    id: animeId,
                },
            }),
        });
        const { data } = await response.json();

        return data.Media;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ animeId: string }>;
}): Promise<Metadata> {
    // read route params
    const { animeId } = await params;

    const data: AnimeDetails = await fetchData(Number(animeId));

    return {
        title:
            `${data.title.english || data.title.romaji || data.title.native || "Anime Detail"}  | AnimeGhar` ||
            "AnimeGhar - Watch Anime Online",
        description:
            `Watch ${data.title.english || data.title.romaji || data.title.native || "Anime"} episodes online for free without any ads and distractions.` ||
            "Watch your favorite anime episodes online for free without any ads and distractions.",
    };
}

export default async function MovieDetailsPage({
    params,
}: {
    params: Promise<{ animeId: string }>;
}) {
    const { animeId } = await params;
    const data: AnimeDetails = await fetchData(Number(animeId));

    const sequels = data.relations.edges.filter(
        (edge) => edge.relationType == "SEQUEL" && edge.node.type == "ANIME",
    );
    const prequels = data.relations.edges.filter(
        (edge) => edge.relationType == "PREQUEL" && edge.node.type == "ANIME",
    );
    const side_stories = data.relations.edges.filter(
        (edge) =>
            edge.relationType == "SIDE_STORY" && edge.node.type == "ANIME",
    );
    const others = data.relations.edges.filter(
        (edge) =>
            !["SEQUEL", "PREQUEL", "SIDE_STORY"].includes(edge.relationType) &&
            edge.node.type == "ANIME",
    );

    const final_json = [
        { name: "Sequels", data: sequels },
        { name: "Prequels", data: prequels },
        { name: "Side Stories", data: side_stories },
        { name: "Other Related Anime", data: others },
    ];

    return (
        <div className="min-h-screen dark:bg-slate-950 mt-16 px-5 sm:px-10 md:px-20">
            <div className="relative">
                <div className="relative max-w-7xl container mx-auto py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Movie Poster - Now in portrait orientation */}
                        <div className="lg:col-span-1">
                            <div className="relative mx-auto max-w-sm">
                                <Image
                                    src={
                                        data.coverImage.extraLarge ||
                                        data.coverImage.large ||
                                        "/placeholder.svg"
                                    }
                                    alt={`${data.title.english || data.title.romaji || data.title.native || "Anime"} poster`}
                                    width={300}
                                    height={400}
                                    className="rounded-lg shadow-2xl aspect-[2/3] object-cover"
                                />
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="lg:col-span-2 text-primary space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                    {data.title.english ||
                                        data.title.romaji ||
                                        data.title.native ||
                                        "Anime"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 text-cyan-400 fill-current" />
                                        <span className="text-xl font-semibold">
                                            {data.averageScore
                                                ? data.averageScore / 10
                                                : "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {formatDate(
                                                data.startDate.day ?? null,
                                                data.startDate.month ?? null,
                                                data.startDate.year ?? null,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {data.duration || "N/A"} min
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {data.genres.map((genre) => (
                                        <Badge
                                            key={genre}
                                            variant="secondary"
                                            className="text-white bg-cyan-500 hover:bg-cyan-500/80"
                                        >
                                            {genre}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Description moved to header section */}
                                <Description
                                    description={data.description || ""}
                                />

                                {/* Movie Information moved to header */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                Studios:
                                            </span>
                                            <span className="text-primary/90">
                                                {data.studios.nodes.reduce(
                                                    (prev, studio, index) =>
                                                        prev +
                                                        `${index === 0 ? "" : ","}` +
                                                        ` ${studio.name}`,
                                                    "",
                                                ) || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                Episodes:
                                            </span>
                                            <span className="text-primary/90">
                                                {data.episodes || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                Status:
                                            </span>
                                            <span className="text-primary/90">
                                                {data.status || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                Japanese Name:
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-xs border-cyan-300/50 text-cyan-200 bg-cyan-900/30"
                                            >
                                                {data.title.native || "N/A"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {data.id && (
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:bg-cyan-700 text-white"
                                        >
                                            <Link href={`/watch/${data.id}`}>
                                                <Play className="h-5 w-5 mr-2" />
                                                Watch Now
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="row-start-2 col-start-1 flex flex-wrap col-span-4 gap-3 mt-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Animes */}
            {final_json.map((category, index) => {
                return (
                    category.data.length > 0 && (
                        <section
                            key={index}
                            className="max-w-7xl container mx-auto mt-6 mb-4"
                        >
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {category.name}
                            </h2>
                            <div className="gw-auto flex flex-wrap gap-3 mx-auto justify-center xl:justify-start">
                                {category.data.map(
                                    (anime, index) =>
                                        anime.node?.id && (
                                            <AnimeCard
                                                key={`${anime.node?.id}-${index}`}
                                                animeId={anime.node?.id}
                                                animePoster={
                                                    anime.node.coverImage
                                                        .large ||
                                                    "placeholder.png"
                                                }
                                                animeName={
                                                    anime.node.title.english ||
                                                    anime.node.title.romaji ||
                                                    "No Title"
                                                }
                                                animeType={
                                                    anime.node.format || "N/A"
                                                }
                                                animeEpisodes={
                                                    anime.node.episodes?.toString() ||
                                                    "N/A"
                                                }
                                            />
                                        ),
                                )}
                            </div>
                        </section>
                    )
                );
            })}

            {/* Recommended Anime */}
            {data.recommendations.nodes.length > 0 && (
                <section className="max-w-7xl container mx-auto mt-6 mb-4">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Recommendations
                    </h2>
                    <div className="gw-auto flex flex-wrap gap-3 mx-auto justify-center xl:justify-start">
                        {data.recommendations.nodes.map(
                            (anime, index) =>
                                anime.mediaRecommendation?.id && (
                                    <AnimeCard
                                        key={`${anime.mediaRecommendation?.id}-${index}`}
                                        animeId={anime.mediaRecommendation?.id}
                                        animePoster={
                                            anime.mediaRecommendation.coverImage
                                                .large || "placeholder.png"
                                        }
                                        animeName={
                                            anime.mediaRecommendation.title
                                                .english ||
                                            anime.mediaRecommendation.title
                                                .romaji ||
                                            "No Title"
                                        }
                                        animeType={
                                            anime.mediaRecommendation.format ||
                                            "N/A"
                                        }
                                        animeEpisodes={
                                            anime.mediaRecommendation.episodes?.toString() ||
                                            "N/A"
                                        }
                                    />
                                ),
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
