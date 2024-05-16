<script setup>
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    buttonType: {
      type: String,
      default: 'default',
    },
    index: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '',
    },

  })

  const computedId = computed(() => {
    return `${props.buttonType}-${props.index}`
  })

  const selectedOption = ref('')

  watch(selectedOption, ()=>{
    console.log(selectedOption.value)
  })
</script>

<template>
  <input
    type="radio"
    :name="props.buttonType"
    :id="computedId"
    :value="computedId"
    v-model="selectedOption"
    hidden
  >
  <label
    :class="['radio-button', props.buttonType]"
    :for="computedId"
    :style="{ backgroundColor: props.color }"
  >
    <span v-if="props.buttonType === 'typeface'">12:34</span>
    <span
      v-else-if="(props.buttonType === 'color' || props.buttonType === 'survey')"
      class="material-symbols-outlined"
    >
      check
    </span>
    <img
      v-else-if="props.buttonType === 'object'"
      src="@/assets/images/object.png"
      alt=""
    >
  </label>
</template>

<style lang="scss" scoped>
.radio-button {
  cursor: pointer;
  display: flex;
}

.typeface {
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  font-size: $title-font-size-l-rem;
  border-radius: $border-radius-s-rem;

  input[type="radio"]+label {
    color: $black900;
  }

  input[type="radio"]:checked+label {
    background-color: $orangeopacity10;
    border: 1px solid $orange900;
    color: $orange900;
  }

  &:hover {
    background-color: $orangeopacity10;
  }
}

.color {
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;

  input[type="radio"]+label {
    .material-symbols-outlined {
      display: none;
    }
  }

  input[type="radio"]:checked+label {
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
}

.object {
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

  input[type="radio"]:checked+label {
    background-color: $orangeopacity10;
    border: 1px solid $orange900;
    color: $orange900;
  }

  &:hover {
    background-color: $orangeopacity10;
  }
}

.survey {
  input[type="radio"]+label {
    color: $black900;
  }

  input[type="radio"]:checked+label {
    color: $orange900;
  }
}
</style>