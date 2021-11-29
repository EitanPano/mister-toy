<script>
import { Bar } from 'vue-chartjs'
export default {
  props: ['inventoryPerToy'],
  extends: Bar,
  created() {
    for (const [key, value] of Object.entries(this.inventoryPerToy)) {
      this.inventoryPerToy[key] = (
        (value.stockCount / value.count) *
        100
      ).toFixed(2)
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: Object.keys(this.inventoryPerToy),
      datasets: [
        {
          label: 'Toys in-stock',
          backgroundColor: ['#1b9ea2', '#e64e69', '#ff7722', '#558596', '#0055aa'],
          data: Object.values(this.inventoryPerToy),
        },
      ],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  },
}
</script>

<style></style>
