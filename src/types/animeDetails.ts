export interface AnimeDetails {
    id: number;

    title: {
        romaji?: string;
        english?: string;
        native?: string;
    };

    synonyms: string[];

    bannerImage?: string;

    coverImage: {
        extraLarge?: string;
        large?: string;
        medium?: string;
        color?: string;
    };

    description?: string;

    averageScore?: number;
    meanScore?: number;
    popularity?: number;
    favourites?: number;

    episodes?: number;
    duration?: number;

    format?: string;
    status?: string;

    genres: string[];

    startDate: AnimeDate;
    endDate: AnimeDate;

    season?: string;
    seasonYear?: number;

    studios: {
        nodes: Studio[];
    };

    relations: {
        edges: RelationEdge[];
    };

    recommendations: {
        nodes: RecommendationNode[];
    };
}

interface AnimeDate {
    year?: number;
    month?: number;
    day?: number;
}

interface Studio {
    id: number;
    name: string;
}

interface RelationEdge {
    relationType: string;

    node: RelatedAnime;
}

interface RelatedAnime {
    id: number;

    title: {
        romaji?: string;
        english?: string;
    };

    type?: string;

    format?: string;

    averageScore?: number;

    episodes?: number;

    status?: string;

    season?: string;

    seasonYear?: number;

    coverImage: {
        large?: string;
    };

    bannerImage?: string;
}

interface RecommendationNode {
    rating?: number;

    mediaRecommendation?: RecommendedAnime;
}

interface RecommendedAnime {
    id: number;

    title: {
        romaji?: string;
        english?: string;
    };

    coverImage: {
        large?: string;
    };

    bannerImage?: string;

    averageScore?: number;

    format?: string;

    episodes?: number;

    status?: string;
}
