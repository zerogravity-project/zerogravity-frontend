<script setup>
  const props = defineProps({
    titleText: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
    style: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <div :class="['drawer-header-container', props.style]">
    <h3 class="title-text en-font">
      {{ props.titleText }}
    </h3>
    <!-- props 필요 -->
    <a
      v-if="props.buttonText"
      class="text-button"
      href=""
    >{{ props.buttonText }}</a>

    <div
      v-if="props.buttonIcon"
      class="icon-button"
    >
      <span class="material-symbols-outlined">
        {{ props.buttonIcon }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-header-container {
    display: flex;
    padding: $padding-xs-rem $padding-m-rem;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $lightgray300;

    &.gray{
      border-bottom: 1px solid $lightgray300;
      background-color: $lightgray100;

      .title-text{
        color: $gray700;
      }
    }

    &.white{
      border-bottom: 1px solid $lightgray300;
      background-color: $white900;

      .title-text{
        color: $black900;
      }
    }
}

.title-text {
    font-size: $btn-font-size-s;
    line-height: 15px;
}

.text-button {
    color: $grayopacity50;
    font-size: $btn-font-size-s;
    line-height: 15px;
    text-decoration: none;
}

.icon-button{
    color: $gray700;
}
</style>