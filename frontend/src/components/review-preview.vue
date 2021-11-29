<template>

    <li v-if="review" class="review-preview">
        <p>{{ review.byUser.fullName[0].toUpperCase() + review.byUser.fullName.slice(1) }} -</p>
        <p>Toy: {{ review.aboutToy.toyName[0].toUpperCase() + review.aboutToy.toyName.slice(1) }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>Text: {{ review.txt }}</p>

        <button v-if="isAdmin" @click="$emit('removeReview', review._id)">✖</button>
    </li> 
</template>

<script>
export default {
    props: ["review"],
    created() {
        console.log(this.review);
    },
    computed: {
        isAdmin() {
            return this.$store.getters.isAdmin
        }
    }
};
</script>

<style>
</style>