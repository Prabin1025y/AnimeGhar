export const getHomeQuery = (
    year: number,
    season: string,
): string => `query HomePageAnime {
  # 1. Spotlight Anime (8)
  spotlight: Page(page: 1, perPage: 8) {
    media(
      sort: TRENDING_DESC
      type: ANIME
      status: RELEASING
    ) {
      id
      title {
        romaji
        english
        native
      }
      description(asHtml: false)
      bannerImage
      coverImage {
        extraLarge
        large
      }
      episodes
      duration
      genres
      averageScore
      popularity
      season
      seasonYear
      format
      studios(isMain: true) {
        nodes {
          name
        }
      }
    }
  }

  # 2. Trending Anime This Season
  trendingSeason: Page(page: 1, perPage: 10) {
    media(
      type: ANIME
      season: ${season.toUpperCase()}
      seasonYear: ${year}
      sort: TRENDING_DESC
    ) {
      id
      title {
        romaji
        english
      }
      bannerImage
      coverImage {
        large
      }
      averageScore
      popularity
      episodes
      nextAiringEpisode {
        episode
        airingAt
      }
    }
  }

  # 3. Top Airing Anime
  topAiring: Page(page: 1, perPage: 10) {
    media(
      type: ANIME
      status: RELEASING
      sort: SCORE_DESC
    ) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      averageScore
      popularity
      favourites
      episodes
      format
    }
  }

  # 4. Popular Anime Of All Time
  popularAllTime: Page(page: 1, perPage: 10) {
    media(
      type: ANIME
      sort: POPULARITY_DESC
    ) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      averageScore
      popularity
      favourites
      episodes
      format
    }
  }

  # 5. Latest Episodes
  latestEpisodes: Page(page: 1, perPage: 10) {
    airingSchedules(
      notYetAired: false
      sort: TIME_DESC
    ) {
      airingAt
      episode
      media {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        format
        bannerImage
        nextAiringEpisode {
          episode
          airingAt
        }
      }
    }
  }

  # 6. Top Upcoming Anime
  upcoming: Page(page: 1, perPage: 10) {
    media(
      type: ANIME
      status: NOT_YET_RELEASED
      sort: POPULARITY_DESC
    ) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      bannerImage
      format
      episodes
      season
      seasonYear
      startDate {
      year
      month
      day
    }
      studios(isMain: true) {
        nodes {
          name
        }
      }
    }
  }
}`;

export const getAnimeTipsQuery = (id: number): string => `query AnimeTipsData {
  Media(id: ${id}, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    synonyms
    averageScore
    episodes
    format
    description(asHtml: false)
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    status
    genres
  }
}`;
