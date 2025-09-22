<script setup>
  import { ref, watch,  onMounted, onUnmounted } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerMenu from '@/components/drawer/common/DrawerMenu.vue'
  import { useRoute } from 'vue-router'
  import router from '@/router'

  const useStore = useUserStore()
  const { userInfo } = storeToRefs(useStore)

  const route = useRoute()
  const currentPath = ref(route.path)

  watch(() => route.path, (newPath) => {
    currentPath.value = newPath
  })

  const mainMenus = ref([
    { path: '/profile/calendar', text: 'Calendar', icon: 'calendar_today' },
    { path: '/profile/chart', text: 'Chart', icon: 'analytics' },
  ])

  const subMenus = ref([
    { path: '/profile/setting', text: 'Setting', icon: 'settings' },
    { path: '/', text: 'Home', icon: 'home' },
  ])

  const isHidingAvailable = ref(false)

  const updateHidingAvailablity = () => {
    if (window.innerWidth <= 834) {
      isHidingAvailable.value = true
    } else {
      isHidingAvailable.value = false
    }
  }

  const emit = defineEmits(['hideDrawer'])

  const goToLink = (linkPath) => {
    router.push(`${linkPath}`)

    if(isHidingAvailable.value){
      emit('hideDrawer')
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateHidingAvailablity)
    updateHidingAvailablity()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateHidingAvailablity)
  })

</script>

<template>
  <div
    class="menu-drawer"
  >
    <div class="drawer-main-area">
      <DrawerNavigation
        class="drawer-navigation"
        :title-text="userInfo? userInfo.nickname : ''"
        :is-profile="true"
        :profile-img="userInfo? userInfo.profileImage : null"
      />
      <div class="drawer-main-menu">
        <DrawerMenu
          v-for="(menu, index) in mainMenus"
          :key="index"
          :menu-text="menu.text"
          :icon-type="menu.icon"
          :link-path="menu.path"
          :is-active="currentPath === menu.path"
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
        :is-active="currentPath === menu.path"
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
    padding-bottom: $padding-s-rem;
  }
}
</style>