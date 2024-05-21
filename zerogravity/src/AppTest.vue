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

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 18.75rem;
  height: 100%;
}

@media (max-width: 567px) {
  .menu {
    display: none;
  }
}
</style>
