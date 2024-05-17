<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    /**
     * 제목 텍스트
     * @type {string}
     */
    titleText: {
      type: String,
      required: true,
    },
    /**
     * 소제목 텍스트
     * @type {string}
     */
    subTitleText: {
      type: String,
      default: '',
    },
    /**
     * 설명 텍스트
     * @type {string}
     */
    detailText: {
      type: String,
      default: '',
    },
    /**
     * 버튼 아이콘
     * @type {string}
     */
    buttonIcon: {
      type: String,
      default: '',
    },
    /**
     * 프로파일 이미지 여부
     * @type {Boolean}
     */
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
      <p
        v-if="props.detailText"
        class="detail-text"
      >
        {{ props.detailText }}
      </p>
    </div>
    <div
      v-if="props.buttonIcon"
      @click="$emit('hide-drawer')"
      class="icon-button"
    >
      <span class="material-symbols-outlined">
        {{ props.buttonIcon }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.drawer-nav-area{
  background-color: $white900;
}

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

.detail-text{
  color: $grayopacity50;
  font-size: $text-font-size-s-rem;
}
</style>