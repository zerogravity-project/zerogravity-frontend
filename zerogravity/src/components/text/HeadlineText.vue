<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    text: {
      type: String,
      default: 'Headline',
      required: true,
    },
    size: {
      type: String,
      default: 'm',
    },
    paddingTopBottom: {
      type: Number,
      default: 0,
    },
    paddingLeftRight: {
      type: Number,
      default: 0,
    },
  })

  const padding = computed(()=>{
    return `${props.paddingTopBottom}px ${props.paddingLeftRight}px`
  })
</script>

<template>
  <h2
    :class="['headline', props.size]"
    :style="{padding: padding}"
  >
    {{ props.text }}
  </h2>
</template>

<style lang="scss" scoped>
.headline{
  display: flex;
  color: $black900;
  font-weight: 500;

  &.l{
    font-size: $title-font-size-xl-rem;
  }

  &.m{
    font-size: $title-font-size-s-rem;
  }

  &.s{
    font-size: $title-font-size-mobile-rem;
  }
}
</style>