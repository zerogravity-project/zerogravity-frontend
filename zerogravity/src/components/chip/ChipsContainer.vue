<script setup>
  import { computed, ref, watch } from 'vue'
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
    state: {
      type: String,
      default: 'default',
    },
    align: {
      type: String,
      default: '',
    },
    isCompact: Boolean,
  })

  const selectedList = ref([])

  const emits = defineEmits(['getCheckedList'])

  const updateSelectedList = (payload) => {
    const { id, name, checked } = payload
    if (checked) {
      selectedList.value.push({ id, name })
    } else {
      selectedList.value = selectedList.value.filter(item => item.id !== id)
    }

    // id도 정렬하기
    selectedList.value.sort((a, b) => a.id.localeCompare(b.id))
    // console.log(selectedList.value)

    emits('getCheckedList', selectedList.value)
  }

  const isLarge = computed(() => {
    return props.size === 'm'
  })
</script>

<template>
  <div
    v-if="props.labelList.length > 0"
    :class="['chips-container', { 'compact': props.isCompact, 'detail': !props.isCompact, 'large': isLarge, 'small': !isLarge }]"
    :style="{justifyContent: props.align}"
  >
    <ActionDisplayChip
      v-for="(label, index) in props.labelList"
      :key="index"
      :name="label"
      :index="index"
      :size="size"
      :style="state"
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