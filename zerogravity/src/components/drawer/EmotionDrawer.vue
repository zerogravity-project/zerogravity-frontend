<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/stores/user'
  import { useEmotionStore } from '@/stores/emotion'
  import router from '@/router'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerHeader from '@/components/drawer/common/DrawerHeader.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import ContentText from '@/components/text/ContentText.vue'

  const userStore = useUserStore()
  const { recordStatus } = storeToRefs(userStore)
  const emotionStore = useEmotionStore()
  const { selectedDate, selectedDateText, selectedMainEmotion, selectedMomentEmotions, emotionRecord } = storeToRefs(emotionStore)

  const divNode = ref(null)
  const momentAreaMaxHeight = ref('')

  const isNoMoment = computed(() => {
    return selectedMomentEmotions.value.length
  })

  const isMainUpdate = computed(() => {
    return selectedMainEmotion.value === null
  })

  const isDiaryUpdate = computed(() => {
    return selectedMainEmotion.value === null || selectedMainEmotion.value.diaryEntry === null
  })

  const addMomentEmotion = () => {
    recordStatus.value.status = 'newEmotionRecord'
    recordStatus.value.emotionRecordState = 'moment'
    userStore.saveRecordStatusToSession()
    const date = emotionStore.formatDateToTimestamp(selectedDate.value)
    emotionRecord.value.createdTime = date
    emotionStore.saveEmotionRecordToSession()
    router.push('/record/emotion')
  }

  const updateMainEmotion = () => {
    recordStatus.value.status = 'updateMainRecord'
    recordStatus.value.emotionRecordState = 'main'
    userStore.saveRecordStatusToSession()

    emotionRecord.value = selectedMainEmotion.value
    emotionStore.saveEmotionRecordToSession()
    router.push('/record/emotion')
  }

  const addMainEmotion = () => {
    recordStatus.value.status = 'newEmotionRecord'
    recordStatus.value.emotionRecordState = 'main'
    userStore.saveRecordStatusToSession()
    const date = emotionStore.formatDateToTimestamp(selectedDate.value)
    emotionRecord.value.createdTime = date
    emotionStore.saveEmotionRecordToSession()
    router.push('/record/emotion')
  }

  const updateDiary = () => {
    recordStatus.value.status = 'updateDiaryRecord'
    recordStatus.value.emotionRecordState = 'main'
    userStore.saveRecordStatusToSession()

    emotionRecord.value = selectedMainEmotion.value
    emotionStore.saveEmotionRecordToSession()
    router.push('/record/diary')
  }

  onMounted(() => {
    const updateMaxHeight = () => {
      // 만약 다른 요소들도 세로 크기에 따라서 업데이트되면 추후 리팩토링 필요
      momentAreaMaxHeight.value = `calc(100vh - ${divNode.value.offsetHeight}px)`
    }

    updateMaxHeight()
  })
</script>

<template>
  <div
    class="emotion-drawer"
  >
    <div ref="divNode">
      <!-- Navigation -->
      <DrawerNavigation
        :title-text="selectedDateText"
        :sub-title-text="'Daily Emotion'"
        :button-icon="'Close'"
      />

      <!-- Main Emotion -->
      <DrawerHeader
        @add-main-emotion="addMainEmotion"
        @update-main-emotion="updateMainEmotion"
        :title-text="'Main Emotion'"
        :button-text="isMainUpdate ? '추가하기' : '수정하기' "
        :style="'gray'"
        :type="isMainUpdate?'main-add' : 'main-update'"
      />
      <div class="main-emotion-area">
        <EmotionContainer
          class=".emotion-container.detail.s"
          :size="'s'"
          :dir="'vertical'"
          :emotion="selectedMainEmotion ? selectedMainEmotion.emotionRecordType : ''"
          :level="selectedMainEmotion ? selectedMainEmotion.emotionRecordLevel : 0"
          :chips-state="'badge'"
          :reason-list="selectedMainEmotion ? JSON.parse(selectedMainEmotion.emotionReason) : []"
        />
      </div>

      <!-- Daily Note -->
      <DrawerHeader
        @update-diary="updateDiary"
        :title-text="'Daily Note'"
        :button-text="isDiaryUpdate ? '' : '수정하기' "
        :style="'gray'"
        :type="'diary'"
      />
      <ContentText
        class="text-container"
        :text="selectedMainEmotion ? selectedMainEmotion.diaryEntry : ''"
      />

      <!-- Moment Emotion -->
      <DrawerHeader
        @add-moment-emotion="addMomentEmotion"
        :title-text="'Moment Emotion'"
        :button-text="'추가하기'"
        :style="'gray'"
        :type="'moment'"
      />
    </div>

    <div
      class="moment-emotion-area"
      :style="{maxHeight: momentAreaMaxHeight}"
    >
      <EmotionContainer
        v-for="(emotion, index) in selectedMomentEmotions"
        :key="index"
        :size="'s'"
        :state="'compact'"
        :dir="'horizontal'"
        :emotion="emotion.emotionRecordType"
        :level="emotion.emotionRecordLevel"
        :chips-state="'badge'"
        :reason-list="JSON.parse(emotion ? emotion.emotionReason : '')"
        :time="emotion.createdTime"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.emotion-drawer {
  width: 100%;
  height: 100%;
  background: $white900;
}

.emotion-container.detail.s{
  padding-bottom: 0;
}
.main-emotion-area{
  padding: $padding-xxl-rem;
}

.text-container{
  padding-top: $padding-xl-rem;
  padding-bottom: $padding-xl-rem;
}

.moment-emotion-area {
  overflow-x: hidden;
  overflow-y: auto;
}

</style>