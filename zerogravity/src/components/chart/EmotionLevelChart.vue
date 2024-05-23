<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { Chart } from 'chart.js/auto'
  import annotationPlugin from 'chartjs-plugin-annotation'

  Chart.register(annotationPlugin)

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

  const valueToLabel = (value) => {
    const labels = [
      '매우 불쾌함', '불쾌함', '약간 불쾌함',
      '보통', '약간 기분 좋음', '기분 좋음', '매우 기분 좋음',
    ]
    return labels[value - 1] || ''
  }

  const createChart = () => {
    if (mixedChart.value) {
      const chartInstance = Chart.getChart(mixedChart.value)
      if (chartInstance) {
        chartInstance.destroy()
      }

      const chartData = {
        labels: props.labels,
        datasets: [
          {
            type: 'bar',
            label: props.datasets[0].label,
            data: props.datasets[0].data,
            backgroundColor: props.barColor,
            borderColor: props.barColor,
            borderWidth: 1,
          },
          {
            type: 'line',
            label: '',
            data: props.datasets[0].data,
            backgroundColor: props.lineColor,
            borderColor: props.lineColor,
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 4,
          },
        ],
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
              callback: valueToLabel,
              stepSize: 1,
              min: 1,
              max: 7,
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
            display: false,
            position: 'bottom',
          },
          annotation: {
            annotations: {
              averageLine: {
                type: 'line',
                scaleID: 'y',
                value: props.datasets[0].data.reduce((a, b) => a + b, 0) / props.datasets[0].data.length,
                borderColor: props.averageLineColor,
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  enabled: true,
                  content: 'Average',
                  position: 'end',
                  backgroundColor: props.averageLineColor,
                  color: 'black',
                  font: {
                    size: 12,
                    family: 'Helvetica',
                    weight: 'bold',
                  },
                },
              },
            },
          },
        },
      }

      new Chart(mixedChart.value, {
        type: 'bar',
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

<template>
  <canvas
    class="chart"
    ref="mixedChart"
  />
</template>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
