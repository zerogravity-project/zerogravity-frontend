<script setup>
  import { ref, computed, watch } from 'vue'
  import { useEmotionStore } from '@/stores/emotion.js'
  import { storeToRefs } from 'pinia'
  import CalendarCell from './CalendarCell.vue'

  const props = defineProps({
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  })

  const emotionStore = useEmotionStore()
  const { selectedMonthRecords, todayDate, todayDay, todayWeekDay, selectedYear, selectedMonth,
          selectedWeekDates, selectedWeeklyMainEmotion, selectedWeeklyMomentEmotion } = storeToRefs(emotionStore)

  const numericWidth = computed(() => props.width / 7)
  const numericHeight = computed(() => props.height / totalWeekCount.value)

  const daysOfWeek = ref(['일', '월', '화', '수', '목', '금', '토'])
  const showFullMonth = ref(true)

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const weekly = computed(() => {
    const cells = []

    if (!showFullMonth.value) {
      for (const date of selectedWeekDates.value) {
        const formattedDate = date.toISOString().split('T')[0]

        let mainState = false
        let momentState = false
        let type = null
        let level = 0

        selectedWeeklyMainEmotion.value.forEach(emotion => {
          if (emotion.createdTime.split('T')[0] === formattedDate) {
            mainState = true
            type = emotion.emotionRecordType
            level = emotion.emotionRecordLevel
          }
        })

        selectedWeeklyMomentEmotion.value.forEach(emotion => {
          if (emotion.createdTime.split('T')[0] === formattedDate) {
            momentState = true
          }
        })

        cells.push({
          date: date,
          isToday: todayDate.value.getFullYear() === date.getFullYear()
            && todayDate.value.getMonth() === date.getMonth()
            && date.getDate() === todayDay.value,
          isSunday: date.getDay() === 0,
          mainState: mainState,
          momentState: momentState,
          type: type,
          level: level,
        })
      }
    }

    return cells
  })

  const dates = computed(() => {
    const cells = []

    if (showFullMonth.value) {
      const firstDayOfWeek = new Date(selectedYear.value, selectedMonth.value, 1).getDay()
      const totalDays = daysInMonth(selectedMonth.value, selectedYear.value)

      for (let i = 0; i < firstDayOfWeek; i++) {
        cells.push({ date: null, isToday: false, isSunday: i === 0, mainState: false, momentState: false, type: null, level: 0 })
      }

      for (let i = 1; i <= totalDays; i++) {
        const date = new Date(Date.UTC(selectedYear.value, selectedMonth.value, i))
        const formattedDate = date.toISOString().split('T')[0]
        const emotions = selectedMonthRecords.value[formattedDate] || []

        let mainState = false
        let momentState = false
        let type = null
        let level = 0

        emotions.forEach(emotion => {
          if (emotion.emotionRecordState === 'main') {
            mainState = true
            type = emotion.emotionRecordType
            level = emotion.emotionRecordLevel
          }
          if (emotion.emotionRecordState === 'moment') {
            momentState = true
          }
        })

        cells.push({
          date: date,
          isToday: todayDate.value.getFullYear() === selectedYear.value
            && todayDate.value.getMonth() === selectedMonth.value
            && i === todayDay.value,
          isSunday: (i + firstDayOfWeek) % 7 === 0,
          mainState: mainState,
          momentState: momentState,
          type: type,
          level: level,
        })
      }
    }

    return cells
  })

  const totalWeekCount = computed(() => {
    return showFullMonth.value ? dates.value.length / 7 : 1
  })

  const emits = defineEmits(['showDetail'])

  const handleCellClick = (date) => {
    emits('showDetail', date)
  }

  const handleWeeklyCellClick = (cell) => {
    handleCellClick(cell.date)
  }

  const updateDisplayMode = () => {
    showFullMonth.value = props.width > 576
  }

  watch(() => props.width, updateDisplayMode)
</script>

<template>
  <div class="cell-container">
    <div
      v-for="(day, index) in daysOfWeek"
      :key="'day-' + index"
      :class="[
        'day-header',
        {
          sunday: showFullMonth && index === 0,
          today: showFullMonth
            ? index === todayWeekDay
            : index === dates.findIndex(cell => cell.isToday) % 7
        }
      ]"
    >
      {{ day }}
    </div>
    <template v-if="showFullMonth">
      <CalendarCell
        @click="handleCellClick(cell.date)"
        v-for="(cell, index) in dates"
        :key="index"
        :date="cell.date"
        :is-today="cell.isToday"
        :is-sunday="cell.isSunday"
        :main-state="cell.mainState"
        :moment-state="cell.momentState"
        :emotion="cell.type"
        :level="cell.level"
        :numeric-width="numericWidth"
        :numeric-height="numericHeight"
      />
    </template>
    <template v-else>
      <div
        v-for="(cell, index) in weekly"
        :key="'date-' + index"
        :class="[
          'date-cell',
          {
            today: cell.isToday,
            sunday: cell.isSunday,
            'main-state': cell.mainState,
            'moment-state': cell.momentState,
            'both-states': cell.mainState && cell.momentState
          }
        ]"
        @click="handleWeeklyCellClick(cell)"
      >
        <div
          class="date-wrapper"
          :class="{ 'main-state': cell.mainState, 'moment-state': cell.momentState, 'both-states': cell.mainState && cell.momentState }"
        >
          {{ cell.date ? cell.date.getDate() : '' }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cell-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 32px auto;
  width: 100%;
  height: 100%;
  border: solid 1px $lightgray100;
  background-color: $white900;
}

.day-header,
.date-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $padding-xs-rem;
  font-size: $text-font-size-xs-rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.day-header {
  background-color: $lightgray100;
  color: $grayopacity50;
}

.date-cell.sunday {
  color: $orange900;
}

@media (max-width: 576px) {
  .cell-container {
    justify-content: center;
    align-items: center;
    grid-template-rows: 30px auto;
    height: 73px;
    border: transparent;
    gap: 8px;
    background-color: transparent;
  }

  .day-header {
    line-height: 18px;
    letter-spacing: -0.078px;
    background-color: transparent;
    padding: 0px;
  }

  .day-header.today {
    color: $orange900;
  }

  .date-cell {
    padding: 0px;
    font-style: normal;
    line-height: 16px;
    letter-spacing: 0.38px;
    color: $orange900;
  }

  .date-wrapper {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0px;
    border-radius: 50%;
  }

  .date-wrapper.main-state {
    color: $white900;
    background-color: $orange900;
  }

  .date-wrapper.moment-state {
    background-color: $orangeopacity10;
  }

  .date-wrapper.both-states {
    background-color: $orange900;
  }

  .date-cell.today .date-wrapper {
    text-decoration: underline 2px $orange900;
    text-underline-offset: 15px;
  }
}
</style>
