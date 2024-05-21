<script setup>
  import EmotionLevelChart from '../../components/chart/EmotionLevelChart.vue'
  import EmotionCountChart from '../../components/chart/EmotionCountChart.vue'
  import HeadlineText from '../../components/text/HeadlineText.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import DropDown from '@/components/dropdown/DropDown.vue'
  import { ref } from 'vue'

  const labels = ref([
    '월', '화', '수', '목', '금', '토', '일',
  ])

  const datasets = ref([
    {
      type: 'bar',
      label: 'Bar Dataset',
      data: [2, 1.4, 2.7, 1, 3.7, 1.5, 2],
    },
    {
      type: 'line',
      label: 'Line Dataset',
      data: [2, 1.4, 2.7, 1, 3.7, 1.5, 2],
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
  const lineColor = ref('rgba(75, 192, 192, 1)')
  const averageLineColor = ref('rgba(75, 192, 192, 0.5)')

  const emotionLabels = ref([
    '월', '화', '수', '목', '금', '토', '일',
  ])

  const emotionDatasets = ref([
    {
      label: '오늘의 감정',
      data: [
        { x: '월', y: 2 },
        { x: '화', y: 1 },
        { x: '수', y: 1 },
        { x: '목', y: 3 },
        { x: '금', y: 2 },
        { x: '토', y: 1 },
        { x: '일', y: 2 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    },
    {
      label: '순간의 감정',
      data: [
        { x: '월', y: 1 },
        { x: '화', y: 2 },
        { x: '수', y: 0 },
        { x: '목', y: 1 },
        { x: '금', y: 2 },
        { x: '토', y: 1 },
        { x: '일', y: 0 },
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

  const isDropdownVisible = ref(false)

  const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value
  }
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
      </div>
      <div class="button-area">
        <div class="date">
          2024.05.20-2024.05.26
        </div>
        <ActionButton
          :variant="'sub'"
          :state="'secondary'"
          :icon="'sort'"
          :text="'주별 통계'"
          @click="toggleDropdown"
        />
        <DropDown
          v-if="isDropdownVisible"
          class="dropdown"
        />
      </div>
      <div class="chart-area">
        <EmotionLevelChart
          :labels="labels"
          :datasets="datasets"
          :chart-options="chartOptions"
          :bar-color="barColor"
          :line-color="lineColor"
          :average-line-color="averageLineColor"
          y-axis-title="감정의 정도"
          x-axis-title="요일"
        />
      </div>
      <div class="chart-area">
        <EmotionCountChart
          :labels="emotionLabels"
          :datasets="emotionDatasets"
          :chart-options="emotionChartOptions"
          :bar-color="barColor"
          :line-color="lineColor"
          :average-line-color="averageLineColor"
          y-axis-title="기록 횟수"
          x-axis-title="요일"
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
  justify-content: flex-start;
  padding: 2rem;
  width: calc(100% - 18.75rem);
  margin-left: 18.75rem;
  position: relative;
}

@media (max-width: 567px) {
  .main-area {
    width: 100%;
    margin-left: 0;
    padding: 1rem;
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

.button-area {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 50rem;
  align-items: center;
  padding-top: 15px;
  padding-left: 8px;
  justify-content: space-between;
  position: relative;
  z-index: 20;
}

.date {
  display: flex;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
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
  border: 1px solid rgb(212, 212, 212);
  border-radius: 8px;
  margin: 1rem 1rem 0.2rem 1rem;
}
</style>
