<script>
export default {
    methods: {
        closeCanvas() {
            this.$emit("close-canva", false)
        },
    },
}
</script>

<template>
    <div class="offCanvas">
        <div class="content">
            <div class="img-container">
                <img
                    src="https://media-assets.wired.it/photos/615ee8daafaefdfb1ce8a4d5/master/w_1600%2Cc_limit/1443704186_0927_Walter_White_cog1.jpg"
                    alt=""
                    class="img-canvas" />
            </div>
            <div class="title-buttons">
                <h1 class="text-white">Breaking Bad</h1>
                <div class="links">
                    <button class="riproduci-btn">
                        <i class="fa-solid fa-play"></i>
                        <span>Riproduci</span>
                    </button>
                    <button class="add-to-my-list">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="like">
                        <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                </div>
            </div>
            <button class="close-canvas" @click="closeCanvas()">
                <i class="fa-solid fa-x"></i>
            </button>
            <div class="info">
                <div class="col-left">
                    <p class="text-white">
                        Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III
                        cancer and given a prognosis of only two years left to live. He becomes
                        filled with a sense of fearlessness.
                    </p>
                </div>
                <div class="col-right">
                    <div>
                        <span class="tag-label">Cast:</span>
                        <span class="tag-item">Bryan Cranston, </span>
                        <span class="tag-item">Aaron Paul, </span>
                        <span class="tag-item">Anna Gunn</span>
                    </div>
                    <div class="mt-15">
                        <span class="tag-label">Generi:</span>
                        <span class="tag-item">Bryan Cranston, </span>
                        <span class="tag-item">Aaron Paul, </span>
                        <span class="tag-item">Anna Gunn</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.offCanvas {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 950px;
    border-radius: 6px;
    overflow: hidden;
    z-index: 1000;
    background-color: #181818;
}

.content {
    position: relative;
}

.img-container {
    position: relative;
}

.img-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #181818, transparent 100%);
}

.img-canvas {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.close-canvas {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #181818;
    border-radius: 50%;
    height: 36px;
    padding: 8px;
    width: 36px;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 20000;
}

.title-buttons {
    position: absolute;
    left: 4%;
    bottom: 25%;
    z-index: 10;
    width: 40%;
}

.links {
    display: flex;
    align-items: center;
    line-height: 88%;
    margin-top: 1.5vw;
    white-space: nowrap;
}

.links button {
    margin-right: 0.6rem;
    font-weight: 600;
    cursor: pointer;
}

.riproduci-btn {
    background-color: white;
    padding: 7px 20px;
    border: 0;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.riproduci-btn:hover {
    background-color: rgb(207, 207, 207);
}

.add-to-my-list,
.like {
    background-color: rgba(42, 42, 42, 0.6);
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 100%;
    color: white;
    font-size: 16px;
    width: 30px;
    height: 30px;
    font-weight: 200;
}

.add-to-my-list:hover,
.like:hover {
    border: 2px solid white;
    background-color: rgba(79, 79, 79, 0.6);
}

.info {
    padding: 0 4%;
    margin-top: 1vw;
    display: flex;
}

.col-left {
    width: 70%;
    padding-right: 30px;
    display: flex;
    align-items: center;
}

.col-right {
    width: 30%;
}

.info p {
    font-size: 14px;
}

.tag-label {
    color: #777;
    font-size: 14px;
}

.tag-item {
    color: white;
    font-size: 14px;
}
</style>
