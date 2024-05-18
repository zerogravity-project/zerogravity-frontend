<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerMenu from '@/components/drawer/common/DrawerMenu.vue'
  import router from '@/router'

  const mainMenus = ref([
    { path: 'profile/calendar', text: 'Calendar', icon: 'calendar_today' },
    { path: 'profile/chart', text: 'Chart', icon: 'analytics' },
  ])

  const subMenus = ref([
    { path: 'profile/setting', text: 'Setting', icon: 'settings' },
    { path: '', text: 'Home', icon: 'home' },
  ])

  const isHidingAvailable = ref(false)

  const updateHidingAvailablity = () => {
    if (window.innerWidth <= 576) {
      isHidingAvailable.value = true
    } else {
      isHidingAvailable.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateHidingAvailablity)
    updateHidingAvailablity()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateHidingAvailablity)
  })

  const emit = defineEmits(['hideDrawer'])

  const goToLink = (linkPath) => {
    router.push(`/${linkPath}`)

    if(isHidingAvailable.value){
      emit('hideDrawer')
    }
  }
</script>

<template>
  <div
    class="menu-drawer"
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
  </div>
</template>

<style lang="scss" scoped>
.menu-drawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: $white900;

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