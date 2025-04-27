<script setup>
  import { ref } from 'vue'
  import DisplayClock from '@/components/clock/DisplayClock.vue'
  import MainDisplayScene from '@/components/scene/MainDisplayScene.vue'
  import FooterBar from '@/components/others/FooterBar.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import router from '@/router'

  const isLoaded = ref(false)

  const updateIsLoaded = () => {
    isLoaded.value = !isLoaded.value
  }

  const startSpaceout = () => {
    router.push('/spaceout/start')
  }
</script>

<template>
  <section>
    <DisplayClock class="display-clock" />
    <MainDisplayScene
      @update-is-loaded="updateIsLoaded"
      class="main-display-scene"
    />
    <ActionButton
      @click="startSpaceout"
      class="start-button"
      :style="{opacity: isLoaded? '': '0%'}"
      :text="'시작하기'"
      :variant="'round'"
      :state="'primary'"
      :icon="'arrow_forward'"
    />
    <FooterBar class="footer-bar" />
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;

  .display-clock {
    margin-top: 7vh;
  }

  .main-display-scene {
    z-index: 0;
  }

  .start-button {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 150px;
    font-size: 20px;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.5s;
    bottom: 130px;

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
}

@media(max-width: 720px) {
  section {
    .display-clock {
      margin-top: 7vh;
    }
  }
}

@media (max-width: 576px) {
  section {
    .display-clock {
      margin-top: 7vh;
    }
  }
}
</style>
