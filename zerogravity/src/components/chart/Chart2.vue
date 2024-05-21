<template>
  <canvas
    class="chart"
    ref="mixedChart"
  />
</template>

  <script setup>
  import { onMounted, ref, watch } from 'vue'
  import { Chart } from 'chart.js/auto'

  const props = defineProps({
    labels: {
      type: Array,
      required: true,
    },
    datasets: {
      type: Array,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
    barColor: {
      type: String,
      required: true,
    },
    lineColor: {
      type: String,
      required: true,
    },
    averageLineColor: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
  })

  const mixedChart = ref(null)

  const createChart = () => {
    if (mixedChart.value) {
      const chartInstance = Chart.getChart(mixedChart.value)
      if (chartInstance) {
        chartInstance.destroy()
      }

      const chartData = {
        labels: props.labels,
        datasets: props.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.backgroundColor,
          borderWidth: 1,
          pointRadius: 8,
          pointHoverRadius: 7,
        })),
      }

      const chartOptions = {
        ...props.chartOptions,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ...props.chartOptions.scales.y,
            title: {
              ...props.chartOptions.scales.y.title,
              text: props.yAxisTitle,
            },
            ticks: {
              ...props.chartOptions.scales.y.ticks,
              callback: function (value) {
                if (value === 0) return '0'
                if (value === 1) return '1'
                if (value === 2) return '2'
                if (value === 3) return '3'
                if (value === 4) return '4'
                if (value === 5) return '5'
              },
            },
          },
          x: {
            type: 'category',
            labels: props.labels,
            title: {
              display: true,
              text: props.xAxisTitle,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      }

      new Chart(mixedChart.value, {
        type: 'scatter',
        data: chartData,
        options: chartOptions,
      })
    }
  }

  onMounted(createChart)

  watch(
    () => [props.datasets, props.labels, props.chartOptions],
    createChart,
    { deep: true },
  )
  </script>

  <style scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>
