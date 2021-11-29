<template>
    <section class="toy-app main-layout">
        <router-view></router-view>
        <toy-filter :toyLabels="toyLabels" @filtered="setFilter" />
        <router-link v-if="isAdmin" class="btn btn-add" to="/toy/edit">Add Toy +</router-link>
        <toy-list @removed="removeToy" :toys="toysToShow"></toy-list>
        <p v-if="isLoading">Loading...</p>
    </section>
</template>

<script>
import { showMsg } from "../services/event-bus.service.js";
import toyFilter from "../components/toy-filter.vue";
import toyList from "../components/toy-list.vue";

export default {
    name: 'toyApp',
    data() {
        return {
            toys: null,
        };
    },
    created() {
        this.$store.commit({ type: "setMsg", userMsg: "Test" });
    },
    methods: {
        removeToy(toy) {
            this.$store.dispatch({ type: "removeToy", toy }).then(() => {
                showMsg("Toy removed");
            });
        },
        setFilter(filterBy) {
            // console.log(filterBy);
            this.$store.dispatch({type: 'setFilter', filterBy})
        },
    },
    computed: {
        toysToShow() {
            return this.$store.getters.filteredToys;
        },
        toyLabels() {
            return this.$store.getters.toyLabels;
        },
        isLoading() {
            return this.$store.getters.isLoading;
        },
        isAdmin() {
            return this.$store.getters.isAdmin;
        }
    },
    components: {
        toyFilter,
        toyList,
    },
};
</script>

<style>
</style>