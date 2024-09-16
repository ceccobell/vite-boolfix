<script>
import { store } from "../../store"
export default {
    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div v-for="(serie, index) in store.top10serieTV_list" :key="serie.id" class="col-25">
                <img :src="`http://image.tmdb.org/t/p/w342/${serie.poster_path}`" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.row {
    flex-wrap: nowrap;
}

img {
    width: 100%;
    height: auto;
}
</style>
