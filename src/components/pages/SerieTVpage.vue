<template>
    <SearchResults v-if="store.searchQuery.length > 0" />
    <div v-else>
        <Billboard />
        <main>
            <Top10SerieTV />
            <MyList />
            <ContentSection :sections="sectionsTV" />
        </main>
    </div>
</template>

<script>
import Billboard from "../Billboard.vue"
import SearchResults from "../SearchResults.vue"
import Top10SerieTV from "../Top10SerieTV.vue"
import ContentSection from "../ContentSections.vue"
import { store } from "../../store"
import sectionsData from "../../assets/sections.json"
import MyList from "../MyList.vue"

export default {
    components: {
        Top10SerieTV,
        ContentSection,
        Billboard,
        SearchResults,
        MyList,
    },
    data() {
        return {
            store,
            sectionsTV: sectionsData.tv,
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
