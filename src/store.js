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
})
