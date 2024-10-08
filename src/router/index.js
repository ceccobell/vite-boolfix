import { createRouter, createWebHistory } from "vue-router"

import Home from "../components/pages/HomePage.vue"
import SerieTVpage from "../components/pages/SerieTVpage.vue"
import FilmPage from "../components/pages/FilmPage.vue"
import NuoviPopolari from "../components/pages/NuoviPopolari.vue"
import LaMiaLista from "../components/pages/LaMiaLista.vue"
import SfogliaPerLingua from "../components/pages/SfogliaPerLingua.vue"

const routes = [
    { path: "/", component: Home },
    { path: "/tv", component: SerieTVpage },
    { path: "/film", component: FilmPage },
    { path: "/nuoviPopolari", component: NuoviPopolari },
    { path: "/lamialista", component: LaMiaLista },
    { path: "/sfogliaperlingua", component: SfogliaPerLingua },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
