<script setup>
  import { onMounted, ref, onUnmounted, nextTick, provide, watch } from 'vue'
  import EmotionCalendar from '@/components/calendar/EmotionCalendar.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import DrawerContainer from '@/components/drawer/DrawerContainer.vue'
  import DropDown from '@/components/dropdown/DropDown.vue'

  const section = ref(null)
  const container = ref(null)
  const sectionHeight = ref(0)
  const calendarWidth = ref(0)
  const calendarHeight = ref(0)
  const heightAdjustment = 48

  const currentYear = ref(0)
  const currentMonth = ref(0)
  const currentDate = ref(null)

  const isShowDetail = ref(false)

  const selectedDate = ref(null)
  provide('selectedDate', selectedDate)

  const isDropdown = ref(false)
  const dropdownMenu = [{name: '오늘의 감정 추가', link: '/record/emotion'}, {name: '순간의 감정 추가', link: '/record/emotion'}]

  const getSectionSize = () => {
    sectionHeight.value = `${window.innerHeight}px`
    calendarWidth.value = section.value.clientWidth
    calendarHeight.value = container.value.clientHeight - heightAdjustment
  }

  const toggleDetail = (date) => {
    if (date) {
      isShowDetail.value = true
      selectedDate.value = new Date(currentYear.value, currentMonth.value, date)
    } else {
      isShowDetail.value = false
    }
  }

  watch(isShowDetail, () => {
    nextTick(() => {
      getSectionSize()
    })
  })

  const onClick = () => {
    isDropdown.value = !isDropdown.value
  }

  const getPreviousMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }

  const getNextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }

  const getTodayMonth = () => {
    currentMonth.value = currentDate.value.getMonth()
    currentYear.value = currentDate.value.getFullYear()
  }

  onMounted(() => {
    currentDate.value = new Date()
    currentMonth.value = currentDate.value.getMonth()
    currentYear.value = currentDate.value.getFullYear()

    window.addEventListener('resize', getSectionSize)
    sectionHeight.value = `${window.innerHeight}px`

    if (container.value && section.value) {
      nextTick(() => {
        calendarWidth.value = section.value.clientWidth
        calendarHeight.value = container.value.clientHeight - heightAdjustment
      })
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', getSectionSize)
  })
</script>

<template>
  <main>
    <DrawerContainer
      :variant="'menu'"
      :width="'256px'"
    />
    <section
      ref="section"
      class="calendar-view"
      :style="{ height: sectionHeight }"
    >
      <div class="calendar-area">
        <header class="calendar-header">
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
          <div class="plus-button-area">
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
          <h1 class="date-title en-font">
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
    </section>
    <DrawerContainer
      v-if="isShowDetail"
      @toggle-drawer="toggleDetail"
      :variant="'emotion'"
      :width="'300px'"
      :icon="'close'"
      :is-right="true"
      :toggle-visibilty="true"
    />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
}

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

.drop-down{
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
  color: $gray700;
  font-size: $title-font-size-l;
  font-weight: 700;
}

.calendar-container {
  height: 100%;
}

// @media
</style>