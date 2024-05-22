<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import TitleText from '@/components/text/TitleText.vue'
  import TextArea from '@/components/input/TextArea.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useEmotionStore } from '@/stores/emotion'
  import { storeToRefs } from 'pinia'

  const isMobile = ref('')
  const viewportHeight = ref('')
  const diaryText = ref('')

  const reason = ref(['건강', '피트니스', '자기 돌봄', '취미', '정체성', '종교'])

  // 모바일 사이즈 확인
  const getWindowSize = () => {
    viewportHeight.value = `${window.innerHeight}px`
    if (window.innerWidth > 576) {
      isMobile.value = false
    } else {
      isMobile.value = true
    }
  }

  const getDiaryText = (payload) => {
    diaryText.value = payload
  }

  const userStore = useUserStore()
  const emotionStore = useEmotionStore()
  const { recordStatus } = storeToRefs(userStore)
  const { emotionRecord } = storeToRefs(emotionStore)

  // 버튼 클릭 시
  const onClick = () => {
    if (diaryText.value) {
      recordStatus.value.status = 'diaryWritten'
      userStore.saveRecordStatusToSession()

      emotionRecord.value.diaryEntry = diaryText.value
      emotionStore.saveEmotionRecordToSession()

      router.push('/profile/calendar')
    }
  }

  onMounted(() => {
    window.addEventListener('resize', getWindowSize)
    viewportHeight.value = `${window.innerHeight}px`
    getWindowSize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', getWindowSize)
  })
</script>

<template>
  <main :style="{ height: viewportHeight }">
    <div class="reason-form">
      <div class="title-area">
        <EmotionContainer
          class="emotion-container"
          :size="isMobile ? 's' : 'm'"
          :state="'mobile'"
          :dir="'vertical'"
          :chips-state="'badge'"
          :reason-list="reason"
        />
        <TitleText
          :title-text="'오늘의 일기를 작성하세요'"
          :sub-title-text="'오늘 하루의 어떤 일이 있었나요?'"
        />
      </div>
      <div class="text-area">
        <TextArea
          :placeholder="'내용을 입력하세요'"
          @update:model-value="getDiaryText"
        />
      </div>
    </div>
    <div class="button-container">
      <ActionButton
        @click="onClick"
        class="button"
        :variant="'round'"
        :background-color="'#4E5968'"
        :icon="'arrow_forward'"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.button{
  background-color: $orange900;
  border: none;
  transition: all 400ms cubic-bezier(.47, 1.64, .41, .8);

  &:hover{
    transform: rotate(360deg) scale(110%);
  }
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.title-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
  gap: 16px;
}

.text-area {
  padding-top: 5vh;
  max-width: 500px;
  height: 40vh;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  background-color: #f1f1f1;
  width: 100%;
}

@media (max-width: 576px) {
  .title-area {
    padding-top: 60px;
  }

  .text-area {
    width: 100vw;
    padding: 0 $mobile-base-margin;
    height: 40vh;
  }

  .button-container {
    padding-bottom: 0px;
  }

}
</style>