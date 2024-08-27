<template>
    <div class="container">
        <div class="row">
            <div class="col-25" v-for="card, index in store.moviesList">
                <div class="card">
                    <img :src="`http://image.tmdb.org/t/p/w342/${card.poster_path}`" alt="">
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
            store
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
</style>