<script setup>
  import { ref } from 'vue'
  // import CustomizeDrawer from './components/ui/drawers/CustomizeDrawer.vue'
  // import EmotionDrawer from './components/ui/drawers/EmotionDrawer.vue'
  import MenuDrawer from './components/ui/drawers/MenuDrawer.vue'
  // import EmotionAsset from './components/base/emotion/EmotionAsset.vue'
  const drawerStyle = ref({
    width: '318px',
  })
</script>

<template>
  <!-- <EmotionDrawer :drawer-style="drawerStyle" /> -->
  <MenuDrawer :drawer-style="drawerStyle" />
</template>

<style lang="scss" scoped>

</style>