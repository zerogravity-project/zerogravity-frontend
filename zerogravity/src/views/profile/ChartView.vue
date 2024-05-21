<script setup>
  import MixedChart from '../../components/chart/Chart.vue'
  import MixedChart2 from '../../components/chart/Chart2.vue'
  import HeadlineText from '../../components/text/HeadlineText.vue'
  import TitleText from '../../components/text/TitleText.vue'
  import { ref } from 'vue'

  const labels = ref([
    '1월', '2월', '3월', '4월', '5월', '6월', '7월',
    '8월', '9월', '10월', '11월', '12월',
  ])

  const datasets = ref([
    {
      type: 'bar',
      label: 'Bar Dataset',
      data: [2, 1.4, 2.7, 1, 3.7, 1.5, 2, 1.9, 3.5, 2, 2.4, 1.7, 3.9],
    },
    {
      type: 'line',
      label: 'Line Dataset',
      data: [2, 1.4, 2.7, 1, 3.7, 1.5, 2, 1.9, 3.5, 2, 2.4, 1.7, 3.9],
    },
  ])

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

  const chartOptions = ref({
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        title: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          callback: valueToLabel,
        },
      },
      x: {
        title: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  })

  const barColor = ref('rgba(75, 192, 192, 0.5)')
  const lineColor = ref('rgba(75, 192, 192, 0.5)')
  const averageLineColor = ref('rgba(75, 192, 192, 0.5)')

  const emotionLabels = ref([
    '1월', '2월', '3월', '4월', '5월', '6월', '7월',
    '8월', '9월', '10월', '11월', '12월',
  ])

  const emotionDatasets = ref([
    {
      label: '오늘의 감정',
      data: [
        { x: '1월', y: 2 },
        { x: '2월', y: 1 },
        { x: '3월', y: 1 },
        { x: '4월', y: 3 },
        { x: '5월', y: 2 },
        { x: '6월', y: 1 },
        { x: '7월', y: 2 },
        { x: '8월', y: 1 },
        { x: '9월', y: 3 },
        { x: '10월', y: 2 },
        { x: '11월', y: 1 },
        { x: '12월', y: 3 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    },
    {
      label: '순간의 감정',
      data: [
        { x: '1월', y: 1 },
        { x: '2월', y: 2 },
        { x: '3월', y: 0 },
        { x: '4월', y: 1 },
        { x: '5월', y: 2 },
        { x: '6월', y: 1 },
        { x: '7월', y: 0 },
        { x: '8월', y: 2 },
        { x: '9월', y: 1 },
        { x: '10월', y: 3 },
        { x: '11월', y: 2 },
        { x: '12월', y: 1 },
      ],
      backgroundColor: 'rgba(211, 211, 211, 0.5)',
    },
  ])

  const emotionChartOptions = ref({
    scales: {
      y: {
        beginAtZero: true,
        max: 3.5,
        title: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          callback: function(value) {
            if (value === 0) return 'Low'
            if (value === 1) return 'Middle'
            if (value === 2) return 'High'
            return ''
          },
        },
      },
      x: {
        title: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  })
</script>

<template>
  <div class="layout">
    <main class="main-area">
      <div class="main-title">
        <HeadlineText
          :size="'l'"
          :text="'감정 기록 통계'"
          :padding="[48, 0, 0, 0]"
        />
        <!-- <TitleText
          :size="'s'"
          :title-text="'이번주 감정 기록'"
          :sub-title-text="'2024.05.20-2024.05.27'"
        /> -->
      </div>
      <div class="chart-area">
        <MixedChart
          :labels="labels"
          :datasets="datasets"
          :chart-options="chartOptions"
          :bar-color="barColor"
          :line-color="lineColor"
          :average-line-color="averageLineColor"
          y-axis-title="감정의 정도"
          x-axis-title="월"
        />
      </div>
      <div class="chart-area">
        <MixedChart2
          :labels="emotionLabels"
          :datasets="emotionDatasets"
          :chart-options="emotionChartOptions"
          :bar-color="barColor"
          :line-color="lineColor"
          :average-line-color="averageLineColor"
          y-axis-title="기록 횟수"
          x-axis-title="월"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: calc(100% - 18.75rem);
  margin-left: 18.75rem;
}

@media (max-width: 567px) {
  .main-area {
    width: 100%;
    margin: 30px;
  }
}

.main-title {
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 0.25rem;
}

.chart-area {
  width: 100%;
  max-width: 50rem;
  height: 37vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 10px 20px;
  border: solid 1px rgb(212, 212, 212);
  border-radius: 8px;
  margin: 1rem 1rem 0.2rem 1rem;
}
</style>
