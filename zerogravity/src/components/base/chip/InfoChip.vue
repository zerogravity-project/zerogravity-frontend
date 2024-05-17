<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    size: {
      type: String,
      default: 'm',
    },
    style: {
      type: String,
      default: 'default',
    },
  })

  const chipClass = computed(() => {
    return `chip ${props.size} ${props.style}`
  })

  const isDisabled = computed(()=>{
    return props.style === 'disabled'
  })
</script>

<template>
  <button
    :class="chipClass"
    :disabled="isDisabled"
    :aria-disabled="isDisabled.toString()"
  >
    <p class="label">
      <slot />
    </p>
  </button>
</template>

<style lang="scss" scoped>
.chip {
  display: flex;
  border: 1px solid transparent;
  border-radius: 100px;
  // size
  &.m {
    padding: $padding-xxs-rem $padding-s-rem;
    font-size: $text-font-size-m-rem;
  }

  &.s {
    padding: $padding-xxs-rem $padding-s-rem;
    font-size: $text-font-size-s-rem;
  }

  &.xs {
    padding: $padding-xxxs-rem $padding-xs-rem;
    font-size: $text-font-size-xs-rem;
  }

  // style type
  &.badge {
    border: 1px solid $red900;
    background: $redopacity10;
    color: $red900;
  }

  &.default{
    background: $redopacity10;
    color: $red900;
  }

  &.outline{
    background: transparent;
    border: 1px solid $redopacity50;
    color: $red900;
  }

  &:active{
    background: $red900;
    color: $white900;
  }

  &:disabled{
    background: $grayopacity10;
    color: $grayopacity30;
  }

  .label {
    user-select: none;
  }
}
</style>