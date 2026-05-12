"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Captions, Globe, Mic, Play, Star } from "lucide-react";
import Image from "next/image";
import { getStatusColor } from "@/utilities";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getAnimeTipsQuery } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

const AnimeTips = ({ animeid, image }: { animeid: number; image: string }) => {
    const [cardData, setCardData] = useState<AnimeTips>({} as AnimeTips);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setisLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_ANILIST_URL}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            query: getAnimeTipsQuery(animeid),
                        }),
                    },
                );
                const { data } = await response.json();
                setCardData(data.Media);
                console.log(data);
            } catch (error) {
                console.error("Error fetching anime data:", error);
            } finally {
                setisLoading(false);
            }
        };
        fetchData();
    }, [animeid]);

    if (isLoading)
        return (
            <Card className="w-[150%] gap-0 mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-cyan-200 dark:border-cyan-800 shadow-lg">
                <CardHeader className="pb-3">
                    <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                            <Skeleton className="w-[80px] h-[120px] rounded-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>

                    <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <div className="flex flex-wrap gap-1">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton
                                    key={i}
                                    className="h-5 w-16"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <div>
                                <Skeleton className="h-3 w-16 mb-1" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <div>
                                <Skeleton className="h-3 w-20 mb-1" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="mt-2">
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        );

    return (
        <Card className="w-[150%] gap-0 mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-cyan-200 dark:border-cyan-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-700">
            <CardHeader className="pb-3">
                <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={`${cardData.title.english || cardData.title.romaji} poster`}
                            width={80}
                            height={120}
                            className="rounded-lg object-cover border-2 border-cyan-200 dark:border-cyan-700"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {cardData.title.english || cardData.title.romaji}
                        </CardTitle>
                        <CardDescription className="text-sm text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-1">
                            {cardData.title.native}
                        </CardDescription>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {cardData.averageScore / 10}
                                </span>
                            </div>
                            <Badge className={getStatusColor(cardData.status)}>
                                {cardData.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Description */}
                <div>
                    <h4 className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                        Description
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {cardData.description}
                    </p>
                </div>

                {/* Genre Tags */}
                <div>
                    <h4 className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                        Genres
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {cardData.genres &&
                            cardData.genres.map((g, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700"
                                >
                                    {g}
                                </Badge>
                            ))}
                    </div>
                </div>

                {/* Episode and Date Info */}
                <div className="flex justify-between gap-4">
                    {cardData.episodes && (
                        <div className="flex items-center gap-2">
                            <div className="flex gap-[2px]">
                                <Badge
                                    className={`bg-green-700 text-white text-[0.65rem] px-[2px] py-0 rounded-xs `}
                                >
                                    <Captions className="w-3 h-3" />
                                    {cardData.episodes}
                                </Badge>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {formatDate(
                                    cardData.startDate.day,
                                    cardData.startDate.month,
                                    cardData.startDate.year,
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>

            {cardData.status !== "NOT_YET_RELEASED" && (
                <CardFooter className="mt-2">
                    <Button
                        asChild
                        className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                        <Link href={`/watch/${animeid}`}>
                            <Play className="w-4 h-4" />
                            Watch Now
                        </Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default AnimeTips;
