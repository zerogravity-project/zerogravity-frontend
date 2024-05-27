<script setup>
  import { computed, onMounted, ref, onUnmounted } from 'vue'
  import { RouterView, useRoute } from 'vue-router'
  import TopNavigation from './components/navigation/TopNavigation.vue'
  import DrawerContainer from './components/drawer/DrawerContainer.vue'

  const route = useRoute()

  const viewportWidth = ref(window.innerWidth)
  const viewportHeight = ref(window.innerHeight)
  const isDrawerHidden = ref(true)
  const isTabletOrMobile = computed(() => viewportWidth.value <= 834)

  const isNavigationVisible = computed(() => {
    const currentPath = route.path
    const alwaysVisibleRoutes = /^\/$|^\/about$/
    const tabletMobileVisibleRoutes = /^\/profile\/(setting|calendar|chart)$/

    return alwaysVisibleRoutes.test(currentPath) ||
      (isTabletOrMobile.value && tabletMobileVisibleRoutes.test(currentPath))
  })

  const drawerProps = computed(() => {
    if (!isNavigationVisible.value && ['/profile/calendar', '/profile/chart', '/profile/setting'].includes(route.path)) {
      return {
        width: '256px',
        position: '',
        icon: '',
        toggleVisibilty: false,
        isDrawerHidden: false,
      }
    } else if (isNavigationVisible.value && isTabletOrMobile.value) {
      return {
        width: `${viewportWidth.value}px`,
        position: 'fixed',
        icon: 'close',
        toggleVisibilty: true,
        isDrawerHidden: true,
      }
    }

    return null
  })

  const backgroundColor = computed(() => {
    const regex = /\/(spaceout|record|login)\/?$/
    if (route.path === '/') {
      return '#e1e1e0a1'
    } else if (regex.test(route.path)){
      return '#f1f1f1'
    } else {
      return 'transparent'
    }
  })

  const updateWindowSize = () => {
    viewportWidth.value = window.innerWidth
    viewportHeight.value = window.innerHeight
  }

  const toggleDrawer = () => {
    isDrawerHidden.value = !isDrawerHidden.value
  }

  onMounted(() => {
    window.addEventListener('resize', updateWindowSize)
    updateWindowSize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })
</script>

<template>
  <div :style="{ backgroundColor: backgroundColor }">
    <TopNavigation
      v-if="isNavigationVisible"
      @toggle-drawer="toggleDrawer"
      :class="{ 'border-bottom': backgroundColor !== '#e1e1e0a1' }"
    />
    <main :class="{ 'full-height': !isNavigationVisible }">
      <DrawerContainer
        v-if="drawerProps"
        @toggle-drawer="toggleDrawer"
        class="drawer"
        :variant="'menu'"
        :width="drawerProps.width"
        :position="drawerProps.position"
        :icon="drawerProps.icon"
        :toggle-visibilty="drawerProps.toggleVisibilty"
        :is-drawer-hidden="drawerProps.isDrawerHidden? isDrawerHidden : false"
      />
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  z-index: 100;
}
.border-bottom {
  background-color: $white900;
  border-bottom: 1px solid $lightgray300;
}

main {
  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);

  &.full-height {
    height: 100vh;
  }
}

@media (max-width: 834px) {
  .drawer {
    width: 100vw;
  }
}
</style>
