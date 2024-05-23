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
              callback: valueToLabel,
              stepSize: 1,
              min: 1,
              max: 8,
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
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              title: () => {
                return ''
              },
              label: (tooltipItem) => {
                const dayIndex = tooltipItem.dataIndex
                return `감정의 정도: ${tooltipItem.raw.y}`
              },
            },
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

<template>
  <canvas
    class="chart"
    ref="mixedChart"
  />
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
