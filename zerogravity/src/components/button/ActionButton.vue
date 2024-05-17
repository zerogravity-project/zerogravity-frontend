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
    color: {
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
    return `${props.variant} ${props.style} ${props.color} ${props.icon} ${props.text}`
  })

</script>

<template>
  <button :class="buttonClass">
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
    width: 100%;
    padding: $padding-btn-rem 0px;
    justify-content: center;
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
          color: $grayopacity30;
          border: solid 1px $grayopacity10;
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
      color: $orange900;
      border: solid 1px $orange900;
      border-radius: $border-radius-l-rem;
      background-color: transparent;

      &:hover {
        color: $darkorange900;
        border: solid 1px $darkorange900;
      }

      &:disabled {
        color: $grayopacity30;
        border: solid 1px $grayopacity30;
      }
    }

    &.tertiary {
      color: $gray700;
      border: solid 1px $white900;
      border-radius: $border-radius-l-rem;
      background-color: $white900;
    }

  }

  // sub
  &.sub {
    padding: $padding-xxxs-rem;
    border: 1px solid $lightgray300;
    gap: 2px;

    &:hover {
      border: solid 1px $lightgray300;
      background-color: $lightgray200;
    }

    &.primary {
      padding: $padding-xxxs-rem $padding-s-rem $padding-xxxs-rem $padding-xs-rem;
      color: $white900;
      background-color: $orange900;
      border-radius: $border-radius-xs-rem;
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
      color: $black900;
      background-color: $white900;
      border-radius: $border-radius-xs-rem;
      border-color: $lightgray300;

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
        color: $gray700;
        border: solid 1px $gray700;
      }

      &:disabled {
        border: solid 1px $grayopacity30;
        color: $grayopacity30;
      }
    }
  }
}
</style>