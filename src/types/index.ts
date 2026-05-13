export type AnimeData = {
    spotlight: {
        media: SpotlightMedia[];
    };
    trendingSeason: {
        media: TrendingSeasonMedia[];
    };
    popularAllTime: {
        media: PopularAllTimeMedia[];
    };
    latestEpisodes: {
        airingSchedules: AiringSchedule[];
    };
    topAiring: {
      media: TopAiring[];
    }
    upcoming: {
        media: UpcomingMedia[];
    };
};

type Title = {
    romaji: string;
    english: string | null;
    native?: string | null;
};

type CoverImage = {
    extraLarge?: string;
    large: string;
};

type StudioNode = {
    name: string;
};

type Studios = {
    nodes: StudioNode[];
};

type NextAiringEpisode = {
    episode: number;
    airingAt: number;
};

type StartDate = {
    year: number | null;
    month: number | null;
    day: number | null;
};

type SpotlightMedia = {
    id: number;
    title: Title;
    description: string;
    bannerImage: string | null;
    coverImage: CoverImage;
    episodes: number | null;
    duration: number | null;
    genres: string[];
    averageScore: number;
    popularity: number;
    season: string | null;
    seasonYear: number | null;
    format: string;
    studios: Studios;
};

type TrendingSeasonMedia = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
    };
    bannerImage: string | null;
    coverImage: {
        large: string;
    };
    averageScore: number;
    duration: number | null;
    popularity: number;
    episodes: number | null;
    nextAiringEpisode: NextAiringEpisode | null;
};

type PopularAllTimeMedia = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
    };
    coverImage: {
        large: string;
    };
    averageScore: number;
    popularity: number;
    favourites: number;
    episodes: number | null;
    format: string;
};

type TopAiring = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
    };
    coverImage: {
        large: string;
    };
    averageScore: number;
    popularity: number;
    favourites: number;
    episodes: number | null;
    format: string;
};

type AiringSchedule = {
    airingAt: number;
    episode: number;
    media: {
        id: number;
        title: {
            romaji: string;
            english: string | null;
        };
        coverImage: {
            large: string;
        };
        format: string;
        bannerImage: string | null;
        nextAiringEpisode: NextAiringEpisode | null;
    };
};

type UpcomingMedia = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
    };
    coverImage: {
        large: string;
    };
    bannerImage: string | null;
    format: string;
    episodes: number | null;
    season: string | null;
    seasonYear: number | null;
    startDate: StartDate;
    studios: Studios;
};
