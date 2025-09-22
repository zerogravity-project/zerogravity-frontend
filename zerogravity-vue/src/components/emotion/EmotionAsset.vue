<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    size: {
      type: String,
      default: 'm',
    },
    emotion: {
      type: String,
      default: '',
    },
    level: {
      type: Number,
      default: 0,
    },
  })

  const assetSize = ref({
    xxl: '200px',
    xl: '160px',
    l: '120px',
    m: '96px',
    s: '72px',
    xs: '52px',
  })

  const style = computed(() => {
    let size = assetSize.value[props.size]

    if (size === undefined) {
      if (props.size.includes('px')) {
        size = props.size
      } else {
        size = `${props.size}px`
      }
    }

    return {
      width: size,
      height: size,
      numericWidth: parseInt(size, 10),
    }
  })

  const imgSrc = computed(() => {
    return `../src/assets/images/emotions/emotion-asset-${props.level}.png`
  })
</script>

<template>
  <div>
    <img
      v-if="emotion"
      :src="imgSrc"
      :alt="`emotion-asset-image-${props.emotion}`"
      :style="style"
    >

    <div
      v-if="!emotion"
      class="no-image"
      :style="style"
    >
      <span v-if="style.numericWidth >= 120">Select</span>
      <span v-if="style.numericWidth >= 120">Main Emotion</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px dashed $lightgray300;

  span {
    color: $grayopacity50;
    font-size: $text-font-size-xs;
  }
}
</style>
