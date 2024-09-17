<template>
    <NavBar />
    <HomeMain />
</template>

<script>
import NavBar from "./components/NavBar.vue"
import HomeMain from "./components/HomePage/HomeMain.vue"

export default {
    components: {
        NavBar,
        HomeMain,
    },
}
</script>

<style scoped></style>
