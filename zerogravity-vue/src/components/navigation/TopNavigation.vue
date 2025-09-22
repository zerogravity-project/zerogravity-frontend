<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import LogoSvg from '../others/LogoSvg.vue'
  import LinkButton from '../button/LinkButton.vue'
  import ActionButton from '../button/ActionButton.vue'

  const useStore = useUserStore()
  const { userInfo, isAuthenticated } = storeToRefs(useStore)

  const props = defineProps({
    variant: {
      type: String,
      default: 'menu',
    },
  })

  const mainMenuList = ref([
    { text: 'Home', defaultColor: '#4e5968', activeColor: '#ff2e00', linkPath: '' },
    { text: 'About', defaultColor: '#4e5968', activeColor: '#ff2e00', linkPath: 'about' },
  ])

  const emit = defineEmits(['toggleDrawer'])

  const showDrawer = () => {
    emit('toggleDrawer')
  }

  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  const goLogin = () => {
    router.push('/login')
  }

  const goProfile = () => {
    router.push('/profile/calendar')
  }

  const goBack = () => {
    router.go(-1)
  }
</script>

<template>
  <nav :class="['top-navigation', props.variant]">
    <div
      v-if="props.variant === 'menu'"
      @click="goHome"
      class="nav-logo"
    >
      <LogoSvg />
    </div>
    <div class="nav-menu-area">
      <ul
        class="nav-main-menu"
        v-if="props.variant === 'menu'"
      >
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
      <ul
        class="nav-sub-menu"
        v-if="props.variant === 'menu'"
      >
        <li
          v-if="!isAuthenticated"
          class="nav-item"
        >
          <LinkButton
            @click="goLogin"
            :text="'Login'"
            :default-color="'#ff2e00'"
            :active-color="'#ff2e00'"
            :link-path="'login'"
          />
        </li>
        <li
          @click="goProfile"
          v-if="isAuthenticated"
          class="profile-img"
        >
          <img
            :src="userInfo && userInfo.thumbnailImage"
            alt="profile-img"
          >
        </li>
      </ul>
      <div class="nav-btn">
        <ActionButton
          v-if="props.variant === 'menu' && isAuthenticated"

          @click="showDrawer"
          class="menu-button"
          :variant="'sub'"
          :state="'secondary'"
          :icon="'menu'"
          :style="{color: '#ff2e00'}"
        />
        <div
          v-if="props.variant === 'backButton'"
          class="back-button-content"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
          <span class="back-text">이전</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.top-navigation {
  height: $top-nav-base-height-rem;
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 $padding-xl-rem;
  z-index: 50;

  &.menu {
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

    .nav-btn {
      display: none;
    }

    .menu-button {
      background-color: transparent;
    }
  }

  &.backButton {
    padding: 0px;

    .nav-logo {
      display: flex;
    }

    .nav-menu-area {
      display: flex;
      justify-content: flex-start;
      padding: 6px 4px;
      width: 100%;
    }

    .nav-main-menu,
    .nav-sub-menu {
      display: none;
    }

    .nav-btn {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .menu-button {
        display: none; /* backButton일 때 메뉴 버튼 숨기기 */
      }

      .back-button-content {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;

        .material-symbols-outlined {
          padding: 8px;
          font-size: $title-font-size-m-rem;
          color: $black900;
        }

        .back-text {
          display: inline;
          width: 100%;
          color: $black900;
          font-size: $title-font-size-mobile-rem;
          line-height: 22px;
        }
      }
    }
  }
}

@media (max-width: 834px) {
  .top-navigation {
    &.menu {
      .nav-menu-area {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }

      .nav-main-menu {
        display: none;
      }

      .nav-sub-menu {
        .nav-item{
          padding: 0px;
        }
        .profile-img{
          display: none;
        }
      }

      .nav-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        .nav-menu-btn {
          border: none;
          border-radius: $border-radius-xs-rem;
          background-color: transparent;
        }
      }
    }
  }
}

.nav-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: $padding-l-rem;
  cursor: pointer;
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
  cursor: pointer;

  img {
    width: 32px;
    height: 32px;
    border-radius: 100px;
  }
}
</style>
