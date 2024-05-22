<script setup>
  import RadioButton from './RadioButton.vue'
  import { computed } from 'vue'
  const props = defineProps({
    variant: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  })

  const selectedOption = defineModel()

  const computedSelected = computed(()=>{
    return parseInt(selectedOption.value.split('-')[0], 10)
  })
</script>

<template>
  <fieldset class="radios">
    <RadioButton
      v-for="(item, index) in props.list"
      v-model="selectedOption"
      :key="index"
      :variant="props.variant"
      :name="props.name"
      :index="index"
      :selection="item.name"
      :width="item.width"
      :is-checked="item.checked"
      :color="index === computedSelected ? item.color : ''"
    />
  </fieldset>
</template>

<style lang="scss" scoped>
.radios {
  display: flex;
  align-items: center;
}
</style>
