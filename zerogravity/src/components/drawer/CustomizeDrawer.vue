<script setup>
  import { ref } from 'vue'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import DrawerHeader from '@/components/drawer/common/DrawerHeader.vue'
  import RadioButton from '@/components/input/RadioButton.vue'

  const fontList = ref([
    'helvetica', 'arial', 'georgia', '',
  ])

  const colorList = ref([
    '#ff3b30', '#ff9500', '#ffcc00', '#34C759', '#00C7BE', '#007AFF', '#5856D6', '#FF008A', '#4E5968', '#222222',
  ])

</script>

<template>
  <div class="customize-drawer">
    <DrawerNavigation
      :title-text="'Customize'"
      :button-icon="'Close'"
    />

    <!-- Typeface -->
    <DrawerHeader
      :title-text="'Typeface'"
      :style="'white'"
    />
    <div class="btn-container typeface">
      <RadioButton
        v-for="(font, index) in fontList"
        :key="index"
        :index="index"
        :variant="'typeface'"
      />
    </div>

    <!-- Color -->
    <DrawerHeader
      :title-text="'Color'"
      :style="'white'"
    />
    <div class="btn-container color">
      <RadioButton
        v-for="(color, index) in colorList"
        :key="index"
        :index="index"
        :variant="'color'"
        :color="color"
      />
    </div>

    <!-- Object -->
    <DrawerHeader
      :title-text="'Object'"
      :style="'white'"
    />
    <div class="btn-container object">
      <RadioButton
        v-for="(font, index) in fontList"
        :key="index"
        :index="index"
        :variant="'object'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customize-drawer {
  width: 100%;
  height: 100%;
  background: $lightgray100;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  padding: $padding-xl-rem $padding-m-rem;

  &.typeface, &.object {
    justify-content: space-between;
    row-gap: 8px;
  }

  &.color {
    justify-content: center;
    align-items: center;
  }

}
</style>