<template>
    <div class="searchbar">
        <input type="text" v-model="searchQuery">
        <button type="button" @click="getMoviesList(), getSerieList()"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <h1>Lista dei film:</h1>
    <ol v-for="(movie, index) in store.moviesList" :key="index">
        <li>{{ movie.title }}</li>
        <li>{{ movie.original_title }}</li>
        <li>
            <span :class="`fi fi-${convertLanguageCode(movie.original_language)}`"></span>
            {{ movie.original_language }}
        </li>
        <li> 
            <i v-for="star, index in stars" :class="index < convertVote(movie.vote_average) ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
        </li>
        <li><img :src="`http://image.tmdb.org/t/p/w92/${movie.poster_path}`" alt=""></li>
    </ol>
    <h1>Lista delle Serie TV:</h1>
    <ol v-for="(serie, index) in store.serieTV_list" :key="index">
        <li>{{ serie.name }}</li>
        <li>{{ serie.original_name }}</li>
        <li>
            <span :class="`fi fi-${convertLanguageCode(serie.original_language)}`"></span>
            {{ serie.original_language }}
        </li>
        <li><i v-for="star, index in stars" :class="index < convertVote(serie.vote_average) ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i></li>
        <li><img :src="`http://image.tmdb.org/t/p/w92/${serie.poster_path}`" alt=""></li>
    </ol>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default {
    data() {
        return {
            searchQuery: '',
            store,
            stars: 5
        }
    },
    methods: {
        getMoviesList() {
            axios.get(store.apiUrlMovies + this.searchQuery).then((result) => {
                store.moviesList = result.data.results;
            });
        },
        getSerieList() {
            axios.get(store.apiUrlSerieTV + this.searchQuery).then((result) => {
                store.serieTV_list = result.data.results;
            });
        },
        convertLanguageCode(languageCode) {
            // Se il codice lingua è 'en', lo converte in 'gb'
            if (languageCode === 'en') {
                languageCode = 'gb';
            }
            return languageCode;
        },
        convertVote(vote_average) {
            return Math.round(vote_average / 2)
        }
    }
}
</script>

<style scoped>
    li {
        margin: 5px 25px;
    }

    li:first-child {
        border-top: 1px solid black;
    }

    .fa-star {
        color: #FFD43B;
    }
</style>
