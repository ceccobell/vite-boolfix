<script>
import axios from "axios"
import { store } from "../store"

export default {
    data() {
        return {
            itemsPerScreen: 4,
            sliderIndex: 0,
            store,
        }
    },
    computed: {
        progressBarItemCount() {
            return Math.ceil(store.myList.length / this.itemsPerScreen) || 0
        },
    },
    methods: {
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
    },
    mounted() {
        window.addEventListener("resize", this.updateItemsPerScreen)
        this.updateItemsPerScreen()
    },
    unmounted() {
        window.removeEventListener("resize", this.updateItemsPerScreen)
    },
}
</script>

<template>
    <div class="container" v-if="store.myList.length > 0">
        <div class="row-slider">
            <div class="header">
                <h3 class="title text-white">La mia lista</h3>
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
                    <div v-for="(content, index) in store.myList" :key="index" class="slider-card">
                        <img
                            :src="`http://image.tmdb.org/t/p/w342/${content.backdrop_path}`"
                            :alt="content.name" />
                        <div v-show="content.name" class="title-content">
                            {{ content.name }}
                        </div>
                        <div v-show="content.title" class="title-content">
                            {{ content.title }}
                        </div>
                        <button
                            v-show="store.myList.some((item) => item.id === content.id)"
                            class="remove-to-my-list"
                            @click="removeToMyList(content.id)">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button
                            v-show="!store.myList.some((item) => item.id === content.id)"
                            class="add-to-my-list"
                            @click="addToMyList(content.id, content.type)">
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
    justify-content: flex-start;
    transition: transform 500ms ease-in-out;
    transform: translateX(calc(var(--slider-index) * -100%));
    width: 100%;
}

.slider-card {
    flex: 1 0 calc(100% / var(--items-per-screen));
    max-width: calc(100% / var(--items-per-screen));
    padding: 2px;
    cursor: pointer;
    position: relative;
}

.slider-card img {
    width: 100%;
    border-radius: 5px;
}

.slider-card::before {
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
    line-height: 1.3;
}

.title {
    font-size: 1.4vw;
    line-height: 1.25vw;
    vertical-align: middle;
    padding-bottom: 3px;
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

.slider-card:hover .add-to-my-list,
.slider-card:hover .remove-to-my-list {
    opacity: 1;
}

.slider-card:hover::before {
    background-color: rgba(0, 0, 0, 0.6);
}

.title-content {
    color: white;
    font-size: 10px;
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>
