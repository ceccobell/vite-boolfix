import { reactive } from "vue"

export const store = reactive({
    apiUrlMovies:
        "https://api.themoviedb.org/3/search/movie?api_key=23534135ecaf0f022b163c9be897d83b&query=",
    moviesList: [],
    apiUrlSerieTV:
        "https://api.themoviedb.org/3/search/tv?api_key=23534135ecaf0f022b163c9be897d83b&query=",
    serieTV_list: [],
    filmGenresApi:
        "https://api.themoviedb.org/3/genre/movie/list?api_key=23534135ecaf0f022b163c9be897d83b",
    filmGenresList: [],
    serieTVgenresApi:
        "https://api.themoviedb.org/3/genre/tv/list?api_key=23534135ecaf0f022b163c9be897d83b",
    serieTVgenresList: [],
    sections: [
        {
            title: "SERIE TV acclamate dalla critica",
            apiUrl: "https://api.themoviedb.org/3/tv/top_rated?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "tv",
            displayCount: 40,
        },
        {
            title: "Film acclamati dalla critica",
            apiUrl: "https://api.themoviedb.org/3/movie/top_rated?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "movie",
            displayCount: 40,
        },
        {
            title: "Film commedia",
            apiUrl: "https://api.themoviedb.org/3/discover/movie?api_key=23534135ecaf0f022b163c9be897d83b&with_genres=35",
            type: "movie",
            displayCount: 40,
        },
        {
            title: "Film Horror",
            apiUrl: "https://api.themoviedb.org/3/discover/movie?api_key=23534135ecaf0f022b163c9be897d83b&with_genres=27",
            type: "movie",
            displayCount: 40,
        },
        {
            title: "Film attualmente disponibili",
            apiUrl: "https://api.themoviedb.org/3/movie/now_playing?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "movie",
            displayCount: 40,
        },
        {
            title: "Serie TV in onda oggi",
            apiUrl: "https://api.themoviedb.org/3/tv/airing_today?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "tv",
            displayCount: 40,
        },
        {
            title: "Serie TV in onda durante la prossima settimana",
            apiUrl: "https://api.themoviedb.org/3/tv/on_the_air?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "tv",
            displayCount: 40,
        },
        {
            title: "Serie TV per bambini",
            apiUrl: "https://api.themoviedb.org/3/discover/tv?api_key=23534135ecaf0f022b163c9be897d83b&with_genres=10762",
            type: "tv",
            displayCount: 40,
        },
    ],
})
