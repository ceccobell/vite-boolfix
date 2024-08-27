<template>
    <div class="container">
        <div class="row">
            <div class="col-25" v-for="movie, index in store.moviesList">
                <div class="card">
                    <img :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`" alt="">
                    <ul>
                        <li>Titolo: {{ movie.title }}</li>
                        <li>Titolo originale: {{ movie.original_title }}</li>
                        <li>
                            Voto: 
                            <i v-for="star, index in stars" :class="index < convertVote(movie.vote_average) ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                        </li>
                        <li>Overview: {{ movie.overview }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store';

export default {
    data() {
        return {
            store,
            stars: 5
        }
    },
    methods: {
        convertVote(vote_average) {
            return Math.round(vote_average / 2)
        }
    }
}
</script>

<style scoped>
    .card {
        padding: 10px;
    }

    img {
        width: 100%;
        height: auto;
    }

    ul {
        list-style-type: none;
        display: none;
    }

    .card:hover img {
        display: none;
    }

    .card:hover ul {
        display: block;
    }

    .fa-star {
        color: #FFD43B;
    }
</style>