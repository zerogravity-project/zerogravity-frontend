<script setup>
  import { ref, watch } from 'vue'
  import CustomizeDrawer from './CustomizeDrawer.vue'
  import EmotionDrawer from './EmotionDrawer.vue'
  import MenuDrawer from './MenuDrawer.vue'

  const props = defineProps({
    variant: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    isRight: Boolean,
    toggleVisibilty: Boolean,
    isDrawerVisible: Boolean, // 상위 컴포넌트에서 Drawer를 Toggle 시키기 위한 프롭스
  })

  const transformStyle = ref(null)
  const emit = defineEmits(['toggleDrawer', 'resize']) // 추후 레이아웃 변경 시

  watch(() => props.isDrawerVisible, (newValue) => {
    if (newValue) {
      transformStyle.value = {
        transform: props.isRight ? 'translateX(100%)' : 'translate(-100%)',
      }
    } else {
      transformStyle.value = {
        transform: 'translateX(0%)',
      }
    }
  }, { immediate: true })

  const hideDrawer = () => {
    if (props.toggleVisibilty) {
      emit('toggleDrawer')
      emit('resize')
    }
  }
</script>

<template>
  <aside
    :class="['drawer-container', { 'left': !isRight, 'right': isRight }]"
    :style="[props.drawerStyle, transformStyle, { position: props.position }]"
  >
    <div
      v-if="props.icon"
      @click="hideDrawer"
      class="icon-button"
    >
      <span class="material-symbols-outlined">
        {{ props.icon }}
      </span>
    </div>

    <CustomizeDrawer
      v-if="props.variant === 'customize'"
      :style="{ width: `${props.width}` }"
    />
    <EmotionDrawer
      v-if="props.variant === 'emotion'"
      :style="{ width: `${props.width}` }"
    />
    <MenuDrawer
      v-if="props.variant === 'menu'"
      @hide-drawer="hideDrawer"
      :style="{ width: `${props.width}` }"
    />
  </aside>
</template>

<style lang="scss" scoped>
.drawer-container {
  top: 0;
  height: 100vh;
  // box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  z-index: 3;
  transition: 0.75s;

  &.left {
    border-right: 1px solid $lightgray300;
  }

  &.right {
    right: 0;
    border-left: 1px solid $lightgray300;
  }
}

.icon-button {
  position: absolute;
  right: 16px;
  top: 16px;
  color: $black900;
  cursor: pointer;
  z-index: 5;
}
</style>