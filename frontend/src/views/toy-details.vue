<template>
    <section v-if="toy" class="toy-details">
        <router-link to="/toy">⬅Back</router-link>
        <main>
            <h2>{{ toy.name[0].toUpperCase() + toy.name.slice(1) }}</h2>
            <img :src="toy.imgUrl" alt="">
        </main>
        <div class="description">
            <p>Price: ${{ toy.price }}</p>
            <p>In-Stock: {{ toy.inStock ? '✔' : '❌' }}</p>
            <p>Labels: {{ toy.labels }}</p>
            <p>Arrival: {{ new Date(Date.now(toy._id)).toLocaleDateString() }}</p>
        </div>
        <form action="" @submit.prevent="addReview">
            <textarea v-model="reviewToEdit.txt" cols="30" rows="10"></textarea>

            <p>Rating: 
                <select v-model="reviewToEdit.rating">
                    <option v-for="opt in 5" :value="opt" :key="opt">
                        {{ opt }}
                    </option>
                </select>
            </p>
            <button>Add Review</button>
        </form>
        <chat v-if="user" />
        <review-list @removeReview="removeReview($event)" :reviews="reviews" />
    </section>
</template>

<script>
import reviewList from "../components/review-list.vue";
import chat from '../components/chat.vue';
export default {
    data() {
        return {
            reviewToEdit: {
                txt: "",
                rating: null,
                aboutToyId: ''
            },
            filterBy: {
                id: this.toyId
            }
        };
    },
    created() {
        this.$store.dispatch({type: 'loadReviews', filterBy: this.filterBy})
    },
    methods: {
        async addReview() {
            await this.$store.dispatch({
                type: "addReview",
                review: this.reviewToEdit,
            });
            this.reviewToEdit = { txt: "", rating: null, aboutToyId: this.toyId };
        },
        removeReview($event) {
            this.$store.dispatch({type: 'removeReview', reviewId: $event})
        }
    },
    watch: {
        toyId: {
            handler() {
                
                this.reviewToEdit.aboutToyId = this.toyId;
                this.filterBy.aboutToyId = this.toyId;
                this.$store.dispatch({
                    type: "loadAndWatchToy",
                    toyId: this.toyId,
                });
            },
            immediate: true,
        },
    },
    computed: {
        reviews() {
            return this.$store.getters.reviews;
        },
        toy() {
            return this.$store.getters.watchedToy;
        },
        toyId() {
            return this.$route.params.toyId;
        },
        user() {
            return this.$store.getters.user
        },
    },
    components: {
        reviewList,
        chat
    },
};
</script>

<style>
</style>