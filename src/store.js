import { reactive } from "vue"

export const store = reactive({
    isAuthenticated: false,
    myList: [],
    myListID: [],
    searchQuery: "",
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
    apiUrl: process.env.VUE_APP_API_URL,
})
