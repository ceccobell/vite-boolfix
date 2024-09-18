<script>
import { store } from "../../store"
import axios from "axios"

export default {
    data() {
        return {
            store,
            contents: [],
        }
    },
    mounted() {
        this.getContents()
    },
    methods: {
        getContents() {
            axios.get(store.sections[0].apiUrl).then((result) => {
                this.contents = result.data.results
            })
        },
        scrollNext() {
            const row = this.$refs.row
            const scrollAmount = row.clientWidth // Scorre del 100% della larghezza visibile
            row.scrollBy({ left: scrollAmount, behavior: "smooth" })
        },
        // Metodo per scorrere indietro di due colonne (100% della riga visibile)
        scrollPrev() {
            const row = this.$refs.row
            const scrollAmount = row.clientWidth // Scorre del 100% della larghezza visibile
            row.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        },
    },
}
</script>

<template>
    <div class="container">
        <h3>{{ store.sections[0].title }}</h3>
        <div class="row-container">
            <div ref="row" class="row">
                <div v-for="(movie, index) in contents" :key="movie.id" class="col d-flex">
                    <img
                        :src="`http://image.tmdb.org/t/p/w342/${movie.backdrop_path}`"
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

img {
    width: 100%;
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
