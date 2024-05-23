<script setup>
  import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import TitleText from '@/components/text/TitleText.vue'
  import TextArea from '@/components/input/TextArea.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useEmotionStore } from '@/stores/emotion'
  import { storeToRefs } from 'pinia'
  import { v4 as uuidv4 } from 'uuid'

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
  const { recordStatus, userId } = storeToRefs(userStore)
  const { emotionRecord } = storeToRefs(emotionStore)

  watchEffect(() => {
    emotionStore.getEmotionRecordToSession()
  })

  // 버튼 클릭 시
  const onClick = () => {
    if (diaryText.value) {
      recordStatus.value.status = 'diaryWritten'
      userStore.saveRecordStatusToSession()

      emotionStore.getEmotionRecordToSession()
      emotionRecord.value.diaryEntry = diaryText.value
      emotionStore.saveEmotionRecordToSession()
      console.log(emotionRecord.value)

      // 유저가 있는지 체크 해야하는데 일단 없으니 패스
      if (emotionRecord.value.emotionRecordType && emotionRecord.value.emotionRecordLevel
        && emotionRecord.value.emotionReason) {
        // 만약 이미 추가된 id가 있다면 업데이트
        if (emotionRecord.value.emotionRecordId) {
          emotionStore.updateEmotionRecord(emotionRecord.value.emotionRecordId, emotionRecord.value)
        } else {
          // 1. userID 넣기
          emotionRecord.value.userId = userId
          // 2. uuid 활용해서 record 넣어주기
          const emotionRecordId = uuidv4()
          emotionRecord.value.emotionRecordId = emotionRecordId

          // 시간 설정 안했으면 (오늘 날짜 추가)
          if(!emotionRecord.value.createdTime){
            emotionRecord.value.createdTime = emotionStore.formatDateToTimestamp(new Date())
          }

          // 3. state 넣어주기
          if (recordStatus.value.emotionRecordState) {
            emotionRecord.value.emotionRecordState = recordStatus.value.emotionRecordState
          }
          // 4. post(모던트는 무조건 포스트)
          emotionStore.createEmotionRecord(emotionRecord.value)
        }
      }

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
          :emotion="emotionRecord.emotionRecordType"
          :level="emotionRecord.emotionRecordLevel"
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
.button {
  background-color: $orange900;
  border: none;
  transition: all 400ms cubic-bezier(.47, 1.64, .41, .8);

  &:hover {
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