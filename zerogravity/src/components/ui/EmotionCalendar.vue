<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import CalendarCell from '../base/calendar/CalendarCell.vue'

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const totalDays = daysInMonth(currentMonth, currentYear)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()

  const dates = computed(() => {
    const cells = []
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ date: null, isToday: false, gridColumn: i + 1, gridRow: 2 })
    }

    for (let i = 0; i < totalDays; i++) {
      cells.push({
        date: String(i + 1),
        isToday: i + 1 === currentDay,
        gridColumn: ((i + firstDayOfWeek) % 7) + 1,
        gridRow: Math.floor((i + firstDayOfWeek) / 7) + 2,
        isSunday: ((i + firstDayOfWeek) % 7) === 0,
      })
    }

    const totalCells = cells.length + (7 - (cells.length % 7)) % 7
    const remainingCells = totalCells - cells.length

    for (let i = 0; i < remainingCells; i++) {
      cells.push({
        date: null,
        isToday: false,
        gridColumn: (cells.length % 7) + 1,
        gridRow: Math.floor(cells.length / 7) + 2,
      })
    }

    return cells
  })

  const containerWidth = ref(window.innerWidth) // 초기값 설정
  const cellSize = computed(() => `${containerWidth.value / 7}px`)
  const mainEmotionSize = computed(() => `${containerWidth.value / 10}px`) // 기본값 비율로 설정
  const momentEmotionSize = computed(() => `${containerWidth.value / 50}px`) // 기본값 비율로 설정

  const handleResize = () => {
    containerWidth.value = document.querySelector('.emotion-calendar-container').clientWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // 초기 로드 시 사이즈 계산
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<template>
  <div class="emotion-calendar-container">
    <div
      v-for="(day, index) in daysOfWeek"
      :key="day"
      :class="['day-header', { 'sunday': index === 0 }]"
    >
      {{ day }}
    </div>
    <CalendarCell
      class="calendar-cell"
      v-for="date in dates"
      :key="date.date || `empty-${date.gridColumn}-${date.gridRow}`"
      :date="date.date"
      :is-today="date.isToday"
      :is-sunday="date.isSunday"
      :size="cellSize"
      :main-emotion-size="mainEmotionSize"
      :moment-emotion-size="momentEmotionSize"
      @update:main-emotion-data="(newData) => (mainEmotionData.value = newData)"
      @update:moment-emotion-data="(newData) => (momentEmotionData.value = newData)"
      :style="{ gridColumn: date.gridColumn, gridRow: date.gridRow }"
    >
      <div class="flex-container">
        <div class="flex-item">
          Item 1
        </div>
        <div class="flex-item">
          Item 2
        </div>
      </div>
    </CalendarCell>
  </div>
</template>

<style lang="scss" scoped>
.emotion-calendar-container {
  display: grid;
  grid-template-rows: 30px repeat(5, 1fr);
  grid-template-columns: repeat(7, minmax(0, 1fr));
  width: 100%;
  max-width: 100%;
  border: $lightgray100 solid 1px;

  .day-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $padding-xs;
    font-size: $text-font-size-m;
    color: $grayopacity50;
    background-color: $lightgray100;
  }

  .sunday {
    color: $orange900;
  }

  .calendar-cell {
    min-width: 0;
    min-height: 0;
    flex-grow: 1;
    width: fit-content;
  }
}
</style>
