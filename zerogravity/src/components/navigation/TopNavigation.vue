<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import { useRouter } from 'vue-router'
  import LogoSvg from '../others/LogoSvg.vue'
  import LinkButton from '../button/LinkButton.vue'

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

  const emit = defineEmits(['toggle-drawer'])

  const showDrawer = () => {
    emit('toggle-drawer')
  }

  const isLoggedIn = ref(false)

  const router = useRouter()

  const goBack = () => {
    router.go(-1)
  }

</script>

<template>
  <nav :class="['top-navigation', props.variant]">
    <div
      class="nav-logo"
      v-if="props.variant === 'menu'"
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
        <button
          @click="showDrawer"
          class="nav-menu-btn"
        >
          <span
            v-if="props.variant === 'menu'"
            class="material-symbols-outlined"
            style="color: #FF2E00;"
          >
            menu
          </span>
        </button>
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
  padding: 0 $padding-xl-rem;

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
          border: none;
          border-radius: $border-radius-xs-rem;
        }
      }
    }
  }

  &.backButton {
    .nav-logo {
      display: none;
    }

    .nav-menu-area {
      display: flex;
      justify-content: flex-start;
      align-items: center;
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

      .nav-menu-btn {
        display: none;
      }

      .back-button-content {
        display: flex;
        align-items: center;
        padding: $padding-xxs-rem $padding-xxxs-rem;
        gap: 4px;
        cursor: pointer;

        .material-symbols-outlined {
          font-size: $title-font-size-m-rem;
          color: $black900;
        }

        .back-text {
          display: inline;
          color: $black900;
          font-size: $title-font-size-mobile-rem;
          line-height: 22px;
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
</style>
