<script>
import axios from "axios"
import { store } from "../store"

export default {
    data() {
        return {
            loginActive: true,
            registerActive: false,
            store,
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            errors: {},
        }
    },
    methods: {
        showTab() {
            this.loginActive = !this.loginActive
            this.registerActive = !this.registerActive
        },
        closeCanvas() {
            this.$emit("close-canva", false)
        },
        submitLogin() {
            axios.defaults.withCredentials = true
            axios
                .post(`${store.apiUrl}/api/login`, {
                    email: this.form.email,
                    password: this.form.password,
                })
                .then((response) => {
                    localStorage.setItem("authToken", response.data.access_token)
                    store.isAuthenticated = true
                    this.closeCanvas()
                    axios.defaults.withCredentials = false
                })
                .catch((error) => {
                    if (error.response && error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }
                    console.error("Login error:", error.response.data)
                })
        },
        submitRegistration() {
            axios.defaults.withCredentials = true
            axios
                .post(`${store.apiUrl}/api/register`, {
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                    password_confirmation: this.form.password_confirmation,
                })
                .then((response) => {
                    console.log("Registration successful:", response.data)
                    localStorage.setItem("authToken", response.data.token)
                    axios.defaults.withCredentials = false
                    this.form.name = ""
                    this.form.email = ""
                    this.form.password = ""
                    this.form.password_confirmation = ""
                })
                .catch((error) => {
                    if (error.response && error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }
                    console.error("Registration error:", error.response.data)
                })
        },
    },
}
</script>

<template>
    <div class="container-form">
        <div class="content">
            <h1>Account</h1>
            <button class="close-canvas" @click="closeCanvas()">
                <i class="fa-solid fa-x"></i>
            </button>
            <p>Accedi o crea un nuovo account per gestire le tue preferenze.</p>

            <div class="tabs">
                <button class="tab" :class="loginActive ? 'tab-active' : ''" @click="showTab">
                    Accedi
                </button>
                <button class="tab" :class="registerActive ? 'tab-active' : ''" @click="showTab">
                    Registrati
                </button>
            </div>

            <!-- Form di Login -->
            <form @submit.prevent="submitLogin" v-if="loginActive">
                <div class="tab-content" id="login">
                    <span v-if="this.errors.email" class="error-message">
                        {{ this.errors.email[0] }}
                    </span>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            v-model="form.email"
                            placeholder="m@example.com" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" v-model="form.password" />
                        <span v-if="this.errors.password" class="error-message">
                            {{ this.errors.password[0] }}
                        </span>
                    </div>
                    <button class="submit-button" type="submit">Accedi</button>
                </div>
            </form>

            <!-- Form di Registrazione -->
            <form @submit.prevent="submitRegistration" v-if="registerActive">
                <div class="tab-content" id="register">
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" id="name" v-model="form.name" placeholder="Giuseppe" />
                        <span v-if="this.errors.name" class="error-message">
                            {{ this.errors.name[0] }}
                        </span>
                        <!-- Mostra errore -->
                    </div>
                    <div class="form-group">
                        <label for="new-email">Email</label>
                        <input
                            id="new-email"
                            type="email"
                            v-model="form.email"
                            placeholder="m@example.com" />
                        <span v-if="this.errors.email" class="error-message">
                            {{ this.errors.email[0] }}
                        </span>
                        <!-- Mostra errore -->
                    </div>
                    <div class="form-group">
                        <label for="new-password">Password</label>
                        <input id="new-password" type="password" v-model="form.password" />
                        <span v-if="this.errors.password" class="error-message">
                            {{ this.errors.password[0] }}
                        </span>
                        <!-- Mostra errore -->
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Conferma Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            v-model="form.password_confirmation" />
                        <span v-if="this.errors.password_confirmation" class="error-message">
                            {{ this.errors.password_confirmation[0] }}
                        </span>
                        <!-- Mostra errore -->
                    </div>
                    <button class="submit-button" type="submit">Registrati</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.container-form {
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

h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.close-canvas {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    border-radius: 50%;
    height: 36px;
    padding: 8px;
    width: 36px;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 20000;
}

p {
    margin-bottom: 20px;
}

.tabs {
    display: flex;
    margin-bottom: 20px;
    background-color: #000000;
    border: none;
    padding: 5px;
    border-radius: 10px;
}

.tab {
    width: 50%;
    background-color: transparent;
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s;
}

.tab-active {
    background-color: #e50914 !important;
}

.tab-content {
    display: block;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ffffff;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #e50914;
    color: #f6fff8;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submit-button:hover {
    background-color: #e63b44;
}

.error-message {
    font-size: 12px;
    display: block;
    margin-top: 5px;
    background-color: #e63b44;
    padding: 10px;
    border-radius: 5px;
}
</style>
