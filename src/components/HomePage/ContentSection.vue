<script>
import { store } from "../../store"
import axios from "axios"

export default {
    data() {
        return {
            store,
            sectionsContents: {}, // Oggetto per contenere i risultati delle varie sezioni
        }
    },
    mounted() {
        this.getContentsForAllSections()
    },
    methods: {
        // Metodo per ottenere i contenuti per tutte le sezioni
        getContentsForAllSections() {
            store.sections.forEach((section, index) => {
                axios.get(section.apiUrl).then((result) => {
                    this.sectionsContents = {
                        ...this.sectionsContents,
                        [section.title]: result.data.results,
                    }
                })
            })
        },
        scrollNext(index) {
            const row = this.$refs["row" + index][0]
            if (row) {
                const scrollAmount = row.clientWidth
                row.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        },
        scrollPrev(index) {
            const row = this.$refs["row" + index][0]
            if (row) {
                const scrollAmount = row.clientWidth
                row.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            }
        },
    },
}
</script>

<template>
    <div class="container">
        <!-- Ciclo su tutte le sezioni -->
        <div v-for="(section, index) in store.sections" :key="index">
            <h3>{{ section.title }}</h3>
            <div class="row-container">
                <div :ref="'row' + index" class="row">
                    <div
                        v-for="(content, contentIndex) in sectionsContents[section.title]"
                        :key="content.id"
                        class="col d-flex">
                        <img
                            :src="`http://image.tmdb.org/t/p/w342/${content.backdrop_path}`"
                            alt="immagine copertina" />
                    </div>
                </div>
                <button class="btn-next" @click="scrollNext(index)">
                    <i class="fa-solid fa-angle-right"></i>
                </button>
                <button class="btn-prev" @click="scrollPrev(index)">
                    <i class="fa-solid fa-angle-left"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.row-container {
    position: relative;
}

.row {
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.row::-webkit-scrollbar {
    display: none;
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
}

.btn-prev,
.btn-next {
    position: absolute;
    transform: translateY(-50%);
    background: hsla(0, 0%, 8%, 0.5);
    border: 0;
    color: white;
    font-size: var(--font-size-xxl);
    cursor: pointer;
    height: calc(100% - 10px);
    width: 40px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.btn-next {
    top: 50%;
    right: 0;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
}

.btn-prev {
    top: 50%;
    left: 0;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
}

i {
    transition: scale 2.3s ease;
}

i:hover,
i:hover {
    transform: scale(1.9);
}

.row-container:hover .btn-prev,
.row-container:hover .btn-next {
    opacity: 1;
}
</style>
