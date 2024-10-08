<script>
import axios from "axios"

export default {
    data() {
        return {
            similarContent: [],
            similarContentApi:
                "https://api.themoviedb.org/3/tv/1396/similar?api_key=23534135ecaf0f022b163c9be897d83b",
            detailsContent: {},
            isCollapsed: true,
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
        toggleCollapsed() {
            this.isCollapsed = !this.isCollapsed
        },
    },
}
</script>

<template>
    <div class="more-like-this-wrapper">
        <h3>Altri titoli simili</h3>
        <div :class="{ 'more-like-this-container': true, 'container-collapsed': isCollapsed }">
            <div class="card" v-for="(content, index) in similarContent" :key="content.id">
                <div class="img-wrapper">
                    <img
                        :src="`http://image.tmdb.org/t/p/w342/${content.backdrop_path}`"
                        :alt="content.name" />
                    <div class="duration" v-show="content.number_of_seasons === 1">
                        {{ content.number_of_episodes }} episodi
                    </div>
                    <div class="duration" v-show="content.number_of_seasons > 1">
                        {{ content.number_of_seasons }} stagioni
                    </div>
                </div>
                <div class="card-info">
                    <div class="title d-flex justify-content-between align-items-center">
                        <h4 class="text-white">{{ content.name }}</h4>
                        <button class="add-to-my-list">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <p>{{ content.overview }}</p>
                </div>
            </div>
        </div>
        <div :class="{ 'section-divider': true, collapsed: isCollapsed }">
            <button type="button" @click="toggleCollapsed">
                <i v-show="isCollapsed" class="fa-solid fa-angle-down"></i>
                <i v-show="!isCollapsed" class="fa-solid fa-angle-up"></i>
            </button>
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
    display: grid;
    grid-template-columns: repeat(1, 1fr);
}

.container-collapsed {
    height: 1230px;
    overflow: hidden;
}

.card {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 400px;
    overflow: hidden;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px 4px 0px 0px;
}

.img-wrapper {
    position: relative;
    height: 200px;
}

.img-wrapper::before {
    background: linear-gradient(
        198deg,
        rgba(0, 0, 0, 0.9),
        hsla(0, 0%, 9%, 0.5) 20%,
        transparent 28%
    );
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 4px;
}

.duration {
    position: absolute;
    right: 5%;
    top: 5%;
    white-space: nowrap;
    color: white;
    font-weight: 600;
    font-size: 16px;
}

.card-info {
    background-color: #2f2f2f;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 200px;
}

.card-info h4 {
    font-size: 16px;
}

.add-to-my-list {
    background-color: rgba(42, 42, 42, 0.6);
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 100%;
    color: white;
    font-size: 16px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.add-to-my-list:hover {
    border: 2px solid white;
    background-color: rgba(79, 79, 79, 0.6);
}

.title {
    height: 20px;
}

.card-info p {
    color: #d2d2d2;
    font-size: 14px;
    margin-top: 20px;
    height: 180px;
    overflow-y: auto;
    overflow-y: hidden;
}

.section-divider {
    position: relative;
    border-bottom: 2px solid #404040;
    display: flex;
    justify-content: center;
    height: 100px;
    width: 100%;
    margin-bottom: 50px;
}

.collapsed {
    background-image: linear-gradient(
        0deg,
        #181818 0,
        hsla(0, 0%, 9%, 0.7) 20%,
        hsla(0, 0%, 9%, 0.4) 30%,
        transparent 50%
    );
    margin-top: -100px;
}

.section-divider button {
    background-color: rgba(42, 42, 42, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.7);
    color: white;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
    cursor: pointer;
}

.section-divider button:hover {
    border-color: white;
    background-color: rgba(79, 79, 79, 0.6);
}

@media (min-width: 480px) {
    .more-like-this-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 900px) {
    .more-like-this-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
