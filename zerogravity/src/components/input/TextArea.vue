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
      background-color: transparent;
      font-size: $title-font-size-m-rem;
      font-weight: 400;
      box-sizing: border-box;
      padding: $padding-xs-rem;
      border-radius: $border-radius-s-rem;
    }

    .text-input::placeholder {
      color: $grayopacity30;
      font-size: $title-font-size-m-rem;
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
  font-size: $text-font-size-s-rem;
}

@media (max-width: 576px) {
  .input-wrapper {
    &.textarea {
      .text-input {
        font-size: $text-font-size-m-rem;
      }

      .text-input::placeholder {
        font-size: $text-font-size-m-rem;
      }
    }
  }

  .char-count {
    font-size: $text-font-size-s-rem;
  }
}
</style>
