<template>
    <section  class="user-profile">
        <p>PRINT TEST</p>
        <review-list @removeReview="removeReview($event)" v-if="reviews" :reviews="reviews" />
    </section>
</template>

<script>
import reviewList from "../components/review-list.vue";
export default {
    methods: {
        removeReview($event) {
            this.$store.dispatch({type: 'removeReview', reviewId: $event})
        }
    },
    computed: {
        data() {
            return {};
        },
        reviews() {
            return this.$store.getters.reviews;
        },
        userId() {
            return this.$store.getters.user._id;
        },
    },
    watch: {
        userId: {
            handler() {
                this.$store.dispatch({ type: "loadReviews", filterBy: {byUserId: this.userId} })
            },
            immediate: true,
        },
    },
    components: {
        reviewList,
    },
};
</script>

<style>
</style>