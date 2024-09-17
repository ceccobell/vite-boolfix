<script>
import { store } from "../store"
import axios from "axios"

export default {
    data() {
        return {
            store,
            APItop10serieTV:
                "https://api.themoviedb.org/3/trending/tv/day?api_key=23534135ecaf0f022b163c9be897d83b",
            top10serieTV_list: [],
        }
    },
    mounted() {
        this.getTOP10serietv()
    },
    methods: {
        getTOP10serietv() {
            axios.get(this.APItop10serieTV).then((result) => {
                this.top10serieTV_list = result.data.results.slice(0, 10)
            })
        },
    },
}
</script>

<template>
    <div class="container">
        <h3>Top 10 delle Serie Tv oggi</h3>
        <div class="row">
            <div v-for="(serie, index) in top10serieTV_list" :key="serie.id" class="col-25 d-flex">
                <img :src="`/grafiche/${index + 1}.png`" alt="indice" />
                <img
                    :src="`http://image.tmdb.org/t/p/w342/${serie.poster_path}`"
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
