<script setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import TitleText from '@/components/text/TitleText.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import RadioButtonGroup from '@/components/input/RadioButtonGroup.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import router from '@/router'

  const emotionList = ref([
    { name: '아주 불쾌함', checked: false, width: '45px' },
    { name: '불쾌함', checked: false, width: '35px' },
    { name: '약간 불쾌함', checked: false, width: '30px' },
    { name: '보통', checked: false, width: '25px' },
    { name: '약간 기분 좋음', checked: false, width: '30px' },
    { name: '기분 좋음', checked: false, width: '35px' },
    { name: '아주 기분 좋음', checked: false, width: '45px' },
  ])

  const selectedEmotion = ref('')
  const isMobile = ref('')
  const isEmotionNull = ref(true)
  const viewportHeight = ref('')

  const selectedEmotionName = computed(() => {
    const text = selectedEmotion.value
    const parts = text.split('-')
    return parts[2]
  })

  watch(selectedEmotion, () => {
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

  // 버튼 클릭 시
  const onClick = () => {
    router.push('/record/reason')
  }

  onMounted(() => {
    window.addEventListener('resize', checkIsMobile)
    viewportHeight.value = `${window.innerHeight}px`
    checkIsMobile()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
</script>

<template>
  <main
    class="emotion-record"
    :style="{height: viewportHeight}"
  >
    <div class="title-area">
      <TopNavigation
        v-if="isMobile"
        :variant="'backButton'"
      />
      <TitleText
        :title-text="'감정을 선택하세요'"
        :sub-title-text="'오늘의 순간의 감정을 선택하세요'"
        :padding-top="true"
      />
    </div>
    <div
      class="emotion-form"
      :style="{ marginBottom: isMobile ? '3vh' : '48px' }"
    >
      <EmotionContainer
        :state="'label'"
        :size="isMobile ? 's' : 'm'"
        :emotion="isEmotionNull ? '' : selectedEmotionName"
      />
      <div class="radio-group-area">
        <RadioButtonGroup
          v-model="selectedEmotion"
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
        :variant="'round'"
        :background-color="'#4E5968'"
        :icon="'arrow_forward'"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
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