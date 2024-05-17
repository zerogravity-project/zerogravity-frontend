<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    style: {
      type: String,
      default: 'default',
    },
    state: {
      type: String,
      default: 'default',
    },
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  })

  const buttonClass = computed(() => {
    return `button ${props.style} ${props.state} ${props.text} ${props.icon}`
  })

  const isDisabled = computed(() => {
    return props.style === 'disabled'
  })

</script>

<template>
  <button
    :class="buttonClass"
    :disabled="isDisabled"
    :aria-disabled="isDisabled.toString()"
  >
    <p class="label">
      <slot />
    </p>
  </button>
</template>

<style lang="scss" scoped>
.button {
  align-items: flex-start;

  // style: square, circle, login, today
  &.squre {
    display: flex;
    border-radius: $border-radius-xs;
    padding: 32px;
  }

  &.circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    padding: $padding-xs;
    gap: $padding-xxxs;
  }

  &.today {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-xs;
    padding: $padding-xxxs $padding-s $padding-xxxs $padding-xs;
    gap: $padding-xxs;
  }

}

</style>