
<template>
    <ul class="toy-list toyd-grid">
        <template v-for="toy in toys">
            <toy-preview @removed="$emit('removed', toy)" :toy="toy" :key="toy._id" ></toy-preview>
        </template>
    </ul>
</template>

<script>
import toyPreview from "./toy-preview.vue";

export default {
    props: ["toys"],
    components: {
        toyPreview,
    },
};
</script>

<style>
</style>