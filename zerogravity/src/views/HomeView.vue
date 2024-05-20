<script setup>
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import DisplayClock from '@/components/clock/DisplayClock.vue'
  import MainDisplayScene from '@/components/scene/MainDisplayScene.vue'
  import FooterBar from '@/components/others/FooterBar.vue'
</script>

<template>
  <main>
    <TopNavigation class="top-navigation" />
    <DisplayClock class="display-clock" />
    <MainDisplayScene class="main-display-scene" />
    <FooterBar class="footer-bar" />
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  background-color: #e1e1e0a1;

  .top-navigation {
    position: relative;
    z-index: 5;
  }

  .display-clock {
    margin-top: 7vh;
  }

  .main-display-scene {
    z-index: 0;
  }
}

@media(max-width: 720px) {
  main {
    .display-clock {
      margin-top: 7vh;
    }
  }
}

@media (max-width: 576px) {
  main {
    .display-clock {
      margin-top: 7vh;
    }
  }
}
</style>
