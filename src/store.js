import { reactive } from "vue";

export const store = reactive({
    apiUrlMovies: "https://api.themoviedb.org/3/search/movie?api_key=23534135ecaf0f022b163c9be897d83b&query=",
    moviesList: []
})