<script>
export default {}
</script>

<template>
    <div class="billboard">
        <img
            src="https://media-assets.wired.it/photos/615ee8daafaefdfb1ce8a4d5/master/w_1600%2Cc_limit/1443704186_0927_Walter_White_cog1.jpg"
            alt="" />
    </div>
</template>

<style scoped>
.billboard {
    height: 53vw;
    width: 100%;
    position: relative;
    overflow: hidden;
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
    background: linear-gradient(to top, #141414, transparent 60%);
    pointer-events: none;
}
</style>
