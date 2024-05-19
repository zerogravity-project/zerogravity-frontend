<script setup>
  import { computed, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    variant: {
      type: String,
      default: '',
    },
    style: {
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
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  })

  const buttonClass = computed(() => {
    return [
      props.variant,
      props.style,
      props.icon ? 'has-icon' : '',
      props.text ? 'has-text' : '',
      props.backgroundColor ? `bg-${props.backgroundColor}` : '',
      props.textColor ? `text-${props.textColor}` : '',
    ].filter(Boolean).join(' ')
  })

  const emit = defineEmits(['click'])

  const onClick = () => {
    emit('click')
  }
</script>

<template>
  <button
    @click="onClick"
    :class="buttonClass"
    :style="{ color: props.textColor, backgroundColor: props.backgroundColor }"
  >
    <span
      v-if="props.icon"
      class="material-symbols-outlined"
    >{{ props.icon }}</span>
    <span
      v-if="props.text"
      class="text-area"
    >{{ props.text }}</span>
  </button>
</template>

<style lang="scss" scoped>
body,
button {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-size: $btn-font-size-m;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.32px;
  cursor: pointer;

  &.main {
    justify-content: center;
    width: 100%;
    padding: $padding-btn-rem 0px;
    gap: 8px;

    &.primary {
      color: $white900;

      &.key {
        border: solid 1px $orange900;
        border-radius: $border-radius-l-rem;
        background-color: $orange900;

        &:hover {
          border: solid 1px $darkorange900;
          background-color: $darkorange900;
        }

        &:disabled {
          border: solid 1px $grayopacity10;
          color: $grayopacity30;
          background-color: $grayopacity10;
        }
      }

      &.gray {
        border: solid 1px $gray700;
        border-radius: $border-radius-l-rem;
        background-color: $gray700;
      }
    }

    &.secondary {
      border: solid 1px $orange900;
      border-radius: $border-radius-l-rem;
      color: $orange900;
      background-color: transparent;

      &:hover {
        border: solid 1px $darkorange900;
        color: $darkorange900;
      }

      &:disabled {
        border: solid 1px $grayopacity30;
        color: $grayopacity30;
      }
    }

    &.tertiary {
      border: solid 1px $white900;
      border-radius: $border-radius-l-rem;
      color: $gray700;
      background-color: $white900;
    }
  }

  &.sub {
    padding: $padding-xxxs-rem;
    border: 1px solid $lightgray300;
    background-color: $white900;
    gap: 2px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;

    &:hover {
      border: solid 1px $lightgray300;
      background-color: $lightgray200;
    }

    &.primary {
      padding: $padding-xxxs-rem $padding-s-rem $padding-xxxs-rem $padding-xs-rem;
      border-radius: $border-radius-xs-rem;
      background-color: $orange900;
      color: $white900;
      border-color: $darkorange900;

      .text-area {
        display: block;
        align-content: center;
        height: $padding-xl-rem;
        margin-left: $margin-xxxs-rem;
        font-size: $btn-font-size-s-rem;
        font-weight: 400;
      }

      &:hover {
        border: solid 1px $darkorange900;
        background-color: $darkorange900;
      }
    }

    &.secondary {
      padding: $padding-xxxs-rem $padding-s-rem $padding-xxxs-rem $padding-xs-rem;
      border-radius: $border-radius-xs-rem;
      border-color: $lightgray300;
      color: $black900;
      background-color: $white900;

      .text-area {
        display: block;
        align-content: center;
        height: $padding-xl-rem;
        margin-left: $margin-xxxs-rem;
        font-size: $btn-font-size-s-rem;
        font-weight: 400;
      }

      &:hover {
        background-color: $lightgray200;
      }
    }

    &.mobile {
      padding: $padding-xxs-rem $padding-s-rem;
      border: none;
      color: $orange900;
      border-radius: $border-radius-full-rem;
      background-color: $orangeopacity10;

      .text-area {
        display: block;
        align-content: center;
        font-size: $text-font-size-s;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  &.round {
    padding: $padding-xs-rem;
    border-radius: $border-radius-full-rem;
    gap: 0.25rem;
    color: $whiteopacity50;

    &.primary {
      border: solid 1px $orange900;
      background-color: $orange900;

      .text-area {
        display: block;
        align-content: center;
        height: $padding-xl-rem;
        margin-right: $margin-xxxs-rem;
        color: $white900;
      }

      &.gray {
        border: solid 1px $gray700;
        background-color: $gray700;
      }

      &:hover {
        opacity: 0.3
      }
    }

    &.secondary {
      border: solid 1px $orange900;
      background-color: transparent;
      color: $orange900;

      &.gray {
        border: solid 1px $gray700;
        color: $gray700;
      }

      &:disabled {
        border: solid 1px $grayopacity30;
        color: $grayopacity30;
      }
    }
  }
}
</style>

<!-- <script setup>
  import { computed, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    variant: {
      type: String,
      default: '',
    },
    customStyle: {
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
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    borderColor: {
      type: String,
      default: '',
    },
    borderRadius: {
      type: String,
      default: '',
    },
    hoverBackgroundColor: {
      type: String,
      default: '',
    },
    hoverBorderColor: {
      type: String,
      default: '',
    },
    disabledBackgroundColor: {
      type: String,
      default: '',
    },
    disabledBorderColor: {
      type: String,
      default: '',
    },
    disabledTextColor: {
      type: String,
      default: '',
    },
  })

  const buttonClass = computed(() => {
    return [
      props.variant,
      props.customStyle,
      props.icon ? 'has-icon' : '',
      props.text ? 'has-text' : '',
    ].filter(Boolean).join(' ')
  })

  const emit = defineEmits(['click'])

  const onClick = () => {
    emit('click')
  }

  const hoverEffect = (event) => {
    event.target.style.backgroundColor = props.hoverBackgroundColor
    event.target.style.borderColor = props.hoverBorderColor
  }

  const removeHoverEffect = (event) => {
    event.target.style.backgroundColor = props.backgroundColor
    event.target.style.borderColor = props.borderColor
  }

  const disableEffect = (event) => {
    event.target.style.backgroundColor = props.disabledBackgroundColor
    event.target.style.borderColor = props.disabledBorderColor
    event.target.style.color = props.disabledTextColor
  }
</script>

<template>
  <button
    @click="onClick"
    :class="buttonClass"
    :style="{
      backgroundColor: props.backgroundColor,
      color: props.textColor,
      borderColor: props.borderColor,
      borderRadius: props.borderRadius
    }"
    @mouseover="hoverEffect"
    @mouseout="removeHoverEffect"
    @disabled="disableEffect"
  >
    <span
      v-if="props.icon"
      class="material-symbols-outlined"
    >{{ props.icon }}</span>
    <span
      v-if="props.text"
      class="text-area"
    >{{ props.text }}</span>
  </button>
</template>

<style lang="scss" scoped>
body,
button {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-size: $btn-font-size-m;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.32px;
  cursor: pointer;

  &.main {
    justify-content: center;
    width: 100%;
    padding: $padding-btn-rem 0px;
    gap: 8px;

    &.primary {
      &.key {
        &:hover {
        }
        &:disabled {
        }
      }

      &.gray {
      }
    }

    &.secondary {
      &:hover {
      }
      &:disabled {
      }
    }

    &.tertiary {
    }
  }

  &.sub {
    padding: $padding-xxxs-rem;
    gap: 2px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;

    &:hover {
    }

    &.primary {
      .text-area {
        display: block;
        align-content: center;
        height: $padding-xl-rem;
        margin-left: $margin-xxxs-rem;
        font-size: $btn-font-size-s-rem;
        font-weight: 400;
      }
    }

    &.secondary {
      .text-area {
        display: block;
        align-content: center;
        height: $padding-xl-rem;
        margin-left: $margin-xxxs-rem;
        font-size: $btn-font-size-s-rem;
        font-weight: 400;
      }
    }

    &.mobile {
      padding: $padding-xxs-rem $padding-s-rem;
      border: none;

      .text-area {
        display: block;
        align-content: center;
        font-size: $text-font-size-s;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  &.round {
    padding: $padding-xs-rem;
    border-radius: $border-radius-full-rem;
    gap: 0.25rem;

    &.primary {
      .text-area {
        display: block;
        align-content: center;
        height: $padding-xl-rem;
        margin-right: $margin-xxxs-rem;
      }
    }

    &.secondary {

      &:disabled {
      }
    }
  }
}
</style> -->
