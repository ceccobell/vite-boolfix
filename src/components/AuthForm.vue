<script>
import axios from "axios"

export default {
    data() {
        return {
            loginActive: true,
            registerActive: false,
            loginEmail: "",
            loginPassword: "",
            registerEmail: "",
            registerPassword: "",
            registerPasswordConfirm: "",
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
        async login() {
            try {
                const response = await axios.post("http://127.0.0.1:8000/login", {
                    email: this.loginEmail,
                    password: this.loginPassword,
                })

                console.log(response.data)
            } catch (error) {
                console.error(error.response.data)
            }
        },

        // Metodo per la registrazione
        async register() {
            try {
                const response = await axios.post("http://127.0.0.1:8000/register", {
                    email: this.registerEmail,
                    password: this.registerPassword,
                    password_confirmation: this.registerPasswordConfirm,
                })

                console.log(response.data)
            } catch (error) {
                console.error(error.response.data)
            }
        },
    },
}
</script>

<template>
    <div class="container">
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
        <div class="tab-content" id="login" v-if="loginActive">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="loginEmail" placeholder="m@example.com" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="loginPassword" />
            </div>
            <button class="submit-button" @click="login">Accedi</button>
        </div>

        <!-- Form di Registrazione -->
        <div class="tab-content" id="register" v-if="registerActive">
            <div class="form-group">
                <label for="new-email">Email</label>
                <input
                    id="new-email"
                    type="email"
                    v-model="registerEmail"
                    placeholder="m@example.com" />
            </div>
            <div class="form-group">
                <label for="new-password">Password</label>
                <input id="new-password" type="password" v-model="registerPassword" />
            </div>
            <div class="form-group">
                <label for="confirm-password">Conferma Password</label>
                <input id="confirm-password" type="password" v-model="registerPasswordConfirm" />
            </div>
            <button class="submit-button" @click="register">Registrati</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 400px;
    padding: 20px;
    background-color: #141414;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 100000;
    transform: translate(-50%, 50%);
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
</style>
