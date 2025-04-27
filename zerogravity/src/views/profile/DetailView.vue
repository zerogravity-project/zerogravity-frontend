<script setup>
  import { useEmotionStore } from '@/stores/emotion.js'
  import { storeToRefs } from 'pinia'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import TextArea from '@/components/input/TextArea.vue'
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import ContentText from '@/components/text/ContentText.vue'
  import HeadlineText from '@/components/text/HeadlineText.vue'
  import { ref, computed } from 'vue'

  const emotionStore = useEmotionStore()
  const { filteredMainEmotions } = storeToRefs(emotionStore)

  const diaryEntry = computed(() => {
    return filteredMainEmotions.value.length > 0 ? filteredMainEmotions.value[0].diaryEntry : ''
  })

  const readonly = ref(true)

  const buttons = [
    {
      variant: 'sub',
      state: 'primary',
      text: '수정하기',
      linkPath: 'record/diary',
    },
  ]
</script>

<template>
  <div class="detail-area">
    <TopNavigation :variant="'backButton'" />
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
    </div>
    <div class="diary-entry-area">
      <div class="headline">
        <HeadlineText
          :text="'Daily Note'"
          :buttons="buttons"
        />
      </div>
      <ContentText
        class="text-container"
        :text="diaryEntry"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $lightgray100;
}
.main-emotion-area {
  display: flex;
  justify-content: center;
  padding: 24px 0px 36px 0px;
}
.headline {
  display: flex;
  padding: 24px 20px 16px 20px;
}
.diary-entry-area {
  padding: 24px;
  background-color: $white900;
  height: 100%;
}
</style>
