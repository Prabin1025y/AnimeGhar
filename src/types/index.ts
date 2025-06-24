export interface HomeDataType {
    genres: string[]
    latestEpisodeAnimes: {
        id: string,
        name: string,
        poster: string,
        type: string,
        duration: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[]

    spotlightAnimes: {
        id: string,
        name: string,
        jname: string,
        poster: string,
        description: string,
        rank: number,
        otherInfo: string[],
        episodes: {
            sub: number,
            dub: number,
        },
    }[]

    top10Animes: {
        today: {
            episodes: {
                sub: number,
                dub: number,
            },
            id: string,
            name: string,
            poster: string,
            rank: number
        }[],
        month: {
            episodes: {
                sub: number,
                dub: number,
            },
            id: string,
            name: string,
            poster: string,
            rank: number
        }[],
        week: {
            episodes: {
                sub: number,
                dub: number,
            },
            id: string,
            name: string,
            poster: string,
            rank: number
        }[]
    }

    topAiringAnimes:
    {
        id: string,
        name: string,
        poster: string,
        duration: string,
        type: string,
        rating: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[]

    topUpcomingAnimes: {
        id: string,
        name: string,
        poster: string,
        duration: string,
        type: string,
        rating: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[]

    trendingAnimes: {
        id: string,
        name: string,
        poster: string,
        jname: string,
        rank: number,
        rating: number,
        duration?: string,
        episodes?: number,
        year: number,
        genres: string[]
    }[]

    mostPopularAnimes: {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[]

    mostFavoriteAnimes: {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[]

    latestCompletedAnimes: {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[]
}

export interface AnimeTipsDataType {
    id: string,
    name: string,
    malscore: string,
    quality: string,
    episodes: {
        sub: number,
        dub: number
    },
    type: string,
    description: string,
    jname: string,
    synonyms?: string,
    aired: string,
    status: string,
    genres: string[]
}

export interface AnimeDetailsDataType {
    anime: {
        info: {
            id: string,
            name: string,
            poster: string,
            description: string,
            stats: {
                rating: string,
                quality: string,
                episodes: {
                    sub: number,
                    dub: number
                },
                type: string,
                duration: string
            },
            promotionalVideos:
            {
                title: string | undefined,
                source: string | undefined,
                thumbnail: string | undefined
            }[],
            charactersVoiceActors:
            {
                character: {
                    id: string,
                    poster: string,
                    name: string,
                    cast: string
                },
                voiceActor: {
                    id: string,
                    poster: string,
                    name: string,
                    cast: string
                }
            }[],
        }
        moreInfo: {
            aired: string,
            genres: string[],
            status: string,
            studios: string,
            duration: string,
            producers: string[],
            japanese?: string,
            premiered?: string,
            malscore?: string,
        }
    },
    mostPopularAnimes: {
        episodes: {
            sub: number,
            dub: number,
        },
        id: string,
        jname: string,
        name: string,
        poster: string,
        type: string
    }[],
    recommendedAnimes: {
        id: string,
        name: string,
        poster: string,
        duration: string,
        type: string,
        rating: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[],
    relatedAnimes: {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
            sub: number,
            dub: number,
        }
    }[],
    seasons: {
        id: string,
        name: string,
        title: string,
        poster: string,
        isCurrent: boolean
    }[]
}

export type EpisodeSourceType = {

    headers: {
        Referer: string
    },
    tracks: [
        {
            url: string,
            lang: string
        }
    ],
    intro: {
        start: number,
        end: number
    },
    outro: {
        start: number,
        end: number
    },
    sources: [
        {
            url: string,
            isM3U8: boolean,
            type: string
        }
    ],
    anilistID: 9253,
    malID: 9253
}

export type SearchSuggestionType = {
    id: string,
    name: string,
    poster: string,
    jname: string,
    moreInfo: string[]
}
