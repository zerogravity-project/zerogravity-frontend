<script setup>
  import InfoChip from '@/components/base/chip/InfoChip.vue'
  import { computed } from 'vue'
  const props = defineProps({
    labelList: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'm',
    },
    style: {
      type: String,
      default: 'default',
    },
    isCompact: Boolean,
  })

  const isLarge = computed(() => {
    return props.size === 'm'
  })
</script>

<template>
  <div
    v-if="props.labelList.length > 0"
    :class="['emotion-chips-container', { 'compact': props.isCompact, 'detail': !props.isCompact, 'large': isLarge, 'small': !isLarge }]"
  >
    <InfoChip
      v-for="(label, index) in props.labelList"
      :key="index"
      :size="size"
      :style="style"
    >
      {{ label }}
    </InfoChip>
  </div>
</template>

<style lang="scss" scoped>
.emotion-chips-container {
  &.detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &.compact {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    @include hide-scrollbar;
  }

  &.large {
    row-gap: 12px;
    column-gap: 6px;
  }

  &.small {
    row-gap: 8px;
    column-gap: 4px;
  }
}
</style>