<script>
import axios from "axios"
import { store } from "../store"

export default {
    data() {
        return {
            APItop10movies:
                "https://api.themoviedb.org/3/trending/movie/day?api_key=23534135ecaf0f022b163c9be897d83b",
            top10movies: [],
            itemsPerScreen: 4,
            sliderIndex: 0,
            store,
        }
    },
    computed: {
        progressBarItemCount() {
            return Math.ceil(this.top10movies.length / this.itemsPerScreen) || 0
        },
    },
    methods: {
        getTOP10movies() {
            axios
                .get(this.APItop10movies)
                .then((result) => {
                    this.top10movies = result.data.results.slice(0, 10)
                })
                .catch((error) => {
                    console.error("Errore nel recupero dei film:", error)
                })
        },
        onLeftHandleClick() {
            if (this.sliderIndex - 1 < 0) {
                this.sliderIndex = this.progressBarItemCount - 1
            } else {
                this.sliderIndex -= 1
            }
        },
        onRightHandleClick() {
            if (this.sliderIndex + 1 >= this.progressBarItemCount) {
                this.sliderIndex = 0
            } else {
                this.sliderIndex += 1
            }
        },
        updateItemsPerScreen() {
            if (window.innerWidth <= 480) {
                this.itemsPerScreen = 2
            } else if (window.innerWidth <= 800) {
                this.itemsPerScreen = 3
            } else if (window.innerWidth <= 1100) {
                this.itemsPerScreen = 4
            } else if (window.innerWidth <= 1400) {
                this.itemsPerScreen = 5
            } else {
                this.itemsPerScreen = 6
            }

            if (this.sliderIndex >= this.progressBarItemCount) {
                this.sliderIndex = 0
            }
        },
        removeToMyList(itemId) {
            store.myList.forEach((favorite, index) => {
                if (itemId === favorite.id) {
                    const token = localStorage.getItem("authToken")
                    axios
                        .delete(`http://127.0.0.1:8000/api/favorites/${favorite.favorite_id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((response) => {
                            console.log("Rimosso dai preferiti:", response.data)
                            store.myList.splice(index, 1)
                        })
                        .catch((error) => {
                            console.error(
                                "Errore nella rimozione dai preferiti:",
                                error.response.data
                            )
                        })
                }
            })
        },
        addToMyList(itemId, type) {
            const token = localStorage.getItem("authToken")
            axios
                .post(
                    "http://127.0.0.1:8000/api/favorites",
                    {
                        item_id: String(itemId),
                        type: type,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log("Aggiunto ai preferiti:", response.data)
                    axios
                        .get(
                            `https://api.themoviedb.org/3/${type}/${itemId}?api_key=23534135ecaf0f022b163c9be897d83b`
                        )
                        .then((result) => {
                            this.fetchMyList()
                        })
                })
                .catch((error) => {
                    console.error("Errore nell'aggiunta ai preferiti:", error.response.data)
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
                    store.myList = []
                    this.favorites.forEach((favorite) => {
                        store.myListID.push(favorite.item_id)
                        axios
                            .get(
                                `https://api.themoviedb.org/3/${favorite.type}/${favorite.item_id}?api_key=23534135ecaf0f022b163c9be897d83b`
                            )
                            .then((result) => {
                                let info = result.data
                                info["favorite_id"] = favorite.id
                                store.myList.push(info)
                            })
                    })
                })
                .catch((error) => {
                    console.error("Errore nel recupero dei preferiti:", error.response.data)
                })
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateItemsPerScreen)
        this.updateItemsPerScreen()
        this.getTOP10movies()
    },
    unmounted() {
        window.removeEventListener("resize", this.updateItemsPerScreen)
    },
}
</script>

<template>
    <div class="container">
        <div class="row-slider">
            <div class="header">
                <h3 class="title text-white">Top 10 dei film oggi</h3>
                <div class="progress-bar">
                    <div
                        v-for="(item, index) in progressBarItemCount"
                        :key="index"
                        :class="['progress-item', { active: index === sliderIndex }]"></div>
                </div>
            </div>
            <div class="slider-container">
                <button
                    v-if="sliderIndex > 0"
                    class="handle left-handle"
                    @click="onLeftHandleClick()">
                    <div class="text">&#8249;</div>
                </button>
                <div
                    class="slider"
                    :style="{
                        '--items-per-screen': itemsPerScreen,
                        '--slider-index': sliderIndex,
                    }">
                    <div v-for="(movie, index) in top10movies" :key="index" class="slider-item">
                        <img :src="`/grafiche/${index + 1}.png`" alt="indice" />
                        <img
                            :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`"
                            :alt="movie.title" />
                        <button
                            v-show="store.myList.some((item) => item.id === movie.id)"
                            class="remove-to-my-list"
                            @click="removeToMyList(movie.id)">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button
                            v-show="!store.myList.some((item) => item.id === movie.id)"
                            class="add-to-my-list"
                            @click="addToMyList(movie.id, movie.media_type)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button
                    v-if="sliderIndex < progressBarItemCount - 1"
                    class="handle right-handle"
                    @click="onRightHandleClick()">
                    <div class="text">&#8250;</div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
}

.slider-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 4%;
    overflow: hidden;
}

.slider {
    display: flex;
    transition: transform 500ms ease-in-out;
    transform: translateX(calc(var(--slider-index) * -100%));
}

.slider-item {
    flex: 1 0 calc(100% / var(--items-per-screen));
    padding: 2px;
    position: relative;
    cursor: pointer;
}

.slider-item img {
    width: 50%;
    height: 150px;
    object-fit: cover;
}

.slider-item img:last-child {
    margin-left: -10px;
}

.handle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: 4%;
    background: hsla(0, 0%, 8%, 0.5);
    border-radius: 10px;
    border: none;
    color: white;
    cursor: pointer;
    padding: 10px;
    z-index: 10;
    opacity: 0;
    transition: background-color 0.3 ease, opacity 0.3s ease;
}

.row-slider:hover .handle {
    opacity: 1;
}

.left-handle {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    left: 0;
}

.right-handle {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    right: 0;
}

.handle:hover,
.handle:focus {
    background: hsla(0, 0%, 8%, 0.7);
}

.text {
    font-size: 2.5vw;
    transition: transform 0.3s ease;
}

.handle:hover .text,
.handle:focus .text {
    transform: scale(1.25);
}

.header {
    display: flex;
    justify-content: space-between;
    padding: 0% calc(4% + 4px);
    padding-top: 4vw;
}

.title {
    font-size: 1.4vw;
    vertical-align: middle;
    padding-bottom: 10px;
}

.progress-item {
    width: 12px;
    height: 2px;
    margin-left: 1px;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.5);
    vertical-align: middle;
}

.progress-item.active {
    background-color: rgba(255, 255, 255, 0.9);
}

.add-to-my-list,
.remove-to-my-list {
    background-color: rgba(42, 42, 42, 0.6);
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 100%;
    color: white;
    font-size: 16px;
    width: 40px;
    height: 40px;
    font-weight: 200;
    position: relative;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.add-to-my-list:hover,
.remove-to-my-list:hover {
    border: 2px solid white;
    background-color: rgba(79, 79, 79, 0.6);
}

.slider-item:hover .add-to-my-list,
.slider-item:hover .remove-to-my-list {
    opacity: 1;
}

.slider-item:hover::before {
    background-color: rgba(0, 0, 0, 0.6);
}
</style>
