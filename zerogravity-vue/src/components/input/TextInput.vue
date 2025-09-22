<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '레이블',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const content = ref(props.modelValue)

  watch(() => props.modelValue, (newValue) => {
    content.value = newValue
  })

  watch(content, (newValue) => {
    emit('update:modelValue', newValue)
  })
</script>

<template>
  <div class="input-wrapper">
    <label class="input-label">{{ props.label }}</label>
    <input
      v-model="content"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      type="text"
      :class="['text-input', { 'not-readonly': !props.readonly, 'readonly': props.readonly }]"
    >
  </div>
</template>

<style scoped lang="scss">

.input-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 8px;

  .input-label {
    width: 260px;
    font-size: 15px;
    color: $gray700;
  }

  .text-input {
    width: 100%;
    padding: 15px $padding-l-rem;
    border-radius: $border-radius-s-rem;
    font-size: 15px;
    letter-spacing: -0.15px;
    box-sizing: border-box;

    &.readonly {
      background-color: $grayopacity10;
      border: 1px solid $grayopacity10;
      color: $gray700;

      &:focus{
        cursor: default;
        outline: none;
      }
    }

    &.not-readonly {
      background-color: transparent;
      border: 1px solid $lightgray300;
      color: $black900;
    }
  }

  .text-input::placeholder {
    color: $gray700;
    font-size: $text-font-size-m-rem;
    line-height: 15px;
    letter-spacing: -0.15px;
  }

}

@media (max-width: 576px) {
  .input-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .input-label {
      width: 100%;
      margin-bottom: $padding-xxxs-rem;
      font-size: $text-font-size-m-rem;
      line-height: 15px;
    }
  }

}
</style>
