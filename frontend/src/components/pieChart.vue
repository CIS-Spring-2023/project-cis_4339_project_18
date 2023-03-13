<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  props: {
    pieLabel: {
      type: Array
    },
    pieChartData: {
      type: Array
    },
    pieColor: {
      type: Array
    }
  },
  async mounted() {
    await new Chart(this.$refs.zipChart, {
      type: 'pie',
      data: {
        labels: this.pieLabel,
        datasets: [
          {
            data: this.pieChartData,
            backgroundColor: this.pieColor
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Users Grouped by ZIP'
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  }
}
</script>
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="zipChart"></canvas>
  </div>
</template>
