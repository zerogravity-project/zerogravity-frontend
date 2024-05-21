<script setup>

  import { RouterView, useRoute } from 'vue-router'
  import DrawerContainer from './components/drawer/DrawerContainer.vue'
  import { computed } from 'vue'

  const route = useRoute()

  const isDrawerVisible = computed(() => {
    const hideRoutes = ['/', '/spaceout']
    return !hideRoutes.includes(route.path)
  })
</script>

<template>
  <DrawerContainer
    v-if="isDrawerVisible"
    class="menu"
    variant="menu"
    :width="'18.75rem'"
    :is-right="false"
  />
  <RouterView />
</template>

<style lang="scss" scoped></style>

