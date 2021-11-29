<template>
    <section class="auth">
        <form v-if="isSignedUp" class="login-form" @submit.prevent="login">
            <h2>Welcome Back ✔</h2>
            <label for="">Username: <input v-model="user.username" type="text"></label>
            <label for="">Password: <input v-model="user.password" type="password"></label>
            <button>Login</button>
            <p>Don't have an account? <span @click="switchForm">Create One</span></p>
        </form>
        <form v-else class="signup-form" @submit.prevent="signup">
            <h2>Signup Form</h2>
            <label for="">Username: <input v-model="newUser.username" type="text"></label>
            <label for="">Password: <input v-model="newUser.password" type="password"></label>
            <label for="">Full name: <input v-model="newUser.fullName" type="text"></label>
            <label for="">Email: <input v-model="newUser.email" type="email"></label>
            <button>Sign up</button>
            <p>Already Signed Up? <span @click="switchForm">Back to Login</span></p>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isSignedUp: true,
            user: {
                username: '',
                password: null
            },
            newUser: {
                username: '',
                password: null,
                email: '',
                fullName: ''
            }
        };
    },
    methods: {
        login() {
            this.$store.dispatch({type: 'login', user: this.user}).then(() => {
                this.$router.push('/toy')
            })
        },
        signup() {
            this.$store.dispatch({type: 'signup', user: this.newUser}).then(() => {
                this.$router.push('/toy')
            })
            
        },
        switchForm() {
            this.isSignedUp = !this.isSignedUp;
        }
    },
}
</script>

<style>

</style>