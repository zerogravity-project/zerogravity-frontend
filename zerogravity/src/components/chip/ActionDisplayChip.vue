<script setup>
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: 'm',
    },
    style: {
      type: String,
      default: 'default',
    },
  })

  const isChecked = ref(false)
  const emits = defineEmits(['update:checked'])

  watch(isChecked, (newValue) => {
    if(!isBadge.value){
      emits('update:checked', { id: id.value, name: props.name, checked: newValue })
    }
  })

  const id = computed(()=>{
    return `${props.index}-${props.name}`
  })

  const chipClass = computed(() => {
    return `chip ${props.size} ${props.style}`
  })

  // 추후 Disabled 필요 시
  const isDisabled = computed(() => {
    return props.style === 'disabled'
  })

  const isBadge = computed(() => {
    return props.style === 'badge'
  })

</script>

<template>
  <label
    :for="id"
    :class="[chipClass, {'checked': !isBadge && isChecked}]"
    :disabled="isDisabled"
    :aria-disabled="isDisabled.toString()"
  >
    <slot />
    <input
      v-model="isChecked"
      type="checkbox"
      :id="id"
      :name="props.name"
      hidden
    >
  </label>
</template>

<style lang="scss" scoped>
.chip {
  display: flex;
  border: 1px solid transparent;
  border-radius: 100px;
  user-select: none;

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

  &.default {
    background: $redopacity10;
    color: $red900;
    cursor: pointer;
  }

  &.outline {
    background: transparent;
    border: 1px solid $redopacity50;
    color: $red900;
  }

  &.checked {
    background: $red900;
    color: $white900;
  }

  &:disabled {
    background: $grayopacity10;
    color: $grayopacity30;
  }
}
</style>