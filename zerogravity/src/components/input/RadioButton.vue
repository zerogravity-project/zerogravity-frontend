<script setup>
  import { computed, defineModel } from 'vue'

  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
    },
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    selection: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    isChecked: Boolean,
  })

  const computedId = computed(() => {
    if (props.variant === 'font') {
      return `${props.index}-${props.name}-${props.selection}`
    } else if (props.variant === 'color') {
      return `${props.index}-${props.name}-${props.selection}`
    } else if (props.variant === 'object') {
      return `${props.index}-${props.name}-${props.selection}`
    } else if (props.variant === 'range') {
      return `${props.index}-${props.name}-${props.selection}`
    }
    return `${props.index}-${props.name}-${props.variant}`
  })

  const surveyStyle = computed(() => {
    return { width: props.width, height: props.width }
  })

  const selectedOption = defineModel()
</script>

<template>
  <input
    v-model="selectedOption"
    type="radio"
    :name="props.name"
    :id="computedId"
    :value="computedId"
    :checked="isChecked"
    hidden
  >
  <label
    :for="computedId"
    :class="['radio-button', props.variant]"
    :style="[{ backgroundColor: props.selection }, surveyStyle]"
  >
    <span
      v-if="props.variant === 'font'"
      :style="{ fontFamily: props.selection }"
    >12:34</span>
    <span
      v-else-if="(props.variant === 'color' || props.variant === 'range')"
      class="material-symbols-outlined"
    >
      check
    </span>
    <img
      v-else-if="props.variant === 'object'"
      src="@/assets/images/object.png"
      alt=""
    >
  </label>
</template>

<style lang="scss" scoped>
.radio-button {
  cursor: pointer;
  display: flex;

  &.font {
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    font-size: $title-font-size-l-rem;
    border-radius: $border-radius-s-rem;

    &:hover {
      background-color: $orangeopacity10;
    }
  }

  &.color {
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
  }

  &.object {
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    padding: $padding-xs-rem;
    border-radius: $border-radius-s-rem;

    img {
      width: 74px;
      height: 74px;
    }

    &:hover {
      background-color: $orangeopacity10;
    }
  }

  &.range {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1.5px solid $gray700;
    border-radius: $border-radius-full-rem;
  }
}

// Not Checked
input[type="radio"]+label {
  &.font {
    color: $black900;
  }

  &.color {
    .material-symbols-outlined {
      display: none;
    }
  }

  &.range {
    .material-symbols-outlined {
      display: none;
    }
  }
}

// Checked
input[type="radio"]:checked+label {
  &.font {
    background-color: $orangeopacity10;
    border: 1px solid $orange900;
    color: $orange900;
  }

  &.color {
    position: relative;

    .material-symbols-outlined {
      display: block;
      color: $white900;
    }

    &::after {
      position: absolute;
      content: '';
      background-color: $blackopacity20;
      top: 0;
      left: 0;
      width: 48px;
      height: 48px;
    }
  }

  &.object {
    background-color: $orangeopacity10;
    border: 1px solid $orange900;
    color: $orange900;
  }

  &.range {
    background-color: $gray700;

    .material-symbols-outlined {
      display: block;
      color: $whiteopacity50;
    }
  }
}
</style>