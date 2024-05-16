<script setup>
  import { ref } from 'vue'
  import EmotionDrawer from '@/components/ui/drawers/EmotionDrawer.vue'

  const drawerStyle = ref({
    width: '300px',
  })
</script>

<template>
  <EmotionDrawer :drawer-style="drawerStyle" />
</template>

<style lang="scss" scoped>

</style>