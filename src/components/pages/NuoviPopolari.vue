<template>
    <SearchResults v-if="store.searchQuery.length > 0" />
    <div v-else>
        <main>
            <Top10SerieTV />
            <Top10Movies />
            <ContentSection :sections="sectionsNuoviPopolari" />
        </main>
    </div>
</template>

<script>
import SearchResults from "../SearchResults.vue"
import Top10Movies from "../Top10Movies.vue"
import Top10SerieTV from "../Top10SerieTV.vue"
import ContentSection from "../ContentSections.vue"
import { store } from "../../store"
import sectionsData from "../../assets/sections.json"

export default {
    components: {
        Top10SerieTV,
        Top10Movies,
        ContentSection,
        SearchResults,
    },
    data() {
        return {
            store,
            sectionsNuoviPopolari: sectionsData.nuoviPopolari,
        }
    },
}
</script>

<style scoped>
main {
    background-color: #141414;
    height: 100vh;
    padding-top: 100px;
}
</style>
