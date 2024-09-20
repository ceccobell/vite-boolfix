<script>
import { store } from "../store"
import axios from "axios"
import "/node_modules/flag-icons/css/flag-icons.min.css"

export default {
    data() {
        return {
            store,
            searchActive: false,
            searchQuery: "",
            navbarItems: [
                { name: "Home", url: "/", selected: true },
                { name: "Serie Tv", url: "/tv", selected: false },
                { name: "Film", url: "/film", selected: false },
                { name: "Nuovi e Popolari", url: "/nuoviPopolari", selected: false },
                { name: "La mia lista", url: "/lamialista", selected: false },
                { name: "Sfoglia per lingua", url: "/sfogliaperlingua", selected: false },
            ],
        }
    },
    methods: {
        selectItem(selectedItem) {
            this.navbarItems.forEach((item) => {
                item.selected = false
            })

            selectedItem.selected = true
        },
        toggleSearch() {
            this.searchActive = !this.searchActive
            if (!this.searchActive) {
                this.searchQuery = ""
            }
        },
        performSearch() {
            if (this.searchQuery.trim()) {
                // Solo se c'è una query
                axios.get(store.apiUrlMovies + this.searchQuery).then((result) => {
                    store.moviesList = result.data.results
                })
                axios.get(store.apiUrlSerieTV + this.searchQuery).then((result) => {
                    store.serieTV_list = result.data.results
                })
            }
        },
        convertLanguageCode(languageCode) {
            if (languageCode === "en") {
                languageCode = "gb"
            }
            return languageCode
        },
    },
}
</script>

<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-100 d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <h1>BOOLFLIX</h1>
                        <ul class="list-unstyled d-flex">
                            <li
                                :class="item.selected ? 'text-active' : 'text-disabled'"
                                v-for="(item, index) in navbarItems"
                                :key="index"
                                @click="selectItem(item)">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                    <div class="search-wrapper">
                        <!-- Icona della lente -->
                        <button class="search-btn" type="button" @click="toggleSearch">
                            <i class="fa-solid fa-magnifying-glass text-white"></i>
                        </button>

                        <!-- Campo di input che appare quando searchActive è true -->
                        <input
                            v-if="searchActive"
                            type="text"
                            v-model="searchQuery"
                            class="form-control search-input"
                            placeholder="Cerca film o serie..."
                            @keyup.enter="performSearch" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
    min-height: 70px;
    width: 100%;
    z-index: 100;
    background: transparent;
}

.container {
    min-height: 70px;
}

.row {
    min-height: 70px;
    padding-left: 4%;
}

.text-active {
    color: white;
}

.text-disabled {
    color: rgb(193, 193, 193);
}

li {
    margin-left: 18px;
    font-size: var(--font-size-xs);
    font-weight: 600;
    cursor: pointer;
}

.col-100 {
    padding: 10px;
}

h1 {
    color: #e50914;
    font-size: var(--font-size-xl);
}

.search-wrapper {
    display: flex;
    align-items: center;
    position: relative;
}

.search-btn {
    background: none;
    border: none;
    color: white;
    font-size: var(--font-size-xl);
    cursor: pointer;
}

.search-input {
    width: 0;
    opacity: 0;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 10px;
    background-color: #e9ecef;
    transition: all 0.3s ease;
    margin-left: 10px;
}

.search-input::placeholder {
    color: #6c757d;
}

.search-wrapper input {
    width: 200px;
    opacity: 1;
    transition: width 0.3s ease, opacity 0.3s ease;
}
</style>
