<template>
    <div class="searchbar">
        <input type="text" v-model="searchQuery">
        <button type="button" @click="getMoviesList()"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <ul v-for="movie, index in store.moviesList" :key="index">
        <li>{{ movie.title }}</li>
        <li>{{ movie.original_title }}</li>
        <li>{{ movie.original_language }}</li>
        <li>{{ movie.vote_average }}</li>
    </ul>
</template>

<script>
import { store } from '../store';
import axios from 'axios';

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
    
</style>