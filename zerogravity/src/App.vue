<script setup>
  import { ref } from 'vue'
  // import EmotionDrawer from '@/components/ui/drawers/EmotionDrawer.vue'
  import CustomizeDrawer from './components/ui/drawers/CustomizeDrawer.vue'
  const drawerStyle = ref({
    width: '318px',
  })
</script>

<template>
  <!-- <EmotionDrawer :drawer-style="drawerStyle" /> -->
  <CustomizeDrawer :drawer-style="drawerStyle" />
</template>

<style lang="scss" scoped>

</style>