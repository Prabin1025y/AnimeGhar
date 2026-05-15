"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import VideoInfo from "./components/VideoInfo";
import EpisodeSelector from "./components/EpisodeSelector";
import { toast } from "sonner";
import PlayerSkeleton from "./components/PlayerSkeleton";
import { ANIME_DETAILS_QUERY, RELEASING_EPISODES_QUERY } from "@/lib/queries";
import { AnimeDetails } from "@/types/animeDetails";
import AnimeCard from "@/components/AnimeCard";
import AnimeCardsGridSkeleton, {
    EpisodeSelectorSkeleton,
    VideoInfoSkeleton,
} from "./components/Skeletons";

export type EpisodeType = {
    title: string;
    episodeId: string;
    number: number;
    isFiller: boolean;
};

const VideoPlayerPage: React.FC = () => {
    const [isDub, setIsDub] = useState<boolean>(false);
    const [animeDetail, setAnimeDetail] = useState<AnimeDetails | null>(null);
    const [sourceLoading, setSourceLoading] = useState(true);
    const [othersLoading, setOthersLoading] = useState(true);
    const [lastAiredEpisode, setLastAiredEpisode] = useState(0);

    const params = useParams<{ animeId: string }>();
    const router = useRouter();
    const pathname = usePathname();
    const animeId = params.animeId;
    const searchParams = useSearchParams();
    const episodeNumber = searchParams.get("ep");

    const iframeElement = useRef<HTMLIFrameElement>(null);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setOthersLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ANILIST_URL}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            query: ANIME_DETAILS_QUERY,
                            variables: {
                                id: Number(animeId),
                            },
                        }),
                    },
                );
                const { data } = await response.json();

                if (data.Media?.status === "RELEASING") {
                    const new_response = await fetch(
                        `${process.env.NEXT_PUBLIC_ANILIST_URL}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                            body: JSON.stringify({
                                query: RELEASING_EPISODES_QUERY,
                                variables: {
                                    id: Number(animeId),
                                },
                            }),
                        },
                    );

                    const { data: new_data } = await new_response.json();
                    setLastAiredEpisode(
                        Number(new_data.Media.nextAiringEpisode.episode) - 1,
                    );
                } else {
                    setLastAiredEpisode(Number(data.Media?.episodes));
                }

                setAnimeDetail(data.Media);
            } catch (error) {
                console.log(error);
                toast.error("Error occured!!");
            } finally {
                setOthersLoading(false);
            }
        };
        fetchData();
        if (!episodeNumber) {
            router.push(pathname + "?" + createQueryString("ep", "1"));
        }
    }, [animeId, createQueryString, episodeNumber, pathname, router]);

    // change dub to sub if dub is not available
    useEffect(() => {
        setSourceLoading(true);
        const fetchData = async () => {
            const response = await fetch(
                `https://megaplay.buzz/stream/ani/${animeId}/${episodeNumber}/${isDub ? "dub" : "sub"}`,
            );
            const data = await response.text();
            if (data.includes("Error Code: <span>404</span>")) {
                if (isDub) {
                    setIsDub(false);
                    toast.error(
                        "Dub is not available for this episode. Switching to sub.",
                    );
                }
            } else {
                toast.warning(
                    "We recommend using an ad blocker to eliminate annoying redirects.",
                    {
                        action: {
                            label: "Get Adblocker",
                            onClick: () =>
                                window.open(
                                    "https://ublockorigin.com/",
                                    "_blank",
                                ),
                        },
                    },
                );
                setSourceLoading(false);
            }
        };
        fetchData();
    }, [episodeNumber, isDub, animeId]);

    const sequels = animeDetail?.relations.edges.filter(
        (edge) => edge.relationType == "SEQUEL" && edge.node.type == "ANIME",
    );
    const prequels = animeDetail?.relations.edges.filter(
        (edge) => edge.relationType == "PREQUEL" && edge.node.type == "ANIME",
    );
    const side_stories = animeDetail?.relations.edges.filter(
        (edge) =>
            edge.relationType == "SIDE_STORY" && edge.node.type == "ANIME",
    );
    const others = animeDetail?.relations.edges.filter(
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
        <div className="min-h-screen p-4 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center">
                        {sourceLoading ? (
                            <PlayerSkeleton />
                        ) : (
                            <iframe
                                ref={iframeElement}
                                sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                                src={`https://megaplay.buzz/stream/ani/${animeId}/${episodeNumber}/${isDub ? "dub" : "sub"}`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>

                    {othersLoading ? (
                        <>
                            <EpisodeSelectorSkeleton />
                            <VideoInfoSkeleton />
                            <AnimeCardsGridSkeleton noOfElements={5} />
                            <AnimeCardsGridSkeleton noOfElements={5} />
                            <AnimeCardsGridSkeleton noOfElements={5} />
                        </>
                    ) : (
                        <>
                            {lastAiredEpisode && (
                                <EpisodeSelector
                                    episodes={lastAiredEpisode}
                                    className=" overflow-y-auto"
                                />
                            )}
                            {animeDetail?.airingSchedule.nodes.length ? (
                                <div className="bg-blue-500/40 border border-blue-600 rounded-md flex items-center justify-center py-2 -my-4">
                                    Next Episode{" "}
                                    {
                                        animeDetail.airingSchedule.nodes?.[0]
                                            .episode
                                    }{" "}
                                    airing on :{" "}
                                    {new Date(
                                        Number(
                                            animeDetail.airingSchedule
                                                .nodes?.[0].airingAt,
                                        ) * 1000,
                                    ).toDateString()}
                                </div>
                            ) : null}
                            {animeDetail && (
                                <VideoInfo
                                    animeData={animeDetail}
                                    isDub={isDub}
                                    setIsDub={setIsDub}
                                />
                            )}
                            {final_json.map((category, index) => {
                                return category?.data?.length ? (
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
                                                            animeId={
                                                                anime.node?.id
                                                            }
                                                            averageScore={
                                                                anime.node
                                                                    .averageScore
                                                            }
                                                            animePoster={
                                                                anime.node
                                                                    .coverImage
                                                                    .large ||
                                                                "placeholder.png"
                                                            }
                                                            animeName={
                                                                anime.node.title
                                                                    .english ||
                                                                anime.node.title
                                                                    .romaji ||
                                                                "No Title"
                                                            }
                                                            animeType={
                                                                anime.node
                                                                    .format ||
                                                                "N/A"
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
                                ) : null;
                            })}

                            {/* Recommended Movies */}
                            {animeDetail?.recommendations?.nodes?.length ? (
                                <section className="max-w-7xl container mx-auto mt-6 mb-4">
                                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                        Recommendations
                                    </h2>
                                    <div className="gw-auto flex flex-wrap gap-3 mx-auto justify-center xl:justify-start">
                                        {animeDetail?.recommendations?.nodes?.map(
                                            (anime, index) =>
                                                anime.mediaRecommendation
                                                    ?.id && (
                                                    <AnimeCard
                                                        key={`${anime.mediaRecommendation?.id}-${index}`}
                                                        animeId={
                                                            anime
                                                                .mediaRecommendation
                                                                ?.id
                                                        }
                                                        animePoster={
                                                            anime
                                                                .mediaRecommendation
                                                                .coverImage
                                                                .large ||
                                                            "placeholder.png"
                                                        }
                                                        animeName={
                                                            anime
                                                                .mediaRecommendation
                                                                .title
                                                                .english ||
                                                            anime
                                                                .mediaRecommendation
                                                                .title.romaji ||
                                                            "No Title"
                                                        }
                                                        averageScore={
                                                            anime
                                                                .mediaRecommendation
                                                                .averageScore
                                                        }
                                                        animeType={
                                                            anime
                                                                .mediaRecommendation
                                                                .format || "N/A"
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
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
