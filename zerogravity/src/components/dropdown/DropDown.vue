<script setup>
  import { defineProps, computed } from 'vue'
  import DropDownButton from './DropDownButton.vue'
  import router from '@/router'

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
    menuList: {
      type: Array,
      required: true,
    },
  })

  const handleClick = (link) => {
    router.push(link)
  }

  const firstItem = computed(() => props.menuList[0])
  const computedMenuList= computed(() => props.menuList.slice(1, -1))
  const lastItem = computed(() => props.menuList[props.menuList.length - 1])

  const dropdownStartPadding = computed(() => ({
    padding: props.padding.length === 2 ? `${props.padding[0]} ${props.padding[1]} 0 ${props.padding[1]}` : props.padding.join(' '),
  }))

  const dropdownEndPadding = computed(() => ({
    padding: props.padding.length === 2 ? `0 ${props.padding[1]} ${props.padding[0]}  ${props.padding[1]}` : props.padding.join(' '),
  }))

  const dropdownItemStyles = computed(() => ({
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
  }))
</script>

<template>
  <div class="dropdown-menu">
    <div
      class="dropdown-item"
      :style="[dropdownItemStyles, dropdownStartPadding]"
    >
      <DropDownButton
        :text="firstItem.name"
        :text-color="textColor"
        :border-radius="borderRadius"
        :padding="['12px', '16px']"
        :hover-text-color="hoverTextColor"
        :hover-background-color="hoverBackgroundColor"
        :emotion-record-state="firstItem.emotionRecordState"
        @click="handleClick(firstItem.link)"
      />
    </div>
    <DropDownButton
      v-for="(menu, index) in computedMenuList"
      :key="index"
      :text="menu.name"
      :text-color="textColor"
      :border-radius="borderRadius"
      :padding="['12px', '16px']"
      :hover-text-color="hoverTextColor"
      :hover-background-color="hoverBackgroundColor"
      :emotion-record-state="menu.emotionRecordState"
      @click="handleClick(menu.link)"
    />
    <div
      class="dropdown-item"
      :style="[dropdownItemStyles, dropdownEndPadding]"
    >
      <DropDownButton
        :text="lastItem.name"
        :text-color="textColor"
        :border-radius="borderRadius"
        :padding="['12px', '16px']"
        :hover-text-color="hoverTextColor"
        :hover-background-color="hoverBackgroundColor"
        :emotion-record-state="lastItem.emotionRecordState"
        @click="handleClick(lastItem.link)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  display: flex;
  flex-direction: column;
  width: fit-content;
  border-radius: $border-radius-xs-rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  background-color: $white900;
}
</style>
