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
    APItop10serieTV:
        "https://api.themoviedb.org/3/trending/tv/day?api_key=23534135ecaf0f022b163c9be897d83b",
    top10serieTV_list: [],
    APItop10movies:
        "https://api.themoviedb.org/3/trending/movie/day?api_key=23534135ecaf0f022b163c9be897d83b",
    top10movies: [],
    getTOP10serietv() {
        axios.get(this.APItop10serieTV).then((result) => {
            this.top10serieTV_list = result.data.results.slice(0, 10)
        })
    },
    getTOP10movies() {
        axios.get(this.APItop10movies).then((result) => {
            this.top10movies = result.data.results.slice(0, 10)
        })
    },
})
