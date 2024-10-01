<script>
import { store } from "../store"
export default {
    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <div class="search-page">
        <div class="results">
            <div class="card" v-for="(item, index) in store.moviesList" :key="index">
                <img
                    :src="`http://image.tmdb.org/t/p/w342/${item.backdrop_path}`"
                    :alt="item.title" />
                <div class="title-content">
                    {{ item.title }}
                </div>
            </div>
            <div class="card" v-for="(item, index) in store.serieTV_list" :key="index">
                <img
                    :src="`http://image.tmdb.org/t/p/w342/${item.backdrop_path}`"
                    :alt="item.title" />
                <div class="title-content">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-page {
    padding: 4%;
    padding-top: 100px;
    width: 100%;
    background-color: #141414;
}

.results {
    display: grid;
    gap: 4vw 0;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 7.5vw;
}

img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
}

.card {
    padding: 0 0.2vw;
    position: relative;
}

.card::before {
    background: linear-gradient(
        198deg,
        rgba(0, 0, 0, 0.9),
        hsla(0, 0%, 9%, 0.5) 20%,
        transparent 28%
    );
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 4px;
}

.title-content {
    color: white;
    font-size: 10px;
    position: absolute;
    top: 5px;
    right: 5px;
}

@media (min-width: 500px) {
    .results {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 800px) {
    .results {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 1100px) {
    .results {
        grid-template-columns: repeat(5, 1fr);
    }
}

@media (min-width: 1400px) {
    .results {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>
