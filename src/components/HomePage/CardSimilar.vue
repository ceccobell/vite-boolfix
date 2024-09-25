<script>
import axios from "axios"

export default {
    data() {
        return {
            similarContent: [],
            similarContentApi:
                "https://api.themoviedb.org/3/tv/1396/similar?api_key=23534135ecaf0f022b163c9be897d83b",
            detailsContent: {},
        }
    },
    mounted() {
        this.getSimilarContent()
    },
    methods: {
        getSimilarContent() {
            axios.get(this.similarContentApi).then((result) => {
                this.similarContent = result.data.results

                this.similarContent.forEach((contenuto) => {
                    contenuto["number_of_seasons"] = ""
                    contenuto["number_of_seasons"] = ""
                    axios
                        .get(
                            `https://api.themoviedb.org/3/tv/${contenuto.id}?api_key=23534135ecaf0f022b163c9be897d83b`
                        )
                        .then((item) => {
                            this.detailsContent = item.data
                            contenuto["number_of_seasons"] = this.detailsContent.number_of_seasons
                            contenuto["number_of_episodes"] = this.detailsContent.number_of_episodes
                        })
                })
            })
        },
    },
}
</script>

<template>
    <div class="more-like-this-wrapper">
        <h3>Altri titoli simili</h3>
        <div class="more-like-this-container">
            <div class="card" v-for="(content, index) in similarContent" :key="content.id">
                <div class="img-wrapper">
                    <img
                        :src="`http://image.tmdb.org/t/p/w342/${content.backdrop_path}`"
                        :alt="content.name" />
                    <div>{{ content.number_of_episodes }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.more-like-this-wrapper {
    padding: 0 4%;
}

.more-like-this-wrapper h3 {
    margin-top: 48px;
    margin-bottom: 20px;
    color: white;
    font-size: 24px;
}

.more-like-this-container {
    grid-gap: 1em;
    align-items: stretch;
    display: grid;
    justify-items: stretch;
    grid-template-columns: repeat(2, 1fr);
}

.card {
    border-radius: 0px 0px 4px 4px;
}

img {
    width: 100%;
    height: auto;
    border-radius: 4px 4px 0px 0px;
}
</style>
