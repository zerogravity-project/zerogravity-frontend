<script setup>
  import { ref, computed } from 'vue'
  import CalendarCell from '../base/calendar/CalendarCell.vue'

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate()

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const totalDays = daysInMonth(currentMonth, currentYear)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const mainEmotionData = ref(new URL('../../../assets/images/emotion.png', import.meta.url).href)
  const momentEmotionData = ref(new URL('../../../assets/images/emotion-asset-moment-status.png', import.meta.url).href)

  const dates = computed(() => {
    return Array.from({ length: totalDays }, (_, i) => String(i + 1))
  })
</script>

<template>
  <div class="emotion-calendar-container">
    <div
      v-for="day in daysOfWeek"
      :key="day"
      class="day-header"
    >
      {{ day }}
    </div>
    <CalendarCell
      v-for="date in dates"
      :key="date"
      :date="date"
      :main-emotion-data="mainEmotionData"
      :moment-emotion-data="momentEmotionData"
      @update:main-emotion-data="newData => mainEmotionData = newData"
      @update:moment-emotion-data="newData => momentEmotionData = newData"
    />
  </div>
</template>

<style lang="scss" scoped>
.emotion-calendar-container {
  display: grid;
  grid-template-columns: repeat(7, 150px);
  grid-template-rows: 30px repeat(5, 150px);
}
.day-header {
  display: flex;
  align-items: center;
  padding: $padding-xs;
  font-family: $text-font-size-m;
  color: $grayopacity50;
  background-color: $lightgray100;
}
</style>