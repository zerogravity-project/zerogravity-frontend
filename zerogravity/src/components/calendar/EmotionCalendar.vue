<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useEmotionStore } from '@/stores/emotion.js'
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
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  })

  /*
  ** 감정 가져오기
  */
  const { emotions } = useEmotionStore()
  const userId = ref('example-user-id')

  /*
  ** 날짜 계산
  */
  const numericWidth = computed(() => props.width / 7)
  const numericHeight = computed(() => props.height / totalWeekCount.value)
  const daysOfWeek = ref(['일', '월', '화', '수', '목', '금', '토'])
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentWeekDay = currentDate.getDay()
  const showFullMonth = ref(true)

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()

  const dates = computed(() => {
    const firstDayOfWeek = new Date(props.year, props.month, 1).getDay()
    const totalDays = daysInMonth(props.month, props.year)
    const cells = []

    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ date: null, isToday: false, isSunday: i === 0, mainState: '', momentState: '' })
    }

    for (let i = 0; i < totalDays; i++) {
      cells.push({
        date: i + 1,
        isToday: currentDate.getFullYear() === props.year && currentDate.getMonth() === props.month && i + 1 === currentDay,
        isSunday: (i + firstDayOfWeek) % 7 === 0,
        mainState: '',
        momentState: '',
      })
    }

    const remainingCells = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7)

    for (let i = 0; i < remainingCells; i++) {
      cells.push({ date: null, isToday: false, isSunday: (cells.length + i) % 7 === 0, mainState: '', momentState: '' })
    }

    if (!showFullMonth.value) {
      const todayIndex = cells.findIndex(cell => cell.isToday)
      const start = Math.max(0, todayIndex - (todayIndex % 7))
      return cells.slice(start, start + 7)
    }

    return cells
  })

  const totalWeekCount = computed(()=>{
    return dates.value.length / 7
  })

  /*
  ** Drawer Toggle
  */
  const emits = defineEmits(['showDetail'])

  const getDate = (date) => {
    if(date){
      emits('showDetail', date)
    }
  }

  /*
  ** 반응형 구축
  */
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
            ? index === currentWeekDay
            : index === dates.findIndex(cell => cell.isToday) % 7
        }
      ]"
    >
      {{ day }}
    </div>
    <template v-if="showFullMonth">
      <CalendarCell
        @click="getDate(cell.date)"
        v-for="(cell, index) in dates"
        :key="index"
        :date="cell.date"
        :is-today="cell.isToday"
        :is-sunday="cell.isSunday"
        :main-state="cell.mainState"
        :moment-state="cell.momentState"
        :numeric-width="numericWidth"
        :numeric-height="numericHeight"
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
