<script setup>
  import { ref } from 'vue'
  import LogoSvg from '../others/LogoSvg.vue'
  import LinkButton from '../button/LinkButton.vue'

  const mainMenuList = ref([
    { text: 'Home', defaultColor: '#4e5968', activeColor: '#ff2e00', linkPath: '' },
    { text: 'About', defaultColor: '#4e5968', activeColor: '#ff2e00', linkPath: '/about' },
  ])

  const isLoggedIn = ref(false)
</script>

<template>
  <nav class="top-navigation">
    <div class="nav-logo">
      <LogoSvg />
    </div>
    <div class="nav-menu-area">
      <div class="nav-main-menu">
        <div
          v-for="(menu, index) in mainMenuList"
          :key="index"
          class="nav-item"
        >
          <LinkButton
            :text="menu.text"
            :default-color="menu.defaultColor"
            :active-color="menu.activeColor"
            :link-path="menu.linkPath"
          />
        </div>
      </div>
      <div class="nav-sub-menu">
        <div
          v-if="!isLoggedIn"
          class="nav-item"
        >
          <LinkButton
            :text="'Login'"
            :default-color="'#ff2e00'"
            :active-color="'#ff2e00'"
            :link-path="'login'"
          />
        </div>
      </div>
      <div
        v-if="isLoggedIn"
        class="profile-img"
      >
        <img
          src="@/assets/images/profile.png"
          alt="profile-img"
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.top-navigation{
  height: $top-nav-base-height-rem;
  display: flex;
  padding: 0 $padding-xl-rem;
}
.nav-logo{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: $padding-l-rem;
}
.nav-menu-area{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.nav-main-menu{
  display: flex;
}

.nav-sub-menu {
  display: flex;
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px $padding-xs-rem;
}

.profile-img{
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: 32px;
    height: 32px;
    border-radius: 100px;
  }
}

</style>