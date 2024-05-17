<script setup>
  import { onMounted, ref } from 'vue'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerHeader from '@/components/drawer/common/DrawerHeader.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import ContentText from '@/components/text/ContentText.vue'

  const emotionList = ref([
    'One', 'Two', 'Three', 'four',
  ])

  const divNode = ref(null)
  const momentAreaMaxHeight = ref('')

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
        @hide-drawer="hideDrawer"
        :title-text="'May 6, 2024'"
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
      <ContentText />

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
        :style="'compact'"
        :dir="'horizontal'"
        :emotion="emotion"
        :chips-style="'badge'"
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

.moment-emotion-area {
  overflow-x: hidden;
  overflow-y: auto;
}

</style>