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

export const SEARCH_QUERY = `query SearchAnime(
  $search: String!
  $page: Int!
  $perPage: Int!
) {
  Page(
    page: $page
    perPage: $perPage
  ) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }

    media(
      type: ANIME
      search: $search
      sort: POPULARITY_DESC
    ) {
      id

      title {
        romaji
        english
        native
      }

      coverImage {
        large
      }

      averageScore
      popularity

      format
      episodes
      duration

      status
    }
  }
}`;

export const SEARCH_SUGGESTION_QUERY = `query SearchTopAnime($search: String!) {
  Page(page: 1, perPage: 8) {
    media(
      type: ANIME
      search: $search
      sort: POPULARITY_DESC
    ) {
      id

      title {
        romaji
        english
        native
      }

      coverImage {
        large
      }

      averageScore

      format
      episodes

      status
    }
  }
}`

export const ANIME_DETAILS_QUERY = `query AnimeDetails($id: Int!) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    synonyms
    bannerImage
    coverImage {
      extraLarge
      large
      medium
      color
    }
    description(asHtml: false)
    averageScore
    meanScore
    popularity
    favourites
    episodes
    duration
    format
    status
    genres
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

    airingSchedule(notYetAired: true, perPage: 1) {
      nodes {
        airingAt
        timeUntilAiring
        episode
      }
    }

    season
    seasonYear
    studios(isMain: true) {
      nodes {
        id
        name
      }
    }
    relations {
      edges {
        relationType
        node {
          id
          title {
            romaji
            english
          }
          type
          averageScore
          episodes
          format
          status
          coverImage {
            large
          }
          bannerImage
          season
          seasonYear
        }
      }
    }
    recommendations(page: 1, perPage: 12, sort: RATING_DESC) {
      nodes {
        rating
        mediaRecommendation {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          bannerImage
          averageScore
          format
          episodes
          status
        }
      }
    }
  }
}`

export const RELEASING_EPISODES_QUERY = `query AnimeAiredInfo($id: Int!) {
  Media(id: $id, type: ANIME) {
    nextAiringEpisode {
      episode
      airingAt
      timeUntilAiring
    }
  }
}`
