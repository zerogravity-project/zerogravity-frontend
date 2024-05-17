<script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    defaultColor: {
      type: String,
      default: '#4e5968',
    },
    activeColor: {
      type: String,
      default: '#ff2e00',
    },
    isActive: Boolean,
    linkPath: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['goToLink'])

  const onClick = () => {
    emit('goToLink', props.linkPath)
  }
</script>

<template>
  <a
    @click="onClick"
    :class="['link-button', 'en-font', { 'active-link': props.isActive }]"
    :style="{ color: isActive ? activeColor : defaultColor }"
  >
    {{ props.text }}
  </a>
</template>

<style lang="scss" scoped>
.link-button {
  padding: $padding-xxxs-rem;
  color: $gray700;
  text-align: center;
  font-size: $text-font-size-m-rem;
  line-height: $text-font-size-m-rem;
  cursor: pointer;

  .active-link {
    text-decoration: underline;
  }

  &:hover{
    text-decoration: underline;
  }
}
</style>