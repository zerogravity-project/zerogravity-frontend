<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import TitleText from '@/components/text/TitleText.vue'
  import EmotionContainer from '@/components/emotion/EmotionContainer.vue'
  import ActionButton from '@/components/button/ActionButton.vue'

  const countRecord = ref(1)
  const showTitle = ref(true)
  const showNewTitle = ref(false)
  const isMobile = ref(false)
  const viewportHeight = ref('')

  const reasonLists = ref(
    ['건강', '피트니스', '자기 돌봄', '취미', '정체성', '종교', '커뮤니티', '가족', '친구', '파트너', '연애', '가사 활동', '직장', '교육', '여행', '날씨', '국내외 이슈', '돈'],
  )

  const emotion = ref('감정이름')
  const momentAreaMaxHeight = ref('500px')

  const checkIsMobile = () => {
    if (window.innerWidth > 576) {
      isMobile.value = false
    } else {
      isMobile.value = true
    }
  }

  onMounted(() => {
    setTimeout(() => {
      showTitle.value = false
      setTimeout(() => {
        showNewTitle.value = true
      }, 1000)
    }, 800)
  })

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
  <section>
    <transition name="quick-fade">
      <div
        v-if="showTitle"
        class="slide-fade-title"
      >
        잘하셨어요.
      </div>
    </transition>
    <div
      v-if="countRecord === 0 && !showTitle"
      class="after-area"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-show="showNewTitle"
          key="title"
        >
          <TitleText
            v-if="!isMobile"
            class="main-title"
            :size="'l'"
            :default-padding="true"
            :title-text="'잘하셨어요.'"
            :sub-title-text="'오늘 오전 11시에 00한 감정을 기록하셨네요.'"
          />
          <TitleText
            v-if="isMobile"
            class="main-title"
            :size="'s'"
            :title-text="'잘하셨어요.'"
            :sub-title-text="'오늘 오전 11시에 00한 감정을 기록하셨네요.'"
          />
        </div>
      </transition>
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-show="showNewTitle"
          key="emotion"
        >
          <div class="emotion-area">
            <EmotionContainer
              v-if="!isMobile"
              :size="'m'"
              :reason-list="reasonLists"
            />
            <EmotionContainer
              v-if="isMobile"
              :size="'s'"
              :reason-list="reasonLists"
            />
          </div>
        </div>
      </transition>
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-show="showNewTitle"
          key="button"
        >
          <div class="button-area">
            <ActionButton
              :variant="'round'"
              :state="'primary'"
              :icon="'arrow_forward'"
              :text="'Enabled'"
            />
            <ActionButton
              :variant="'round'"
              :state="'secondary'"
              :icon="'close'"
            />
          </div>
        </div>
      </transition>
    </div>
    <div
      v-else-if="countRecord > 0 && !showTitle"
      class="after-area"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-show="showNewTitle"
          key="newContent"
        >
          <div class="many-emotion-area">
            <TitleText
              v-if="!isMobile"
              :default-padding="true"
              :size="'l'"
              :title-text="'잘하셨어요.'"
              :sub-title-text="'오늘 많은 감정을 기록하셨네요.'"
            />
            <TitleText
              v-if="isMobile"
              :size="'s'"
              :title-text="'잘하셨어요.'"
              :sub-title-text="'오늘 많은 감정을 기록하셨네요.'"
            />
            <div
              class="moment-emotion-area"
              :style="{ maxHeight: momentAreaMaxHeight }"
            >
              <EmotionContainer
                v-for="(item, index) in 5"
                :key="index"
                :reason-list="reasonLists"
                :size="'s'"
                :state="'compact'"
                :dir="'horizontal'"
                :emotion="emotion"
                :chips-state="'badge'"
              />
            </div>
          </div>
          <div class="button-area">
            <ActionButton
              :variant="'round'"
              :state="'secondary'"
              :icon="'close'"
            />
            <ActionButton
              :variant="'round'"
              :state="'primary'"
              :icon="'arrow_forward'"
              :text="'달력 기록보기'"
            />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;

  .main-title {
    padding: 0px;
  }

  .slide-fade-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $title-font-size-xxl;
    height: 100%;

    @media (max-width: 567px) {
      font-size: $title-font-size-l;
    }
  }

  .after-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
  }

  .emotion-area {
    display: flex;
    margin-top: 50px;
    width: 629px;

    @media (max-width: 567px) {
      width: 300px;
    }
  }

  .button-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .new-content {
    font-size: 20px;
    color: #333;
  }

  .moment-emotion-area {
    display: flex;
    flex-direction: column;
    width: 390px;
    height: 480px;
    border: 1px solid $white900;
    border-radius: 12px;
    background-color: $whiteopacity50;
    padding: 24px;
    margin: 20px;
    overflow: auto;

    @media (max-width: 567px) {
      width: 300px;
      height: 400px;
    }
  }
}

.quick-fade-enter-active,
.quick-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.quick-fade-enter-from,
.quick-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
