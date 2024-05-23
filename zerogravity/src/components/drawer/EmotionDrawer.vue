<script setup>
  import { onMounted, ref, inject, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useEmotionStore } from '@/stores/emotion'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerHeader from '@/components/drawer/common/DrawerHeader.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import ContentText from '@/components/text/ContentText.vue'

  const emotionStore = useEmotionStore()
  const { emotionRecords } = storeToRefs(emotionStore)

  const divNode = ref(null)
  const momentAreaMaxHeight = ref('')

  // 선택된 날짜
  const selectedDate = inject('selectedDate')

  const date = computed(() => selectedDate.value ? selectedDate.value.getDate() : null)
  const month = computed(() => selectedDate.value ? selectedDate.value.getMonth() : null)
  const year = computed(() => selectedDate.value ? selectedDate.value.getFullYear() : null)
  const formattedDate = computed(() => selectedDate.value? selectedDate.value.toISOString().split('T')[0] : null)
  const selectedDateText = computed(() => `${year.value}년 ${month.value + 1}월 ${date.value}일`)

  const todayEmotions = computed(()=>{
    return emotionRecords.value[formattedDate.value] || []
  })

  const mainEmotion = computed(() => {
    return todayEmotions.value.find(emotion => emotion.emotionRecordState === 'main')
  })

  const momentEmotion = computed(() => {
    return todayEmotions.value.filter(emotion => emotion.emotionRecordState === 'moment')
  })

  console.log(mainEmotion.value)

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
        :title-text="'Main Emotion'"
        :button-text="'수정하기'"
        :style="'gray'"
      />
      <div class="main-emotion-area">
        <EmotionContainer
          :size="'s'"
          :style="'compact'"
          :dir="'vertical'"
          :emotion="mainEmotion ? mainEmotion.emotionRecordType : ''"
          :level="mainEmotion ? mainEmotion.emotionRecordLevel : ''"
          :chips-style="'badge'"
          :reason-list="mainEmotion ? JSON.parse(mainEmotion.emotionReason) : []"
        />
      </div>

      <!-- Daily Note -->
      <DrawerHeader
        :title-text="'Daily Note'"
        :button-text="'수정하기'"
        :style="'gray'"
      />
      <ContentText
        class="text-container"
        :text="mainEmotion ? mainEmotion.diaryEntry : ''"
      />

      <!-- Moment Emotion -->
      <DrawerHeader
        :title-text="'Moment Emotion'"
        :style="'gray'"
      />
    </div>

    <div
      class="moment-emotion-area"
      :style="{maxHeight: momentAreaMaxHeight}"
    >
      <EmotionContainer
        v-for="(emotion, index) in momentEmotion"
        :key="index"
        :size="'s'"
        :state="'compact'"
        :dir="'horizontal'"
        :emotion="emotion.emotionRecordType"
        :level="emotion.emotionRecordLevel"
        :chips-state="'badge'"
        :reason-list="JSON.parse(emotion.emotionReason)"
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