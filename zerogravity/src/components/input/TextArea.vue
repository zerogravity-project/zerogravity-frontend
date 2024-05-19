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
      type: Array,
      default: () => [24, 24, 0, 24],
      validator: value => value.length === 2 || value.length === 3 || value.length === 4,
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
    const p = props.padding
    let padding
    if (p.length === 2) {
      padding = `${p[0]}px ${p[1]}px`
    } else if (p.length === 3) {
      padding = `${p[0]}px ${p[1]}px ${p[2]}px`
    } else if (p.length === 4) {
      padding = `${p[0]}px ${p[1]}px ${p[2]}px ${p[3]}px`
    }
    return {
      margin: props.margin,
      padding: padding,
      boxSizing: 'border-box',
    }
  })
</script>

<template>
  <div
    class="text-input-container"
    :style="containerStyle"
  >
    <div class="input-wrapper textarea">
      <textarea
        v-model="content"
        :placeholder="props.placeholder"
        :maxlength="props.maxLength"
        class="text-input"
      />
    </div>
    <div class="char-count-wrapper">
      <p class="char-count">
        {{ characterCount }} / {{ props.maxLength }}
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

  &.textarea {
    flex-direction: column;
    height: 100%;

    .text-input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      resize: none;
      color: $black900;
      font-size: 24px;
      font-weight: 400;
      box-sizing: border-box;
      padding: 8px;
      border-radius: 8px;
    }

    .text-input::placeholder {
      color: $grayopacity30;
      font-size: 24px;
      line-height: 24px;
      letter-spacing: -0.15px;
    }
  }
}

.char-count-wrapper {
  display: flex;
  justify-content: flex-end;
}

.char-count {
  color: $orange900;
  font-size: 13px;
}

@media (max-width: 576px) {
  .input-wrapper {
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
