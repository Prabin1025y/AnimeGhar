import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "../ui/badge";
import { Captions, Mic } from "lucide-react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import { HomeDataType } from "@/types";
import AnimeTips from "../AnimeTips";

const AnimeGrid = ({
  popularAnimes,
}: {
  popularAnimes: HomeDataType["mostPopularAnimes"];
}) => {
  return (
    <div style={{ gridArea: "featured" }} className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        Most Popular
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <Carousel opts={{ dragThreshold: 40 }}>
          <CarouselContent>
            {popularAnimes.map((anime) => (
              <CarouselItem key={anime.id} className="basis-1/4">
                <div
                  // key={anime.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    <div className="relative">
                      <HoverCard openDelay={200} >
                        <HoverCardTrigger>
                          <Image
                            src={anime.poster}
                            alt={anime.name}
                            width={200}
                            height={300}
                            className="w-full h-64 object-cover"
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="p-0 bg-transparent border-none">
                          <AnimeTips animeid={anime.id} image={anime.poster} />
                        </HoverCardContent>
                      </HoverCard>

                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Button
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                            size="sm"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Now
                          </Button>
                        </div>
                      </div> */}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm truncate mb-2 text-slate-900 dark:text-white">
                        {anime.name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{anime.type}</span>
                        <div className="flex gap-[2px]">
                          <Badge className={`bg-green-700 text-white px-1 py-1 ${anime.episodes.dub && "rounded-r-none"}`}>
                            <Captions />
                            {anime.episodes.sub}
                          </Badge>
                          {anime.episodes.dub && <Badge className="bg-cyan-700 text-white px-1 py-1 rounded-l-none">
                            <Mic />
                            {anime.episodes.dub}
                          </Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
