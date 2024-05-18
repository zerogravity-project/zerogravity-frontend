<script setup>
  import CalendarCell from './CalendarCell.vue'
  import { computed, ref, onMounted } from 'vue'

  const numericWidth = ref(window.size)

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const currentWeekDay = currentDate.getDay()

  const totalDays = daysInMonth(currentMonth, currentYear)

  const daysOfWeekFull = ['일', '월', '화', '수', '목', '금', '토']
  const daysOfWeekMondayStart = ['월', '화', '수', '목', '금', '토', '일']

  const daysOfWeek = ref(daysOfWeekFull)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()

  const showFullMonth = ref(true)

  const updateDisplayMode = () => {
    showFullMonth.value = window.innerWidth > 576
    daysOfWeek.value = showFullMonth.value ? daysOfWeekFull : daysOfWeekMondayStart
  }

  onMounted(() => {
    window.addEventListener('resize', updateDisplayMode)
    updateDisplayMode()
  })

  const dates = computed(() => {
    const cells = []
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ date: null, isToday: false, isSunday: i === 0, mainState: '', momentState: '' })
    }
    for (let i = 0; i < totalDays; i++) {
      cells.push({
        date: i + 1,
        isToday: i + 1 === currentDay,
        isSunday: (i + firstDayOfWeek) % 7 === 0,
        mainState: '', // 메인 감정 데이터
        momentState: '', // 순간 감정 데이터
      })
    }
    const totalCells = cells.length + (7 - (cells.length % 7)) % 7
    const remainingCells = totalCells - cells.length
    for (let i = 0; i < remainingCells; i++) {
      cells.push({ date: null, isToday: false, isSunday: (cells.length + i) % 7 === 0, mainState: '', momentState: '' })
    }

    if (!showFullMonth.value) {
      const todayIndex = cells.findIndex(cell => cell.isToday)
      const start = Math.max(0, todayIndex - ((todayIndex - 1) % 7))

      return cells.slice(start, start + 7)
    }

    return cells
  })

  const assetSize = ref('s')
</script>

<template>
  <div class="cell-container">
    <div
      v-for="(day, index) in daysOfWeek"
      :key="'day-' + index"
      :class="[
        'day-header',
        {
          sunday: showFullMonth.value && index === 0,
          today: showFullMonth.value ? index === currentWeekDay : index === (currentWeekDay === 0 ? 6 : currentWeekDay - 1)
        }
      ]"
    >
      {{ day }}
    </div>
    <template v-if="showFullMonth">
      <CalendarCell
        v-for="(cell, index) in dates"
        :key="index"
        :date="cell.date"
        :is-today="cell.isToday"
        :is-sunday="cell.isSunday"
        :main-state="cell.mainState"
        :moment-state="cell.momentState"
        :size="assetSize.value"
      />
    </template>
    <template v-else>
      <div
        v-for="(cell, index) in dates"
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
      >
        <div
          class="date-wrapper"
          :class="{ 'main-state': cell.mainState, 'moment-state': cell.momentState, 'both-states': cell.mainState && cell.momentState }"
        >
          {{ cell.date }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cell-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  width: fit-content;
  height: fit-content;
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
    grid-template-rows: repeat(2, auto);
    border: transparent;
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
    font-style: normal;
    line-height: 16px;
    letter-spacing: 0.38px;
    color: $orange900;
  }

  .date-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    padding: 10px;
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
