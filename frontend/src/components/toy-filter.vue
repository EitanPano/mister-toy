<template>
    <aside class="toy-filter">
        <div class="search">
            <label
                >🔍
                <input
                    v-model="filterBy.toyName"
                    @input="changeFilter"
                    type="search"
                    placeholder="Search Toys"
                />
            </label>

            <select v-model="filterBy.status" @change="changeFilter">
                <option value="all">All</option>
                <option value="instock">In-Stock</option>
                <option value="missing">Missing</option>
            </select>
        </div>

        <el-select
            v-model="filterBy.labels"
            @change="changeFilter"
            multiple
            placeholder="Select Labels"
        >
            <el-option
                v-for="(label, idx) in toyLabels"
                :key="idx"
                :label="label"
                :value="label"
            >
            </el-option>
        </el-select>

        <div class="sort">
            <p>Sort by:</p>
            <button @click="changeFilter('name')">Name</button>
            <button @click="changeFilter('price')">Price</button>
            <button @click="changeFilter('date')">Date</button>
        </div>
    </aside>
</template>

<script>
export default {
    props: ["toyLabels"],
    data() {
        return {
            filterBy: {
                toyName: "",
                status: "all",
                labels: [],
                sortBy: "",
            },
        };
    },
    methods: {
        changeFilter(sortBy = "") {
            this.filterBy.sortBy = sortBy;
            this.$emit("filtered", this.filterBy);
        },
    },
};
</script>

<style>
</style>