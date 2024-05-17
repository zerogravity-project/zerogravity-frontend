<script setup>
  import { ref } from 'vue'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerMenu from '@/components/drawer/common/DrawerMenu.vue'
  import router from '@/router'

  const props = defineProps({
    drawerStyle: {
      type: Object,
      default: null,
    },
  })

  const mainMenus = ref([
    { path: 'Calendar', text: 'Calendar', icon: 'calendar_today' },
    { path: 'Chart', text: 'Chart', icon: 'analytics' },
  ])

  const subMenus = ref([
    { path: 'Setting', text: 'Setting', icon: 'settings' },
    { path: 'Home', text: 'Home', icon: 'home' },
  ])

  const goToLink = (linkPath) => {
    router.push(`/${linkPath}`)
  }
</script>

<template>
  <aside
    class="left-drawer"
    :style="[props.drawerStyle]"
  >
    <div class="drawer-main-area">
      <DrawerNavigation
        class="drawer-navigation"
        :title-text="'Daisy Pyo'"
        :detail-text="'pyodayoung@gmail.com'"
        :is-profile="true"
      />
      <div class="drawer-main-menu">
        <DrawerMenu
          v-for="(menu, index) in mainMenus"
          :key="index"
          :menu-text="menu.text"
          :icon-type="menu.icon"
          :link-path="menu.path"
          @go-to-link="goToLink"
        />
      </div>
    </div>
    <div class="drawer-sub-menu">
      <DrawerMenu
        v-for="(menu, index) in subMenus"
        :key="index"
        :menu-text="menu.text"
        :icon-type="menu.icon"
        :link-path="menu.path"
        @go-to-link="goToLink"
      />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.left-drawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // position: fixed;
  // left: 0;
  height: 100vh;
  border-right: 1px solid $lightgray300;
  background: $white900;
  z-index: 5;
  // transition: 0.5s;

  .drawer-navigation {
    padding-top: $padding-m-rem;
    padding-bottom: $padding-s-rem;
    border-bottom: 1px solid $lightgray300;
  }

  .drawer-main-area {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .drawer-sub-menu {
    border-top: 1px solid $lightgray300;
  }
}
</style>