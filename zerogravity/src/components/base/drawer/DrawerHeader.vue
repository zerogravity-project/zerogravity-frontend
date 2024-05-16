<script setup>
  const props = defineProps({
    titleText: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <div class="drawer-header-container">
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
    border-bottom: 1px solid $lightgray300;
    background: $lightgray100;
}

.title-text {
    color: $gray700;
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