import { AnimeDetailsDataType } from "@/types"

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Ongoing":
      return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "Upcoming":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  }
}

export const removeDuplicateRelatedAnimes = (animes: AnimeDetailsDataType['relatedAnimes']) => {
  const uniqueRelatedAnimes = Array.from(
    new Map(
      animes.map((item: any) => [item.id, item])
    ).values()
  );
  return uniqueRelatedAnimes;
}