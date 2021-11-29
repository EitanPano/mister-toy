<template>
    <section class="dashboard">
        <div v-if="pricePerToy" class="price-chart">
            <price-chart :pricePerToy="pricePerToy" />
        </div>
        <div v-if="inventoryPerToy" class="instock-chart">
            <instock-chart :inventoryPerToy="inventoryPerToy" />
        </div>
    </section>
</template>

<script>
import priceChart from "@/components/price-per-type.chart";
import instockChart from "@/components/instock-per-type.chart";
export default {
    components: {
        priceChart,
        instockChart,
    },
    computed: {
        pricePerToy() {
            if (!this.$store.getters.filteredToys) return null;
            return this.$store.getters.filteredToys.reduce((acc, toy) => {
                toy.labels.forEach((label) => {
                    if (!acc[label]) acc[label] = { count: 0, sum: 0 };
                    acc[label].sum += +toy.price;
                    return acc[label].count++;
                });
                return acc;
            }, {});
        },
        inventoryPerToy() {
            if (!this.$store.getters.filteredToys) return null;
            return this.$store.getters.filteredToys.reduce((acc, toy) => {
                toy.labels.forEach((label) => {
                    if (!acc[label]) acc[label] = { count: 0, stockCount: 0 };
                    if (toy.inStock) acc[label].stockCount++
                    return acc[label].count++;
                });
                return acc;
            }, {});
        },
    },
};



</script>

<style>
.price-chart {
    margin: 2em auto;
    width: 20em;
}
.instock-chart {
    margin: 0 auto;
    max-width: 25em;
}
</style>