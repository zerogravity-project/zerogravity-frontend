<script setup>
  import { ref } from 'vue'
  import LogoSvg from '../others/LogoSvg.vue'
  import LinkButton from '../button/LinkButton.vue'
  import ActionButton from '../button/ActionButton.vue'

  const mainMenuList = ref([
    { text: 'Home', defaultColor: '#4e5968', activeColor: '#ff2e00', linkPath: '' },
    { text: 'About', defaultColor: '#4e5968', activeColor: '#ff2e00', linkPath: 'about' },
  ])

  const emit = defineEmits(['toggle-drawer'])

  const showDrawer = () => {
    emit('toggle-drawer')
  }

  const isLoggedIn = ref(false)

</script>

<template>
  <nav class="top-navigation">
    <div class="nav-logo">
      <LogoSvg />
    </div>
    <div class="nav-menu-area">
      <ul class="nav-main-menu">
        <li
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
        </li>
      </ul>
      <ul class="nav-sub-menu">
        <li
          v-if="!isLoggedIn"
          class="nav-item"
        >
          <LinkButton
            :text="'Login'"
            :default-color="'#ff2e00'"
            :active-color="'#ff2e00'"
            :link-path="'login'"
          />
        </li>
        <li
          v-if="isLoggedIn"
          class="profile-img"
        >
          <img
            src="@/assets/images/profile.png"
            alt="profile-img"
          >
        </li>
      </ul>
      <div class="nav-btn">
        <ActionButton
          @click="showDrawer"
          class="nav-menu-btn"
          :variant="'sub'"
          :icon="'menu'"
          :text-color="'#FF2E00'"
        />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.top-navigation {
  height: $top-nav-base-height-rem;
  display: flex;
  padding: 0 $padding-xl-rem;
}

.nav-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: $padding-l-rem;
}

.nav-menu-area {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-main-menu {
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

.profile-img {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 100px;
  }
}

.nav-btn {
  display: none;
}

@media (max-width: 576px) {
  .nav-menu-area {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .nav-main-menu {
    display: none;
  }

  .nav-sub-menu {
    display: none;
  }

  .nav-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-menu-btn {
      border-radius: $border-radius-xs-rem;
    }
  }
}
</style>