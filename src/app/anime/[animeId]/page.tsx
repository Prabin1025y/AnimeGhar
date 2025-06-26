import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Star,
  Play,
} from "lucide-react";
import { AnimeDetailsDataType } from "@/types";
import AnimeCard from "@/components/AnimeCard";
import Description from "./_components/Description";
import RelatedAnime from "./_components/RelatedAnime";
import Link from "next/link";
import SeasonCard from "@/app/watch/[animeId]/components/SeasonCard";
import { Metadata } from "next";

const fetchData = async (animeId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/anime/${animeId}`,{headers:{"god-key": process.env.NEXT_PUBLIC_GOD_KEY || ""}}
    );
    const data = await response.json();

    //remove any duplicated related animes
    const uniqueRelatedAnimes = Array.from(
      new Map(
        data.data.relatedAnimes.map((item: AnimeDetailsDataType['recommendedAnimes'][number]) => [item.id, item])
      ).values()
    );
    data.data.relatedAnimes = uniqueRelatedAnimes;

    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export async function generateMetadata(
  { params }: { params: Promise<{ animeId: string }>  }
): Promise<Metadata> {
  // read route params
  const { animeId } = await params
 
  const data = await fetchData(animeId);
 
  return {
    title: `${data.anime.info.name} | AnimeGhar` || "AnimeGhar - Watch Anime Online",
    description: `Watch ${data.anime.info.name} episodes online for free without any ads and distractions.` || "Watch your favorite anime episodes online for free without any ads and distractions.",
  }
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ animeId: string }> ;
}) {
  const { animeId } = await params;
  const data: AnimeDetailsDataType = await fetchData(animeId);

  return (
    <div className="min-h-screen dark:bg-slate-950 mt-16">
      <div className="relative">
        {/* <div className="absolute inset-0">
          <Image
            src={data.anime.info.poster || "/placeholder.svg"}
            alt={data.anime.info.name}
            fill
            className="object-cover blur-xs grayscale-75 contrast-150 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background dark:to-slate-950" />
        </div> */}

        <div className="relative max-w-7xl container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Movie Poster - Now in portrait orientation */}
            <div className="lg:col-span-1">
              <div className="relative mx-auto max-w-sm">
                <Image
                  src={data.anime.info.poster || "/placeholder.svg"}
                  alt={data.anime.info.name}
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
                  {data.anime.info.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-cyan-400 fill-current" />
                    <span className="text-xl font-semibold">
                      {data.anime.info.stats.rating || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{data.anime.moreInfo.aired || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{data.anime.moreInfo.duration || "N/A"} min</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {data.anime.moreInfo.genres.map((genre) => (
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
                <Description description={data.anime.info.description} />

                {/* Movie Information moved to header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                        Studios:
                      </span>
                      <span className="text-primary/90">
                        {data.anime.moreInfo.studios || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                        Episodes:
                      </span>
                      <span className="text-primary/90">{data.anime.info.stats.episodes.sub || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">Status:</span>
                      <span className="text-primary/90">
                        {data.anime.moreInfo.status || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                        Characters:
                      </span>
                      <span className="text-white/90 text-sm">
                        {data.anime.info.charactersVoiceActors
                          .map((character) => character.character.name)
                          .slice(0, 3)
                          .join(", ")}
                        {data.anime.info.charactersVoiceActors.length > 3 &&
                          "..."}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                        Japanese Name:
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-cyan-300/50 text-cyan-200 bg-cyan-900/30"
                      >
                        {data.anime.moreInfo.japanese || "N/A"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {data.anime.info.id &&
                  <div className="flex flex-wrap gap-3">
                    <Button asChild
                      size="lg"
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:bg-cyan-700 text-white"
                    >
                      <Link href={`/watch/${data.anime.info.id}`}>
                        <Play className="h-5 w-5 mr-2" />
                        Watch Now
                      </Link>
                    </Button>
                    {/* <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-cyan-900"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button> */}
                  </div>}
              </div>
              <div className="row-start-2 col-start-1 flex flex-wrap col-span-4 gap-3 mt-2">
                {data?.seasons.map((season) => (
                  <Link key={season.id} href={`/watch/${season.id}`}>
                    <SeasonCard poster={season.poster} name={season.title} isCurrent={season.isCurrent} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Animes */ }
  <RelatedAnime relatedAnimes={data.relatedAnimes} />

  {/* Most Popular Movies */ }
  <section className="max-w-7xl container mx-auto mt-6">
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      Most Popular Movies
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data.mostPopularAnimes.map((anime) => (
        <AnimeCard
          key={anime.id}
          animeId={anime.id}
          animePoster={anime.poster}
          animeName={anime.name}
          animeType={anime.type}
          animeEpisodes={anime.episodes}
        />
      ))}
    </div>
  </section>

  {/* Recommended Movies */ }
  <section className="max-w-7xl container mx-auto mt-6 mb-4">
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      You Might Also Like
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.recommendedAnimes.map((anime) => (
        <AnimeCard
          key={anime.id}
          animeId={anime.id}
          animePoster={anime.poster}
          animeName={anime.name}
          animeType={anime.type}
          animeEpisodes={anime.episodes}
        />
      ))}
    </div>
  </section>
    </div >
  );
}
