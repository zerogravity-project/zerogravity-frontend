<script setup>
  import { computed, ref, watch } from 'vue'
  import DrawerNavigation from '@/components/drawer/common/DrawerNavigation.vue'
  import RadioButtonGroup from '../input/RadioButtonGroup.vue'
  import DrawerHeader from '@/components/drawer/common/DrawerHeader.vue'

  const fontList = ref([
    { name: 'Helvetica', checked: true },
    { name: 'Arial', checked: false },
    { name: 'Georgia', checked: false },
    { name: 'Times', checked: false },
  ])

  const colorList = ref([
    { name: '#ff3b30', checked: true },
    { name: '#ff9500', checked: false },
    { name: '#ffcc00', checked: false },
    { name: '#34C759', checked: false },
    { name: '#00C7BE', checked: false },
    { name: '#007AFF', checked: false },
    { name: '#5856D6', checked: false },
    { name: '#FF008A', checked: false },
    { name: '#4E5968', checked: false },
    { name: '#222222', checked: false },
  ])

  const objectList = ref([
    { name: 'Tree', checked: true },
    { name: 'Cup', checked: false },
    { name: 'Light', checked: false },
    { name: 'Pillow', checked: false },
  ])

  const selectedFont = ref('')
  const selectedColor = ref('')
  const selectedObject = ref('')

  const selected = computed(()=>{
    return {font: selectedFont.value, color: selectedColor.value, object: selectedObject.value}
  })

  watch(selected, () => {
    console.log('Selected', selected)
  })

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
    <div class="btn-container">
      <RadioButtonGroup
        v-model="selectedFont"
        class="font-radios"
        :variant="'font'"
        :list="fontList"
        :name="'font'"
      />
    </div>

    <!-- Color -->
    <DrawerHeader
      :title-text="'Color'"
      :style="'white'"
    />
    <div class="btn-container">
      <RadioButtonGroup
        v-model="selectedColor"
        class="color-radios"
        :variant="'color'"
        :list="colorList"
        :name="'color'"
      />
    </div>

    <!-- Object -->
    <DrawerHeader
      :title-text="'Object'"
      :style="'white'"
    />
    <div class="btn-container">
      <RadioButtonGroup
        v-model="selectedObject"
        class="object-radios"
        :variant="'object'"
        :list="objectList"
        :name="'object'"
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

  .font-radios, .object-radios {
    justify-content: space-between;
    width: 100%;
    row-gap: 8px;
  }

  .color-radios {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 576px) {
.btn-container {
  overflow-x: auto;
  white-space: nowrap;
  @include hide-scrollbar;

  .font-radios, .object-radios {
    gap: 8px;
  }
}
}
</style>