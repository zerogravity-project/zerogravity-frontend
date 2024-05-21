<script setup>
  import { onMounted, ref, inject, computed } from 'vue'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerHeader from '@/components/drawer/common/DrawerHeader.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import ContentText from '@/components/text/ContentText.vue'

  const emotionList = ref([
    'One', 'Two', 'Three', 'four',
  ])

  const divNode = ref(null)
  const momentAreaMaxHeight = ref('')
  const text = ref(`무엇인가를 써보았다....
오늘 나는 와이어프레임을 그리고 앞으로 있을 우리의 프로젝트에 대해서 계획을 잡았다. 
그리고 나서 이제 곧 다시 서울을 올라가고 앞으로도 행복하게 살 것이다.
내일도 화이팅이다.`)

  // 선택된 날짜
  const selectedDate = inject('selectedDate')

  const date = computed(() => selectedDate.value ? selectedDate.value.getDate() : null)
  const month = computed(() => selectedDate.value ? selectedDate.value.getMonth() : null)
  const year = computed(() => selectedDate.value ? selectedDate.value.getFullYear() : null)
  const selectedDateText = computed(() => `${year.value}년 ${month.value + 1}월 ${date.value}일`)

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
          :emotion="'Emotion'"
          :chips-style="'badge'"
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
        :text="text"
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
        v-for="(emotion, index) in emotionList"
        :key="index"
        :size="'s'"
        :state="'compact'"
        :dir="'horizontal'"
        :emotion="emotion"
        :chips-state="'badge'"
        :reason-list="['hello', 'yes', 'no', 'ok']"
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