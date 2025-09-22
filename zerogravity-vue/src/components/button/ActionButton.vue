<script setup>
  import { computed, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    variant: {
      type: String,
      default: '',
      required: true,
    },
    state: {
      type: String,
      default: '',
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  })

  const buttonClass = computed(() => {
    return [
      props.variant,
      props.state,
      props.icon ? 'has-icon' : '',
      props.text ? 'has-text' : '',
      props.variant === 'sub' && props.icon && props.text ? 'sub-has-icon-text' : '',
      props.color === 'gray' ? 'gray' : '',
    ].filter(Boolean).join(' ')
  })

  const dynamicPadding = computed(() => {
    if (props.variant === 'sub') {
      if (props.icon && props.text) {
        return 'sub-has-icon-text-padding'
      } else if (props.icon) {
        return 'sub-icon-only-padding'
      } else if (props.text) {
        return 'sub-text-only-padding'
      }
    } else if (props.icon && props.text) {
      return 'has-icon-text-padding'
    }
    return ''
  })

  const emit = defineEmits(['click'])

  const onClick = () => {
    emit('click')
  }
</script>

<template>
  <button
    @click="onClick"
    :class="[buttonClass, dynamicPadding]"
    :style="{backgroundColor: props.backgroundColor, color: props.textColor}"
  >
    <svg
      v-if="props.variant === 'kakao'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.55 3.47119C7.029 3.47119 3 6.50982 3 10.2581C3 12.5885 4.5585 14.6441 6.9315 15.8661L5.933 19.4264C5.8445 19.7416 6.2135 19.9923
         6.4965 19.8096L10.8735 16.9901C11.2425 17.0246 11.618 17.045 11.55 17.045C16.9705 17.045 20.55 14.0058 20.55 10.2581C20.55 6.50982
          16.9705 3.47119 11.55 3.47119Z"
        fill="black"
        fill-opacity="0.902"
      />
    </svg>
    <span
      v-if="props.icon"
      class="material-symbols-outlined"
      :style="{color: props.textColor}"
    >{{ props.icon }}</span>
    <span
      v-if="props.text"
      class="text-area"
      :style="{color: props.textColor}"
    >{{ props.text }}</span>
  </button>
</template>

<style lang="scss" scoped>
body,
button {
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  font-size: $btn-font-size-m;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.32px;
  cursor: pointer;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background-color: transparent;
    z-index: 1;
    border-radius: inherit;
    transition: background-color 0.3s;
  }
}

button {

  &.main,
  &.sub,
  &.round {

    .material-symbols-outlined,
    .text-area {
      z-index: 3;
    }

    &:not(.secondary):hover::before {
      background-color: $grayopacity30;
    }
  }

  &.main {
    justify-content: center;
    width: 100%;
    padding: $padding-btn-rem 36px;
    gap: 8px;

    &.primary {
      color: $white900;
      border: none;
      border-radius: $border-radius-l-rem;
      background-color: $orange900;

      &:hover::before {
        background-color: $grayopacity30;
      }

      &:disabled {
        border: solid 1px $grayopacity10;
        color: $grayopacity30;
        background-color: $grayopacity10;
      }
    }

    &.secondary {
      border: solid 1px $orange900;
      border-radius: $border-radius-l-rem;
      color: $orange900;
      background-color: transparent;

      &:hover {
        background-color: $orangeopacity10;
      }

      &:disabled {
        border-color: $grayopacity30;
        color: $grayopacity30;
      }
    }

    &.tertiary {
      border: none;
      border-radius: $border-radius-l-rem;
      color: $gray700;
      background-color: $white900;
    }
  }

  &.sub {
    border: 1px solid $lightgray300;
    border-radius: $border-radius-xs-rem;
    background-color: $white900;
    gap: 2px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;

    &.primary {
      border-color: $darkorange900;
      background-color: $orange900;
      color: $white900;

      .text-area {
        font-size: $btn-font-size-s-rem;
        font-weight: 400;
      }
    }

    &.secondary {
      border-color: $lightgray300;
      color: $black900;
      background-color: $white900;

      .text-area {
        font-size: $btn-font-size-s-rem;
        font-weight: 400;
      }

      &:hover {
        border-color: $lightgray300;
        background-color: $grayopacity10;
        color: $black900;
      }
    }

    &.mobile {
      border: none;
      color: $orange900;
      border-radius: $border-radius-full-rem;
      background-color: $orangeopacity10;

      .text-area {
        font-size: $text-font-size-s;
        font-weight: 400;
      }
    }
  }

  &.round {
    padding: $padding-xs-rem;
    border-radius: $border-radius-full-rem;
    gap: 0.25rem;
    color: $whiteopacity50;

    .material-symbols-outlined {
      font-size: 36px;
    }

    &.primary {
      border: none;
      background-color: $orange900;

      &.gray {
        background-color: $gray700;
      }

      .text-area {
        height: $padding-xl-rem;
        color: $white900;
      }
    }

    &.secondary {
      border: solid 1px $orange900;
      background-color: transparent;
      color: $orange900;

      &:hover {
        border-color: $darkorange900;
        color: $darkorange900;
      }

      &.gray {
        background-color: transparent;
        border-color: $gray700;
        color: $gray700;

        &:hover {
          border-color: $black900;
          color: $black900;
        }
      }

      &:disabled {
        border-color: $grayopacity30;
        color: $grayopacity30;
      }
    }
  }

  /* 카카오 로그인 버튼은 카카오 디자인 가이드를 따른다. */
  &.kakao {
    justify-content: center;
    width: 100%;
    padding: $padding-btn-rem 0;
    gap: 8px;
    color: #00000085;
    border: none;
    border-radius: 6px;
    background-color: #fee500;
    font-size: 15px;
    height: 45px;

    &:hover::before {
      background-color: #00000010;
    }
  }
}

.has-icon-text-padding {
  padding: $padding-xxxs-rem $padding-s-rem $padding-xxxs-rem $padding-xs;
}

.sub-has-icon-text-padding {
  padding: $padding-xxxs-rem $padding-s-rem $padding-xxxs-rem $padding-xs;
  gap: 6px;
}

.sub-icon-only-padding {
  padding: 4px;
}

.sub-text-only-padding {
  padding: 4px 12px;
}
</style>
