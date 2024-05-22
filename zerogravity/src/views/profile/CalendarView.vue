<script setup>
  import { onMounted, ref, onUnmounted, nextTick, provide, watch, computed, watchEffect } from 'vue'
  import { useEmotionStore } from '@/stores/emotion.js'
  import EmotionCalendar from '@/components/calendar/EmotionCalendar.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import DrawerContainer from '@/components/drawer/DrawerContainer.vue'
  import DropDown from '@/components/dropdown/DropDown.vue'
  import HeadlineText from '@/components/text/HeadlineText.vue'
  import LinkButton from '@/components/button/LinkButton.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'

  /*
  ** 초기 화면 설정
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

  /*
  ** Drawer Toggle
  */
  const isShowDetail = ref(false)
  const isDrawerHidden = ref(true)

  // 선택한 날짜
  const selectedDate = ref(null)
  provide('selectedDate', selectedDate)

  const toggleDetail = (date) => {
    if (date) {
      isShowDetail.value = true
      isDrawerHidden.value = false
      selectedDate.value = new Date(currentYear.value, currentMonth.value, date)
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

  /*
  ** 날짜 계산 및 API
  */
  const { fetchEmotions } = useEmotionStore()
  const currentYear = ref(0)
  const currentMonth = ref(0)
  const currentWeek = ref(0)
  const currentDate = ref(null)

  const getPreviousMonth = () => {
    if (!isTablet.value) {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    } else {
      return
    }
  }

  const getNextMonth = () => {
    if (!isTablet.value) {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    } else {
      return
    }
  }

  const getTodayMonth = () => {
    if (!isTablet.value) {
      currentMonth.value = currentDate.value.getMonth()
      currentYear.value = currentDate.value.getFullYear()
    } else {
      return
    }
  }

  // const getWeekOfMonth = () => {
  //   const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  //   const firstDayOfWeek = firstDayOfMonth.getDay()

  //   const daysInFirstWeek = 7 - firstDayOfWeek

  //   const dayOfMonth = currentDate.value.getDate()

  //   const weekNumber = dayOfMonth > daysInFirstWeek
  //     ? 1 + Math.ceil((dayOfMonth - daysInFirstWeek) / 7)
  //     : 1

  //   currentWeek.value = weekNumber
  // }

  watchEffect(async () => {
    fetchEmotions(userId.value, currentYear, currentMonth)
  })

  /*
  ** 드롭다운
  */
  const isDropdown = ref(false)
  const dropdownMenu = [{ name: '오늘의 감정 추가', link: '/record/emotion' }, { name: '순간의 감정 추가', link: '/record/emotion' }]

  const onClick = () => {
    isDropdown.value = !isDropdown.value
  }

  onMounted(() => {
    currentDate.value = new Date()
    currentMonth.value = currentDate.value.getMonth()
    currentYear.value = currentDate.value.getFullYear()

    // getWeekOfMonth()

    window.addEventListener('resize', getSectionSize)

    if (container.value && section.value) {
      nextTick(() => {
        getSectionSize()
      })
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
          :text="currentWeek"
          :size="'l'"
        />

        <div class="calendar-button-area">
          <div class="pagination-buttons">
            <ActionButton
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
          {{ currentYear }}년 {{ currentMonth + 1 }}월
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
          :month="currentMonth"
          :year="currentYear"
        />
        <div
          v-if="isMobile"
          class="emotion-info-area"
        >
          <div class="link-button-container">
            <LinkButton
              :text="'더보기'"
              :default-color="'#FF2E00'"
              :link-path="'/'"
            />
          </div>
          <div class="main-emotion-area">
            <EmotionContainer
              :size="'s'"
              :style="'compact'"
              :dir="'vertical'"
              :emotion="'Emotion'"
              :chips-style="'badge'"
            />
          </div>
          <div
            class="moment-emotion-area"
            :style="{ maxHeight: momentAreaMaxHeight }"
          >
            <EmotionContainer
              v-for="(emotion, index) in emotionList"
              :key="index"
              :size="'s'"
              :state="'compact'"
              :dir="'horizontal'"
              :emotion="emotion"
              :chips-state="'badge'"
              :reason-list="['hello', 'yes', 'no', 'ok']"
            />
          </div>
        </div>
      </div>
      <!-- <DrawerContainer
        @toggle-drawer="toggleDetail"
        :variant="'emotion'"
        :width="'300px'"
        :position="'fixed'"
        :icon="'close'"
        :is-right="true"
        :toggle-visibilty="true"
        :is-drawer-visible="!isShowDetail"
      /> -->
    </div>
  </section>
  <DrawerContainer
    v-if="isTablet ? true : isShowDetail"
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

@media (max-width: 576px) {
  .calendar-view {
    width: 100%;
    background-color: transparent;
    padding: 0;
  }

  .calendar-area {
    display: flex;
    padding: 24px $mobile-margin-base-rem;
    flex-direction: column;
    height: 100%;
    background-color: $white900;
    border: none;
    border-radius: 0px;
  }

  .link-button-container {
    display: flex;
    justify-content: end;
    padding-top: $padding-m-rem;
  }
}

// @media
</style>