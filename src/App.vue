<template>
    <NavBar />
    <HomeMain />
</template>

<script>
import NavBar from "./components/NavBar.vue"
import HomeMain from "./components/HomePage/HomeMain.vue"
import { store } from "./store"

export default {
    data() {
        return store
    },
    components: {
        NavBar,
        HomeMain,
    },
    mounted() {
        store.getTOP10movies()
    },
}
</script>

<style scoped></style>
