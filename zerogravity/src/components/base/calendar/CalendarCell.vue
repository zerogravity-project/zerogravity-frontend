<script setup>
  import { ref, defineProps, defineEmits, computed } from 'vue'

  const props = defineProps({
    date: String,
    isToday: Boolean,
    isSunday: Boolean,
    imgWidth: Number,
    imgHeight: Number,
    size: {
      type: String,
    },
  })

  const emit = defineEmits(['update:main-emotion-data', 'update:moment-emotion-data'])

  // const handleMainEmotionChange = () => {
  //   emit('update:main-emotion-data', new URL('../../../assets/images/logo/emotion.png', import.meta.url).href)
  // }

  // const handleMomentEmotionChange = () => {
  //   emit('update:moment-emotion-data', new URL('../../../assets/images/logo/emotion-asset-moment-status.png', import.meta.url).href)
  // }

  const mainEmotionData = ref(new URL('../../../assets/images/logo/emotion-asset-main-area.png', import.meta.url).href)

  const imageStyle = computed(() => {
    return {
      width: `${props.imgWidth}px`,
      height: `${props.imgHeight}px`,
    }
  })
</script>

<template>
  <div
    class="calendar-cell-container"
    :class="{ 'today': isToday }"
    :style="{ width: 150, height: 150 }"
  >
    <div
      class="emotion-area"
      :style="{ width: 134, height: 134 }"
    >
      <div
        class="date-area"
        :class="{ 'today': isToday, 'sunday': isSunday }"
      >
        {{ date }}
      </div>
      <div
        v-if="date"
        class="emotion-asset-main-area"
        :style="{ width: 86, height: 86 }"
        @click="handleMainEmotionChange"
      >
        <img
          class="emotion-asset"
          :src="mainEmotionData"
          :style="imageStyle"
          alt="emotion-main"
        >
      </div>
      <div
        v-if="date"
        class="emotion-asset-moment-status-area"
        @click="handleMomentEmotionChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-cell-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 150px;
  padding: $padding-xs;
  justify-content: center;
  align-items: center;
  font-family: $title-font-size-l;
  background-color: $white900;
  border: $lightgray100 solid 1px;
  min-width: 0;

  &.today {
    background-color: $orangeopacity10;
  }

  .emotion-area {
    display: flex;
    flex: 1 1 134px;
    padding: $padding-xl;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: relative;
    min-width: 0;

    .date-area {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      color: $grayopacity50;

      &.sunday {
        color: $orange900;
      }
    }

    .emotion-asset-main-area {
      display: flex;
      flex: 1 1 86px;
      justify-content: center;
      align-items: center;
      width: 86px;
      height: 86px;
      min-width: 0;
    }

    .emotion-asset-moment-status-area {
      display: flex;
      flex: 1 1 15px;
      width: 15px;
      height: 15px;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      background-color: $grayopacity50;
      position: absolute;
      right: 0;
      bottom: 0;
      min-width: 0;
    }
  }
}
</style>
