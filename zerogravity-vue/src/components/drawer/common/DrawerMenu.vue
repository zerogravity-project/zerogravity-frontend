<script setup>
  const props = defineProps({
    menuText: {
      type: String,
      default: 'Menu',
    },
    iconType: {
      type: String,
      default: '',
    },
    linkPath: {
      type: String,
      required: true,
    },
    isActive: Boolean,
  })

  const emit = defineEmits(['goToLink'])

  const onClick = () => {
    emit('goToLink', props.linkPath)
  }
</script>

<template>
  <div class="drawer-menu-container">
    <a
      @click="onClick"
      :class="['drawer-menu', { 'active': isActive }]"
    >
      <span
        v-if="props.iconType"
        class="material-symbols-outlined"
      >
        {{ props.iconType }}
      </span>
      <span class="drawer-menu-text">
        {{ props.menuText }}
      </span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.drawer-menu-container {
  display: flex;
  padding: $padding-xs $padding-s-rem;

  .drawer-menu {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: $padding-xs-rem;
    width: 100%;
    border-radius: $border-radius-xs-rem;
    color: $gray700;
    cursor: pointer;

    .drawer-menu-text {
      width: 100%;
    }

    &:hover,
    &.active {
      background-color: $orangeopacity10;
      color: $orange900;
    }
  }
}
</style>