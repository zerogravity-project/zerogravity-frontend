<script setup>
  import { onMounted, ref } from 'vue'
  import TitleText from '@/components/text/TitleText.vue'
  import DisplayClock from '@/components/clock/DisplayClock.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import MainDisplayScene from '@/components/scene/MainDisplayScene.vue'

  const isTimerSet = ref(false)
  const isAvailableToLoad = ref(false)

  const completeMeditation = () => {

  }

  const checkTimer = () => {
    isTimerSet.value = true
  }

  const checkAvailability = () => {
    isAvailableToLoad.value = true
  }

  onMounted(() => {
    isTimerSet.value = false
  })
</script>

<template>
  <section class="main-container">
    <header>
      <TitleText
        v-if="!isTimerSet"
        class="title"
        :title-text="'시간을 입력하세요.'"
        :sub-title-text="'아무것도 하지 않기 위한 시간을 입력해보세요.'"
        :size="'m'"
        :default-padding="true"
      />
    </header>
    <main>
      <div class="clock-area">
        <DisplayClock
          @check-timer="checkTimer"
          @check-availability="checkAvailability"
          @complete-meditation="completeMeditation"
          :is-clock="false"
        />
      </div>
    </main>
    <div class="button-area">
      <ActionButton
        v-if="!isTimerSet"
        class="button"
        :variant="'round'"
        :state="'primary'"
        :icon="'arrow_forward'"
      />
    </div>
    <MainDisplayScene
      v-if="isAvailableToLoad"
      class="main-display-scene"
    />
  </section>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.button{
  transition: all 400ms cubic-bezier(.47, 1.64, .41, .8);

  &:hover{
    transform: rotate(360deg) scale(110%);
  }
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.clock-area {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-area {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 60px;
}
</style>
