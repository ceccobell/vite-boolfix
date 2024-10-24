<template>
    <SearchResults v-if="store.searchQuery.length > 0" />
    <div v-else>
        <Billboard />
        <main>
            <Top10SerieTV />
            <MyList />
            <ContentSection :sections="sectionsHome" />
            <Top10Movies />
        </main>
    </div>
</template>

<script>
import Billboard from "../Billboard.vue"
import SearchResults from "../SearchResults.vue"
import Top10Movies from "../Top10Movies.vue"
import Top10SerieTV from "../Top10SerieTV.vue"
import ContentSection from "../ContentSections.vue"
import MyList from "../MyList.vue"
import { store } from "../../store"
import sectionsData from "../../assets/sections.json"

export default {
    components: {
        Top10SerieTV,
        Top10Movies,
        ContentSection,
        Billboard,
        SearchResults,
        MyList,
    },
    data() {
        return {
            store,
            sectionsHome: sectionsData.home,
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
