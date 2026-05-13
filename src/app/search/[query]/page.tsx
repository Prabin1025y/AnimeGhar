"use client";
import AnimeCard from "@/components/AnimeCard";
import AnimeCardSkeleton from "@/components/Skeleton/AnimeCardSkeleton";
import Top10Skeleton from "@/components/Skeleton/Top10Skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { SEARCH_QUERY } from "@/lib/queries";
import { SearchResponse } from "@/types/searchResult";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
    const { query } = useParams<{ query: string }>();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const [searchResult, setSearchResult] = useState<SearchResponse | null>(
        null,
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (query.trim() === "") {
            setSearchResult(null);
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ANILIST_URL}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            query: SEARCH_QUERY,
                            variables: {
                                search: query,
                                page: page,
                                perPage: 20,
                            },
                        }),
                    },
                );
                const { data } = await response.json();
                setSearchResult(data.Page);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, page]);

    if (loading)
        return (
            <div className="w-full pt-10">
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-5">
                    <div className="col-span-3 grid grid-cols-4 gap-3">
                        <p className="col-span-4 py-4 text-2xl text-cyan-500 font-semibold">
                            Searching...
                        </p>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <AnimeCardSkeleton key={index} />
                        ))}
                    </div>
                    <div className="col-span-1">
                        <p className="py-4 text-2xl text-cyan-500 font-semibold">
                            Most Popular Animes
                        </p>
                        <Top10Skeleton />
                    </div>
                </div>
            </div>
        );

    return (
        <div className="w-full pt-10">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-5">
                <div className="col-span-4 xl:grid grid-cols-5 flex gap-3 flex-wrap justify-center">
                    {searchResult && searchResult.media.length == 0 ? (
                        <p className="text-base grow min-w-full col-span-5 py-4 md:text-2xl text-cyan-500 font-semibold">
                            No result found.
                        </p>
                    ) : (
                        <p className="text-base grow min-w-full col-span-5 py-4 md:text-2xl text-cyan-500 font-semibold">
                            Search Result For: {query.replace("%20", " ")}
                        </p>
                    )}
                    {searchResult &&
                        searchResult.media.length > 0 &&
                        searchResult.media.map((anime, index) => (
                            <AnimeCard
                                key={`${anime.id}-${index}`}
                                animeId={anime.id}
                                animeName={
                                    anime.title.english ||
                                    anime.title.romaji ||
                                    anime.title.native ||
                                    "Not Title"
                                }
                                animePoster={anime.coverImage.large}
                                animeType={anime.format}
                                animeEpisodes={
                                    anime.episodes?.toString() || "?"
                                }
                            />
                        ))}
                </div>
                {searchResult && searchResult.pageInfo.lastPage > 1 && (
                    <Pagination className="col-span-4 mt-5">
                        <PaginationContent>
                            {searchResult?.pageInfo.currentPage &&
                                searchResult.pageInfo.currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={`/search/${query}?page=${searchResult.pageInfo.currentPage - 1}`}
                                        />
                                    </PaginationItem>
                                )}

                            {searchResult &&
                                searchResult.pageInfo.currentPage > 2 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href={`/search/${query}?page=1`}
                                            isActive={false}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                            {searchResult &&
                                searchResult.pageInfo.currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                            {searchResult && (
                                <PaginationItem>
                                    <PaginationLink
                                        href={`/search/${query}?page=${searchResult.pageInfo.currentPage}`}
                                        isActive={true}
                                    >
                                        {searchResult.pageInfo.currentPage}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
                            {searchResult &&
                                searchResult.pageInfo.hasNextPage && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                            {searchResult &&
                                searchResult.pageInfo.hasNextPage && (
                                    <PaginationItem>
                                        <PaginationNext
                                            href={`/search/${query}?page=${searchResult.pageInfo.currentPage + 1}`}
                                        />
                                    </PaginationItem>
                                )}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
