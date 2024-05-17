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
    return `${props.variant} ${props.style} ${props.icon} ${props.text}`
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

  /* variant: main, sub, circle */
  /* style: primary, secondary */
  /* icon: iconName */
  /* test: content */

  // main
  &.main {
    width: 342px;
    padding: 14px 90px;
    justify-content: center;
    gap: 8px;

    &.primary {
      color: $white900;
      border: solid 1px $orange900;
      border-radius: $border-radius-l;
      background-color: $orange900;
    }

  }

  // sub
  &.sub {
    padding: $padding-xxxs;
    border: 1px solid $lightgray300;
    gap: 2px;

    &:hover {
      border: solid 1px $lightgray300;
      background-color: $lightgray200;
    }

    &.primary {
      padding: 4px 12px 4px 8px;
      color: $white900;
      background-color: $orange900;
      border-radius: $border-radius-xs;
      border-color: $darkorange900;

      .text-area {
        display: block;
        align-content: center;
        height: 24px;
        margin-left: 4px;
      }

      &:hover {
        border: solid 1px $darkorange900;
        background-color: $darkorange900;
      }
    }

    &.secondary {
      padding: 4px 12px 4px 8px;
      color: $black900;
      background-color: $white900;
      border-radius: $border-radius-xs;
      border-color: $lightgray300;

      .text-area {
        display: block;
        align-content: center;
        height: 24px;
        margin-left: 4px;
      }

      &:hover {
        background-color: $lightgray200;
      }
    }

  }

}
</style>