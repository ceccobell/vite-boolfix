<script>
import { store } from "../store"
import axios from "axios"

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
            isScrolled: false,
            isDropdownVisible: false,
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
        showDropdown() {
            this.isDropdownVisible = true
        },
        hideDropdown() {
            this.isDropdownVisible = false
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
        handleScroll() {
            this.isScrolled = window.scrollY > 50
        },
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll)
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    },
}
</script>

<template>
    <header :class="isScrolled ? 'bg-black' : ''">
        <div class="container">
            <div class="row">
                <div class="col-100 d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <h1 class="logo">BOOLFLIX</h1>
                        <div class="drop-down-menu" @mouseover="showDropdown">
                            <div>
                                <a class="navigation-menu text-white" href="">Sfoglia</a>
                            </div>
                            <ul v-show="isDropdownVisible" class="list-unstyled dropdown-content">
                                <li
                                    :class="item.selected ? 'text-active' : 'text-disabled'"
                                    class="navigation-tab text-center"
                                    v-for="(item, index) in navbarItems"
                                    :key="index"
                                    @click="selectItem(item)">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                        <ul class="list-unstyled menu">
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
    min-height: 41px;
    width: 100%;
    z-index: 100;
    background-color: transparent;
    transition: background-color 0.4s;
}

.logo {
    color: #e50914;
    cursor: pointer;
    font-size: 18px;
    margin-right: 15px;
    text-decoration: none;
    vertical-align: middle;
}

.bg-black {
    background: #141414;
}

.container {
    min-height: 41px;
}

.row {
    min-height: 41px;
    padding: 0 4%;
}

.text-active {
    color: white;
}

.text-disabled {
    color: rgb(219, 219, 219);
}

.drop-down-menu {
    vertical-align: middle;
    position: relative;
}

.drop-down-menu:hover .dropdown-content {
    display: flex;
    flex-direction: column;
    opacity: 1;
    visibility: visible;
}

.navigation-menu {
    font-size: 10px;
    align-items: center;
    display: flex;
    font-weight: 500;
    height: 100%;
    text-decoration: none;
}

.navigation-menu::after {
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: "";
    height: 0;
    margin-left: 5px;
    width: 0;
}

.dropdown-content {
    position: absolute;
    top: 20px;
    right: 50%;
    transform: translateX(50%);
    background: hsla(0, 0%, 8%, 0.9);
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.drop-down-menu li:hover .dropdown-content {
    display: block;
}

.dropdown-content li {
    cursor: pointer;
    text-align: center;
    padding: 10px 0px;
    font-size: var(--font-size-xs);
}

.dropdown-content li:hover {
    background-color: #555;
}

.menu li {
    margin-left: 18px;
    font-size: var(--font-size-xs);
    font-weight: 600;
    cursor: pointer;
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

.menu {
    display: none;
}

@media (min-width: 900px) {
    .menu {
        display: inline-block;
        display: flex;
    }

    .drop-down-menu {
        display: none;
    }
}

@media (min-width: 950px) {
    .row {
        min-height: 70px;
    }

    .logo {
        font-size: 25px;
    }
}
</style>
