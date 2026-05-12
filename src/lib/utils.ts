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
