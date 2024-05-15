<script setup>
  import { ref, defineProps, defineEmits, onMounted } from 'vue'

  /* props & emit 설정 */
  const props = defineProps({
    date: String,
    // mainEmotionData: String,
    // momentEmotionData: String
  })

  // const emit = defineEmits(['update:mainEmotionData', 'update:momentEmotionData'])

  // const handleMainEmotionChange = () => {
  //   emit('update:mainEmotionData', new URL('', import.meta.url).href)
  // }

  // const handleMomentEmotionChange = () => {
  //   emit('update:momentEmotionData', new URL('', import.meta.url).href)
  // }

  /* 임시 데이터 */
  const mainEmotionData = ref(new URL('../../../assets/images/emotion.png', import.meta.url).href)
  const momentEmotionData = ref(new URL('../../../assets/images/emotion-asset-moment-status.png', import.meta.url).href)

</script>

<template>
  <div class="calendar-cell-container">
    <div class="emotion-area">
      <div class="date-area">
        {{ date }}
      </div>
      <div
        class="emotion-asset-main-area"
        @click="handleMainEmotionChange"
      >
        <img
          class="emotion-asset"
          :src="mainEmotionData"
          alt="emotion-main"
        >
      </div>
      <div
        class="emotion-asset-moment-status-area"
        @click="handleMomentEmotionChange"
      >
        <img
          :src="momentEmotionData"
          alt="emotion-moment-status"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-cell-container {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  padding: $padding-xs;
  align-items: center;
  font-family: $title-font-size-l;
  color: $grayopacity50;
  background-color: $grayopacity50;

  .emotion-area {
    display: flex;
    box-sizing: 86;
    padding: $padding-xl;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: relative;

    .date-area {
      position: absolute;
      left: 8px;
      top: 8px;
    }

    .emotion-asset-main-area {
      display: flex;
      justify-content: center;
      align-items: flex-start;

      img {
        width: 86px;
      }
    }

    .emotion-asset-moment-status-area {
      display: flex;
      width: 16px;
      height: 16px;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 8px;
      bottom: 8px;
    }
  }
}
</style>
