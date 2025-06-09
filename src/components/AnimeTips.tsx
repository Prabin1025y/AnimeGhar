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
import {
  Calendar,
  Captions,
  Clock,
  Globe,
  Mic,
  Play,
  Star,
} from "lucide-react";
import Image from "next/image";
import { getStatusColor } from "@/utilities";
import { AnimeTipsDataType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

// interface AnimeTipsProps {
//   animeName: string;
//   japaneseName: string;
//   description: string;
//   genre: string[];
//   ratings: number;
//   episodes: number;
//   date: string;
//   status: string;
//   synonym: string[];
// }

const AnimeTips = ({ animeid, image }: { animeid: string; image: string }) => {
  const [cardData, setcardData] = useState<AnimeTipsDataType>(
    {} as AnimeTipsDataType
  );
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          `http://localhost:4000/api/v2/hianime/qtip/${animeid}`
        );
        const data = await response.json();
        setcardData(data.data.anime);
        // console.log(data.anime);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

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
                <Skeleton key={i} className="h-5 w-16" />
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
              alt={cardData.name}
              width={80}
              height={120}
              className="rounded-lg object-cover border-2 border-cyan-200 dark:border-cyan-700"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {cardData.name}
            </CardTitle>
            <CardDescription className="text-sm text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {cardData.jname} ({cardData.synonyms && cardData.synonyms})
            </CardDescription>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {cardData.malscore}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              {cardData.episodes.sub && <Badge className={`bg-green-700 text-white text-[0.65rem] px-[2px] py-0 rounded-l-xs ${cardData.episodes.dub ? "rounded-r-none" : "rounded-r-xs"}`}>
                <Captions className="w-3 h-3" />
                {cardData.episodes.sub}
              </Badge>}
              {cardData.episodes.dub && <Badge className="bg-cyan-700 text-white px-1 text-[0.65rem] py-1 rounded-r-xs rounded-l-none">
                <Mic className="w-3 h-3" />
                {cardData.episodes.dub}
              </Badge>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {cardData.aired}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-2">
        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-medium transition-colors duration-200 flex items-center gap-2">
          <Play className="w-4 h-4" />
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnimeTips;
