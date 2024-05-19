<script setup>
  import { defineProps, computed } from 'vue'
  import DropDownButton from './DropDownButton.vue'

  const props = defineProps({
    textColor: {
      type: String,
      default: 'black',
    },
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
    borderRadius: {
      type: String,
      default: '4px',
    },
    padding: {
      type: Array,
      default: () => ['6px', '6px'],
    },
    hoverTextColor: {
      type: String,
      default: '',
    },
    hoverBackgroundColor: {
      type: String,
      default: '',
    },
  })

  const handleClick = (item) => {
    console.log(item) // for test
  }

  const dropdownItemStyles = computed(() => ({
    padding: props.padding.length === 2 ? `${props.padding[0]} ${props.padding[1]}` : props.padding.join(' '),
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
  }))
</script>

<template>
  <div class="dropdown-menu">
    <div
      class="dropdown-item"
      :style="dropdownItemStyles"
    >
      <DropDownButton
        text="오늘의 감정 추가"
        :text-color="textColor"
        background-color="transparent"
        :border-radius="borderRadius"
        :padding="['10px', '16px']"
        :hover-text-color="hoverTextColor"
        :hover-background-color="hoverBackgroundColor"
        @click="handleClick('오늘의 감정 추가')"
      />
    </div>
    <div
      class="dropdown-item"
      :style="dropdownItemStyles"
    >
      <DropDownButton
        text="순간의 감정 추가"
        :text-color="textColor"
        background-color="transparent"
        :border-radius="borderRadius"
        :padding="['10px', '16px']"
        :hover-text-color="hoverTextColor"
        :hover-background-color="hoverBackgroundColor"
        @click="handleClick('순간의 감정 추가')"
      />
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  display: flex;
  flex-direction: column;
  width: fit-content;
  border-radius: $border-radius-xs-rem;
  gap: 4px;
}
</style>
