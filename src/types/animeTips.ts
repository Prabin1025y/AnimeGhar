// type AnimeTips = {
//     Media: Media;
// };

type AnimeTips = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
        native: string;
    };
    synonyms: string[];
    averageScore: number;
    episodes: number | null;
    format: string;
    description: string;
    startDate: FuzzyDate;
    endDate: FuzzyDate;
    status: string;
    genres: string[];
};

type FuzzyDate = {
    year: number | null;
    month: number | null;
    day: number | null;
};
