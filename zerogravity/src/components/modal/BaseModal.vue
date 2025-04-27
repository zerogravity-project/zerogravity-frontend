<script setup>
  import TitleText from '../text/TitleText.vue'
  import ActionButton from '../button/ActionButton.vue'

  const props = defineProps({
    titleText: {
      type: String,
      required: true,
    },
    subTitleText: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['hide', 'action'])

  const hideModal = () => {
    emit('hide')
  }

  const actionModal = () => {
    emit('action')
    emit('hide')
  }
</script>

<template>
  <div class="modal">
    <TitleText
      class="title"
      :title-text="props.titleText"
      :sub-title-text="props.subTitleText"
    />
    <div class="button-container">
      <ActionButton
        @click="hideModal"
        class="buttons"
        :style="{ borderRadius: '100px' }"
        :variant="'main'"
        :state="'secondary'"
        :text="'취소'"
      />
      <ActionButton
        @click="actionModal"
        class="buttons"
        :style="{ borderRadius: '100px' }"
        :variant="'main'"
        :state="'primary'"
        :text="props.buttonText"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal{
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: $padding-xxxl-rem $padding-xxl-rem;
  border-radius: $border-radius-l-rem;
  background-color: $white900;
}
.button-container{
  display: flex;
  gap: 16px;
}
</style>