export type SearchResponse = {
    pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
    };
    media: Anime[];
};

type Anime = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
        native: string;
    };
    coverImage: {
        large: string;
    };
    averageScore: number;
    popularity: number;
    format: "TV" | "TV_SHORT" | "MOVIE" | "OVA" | "ONA" | "MUSIC";
    episodes: number;
    duration: number;
    status: "FINISHED";
};

export type AnimeSearchSuggestions = {
    id: number;

    title: {
        romaji: string | null;
        english: string | null;
        native: string | null;
    };

    coverImage: {
        large: string;
    };

    averageScore: number | null;

    format: string | null;

    episodes: number | null;

    status: string | null;
}[];
