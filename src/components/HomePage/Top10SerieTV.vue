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
            <div
                v-for="(serie, index) in store.top10serieTV_list"
                :key="serie.id"
                class="col-25 d-flex">
                <img :src="`/grafiche/${index + 1}.png`" alt="" />
                <img :src="`http://image.tmdb.org/t/p/w342/${serie.poster_path}`" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.row {
    flex-wrap: nowrap;
    overflow-x: auto;
    position: relative;
}

.col-25 {
    flex: 0 0 auto;
}

.col-25 img:last-child {
    margin-left: ;
}

img {
    width: 50%;
    height: auto;
    object-fit: cover;
}
</style>
