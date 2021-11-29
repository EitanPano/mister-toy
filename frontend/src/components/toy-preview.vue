<template>
    <li class="toy-card" @click="toydClick(toy._id)" >
            <img :src="toy.imgUrl" alt="">
            <div>
                <p>{{ toy.name }}</p>
                <p>${{ toy.price }}</p>
                <div class="labels">
                <p v-for="(label, idx) in labels" :key="idx">{{ label }}</p>
                </div>
                <div v-if="isAdmin" class="btns-box">
                    <button @click.stop="editClick(toy._id)" class="btn btn-edit">🖊</button>
                    <button @click.stop="$emit('removed', toy)" class="btn btn-remove">✖</button>
                </div>
            </div>
    </li>
</template>

<script>
export default {
    props: ['toy'],
    methods: {
        toydClick(toyId) {
            this.$router.push(`/toy/${toyId}`)
        },
        editClick(toyId) {
            this.$router.push(`/toy/edit/${toyId}`)
            window.scrollTo(0, 0);
        }
    },
    computed: {
        isAdmin() {
            return this.$store.getters.isAdmin;
        },
        labels() {
            return this.toy.labels
        }
    }
}
</script>

<style>

</style>