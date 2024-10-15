<script>
import axios from "axios"
import { store } from "../store"

export default {
    data() {
        return {
            store,
        }
    },
    methods: {
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
                    this.$emit("close-modal", false)
                })
                .catch((error) => {
                    console.error("Logout error:", error.response.data)
                })
        },
        closeModal() {
            this.$emit("close-modal", false)
        },
    },
}
</script>

<template>
    <div class="container-modal">
        <div class="content">
            <h1 class="title">Logout</h1>
            <div class="description">Sei sicuro di voler fare il logout da Boolflix?</div>
            <button @click="logout" class="logout">Logout</button>
            <button @click="closeModal" class="cancel">Cancel</button>
        </div>
    </div>
</template>

<style scoped>
.container-modal {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 10000;
}

.content {
    max-width: 400px;
    padding: 20px;
    background-color: #141414;
    border: none;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    color: white;
}

.description {
    color: #828282;
    margin-top: 10px;
}

.logout,
.cancel {
    color: white;
    padding: 10px 15px;
    margin-top: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout {
    background-color: #e50914;
    border: 1px solid #e50914;
    margin-right: 15px;
}

.logout:hover {
    background-color: #b20710;
}

.cancel {
    background-color: transparent;
    border: 1px solid grey;
}

.cancel:hover {
    background-color: #828282;
}
</style>
