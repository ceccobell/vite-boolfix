<template>
    <div class="container">
        <div class="row bg-black">
            <div class="col-50">
                <h1>BOOLFLIX</h1>
            </div>
            <div class="col-50 d-flex align-items-center justify-content-end">
                <div class="input-group my-10">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Cerca Film, Serie..." 
                        aria-label="Player's name" 
                        aria-describedby="search-button" 
                        v-model="store.searchQuery" 
                    />
                    <button class="btn" type="button" @click="getMoviesList(), getSerieList()">
                        <i class="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default {
    data() {
        return {
            store
        }
    },
    methods: {
        getMoviesList() {
            axios.get(store.apiUrlMovies + store.searchQuery).then((result) => {
                store.moviesList = result.data.results;
            });
        },
        getSerieList() {
            axios.get(store.apiUrlSerieTV + store.searchQuery).then((result) => {
                store.serieTV_list = result.data.results;
            });
        },
        convertLanguageCode(languageCode) {
            // Se il codice lingua è 'en', lo converte in 'gb'
            if (languageCode === 'en') {
                languageCode = 'gb';
            }
            return languageCode;
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

    .col-50 {
        padding: 10px;
    }

    h1 {
        color: red;
    }

    .input-group {
        display: flex;
        width: 70%;
        margin: 0 auto;
        position: relative;
    }

    .form-control {
        flex: 1 1 auto;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ced4da;
        border-radius: 10px 0 0 10px;
        background-color: #e9ecef;
        position: relative;
    }

    .btn {
        display: inline-block;
        padding: 10px 16px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        border: 0;
        border-radius: 0 10px 10px 0;
    }
</style>
