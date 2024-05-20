<script setup>
  import { computed, ref } from 'vue'
  import ActionDisplayChip from '@/components/chip/ActionDisplayChip.vue'
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

  const selectedList = ref([])

  const updateSelectedList = (payload) => {
    const { id, name, checked } = payload
    if (checked) {
      selectedList.value.push({ id, name })
    } else {
      selectedList.value = selectedList.value.filter(item => item.id !== id)
    }

    // id도 정렬하기
    selectedList.value.sort((a, b) => a.id.localeCompare(b.id))
    console.log(selectedList.value)
  }

  const isLarge = computed(() => {
    return props.size === 'm'
  })
</script>

<template>
  <div
    v-if="props.labelList.length > 0"
    :class="['chips-container', { 'compact': props.isCompact, 'detail': !props.isCompact, 'large': isLarge, 'small': !isLarge }]"
  >
    <ActionDisplayChip
      v-for="(label, index) in props.labelList"
      :key="index"
      :name="label"
      :index="index"
      :size="size"
      :style="style"
      @update:checked="updateSelectedList"
    >
      {{ label }}
    </ActionDisplayChip>
  </div>
</template>

<style lang="scss" scoped>
.chips-container {
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