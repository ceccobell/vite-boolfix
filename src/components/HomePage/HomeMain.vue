<template>
    <Billboard />
    <main>
        <Top10SerieTV />
        <Top10Movies />
        <ContentSection />
    </main>
</template>

<script>
import Billboard from "../Billboard.vue"
import Top10Movies from "../Top10Movies.vue"
import Top10SerieTV from "../Top10SerieTV.vue"
import ContentSection from "./ContentSections.vue"

export default {
    components: {
        Top10SerieTV,
        Top10Movies,
        ContentSection,
        Billboard,
    },
}
</script>

<style scoped>
main {
    background-color: #141414;
    margin-top: -11%;
}
</style>
