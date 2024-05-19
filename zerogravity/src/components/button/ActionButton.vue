<script setup>
  import { computed } from 'vue'

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
    return `${props.variant} ${props.style} ${props.backgroundColor} ${props.textColor} ${props.icon} ${props.text}`
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
    :style="{color: textColor}"
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

  /* variant: main, sub, round */
  /* style: primary, secondary, tertiary */
  /* color: key, gray */
  /* icon: iconName */
  /* text: content */

  // main
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

  // sub
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