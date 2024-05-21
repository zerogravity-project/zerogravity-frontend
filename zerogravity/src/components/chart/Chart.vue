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
    if (value === 0) {
      return '매우 불쾌함'
    } else if (value === 1) {
      return '약간 불쾌함'
    } else if (value === 2) {
      return '보통'
    } else if (value === 3) {
      return '약간 좋음'
    } else if (value === 4) {
      return '매우 좋음'
    } else {
      return ''
    }
  }

  const calculateAverage = (data) => {
    const sum = data.reduce((a, b) => a + b, 0)
    return sum / data.length
  }

  const createChart = () => {
    if (mixedChart.value) {
      const chartInstance = Chart.getChart(mixedChart.value)
      if (chartInstance) {
        chartInstance.destroy()
      }

      const chartData = {
        labels: props.labels,
        datasets: props.datasets.map((dataset) => {
          if (dataset.type === 'bar') {
            return {
              ...dataset,
              backgroundColor: props.barColor,
              borderColor: props.barColor.replace('0.5', '1'),
            }
          } else if (dataset.type === 'line') {
            return {
              ...dataset,
              backgroundColor: props.lineColor.replace('0.8', '0.3'), // 라인 색상을 반영
              borderColor: props.lineColor,
              pointBackgroundColor: props.lineColor.replace('0.8', '1'),
              pointBorderColor: props.lineColor.replace('0.8', '1'),
            }
          }
          return dataset
        }),
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
            },
          },
          x: {
            ...props.chartOptions.scales.x,
            title: {
              ...props.chartOptions.scales.x.title,
              text: props.xAxisTitle,
            },
          },
        },
        plugins: {
          ...props.chartOptions.plugins,
          annotation: {
            annotations: {
              averageLine: {
                type: 'line',
                scaleID: 'y',
                value: calculateAverage(props.datasets[0].data),
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
    () => [props.datasets, props.barColor, props.lineColor, props.averageLineColor, props.labels, props.chartOptions],
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
