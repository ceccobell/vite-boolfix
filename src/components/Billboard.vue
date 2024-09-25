<script>
import BillboardCanvas from "./BillboardCanvas.vue"

export default {
    components: {
        BillboardCanvas,
    },
    data() {
        return {
            showCanvas: false,
        }
    },
    methods: {
        openCanvas() {
            this.showCanvas = true
        },
        closeCanvas(value) {
            this.showCanvas = value
        },
    },
}
</script>

<template>
    <div class="billboard">
        <img
            src="https://media-assets.wired.it/photos/615ee8daafaefdfb1ce8a4d5/master/w_1600%2Cc_limit/1443704186_0927_Walter_White_cog1.jpg"
            alt="" />
        <div class="info">
            <h1 class="text-white">Breaking Bad</h1>
            <p class="text-white">
                Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and
                given a prognosis of only two years left to live. He becomes filled with a sense of
                fearlessness and an unrelenting desire to secure his family's financial future at
                any cost as he enters the dangerous world of drugs and crime.
            </p>
            <div class="links">
                <button class="riproduci-btn">
                    <i class="fa-solid fa-play"></i>
                    <span>Riproduci</span>
                </button>
                <button class="more-info-btn" @click="openCanvas()">
                    <span class="circle">i</span>
                    <span>Altre info</span>
                </button>
            </div>
        </div>
    </div>
    <transition>
        <div class="overlay" v-if="showCanvas"></div>
    </transition>
    <transition>
        <BillboardCanvas v-if="showCanvas" @close-canva="closeCanvas" />
    </transition>
</template>

<style scoped>
.billboard {
    height: 53vw;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 900;
}

img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.billboard::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #141414, transparent 60%),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent 6%);
}

.info {
    position: absolute;
    left: 4%;
    bottom: 20%;
    z-index: 10;
}

.info h1 {
    font-size: 5vw;
    width: 40%;
    margin-bottom: 1.5vw;
}

.info p {
    width: 40%;
    font-size: 1.2vw;
    font-weight: 500;
}

.links {
    display: flex;
    line-height: 88%;
    margin-top: 1.5vw;
    white-space: nowrap;
}

.links button {
    margin-bottom: 1rem;
    margin-right: 1rem;
    padding: 7px 20px;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}

.riproduci-btn {
    background-color: white;
    transition: background-color 0.2s ease;
}

.riproduci-btn:hover {
    background-color: rgb(207, 207, 207);
}

.more-info-btn {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease;
}

.more-info-btn:hover {
    background-color: rgba(109, 109, 110, 0.3);
}
.riproduci-btn span,
.more-info-btn span:last-child {
    font-size: 14px;
    vertical-align: middle;
}

.fa-play {
    margin-right: 5px;
    vertical-align: middle;
    font-size: 18px;
}

.circle {
    display: block;
    height: 25px;
    width: 25px;
    border-radius: 100%;
    border: 1px solid white;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
