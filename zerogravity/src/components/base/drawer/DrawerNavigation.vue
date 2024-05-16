<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    titleText: {
      type: String,
      required: true,
    },
    subTitleText: {
      type: String,
      default: '',
    },
    detailText: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
    isProfile: Boolean,
  })

  const isOnlyTitle = computed(()=>{
    return props.subTitleText === '' && props.detailText === ''
  })

  defineEmits(['hide-drawer'])

</script>

<template>
  <div :class="['drawer-nav-area', {'profile': props.isProfile}]">
    <img
      v-if="props.isProfile"
      src="../../../assets/images/profile.png"
      alt=""
    >
    <div class="drawer-nav-container">
      <h3
        v-if="props.subTitleText"
        class="subtitle-text en-font"
      >
        {{ subTitleText }}
      </h3>
      <h2
        v-if="props.titleText"
        :class="['title-text', 'en-font', {'only-title': isOnlyTitle}]"
      >
        {{ props.titleText }}
      </h2>
      <div
        v-if="props.buttonIcon"
        @click="$emit('hide-drawer')"
        class="icon-button"
      >
        <span class="material-symbols-outlined">
          {{ props.buttonIcon }}
        </span>
      </div>
      <p
        v-if="props.detailText"
        class="detail-text"
      >
        {{ props.detailText }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  padding-left: $padding-m-rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
}

.drawer-nav-container {
  display: flex;
  position: relative;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  background-color: $white900;
}

.title-text {
  color: $gray700;
  font-size: $title-font-size-xs-rem;

  &.only-title{
    line-height: 24px;
  }
}

.subtitle-text {
  color: $grayopacity50;
  font-size: $text-font-size-s-rem;
}

.icon-button {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
}
</style>