<script setup>
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: 150,
    },
    placeholder: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: '0',
    },
    padding: {
      type: String,
      default: '6px 20px',
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

  watch(content, (newValue) => {
    emit('update:modelValue', newValue)
  })

  const containerStyle = computed(() => {
    return {
      margin: props.margin,
      padding: props.padding,
      boxSizing: 'border-box',
    }
  })
</script>

<template>
  <div
    class="text-input-container"
    :style="containerStyle"
  >
    <div class="input-wrapper textinput">
      <label class="input-label">{{ props.label }}</label>
      <input
        v-model="content"
        :placeholder="props.placeholder"
        :maxlength="props.maxLength"
        :readonly="props.readonly"
        type="text"
        class="text-input"
        :class="{ 'not-readonly': !props.readonly, 'readonly': props.readonly }"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
}

.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  &.textinput {
    padding: 6px 20px;
    gap: 8px;

    .input-label {
      width: 260px;
      font-size: 15px;
      color: $gray700;
    }

    .text-input {
      width: calc(100% - 28px);
      padding: 2px 18px;
      border-radius: 4px;
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.15px;

      &.readonly {
        background-color: $grayopacity10;
        border: 1px solid $grayopacity10;
        color: $gray700;
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
}

@media (max-width: 576px) {
  .input-wrapper {
    &.textinput {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      .input-label {
        width: 100%;
        margin-bottom: 4px;
        font-size: $text-font-size-m-rem;
        line-height: 15px;
      }

      .text-input {
        width: 100%;
        font-size: $text-font-size-m-rem;
        line-height: 18px;
        padding: 4px 12px;
      }
    }
  }
}
</style>
