<template>
    <section v-if="toy" class="toy-edit">
        <router-link to="/toy">✖</router-link>
        <h1>{{ editOrAdd }} Toy</h1>
        <form action="" @submit.prevent="saveToy">
            <label for=""
                >Name: <input class="toy-name" v-model="toy.name" type="text"
            /></label>

            <label for=""
                >Price:
                <input
                    class="toy-price"
                    v-model.number="toy.price"
                    type="number"
            /></label>

            <input type="file" @change="uploadImg" />

            <el-select
                class="toy-label"
                v-if="toyLabels"
                v-model="toy.labels"
                multiple
                placeholder="Add Labels"
            >
                <el-option
                    v-for="(label, idx) in toyLabels"
                    :key="idx"
                    :label="label"
                    :value="label"
                ></el-option>
            </el-select>

            <div class="toy-instock">
                <p>In-Stock:</p>
                <label class="switch" for="toy-instock">
                    <input
                        id="toy-instock"
                        v-model="toy.inStock"
                        type="checkbox"
                    />
                    <span class="slider round"></span>
                </label>
            </div>

            <button class="btn btn-save">Save</button>
        </form>
    </section>
</template>

<script>
import { toyService } from "../services/toy-service.js";
import { showMsg } from "../services/event-bus.service.js";
import { uploadImg } from "../services/img-upload.service.js";
export default {
    data() {
        return {
            toy: null,
        };
    },
    methods: {
        async uploadImg(ev) {
            try {
                let file;
                if (ev.type === "change") file = ev.target.files[0];
                else if (ev.type === "drop") file = ev.dataTransfer.files[0];
                let res = await uploadImg(file);
                this.toy.imgUrl = res.url;
            } catch {
                console.log("Error uploading img");
            }
        },
        saveToy() {
            if (this.toy._id) {
                this.$store
                    .dispatch({ type: "updateToy", toy: this.toy })
                    .then(() => {
                        showMsg(`Toy Updated Successfuly`);
                    });
            } else {
                this.$store.dispatch({ type: "addToy", toy: this.toy });
                showMsg(`Toy Added Successfuly`);
            }
            this.toy = toyService.getEmptyToy();
            this.$router.push("/toy");
        },
    },
    computed: {
        toyLabels() {
            return this.$store.getters.toyLabels;
        },
        editOrAdd() {
            if (this.toy._id) {
                return "Edit";
            } else return "Add";
        },
    },
    watch: {
        "$route.params": {
            handler() {
                const { toyId } = this.$route.params;
                if (toyId) {
                    toyService.getById(toyId).then((toy) => {
                        this.toy = toy;
                        // console.log(toy);
                    });
                } else {
                    this.toy = toyService.getEmptyToy();
                }
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>

<style>
</style>