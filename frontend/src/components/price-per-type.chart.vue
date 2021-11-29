

<script>
import { Doughnut } from "vue-chartjs";
export default {
    props: ["pricePerToy"],
    extends: Doughnut,
    created() {
        for (const [key, value] of Object.entries(this.pricePerToy)) {
            this.pricePerToy[key] = Math.floor(value.sum / value.count);
        }
    },
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: Object.keys(this.pricePerToy),
            datasets: [
                {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: Object.values(this.pricePerToy),
                    backgroundColor: ['#1b9ea2', '#e64e69', '#ff7722', '#558596', '#0055aa', '#1b9ea2', '#e64e69', '#ff7722', '#558596', '#0055aa'],
                },
            ],
        });
    },
};
</script>

<style>
</style>