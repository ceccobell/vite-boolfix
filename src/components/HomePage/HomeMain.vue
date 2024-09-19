<template>
    <main>
        <Top10SerieTV />
        <Top10Movies />
        <ContentSection />
    </main>
</template>

<script>
import Top10Movies from "../Top10Movies.vue"
import Top10SerieTV from "../Top10SerieTV.vue"
import ContentSection from "./ContentSections.vue"

export default {
    components: {
        Top10SerieTV,
        Top10Movies,
        ContentSection,
    },
}
</script>

<style scoped>
main {
    background-color: #141414;
}
</style>
