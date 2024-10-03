<template>
    <SearchResults v-if="store.searchQuery.length > 0" />
    <div v-else>
        <Billboard />
        <main>
            <Top10SerieTV />
            <ContentSection />
            <Top10Movies />
        </main>
    </div>
</template>

<script>
import Billboard from "../Billboard.vue"
import SearchResults from "../SearchResults.vue"
import Top10Movies from "../Top10Movies.vue"
import Top10SerieTV from "../Top10SerieTV.vue"
import ContentSection from "./ContentSections.vue"
import { store } from "../../store"

export default {
    components: {
        Top10SerieTV,
        Top10Movies,
        ContentSection,
        Billboard,
        SearchResults,
    },
    data() {
        return {
            store,
        }
    },
}
</script>

<style scoped>
main {
    background-color: #141414;
    margin-top: -8%;
}
</style>
