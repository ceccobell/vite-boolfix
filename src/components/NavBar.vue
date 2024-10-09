<script>
import { store } from "../store"
import axios from "axios"
import AuthForm from "./AuthForm.vue"

export default {
    components: {
        AuthForm,
    },
    data() {
        return {
            store,
            searchActive: false,
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
            isAuthFormVisible: false,
        }
    },
    watch: {
        "store.searchQuery"(newQuery) {
            if (newQuery.trim()) {
                // Chiamata API per i film
                axios.get(store.apiUrlMovies + newQuery).then((result) => {
                    store.moviesList = result.data.results
                })

                // Chiamata API per le serie TV
                axios.get(store.apiUrlSerieTV + newQuery).then((result) => {
                    store.serieTV_list = result.data.results
                })
            }
        },
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
                store.searchQuery = ""
            }
        },
        showDropdown() {
            this.isDropdownVisible = true
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 50
        },
        showAuthForm() {
            this.isAuthFormVisible = !this.isAuthFormVisible
        },
        closeCanvas(value) {
            this.isAuthFormVisible = value
        },
        logout() {
            axios.defaults.withCredentials = true

            const token = localStorage.getItem("authToken")

            axios
                .post(
                    "http://127.0.0.1:8000/api/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(() => {
                    console.log("Logout successful")
                    localStorage.removeItem("authToken")
                    store.isAuthenticated = false
                    axios.defaults.withCredentials = false
                })
                .catch((error) => {
                    console.error("Logout error:", error.response.data)
                })
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
                                    v-for="(item, index) in navbarItems"
                                    :key="index"
                                    @click="selectItem(item)">
                                    <router-link
                                        :to="item.url"
                                        :class="item.selected ? 'text-active' : 'text-disabled'"
                                        class="navigation-tab text-center">
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <ul class="list-unstyled menu">
                            <li
                                v-for="(item, index) in navbarItems"
                                :key="index"
                                @click="selectItem(item)">
                                <router-link
                                    :to="item.url"
                                    :class="item.selected ? 'text-active' : 'text-disabled'">
                                    {{ item.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-wrapper" :class="{ 'search-active': searchActive }">
                        <!-- Icona della lente -->
                        <button class="search-btn" type="button" @click="toggleSearch">
                            <i class="fa-solid fa-magnifying-glass text-white"></i>
                        </button>

                        <!-- Campo di input che appare quando searchActive è true -->
                        <input
                            v-show="searchActive"
                            type="text"
                            v-model="store.searchQuery"
                            class="search-input"
                            placeholder="Cerca film o serie..." />
                        <button
                            v-if="!store.isAuthenticated"
                            class="user-btn"
                            @click="showAuthForm">
                            SIGN IN
                        </button>
                        <button v-if="store.isAuthenticated" class="user-btn" @click="logout">
                            SIGN OUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <transition>
            <div class="overlay" v-if="isAuthFormVisible"></div>
        </transition>
        <transition>
            <AuthForm v-if="isAuthFormVisible" @close-canva="closeCanvas" />
        </transition>
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
    text-decoration: none;
}

.text-disabled {
    color: rgb(219, 219, 219);
    text-decoration: none;
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
    padding: 0 6px;
}

.search-wrapper.search-active {
    background: rgba(0, 0, 0, 0.75);
    border: 1px solid hsla(0, 0%, 100%, 0.85);
}

.search-btn {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

.search-input {
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    outline: none;
    padding: 7px 14px 7px 7px;
    width: 0;
    opacity: 0;
    transition: width 1.3s ease, opacity 1.3s ease;
}

.search-input::placeholder {
    color: #6c757d;
}

.search-active .search-input {
    width: 200px;
    opacity: 1;
}

.menu {
    display: none;
}

.user-btn {
    background-color: transparent;
    border: none;
    padding: 10px;
    margin-left: 20px;
    font-size: 18px;
    color: white;
    cursor: pointer;
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
