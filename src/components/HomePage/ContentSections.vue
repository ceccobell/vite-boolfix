<script>
import { store } from "../../store"
import axios from "axios"

export default {
    data() {
        return {
            store,
            contents: [],
            sliderIndex: [],
            itemsPerScreen: 4,
        }
    },
    computed: {
        progressBarItemCount() {
            return (sectionIndex) =>
                Math.ceil(this.contents[sectionIndex]?.length / this.itemsPerScreen) || 0
        },
    },
    methods: {
        getContents() {
            this.store.sections.forEach((section, index) => {
                axios.get(section.apiUrl).then((result) => {
                    this.contents[index] = result.data.results
                    this.sliderIndex[index] = 0
                })
            })
        },
        onLeftHandleClick(sectionIndex) {
            if (this.sliderIndex[sectionIndex] - 1 < 0) {
                this.sliderIndex[sectionIndex] = this.progressBarItemCount(sectionIndex) - 1
            } else {
                this.sliderIndex[sectionIndex] -= 1
            }

            console.log(Math.ceil(this.contents[sectionIndex]?.length / this.itemsPerScreen))
        },
        onRightHandleClick(sectionIndex) {
            if (this.sliderIndex[sectionIndex] + 1 >= this.progressBarItemCount(sectionIndex)) {
                this.sliderIndex[sectionIndex] = 0
            } else {
                this.sliderIndex[sectionIndex] += 1
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
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateItemsPerScreen)
        this.updateItemsPerScreen()
        this.getContents()
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateItemsPerScreen)
    },
}
</script>

<template>
    <div class="container">
        <div
            v-for="(section, sectionIndex) in store.sections"
            :key="sectionIndex"
            class="row-slider">
            <div class="header">
                <h3 class="title text-white">{{ section.title }}</h3>
                <div class="progress-bar">
                    <div
                        v-for="(item, index) in progressBarItemCount(sectionIndex)"
                        :key="index"
                        :class="[
                            'progress-item',
                            { active: index === sliderIndex[sectionIndex] },
                        ]"></div>
                </div>
            </div>
            <div class="slider-container">
                <button
                    v-if="sliderIndex[sectionIndex] > 0"
                    class="handle left-handle"
                    @click="onLeftHandleClick(sectionIndex)">
                    <div class="text">&#8249;</div>
                </button>
                <div
                    class="slider"
                    :style="{
                        '--items-per-screen': itemsPerScreen,
                        '--slider-index': sliderIndex[sectionIndex],
                    }">
                    <div
                        v-for="(content, index) in contents[sectionIndex]"
                        :key="index"
                        class="slider-item">
                        <img
                            :src="`http://image.tmdb.org/t/p/w342/${content.backdrop_path}`"
                            :alt="content.title" />
                    </div>
                </div>
                <button
                    v-if="sliderIndex[sectionIndex] < progressBarItemCount(sectionIndex) - 1"
                    class="handle right-handle"
                    @click="onRightHandleClick(sectionIndex)">
                    <div class="text">&#8250;</div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
}

.slider-item img {
    width: 100%;
    border-radius: 5px;
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
</style>
