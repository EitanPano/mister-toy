<template>
    <section>
        <h2>Review List</h2>
        <ul>
            <template v-for="(review, idx) in reviews">
                <review-preview @removeReview="$emit('removeReview', $event)" :review="review" :key="idx" />
            </template>
        </ul>
    </section>
</template>

<script>
import reviewPreview from './review-preview.vue'
export default {
    props: ['reviews'],
    components: {
        reviewPreview
    }
};
</script>

<style>
</style>