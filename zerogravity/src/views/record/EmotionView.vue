<script setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useEmotionStore } from '@/stores/emotion'
  import { storeToRefs } from 'pinia'
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import TitleText from '@/components/text/TitleText.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import RadioButtonGroup from '@/components/input/RadioButtonGroup.vue'
  import ActionButton from '@/components/button/ActionButton.vue'

  const emotionList = ref([
    { name: '아주 불쾌함', checked: false, width: '45px', color: '#ff3b30' },
    { name: '불쾌함', checked: false, width: '35px', color: '#ff9500' },
    { name: '약간 불쾌함', checked: false, width: '30px', color: '#ffcc00' },
    { name: '보통', checked: false, width: '25px', color: '#34C759' },
    { name: '약간 기분 좋음', checked: false, width: '30px', color: '#00C7BE' },
    { name: '기분 좋음', checked: false, width: '35px', color: '#007AFF' },
    { name: '아주 기분 좋음', checked: false, width: '45px', color: '#5856D6' },
  ])

  const viewportHeight = ref('')
  const isMobile = ref('')

  const isEmotionNull = ref(true)
  const checkedEmotion = ref('')

  const checkedEmotionName = computed(() => {
    const text = checkedEmotion.value
    const parts = text.split('-')
    return parts[2]
  })

  const checkedEmotionLevel = computed(() => {
    const text = checkedEmotion.value
    const parts = text.split('-')
    return parseInt(parts[0], 10) + 1
  })

  watch(checkedEmotion, () => {
    isEmotionNull.value = false
  })

  // 모바일 사이즈 확인
  const checkIsMobile = () => {
    if (window.innerWidth > 576) {
      isMobile.value = false
    } else {
      isMobile.value = true
    }
  }

  const userStore = useUserStore()
  const emotionStore = useEmotionStore()
  const { recordStatus } = storeToRefs(userStore)
  const { emotionRecord } = storeToRefs(emotionStore)

  // 버튼 클릭 시
  const onClick = () => {
    if (checkedEmotion.value) {
      // 감정 선택 저장
      recordStatus.value.status = 'emotionChecked'
      userStore.saveRecordStatusToSession()

      const selected = checkedEmotion.value.split('-')

      emotionRecord.value.emotionRecordLevel = parseInt(selected[0], 10) + 1
      emotionRecord.value.emotionRecordType = selected[2]
      emotionStore.saveEmotionRecordToSession()

      router.push('/record/reason')
    }
  }

  onMounted(() => {
    window.addEventListener('resize', checkIsMobile)
    viewportHeight.value = `${window.innerHeight}px`
    checkIsMobile()

    // if(recordStatus emotionRecord.value.emotionRecordLevel && emotionRecord.value.emotionRecordType){
    //   isEmotionNull.value = false
    //   checkedEmotion.value = `${emotionRecord.value.emotionRecordLevel - 1}-range-${emotionRecord.value.emotionRecordType}`
    // }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
</script>

<template>
  <main
    class="emotion-record"
    :style="{ height: viewportHeight }"
  >
    <div class="title-area">
      <TopNavigation
        v-if="isMobile"
        :variant="'backButton'"
      />
      <TitleText
        :title-text="'감정을 선택하세요'"
        :sub-title-text="'오늘의 순간의 감정을 선택하세요'"
        :default-padding="true"
      />
    </div>
    <div
      class="emotion-form"
      :style="{ marginBottom: isMobile ? '3vh' : '48px' }"
    >
      <EmotionContainer
        :state="'label'"
        :size="isMobile ? 's' : 'm'"
        :emotion="isEmotionNull ? '' : checkedEmotionName"
        :level="isEmotionNull ? 0 : checkedEmotionLevel"
      />
      <div class="radio-group-area">
        <RadioButtonGroup
          v-model="checkedEmotion"
          class="radios"
          :variant="'range'"
          :list="emotionList"
          :name="'Emotion'"
        />
        <div class="text-label">
          <span>{{ emotionList[0].name }}</span>
          <span>{{ emotionList[6].name }}</span>
        </div>
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
.button {
  background-color: $orange900;
  border: none;
  transition: all 400ms cubic-bezier(.47, 1.64, .41, .8);

  &:hover {
    transform: rotate(360deg) scale(110%);
  }
}

.emotion-record {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.emotion-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;
}

.radio-group-area {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 395px;
  gap: 16px;
}

.radios {
  width: 100%;
  justify-content: space-between;
}

.text-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $grayopacity50;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  background-color: #f1f1f1;
}

@media (max-width: 435px) {
  .emotion-form {
    gap: 24px;
  }

  .radio-group-area {
    width: 100%;
    padding: 0 $mobile-base-margin;
  }

  .button-container {
    padding-bottom: 0px;
  }
}
</style>