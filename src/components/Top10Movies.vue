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
        // Metodo per gestire lo scorrimento in avanti
        scrollNext() {
            const row = this.$refs.row
            const scrollAmount = row.clientWidth * 0.5 // Scorre del 50% della larghezza visibile
            row.scrollBy({ left: scrollAmount, behavior: "smooth" })
        },
        // Metodo per scorrere indietro di due colonne (50% della riga visibile)
        scrollPrev() {
            const row = this.$refs.row
            const scrollAmount = row.clientWidth * 0.5 // Scorre del 50% della larghezza visibile
            row.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        },
    },
}
</script>

<template>
    <div class="container">
        <h3>Top 10 dei film oggi</h3>
        <div class="row-container">
            <div ref="row" class="row">
                <div v-for="(movie, index) in top10movies" :key="movie.id" class="col-25 d-flex">
                    <img :src="`/grafiche/${index + 1}.png`" alt="indice" />
                    <img
                        :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`"
                        alt="immagine copertina" />
                </div>
            </div>
            <button class="btn-next" @click="scrollNext">
                <i class="fa-solid fa-angle-right"></i>
            </button>
            <button class="btn-prev" @click="scrollPrev">
                <i class="fa-solid fa-angle-left"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.row-container {
    position: relative;
}

.row {
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.row::-webkit-scrollbar {
    display: none;
}

.col-25 {
    flex: 0 0 auto;
}

img {
    width: 50%;
    height: auto;
    object-fit: cover;
}

.btn-prev,
.btn-next {
    position: absolute;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.861);
    border: 0;
    color: white;
    font-size: var(--font-size-xxl);
    cursor: pointer;
    height: 100%;
    width: 40px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.btn-next {
    top: 50%;
    right: 0;
}

.btn-prev {
    top: 50%;
    left: 0;
}

.row-container:hover .btn-prev,
.row-container:hover .btn-next {
    opacity: 1;
}
</style>
