<template>
    <div id="app">
        <user-msg />
        <app-header />
        <aside class="auth-actions">
            <div v-if="loggedUser">
                <router-link :to="isAdmin ? '/users' : '/profile'">{{
                    username
                }}</router-link>
                <button @click="logout">Logout</button>
            </div>
            <router-link v-else to="/auth">Login</router-link>
        </aside>
        <router-view />
    </div>
</template>

<script>
import userMsg from "./components/user-msg.vue";
import appHeader from "./components/app-header.vue";
import userAuth from "./views/user-auth.vue";
export default {
    methods: {
        logout() {
            this.$store.dispatch({ type: "logout" }).then(() => {
                // this.$router.push('/auth');
            });
        },
    },
    computed: {
        username() {
            return (
                this.$store.getters.username[0].toUpperCase() +
                    this.$store.getters.username.slice(1) || "Guest"
            );
        },
        isAdmin() {
            return this.$store.getters.isAdmin;
        },
        loggedUser() {
            return this.$store.getters.user;
        },
    },
    components: {
        userMsg,
        appHeader,
        userAuth,
    },
};
</script>


<style lang="scss">
</style>
