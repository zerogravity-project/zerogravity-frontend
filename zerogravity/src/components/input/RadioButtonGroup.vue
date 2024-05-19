<script setup>
  import RadioButton from './RadioButton.vue'
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
    />
  </fieldset>
</template>

<style lang="scss" scoped>
.radios {
  display: flex;
  align-items: center;
}
</style>
