import { reactive } from "vue"
import axios from "axios"

export const store = reactive({
    searchQuery: "",
    apiUrlMovies:
        "https://api.themoviedb.org/3/search/movie?api_key=23534135ecaf0f022b163c9be897d83b&query=",
    moviesList: [],
    apiUrlSerieTV:
        "https://api.themoviedb.org/3/search/tv?api_key=23534135ecaf0f022b163c9be897d83b&query=",
    serieTV_list: [],
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
            title: "SERIE TV acclamate dalla critica",
            apiUrl: "https://api.themoviedb.org/3/tv/top_rated?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "tv",
            displayCount: 40,
        },
        {
            title: "SERIE TV acclamate dalla critica",
            apiUrl: "https://api.themoviedb.org/3/tv/top_rated?api_key=23534135ecaf0f022b163c9be897d83b",
            type: "tv",
            displayCount: 40,
        },
    ],
})
