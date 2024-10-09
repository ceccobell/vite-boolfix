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
        fetchMyList() {
            const token = localStorage.getItem("authToken")
            axios
                .get("http://127.0.0.1:8000/api/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    this.favorites = response.data
                    this.favorites.forEach((favorite) => {
                        axios
                            .get(
                                `https://api.themoviedb.org/3/${favorite.type}/${favorite.item_id}?api_key=23534135ecaf0f022b163c9be897d83b`
                            )
                            .then((result) => {
                                store.myList.push(result.data)
                            })
                    })
                    console.log("Preferiti recuperati:", this.favorites)
                })
                .catch((error) => {
                    console.error("Errore nel recupero dei preferiti:", error.response.data)
                })
        },
    },
    mounted() {
        this.getFilmGenres()
        this.getSerieTVgenres()
        this.fetchMyList()
    },
}
</script>

<style scoped></style>
