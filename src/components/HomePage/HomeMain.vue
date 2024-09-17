<template>
    <Top10SerieTV />
</template>

<script>
import { store } from "../../store"
import Top10SerieTV from "../Top10SerieTV.vue"

export default {
    components: {
        Top10SerieTV,
    },
    data() {
        return {
            store,
            stars: 5,
        }
    },
    methods: {
        convertVote(vote_average) {
            return Math.round(vote_average / 2)
        },
    },
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

ul {
    list-style-type: none;
    display: none;
}

.card:hover img {
    display: none;
}

.card:hover ul {
    display: block;
}

.fa-star {
    color: #ffd43b;
}
</style>
