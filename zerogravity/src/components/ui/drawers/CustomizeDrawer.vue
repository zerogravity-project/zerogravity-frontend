<script setup>
  import { ref } from 'vue'
  import DrawerNavigation from '@/components/base/drawer/DrawerNavigation.vue'
  import DrawerHeader from '@/components/base/drawer/DrawerHeader.vue'
  import RadioButton from '@/components/base/button/RadioButton.vue'

  const props = defineProps({
    drawerStyle: {
      type: Object,
      default: null,
    },
  })

  const fontList = ref([
    'helvetica', 'arial', 'georgia', '',
  ])

  const colorList = ref([
    '#ff3b30', '#ff9500', '#ffcc00', '#34C759', '#00C7BE', '#007AFF', '#5856D6', '#FF008A', '#4E5968', '#222222',
  ])

</script>

<template>
  <aside
    class="right-drawer"
    :style="[props.drawerStyle]"
  >
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
  </aside>
</template>

<style lang="scss" scoped>
.right-drawer {
    position: fixed;
    right: 0;
    height: 100vh;
    border-left: 1px solid $lightgray300;
    background: $lightgray100;
    z-index: 5;
    transition: 0.5s;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  padding: $padding-xl-rem $padding-m-rem;
  &.typeface, &.object{
  justify-content: space-between;
  row-gap: 8px;
  }

  &.color{
    justify-content: center;
    align-items: center;
  }

}
</style>