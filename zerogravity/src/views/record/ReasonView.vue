<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import TitleText from '@/components/text/TitleText.vue'
  import ChipsContainer from '@/components/chip/ChipsContainer.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useEmotionStore } from '@/stores/emotion'
  import { storeToRefs } from 'pinia'

  const reasonLists = ref([
    ['건강', '피트니스', '자기 돌봄', '취미', '정체성', '종교'],
    ['커뮤니티', '가족', '친구', '파트너', '연애'],
    ['가사 활동', '직장', '교육', '여행', '날씨', '국내외 이슈', '돈'],
  ])

  const isMobile = ref('')
  const viewportHeight = ref('')

  // 모바일 사이즈 확인
  const getWindowSize = () => {
    viewportHeight.value = `${window.innerHeight}px`
    if (window.innerWidth > 576) {
      isMobile.value = false
    } else {
      isMobile.value = true
    }
  }

  const checkedList = ref([])

  const getCheckedList = (payload) => {
    payload.forEach(item => {
      const name = item.name
      if (!checkedList.value.includes(name)) { // Name이 checkedList에 존재하지 않으면 추가
        checkedList.value.push(name)
      }
    })

    console.log(checkedList.value)
  }

  const userStore = useUserStore()
  const emotionStore = useEmotionStore()
  const { recordStatus } = storeToRefs(userStore)
  const { emotionRecord } = storeToRefs(emotionStore)

  // 버튼 클릭 시
  const onClick = () => {
    if (checkedList.value) {
      recordStatus.value.status = 'reasonChecked'
      userStore.saveRecordStatusToSession()

      emotionRecord.value.emotionReason = checkedList.value
      emotionStore.saveEmotionRecordToSession()

      if(recordStatus.value.emotionRecordState === 'moment'){
        router.push('/profile/calendar')
      } else {
        router.push('/record/diary')
      }
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
  <main :style="{height: viewportHeight}">
    <div class="reason-form">
      <div class="title-area">
        <EmotionContainer
          class="emotion-container"
          :size="isMobile ? 's' : 'm'"
          :state="'mobile'"
          :dir="'vertical'"
          :chips-state="'badge'"
        />
        <TitleText
          :title-text="'감정의 원인을 선택하세요'"
          :sub-title-text="'오늘 하루의 감정의 원인은 무엇인가요?'"
          :default-padding="false"
        />
      </div>
      <div class="chips-area">
        <ChipsContainer
          class="chips-container"
          v-for="(list, index) in reasonLists"
          :key="index"
          :size="'m'"
          :align="'flex-start'"
          :label-list="list"
          @get-checked-list="getCheckedList"
        />
      </div>
    </div>
    <div class="button-container">
      <ActionButton
        @click="onClick"
        class="button"
        :variant="'round'"
        :state="'primary'"
        :icon="'arrow_forward'"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.button{
  transition: all 400ms cubic-bezier(.47, 1.64, .41, .8);

  &:hover{
    transform: rotate(360deg) scale(110%);
  }
}

.title-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
  gap: 16px;
}

.chips-area {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding-top: 80px;
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

  .chips-area {
    gap: 24px;
    padding: 0 $mobile-base-margin;
    padding-top: 60px;
  }

  .button-container {
    padding-bottom: 0px;
  }
}
</style>