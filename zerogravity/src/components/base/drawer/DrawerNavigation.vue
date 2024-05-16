<script setup>
  const props = defineProps({
    titleText: {
      type: String,
      default: '',
    },
    subTitleText: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
  })

  defineEmits(['hide-drawer'])
</script>

<template>
  <div class="drawer-nav-container">
    <h3
      v-if="props.subTitleText"
      class="subtitle-text en-font"
    >
      {{ subTitleText }}
    </h3>
    <h2 class="title-text en-font">
      {{ props.titleText }}
    </h2>
    <div
      v-if="props.buttonIcon"
      @click="$emit('hide-drawer')"
      class="icon-button"
    >
      <span class="material-symbols-outlined">
        {{ props.buttonIcon }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-nav-container {
  display: flex;
  position: relative;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.title-text {
  color: $gray700;
  font-size: $title-font-size-xs-rem;
}

.subtitle-text {
  color: $grayopacity50;
  font-size: $text-font-size-s-rem;
}

.icon-button {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
}
</style>