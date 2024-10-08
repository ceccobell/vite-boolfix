<template>
    <NavBar />
    <routerView />
</template>

<script>
import NavBar from "./components/NavBar.vue"
import HomeMain from "./components/pages/HomePage.vue"
import { store } from "./store"
import axios from "axios"

export default {
    components: {
        NavBar,
        HomeMain,
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        getFilmGenres() {
            axios.get(store.filmGenresApi).then((result) => {
                store.filmGenresList = result.data.genres
            })
        },
        getSerieTVgenres() {
            axios.get(store.serieTVgenresApi).then((result) => {
                store.serieTVgenresList = result.data.genres
            })
        },
    },
    mounted() {
        this.getFilmGenres()
        this.getSerieTVgenres()
    },
}
</script>

<style scoped></style>
