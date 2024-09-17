<script>
import { store } from "../store"
import axios from "axios"

export default {
    data() {
        return {
            store,
            APItop10movies:
                "https://api.themoviedb.org/3/trending/movie/day?api_key=23534135ecaf0f022b163c9be897d83b",
            top10movies: [],
        }
    },
    mounted() {
        this.getTOP10movies()
    },
    methods: {
        getTOP10movies() {
            axios.get(this.APItop10movies).then((result) => {
                this.top10movies = result.data.results.slice(0, 10)
            })
        },
    },
}
</script>

<template>
    <div class="container">
        <h3>Top 10 delle Serie Tv oggi</h3>
        <div class="row">
            <div v-for="(movie, index) in top10movieTV_list" :key="movie.id" class="col-25 d-flex">
                <img :src="`/grafiche/${index + 1}.png`" alt="indice" />
                <img
                    :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`"
                    alt="immagine copertina" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.row {
    flex-wrap: nowrap;
    overflow-x: auto;
    position: relative;
}

.col-25 {
    flex: 0 0 auto;
}

img {
    width: 50%;
    height: auto;
    object-fit: cover;
}
</style>
