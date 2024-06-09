<script setup>
  import { onMounted, ref, onUnmounted, nextTick, watch, computed, watchEffect } from 'vue'
  import { useEmotionStore } from '@/stores/emotion.js'
  import { storeToRefs } from 'pinia'
  import EmotionCalendar from '@/components/calendar/EmotionCalendar.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import DrawerContainer from '@/components/drawer/DrawerContainer.vue'
  import DropDown from '@/components/dropdown/DropDown.vue'
  import HeadlineText from '@/components/text/HeadlineText.vue'
  import LinkButton from '@/components/button/LinkButton.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'

  const emotionStore = useEmotionStore()
  const { selectedDate, selectedMonth, selectedYear, todayDate,
          selectedWeek, selectedWeeklyMainEmotion, selectedWeeklyMomentEmotion, emotionRecords } = storeToRefs(emotionStore)

  /**
   * 초기 화면 설정
   */
  const section = ref(null)
  const container = ref(null)
  const viewportWidth = ref(window.innerWidth)
  const viewportHeight = ref(window.innerHeight)
  const calendarWidth = ref(0)
  const calendarHeight = ref(0)
  const heightAdjustment = 48
  const navHeight = ref(60)
  const isTablet = computed(() => viewportWidth.value <= 834)
  const isMobile = computed(() => viewportWidth.value <= 576)

  const getSectionSize = () => {
    viewportWidth.value = window.innerWidth
    viewportHeight.value = window.innerHeight
    calendarWidth.value = section.value.clientWidth
    calendarHeight.value = container.value.clientHeight - heightAdjustment
  }

  /**
   * Drawer Toggle
   */
  const isShowDetail = ref(false)
  const isDrawerHidden = ref(true)

  const toggleDetail = (date) => {
    if (date) {
      date.setHours(12, 0, 0, 0) // 시간을 오후 12시 0분 0초로 설정
      selectedDate.value = date
      selectedMonth.value = date.getMonth()
      selectedYear.value = date.getFullYear()
      isShowDetail.value = true
      isDrawerHidden.value = false
    } else {
      isShowDetail.value = false
      isDrawerHidden.value = true
    }
  }

  watch(isShowDetail, () => {
    nextTick(() => {
      getSectionSize()
    })
  })

  /**
   * 날짜 계산 로직
   */
  const getPreviousMonth = () => {
    if (!isTablet.value) {
      if (selectedMonth.value === 0) {
        selectedMonth.value = 11
        selectedYear.value--
      } else {
        selectedMonth.value--
      }
    } else {
      return
    }
  }

  const getNextMonth = () => {
    if (!isTablet.value) {
      if (selectedMonth.value === 11) {
        selectedMonth.value = 0
        selectedYear.value++
      } else {
        selectedMonth.value++
      }
    } else {
      return
    }
  }

  const getTodayMonth = () => {
    selectedMonth.value = todayDate.value.getMonth()
    selectedYear.value = todayDate.value.getFullYear()
    selectedDate.value = todayDate.value
  }

  /**
   * API Fetch
   */
  watchEffect(() => {
    todayDate.value = new Date()
  })

  const fetchWeeklyEmotionData = () => {
    const formatDateToCustomString = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    const newDate = new Date(selectedDate.value)
    emotionStore.getWeeklyEmotionRecord('weekly', formatDateToCustomString(newDate))
  }

  const fetchMonthlyEmotionData = () => {
    emotionStore.getEmotionRecords(selectedYear.value, selectedMonth.value + 1)
  }

  watchEffect(() => {
    if (isMobile.value) {
      fetchWeeklyEmotionData()
    } else {
      fetchMonthlyEmotionData()
    }
  })

  const getPreviousWeek = async () => {
    await emotionStore.getPreviousWeek()
  }

  const getNextWeek = async () => {
    await emotionStore.getNextWeek()
  }

  /**
   * 주차 계산 로직
   */
  const calculateCurrentWeek = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000))
    return Math.ceil(days / 7)
  }

  /**
   * 드롭다운
   */
  const isDropdown = ref(false)
  const dropdownMenu = [{ name: '오늘의 감정 추가', link: '/record/emotion', emotionRecordState: 'main' },
                        { name: '순간의 감정 추가', link: '/record/emotion', emotionRecordState: 'moment' }]

  const onClick = () => {
    isDropdown.value = !isDropdown.value
  }

  const currentWeekText = computed(() => {
    return isMobile.value
      ? `${selectedMonth.value + 1}월 ${selectedDate.value.getDate()}일`
      : `${selectedYear.value}년 ${selectedMonth.value + 1}월`
  })

  const filteredMainEmotions = computed(() => {
    if (!selectedDate.value) {
      return []
    }

    const filteredEmotions = selectedWeeklyMainEmotion.value.filter(emotion => {
      const emotionDate = new Date(emotion.createdTime)
      return emotionDate.getUTCMonth() === selectedDate.value.getMonth() && emotionDate.getUTCDate() === selectedDate.value.getUTCDate()
    })

    if (filteredEmotions.length === 0) {
      return [{ createdTime: selectedDate.value.toISOString(), emotionRecordType: '', emotionRecordLevel: 0, emotionReason: '[]' }]
    }

    return filteredEmotions
  })

  const filteredMomentEmotions = computed(() => {
    return selectedWeeklyMomentEmotion.value.filter(emotion => {
      const emotionDate = new Date(emotion.createdTime)
      return emotionDate.getUTCMonth() === selectedDate.value.getMonth() && emotionDate.getUTCDate() === selectedDate.value.getUTCDate()
    })
  })

  const calendarEmotions = computed(() => {
    return isMobile.value ? selectedWeeklyMainEmotion.value : emotionRecords.value
  })

  onMounted(async () => {
    todayDate.value = new Date()
    if (!selectedDate.value) {
      selectedDate.value = todayDate.value
    }
    selectedWeek.value = calculateCurrentWeek(selectedDate.value)
    window.addEventListener('resize', getSectionSize)

    if (container.value && section.value) {
      nextTick(() => {
        getSectionSize()
      })
    }

    if (isMobile.value) {
      fetchWeeklyEmotionData()
    } else {
      fetchMonthlyEmotionData()
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', getSectionSize)
  })
</script>

<template>
  <section
    ref="section"
    class="calendar-view"
    :style="{ height: isTablet ? `${viewportHeight - navHeight}px` : `${viewportHeight}px` }"
  >
    <div class="calendar-area">
      <header class="calendar-header">
        <HeadlineText
          v-if="isMobile"
          :text="currentWeekText"
          :size="'l'"
        />
        <div class="calendar-button-area">
          <div class="pagination-buttons">
            <ActionButton
              v-if="isMobile"
              @click="getPreviousWeek"
              :style="{
                'border-top-right-radius': 0,
                'border-bottom-right-radius': 0,
                'border-right': 'none'
              }"
              :variant="'sub'"
              :state="'secondary'"
              :icon="'chevron_left'"
            />
            <ActionButton
              v-if="isMobile"
              @click="getNextWeek"
              :style="{
                'border-top-left-radius': 0,
                'border-bottom-left-radius': 0
              }"
              class="right-button"
              :variant="'sub'"
              :state="'secondary'"
              :icon="'chevron_right'"
            />
            <ActionButton
              v-if="!isMobile"
              @click="getPreviousMonth"
              :style="{
                'border-top-right-radius': 0,
                'border-bottom-right-radius': 0,
                'border-right': 'none'
              }"
              :variant="'sub'"
              :state="'secondary'"
              :icon="'chevron_left'"
            />
            <ActionButton
              v-if="!isMobile"
              @click="getNextMonth"
              :style="{
                'border-top-left-radius': 0,
                'border-bottom-left-radius': 0
              }"
              class="right-button"
              :variant="'sub'"
              :state="'secondary'"
              :icon="'chevron_right'"
            />
          </div>
          <ActionButton
            @click="getTodayMonth"
            :variant="'sub'"
            :state="'secondary'"
            :text="'Today'"
          />
        </div>
        <div
          v-if="!isMobile"
          class="plus-button-area"
        >
          <ActionButton
            @click="onClick"
            class="plus-button"
            :variant="'sub'"
            :state="'primary'"
            :icon="'add'"
            :text="'Emotion'"
          />
          <DropDown
            v-if="isDropdown"
            class="drop-down"
            :menu-list="dropdownMenu"
          />
        </div>
        <h1
          v-if="!isMobile"
          class="date-title"
        >
          {{ selectedYear }}년 {{ selectedMonth + 1 }}월
        </h1>
      </header>
      <div
        ref="container"
        class="calendar-container"
      >
        <EmotionCalendar
          @show-detail="toggleDetail"
          :width="calendarWidth"
          :height="calendarHeight"
          :emotions="calendarEmotions"
        />
        <div class="link-button-container">
          <LinkButton
            v-if="isMobile"
            :text="'더보기'"
            :default-color="'#FF2E00'"
            :link-path="'detail'"
          />
        </div>
        <div
          v-if="isMobile"
          class="emotion-info-area"
        >
          <div class="main-emotion-area">
            <EmotionContainer
              v-for="(emotion, index) in filteredMainEmotions"
              :key="index"
              :size="'s'"
              :emotion="emotion ? emotion.emotionRecordType : ''"
              :level="emotion ? emotion.emotionRecordLevel : 0"
              :chips-state="'badge'"
              :reason-list="emotion ? JSON.parse(emotion.emotionReason) : []"
              :time="emotion.createdTime"
            />
            <ActionButton
              :variant="'main'"
              :state="'tertiary'"
              :text="'오늘의 감정 업데이트'"
            />
            <div class="moment-emotion-area">
              <div class="moment-emotion-title">
                <HeadlineText
                  :text="'순간의 감정'"
                />
              </div>
              <div class="moment-emotion-info">
                <EmotionContainer
                  v-for="(emotion, index) in filteredMomentEmotions"
                  :key="index"
                  :size="'s'"
                  :state="'compact'"
                  :dir="'horizontal'"
                  :emotion="emotion ? emotion.emotionRecordType : ''"
                  :level="emotion ? emotion.emotionRecordLevel : 0"
                  :chips-state="'badge'"
                  :reason-list="emotion ? JSON.parse(emotion.emotionReason) : []"
                  :time="emotion.createdTime"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <DrawerContainer
    v-if="isTablet && !isMobile ? true : isShowDetail && !isMobile"
    @toggle-drawer="toggleDetail"
    :style="{ height: isTablet ? `${viewportHeight - navHeight}px` : '', top: isTablet ? `${navHeight}px` : '' }"
    :variant="'emotion'"
    :width="'300px'"
    :icon="'close'"
    :position="isTablet ? 'fixed' : ''"
    :is-right="true"
    :toggle-visibilty="true"
    :is-drawer-hidden="isDrawerHidden"
  />
</template>

<style lang="scss" scoped>
.calendar-view-container {
  display: flex;
}

.calendar-view {
  width: 100%;
  background-color: $lightgray-background;
  padding: $padding-m-rem;
}

.calendar-area {
  display: flex;
  padding: $padding-m-rem;
  flex-direction: column;
  height: 100%;
  background-color: $white900;
  border: 1px solid $lightgray300;
  border-radius: $border-radius-xs-rem;
}

.calendar-header {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $padding-m-rem;
}

.pagination-buttons {
  display: flex;
  align-items: center;
}

.calendar-button-area {
  display: flex;
  position: relative;
  align-items: center;
  gap: 8px;
  z-index: 3;
}

.plus-button {
  position: relative;
  z-index: 3;
}

.drop-down {
  position: absolute;
  margin-top: 8px;
  right: 0;
  z-index: 5;
}

.date-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  color: $black900;
  font-size: $title-font-size-l;
  font-weight: 600;
}

.calendar-container {
  height: 100%;
}

.emotion-info-area {
  padding: 0px;
  border-radius: $border-radius-xs-rem;
  margin-top: 0px;
}

.main-emotion-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .button-area {
    margin-bottom: 25px;
  }
}

.moment-emotion-title {
  display: flex;
  margin: 24px 20px 16px 20px;
}
.moment-emotion-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-height: 740px) {
    height: 200px;
    overflow: auto;
  }
  @media (max-height: 667px) {
    height: 130px;
    overflow: auto;
  }
}

.date-header {
  font-size: $title-font-size-s;
  font-weight: 600;
  margin-bottom: 8px;
}

@media (max-width: 576px) {
  .calendar-view {
    width: 100%;
    padding: 0;
  }

  .calendar-area {
    display: flex;
    padding: 24px $mobile-margin-base-rem;
    flex-direction: column;
    height: 100%;
    background-color: $lightgray-background;
    border: none;
    border-radius: 0px;
  }

  .link-button-container {
    display: flex;
    justify-content: end;
    padding-top: $padding-m-rem;
  }

}
</style>
