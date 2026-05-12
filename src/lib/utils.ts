import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getCurrentYearSeason = () => {
    const now = new Date();

    const currentMonth = now.getMonth() + 1;

    let currentSeason;

    if (currentMonth <= 3) currentSeason = "WINTER";
    else if (currentMonth <= 6) currentSeason = "SPRING";
    else if (currentMonth <= 9) currentSeason = "SUMMER";
    else currentSeason = "FALL";

    const currentYear = now.getFullYear();

    return { season: currentSeason, year: currentYear };
};

export function formatDate(
    day: number | null,
    month: number | null,
    year: number | null,
) {
    if (!year && !month && !day) return "unknown";

    // only year
    if (year && !month && !day) {
        return String(year);
    }

    // year + month (no day)
    if (year && month && !day) {
        const date = new Date(year, month - 1);
        return date
            .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
            })
            .toLowerCase();
    }

    // full date or fallback if partial junk
    if (year && month && day) {
        const date = new Date(year, month - 1, day);
        return date
            .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .toLowerCase();
    }

    // year missing but others exist (invalid case)
    return "unknown";
}
