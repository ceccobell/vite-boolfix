<template>
    <div class="searchbar">
        <input type="text" v-model="searchQuery">
        <button type="button" @click="getMoviesList()"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <ol v-for="movie, index in store.moviesList" :key="index">
        <li>{{ movie.title }}</li>
        <li>{{ movie.original_title }}</li>
        <li><span :class="`fi fi-${movie.original_language}`"></span>  {{ movie.original_language }}</li>
        <li>{{ movie.vote_average }}</li>
    </ol>
    <span class="fi fi-en"></span>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default {
    data() {
        return {
            searchQuery: '',
            store
        }
    },
    methods: {
        getMoviesList() {
            axios.get(store.apiUrlMovies + this.searchQuery).then((result) => {
                store.moviesList = result.data.results
            })
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
</style>