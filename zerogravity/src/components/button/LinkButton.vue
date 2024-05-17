<script setup>
  import router from '@/router'
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
    fontSize: {
      type: Number,
      default: 15,
    },
    isActive: Boolean,
    linkPath: {
      type: String,
      required: true,
    },
  })

  const onClick = () => {
    router.push(`/${props.linkPath}`)
  }
</script>

<template>
  <a
    @click="onClick"
    :class="['link-button', 'en-font', { 'active-link': props.isActive }]"
    :style="{ color: isActive ? activeColor : defaultColor, fontSize: `${props.fontSize}px` }"
  >
    {{ props.text }}
  </a>
</template>

<style lang="scss" scoped>
.link-button {
  padding: $padding-xxxs-rem;
  color: $gray700;
  text-align: center;
  cursor: pointer;

  .active-link {
    text-decoration: underline;
  }

  &:hover{
    text-decoration: underline;
  }
}
</style>