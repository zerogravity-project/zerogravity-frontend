<script setup>
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    variant: {
      type: String,
      default: '',
    },
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
      default: '24px 24px 0px 24px',
    },
    label: {
      type: String,
      default: '레이블',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const content = ref(props.modelValue)

  watch(content, (newValue) => {
    emit('update:modelValue', newValue)
  })

  const characterCount = computed(() => {
    return content.value.length
  })

  const containerStyle = computed(() => {
    return {
      margin: props.margin,
      padding: props.padding || (props.variant === 'textinput' ? '6px 20px' : '24px 24px 0px 24px'),
      boxSizing: 'border-box',
    }
  })
</script>

<template>
  <div
    class="text-input-container"
    :style="containerStyle"
  >
    <div
      class="input-wrapper"
      :class="variant"
    >
      <label
        v-if="variant !== 'textarea'"
        class="input-label"
      >{{ props.label }}</label>
      <component
        :is="variant === 'textarea' ? 'textarea' : 'input'"
        v-model="content"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :type="variant === 'textinput' ? 'text' : undefined"
        class="text-input"
      />
    </div>
    <div
      v-if="variant === 'textarea'"
      class="char-count-wrapper"
    >
      <p class="char-count">
        {{ characterCount }} / {{ maxLength }}
      </p>
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
      font-size: 15px;
      color: gray;
    }

    .text-input {
      padding: 2px 18px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: calc(100% - 28px);
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.15px;
    }

    .text-input::placeholder {
      font-size: 15px;
      line-height: 15px;
      letter-spacing: -0.15px;
    }
  }

  &.textarea {
    flex-direction: column;
    height: 100%;

    .text-input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      resize: none;
      font-size: 24px;
      font-weight: 400;
      box-sizing: border-box;
      padding: 8px;
      border-radius: 8px;
    }

    .text-input::placeholder {
      font-size: 24px;
      line-height: 24px;
      letter-spacing: -0.15px;
    }
  }
}

.input-label {
  width: 260px;
  font-weight: 400;
}

.text-input {
  width: 100%;
}

.text-input::placeholder {
  color: gray;
}

.char-count-wrapper {
  display: flex;
  justify-content: flex-end;
}

.char-count {
  color: gray;
  font-size: 13px;
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
        font-size: 15px;
        line-height: 15px;
      }

      .text-input {
        width: 100%;
        font-size: 15px;
        line-height: 18px;
        padding: 4px 12px;
      }
    }

    &.textarea {
      .text-input {
        font-size: 15px;
      }

      .text-input::placeholder {
        font-size: 15px;
      }
    }
  }

  .char-count {
    font-size: 13px;
  }
}
</style>
