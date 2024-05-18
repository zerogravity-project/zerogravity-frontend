<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    titleText: {
      type: String,
      default: 'Title',
      required: true,
    },
    subTitleText: {
      type: String,
      default: 'Sub Title',
      required: true,
    },
    size: {
      type: String,
      default: 'm',
    },
    paddingTop: Boolean,
  })

  const subTitleLines = computed(() => {
    let lines = props.subTitleText.split('\n')

    lines = lines.map((line) => {
      return line.trim()
    })

    return lines
  })
</script>

<template>
  <header
    :class="['title-container', props.size]"
    :style="{paddingTop: props.paddingTop? '' : '0px'}"
  >
    <h1 class="title">
      {{ props.titleText }}
    </h1>
    <h3 class="sub-title-container">
      <span
        v-for="(line, index) in subTitleLines"
        :key="index"
        class="sub-title"
      >
        {{ line }}
      </span>
    </h3>
  </header>
</template>

<style lang="scss" scoped>
.title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px $padding-xl-rem 0;
  gap: 16px;

  .title {
    text-align: center;
    font-weight: 600;
    color: $black900;
  }

  .sub-title {
    display: block;
    text-align: center;
    color: $gray700;
    line-height: 160%;
  }

  &.l {
    gap: 28px;
    .title {
      font-size: $title-font-size-xxl-rem;
    }

    .sub-title {
      font-size: $title-font-size-s-rem;
    }
  }

  &.m {
    .title {
      font-size: $title-font-size-m-rem;
    }

    .sub-title {
      font-size: $text-font-size-m-rem;
    }
  }

  &.s {
    .title {
      font-size: $title-font-size-xs-rem;
    }

    .sub-title {
      font-size: $text-font-size-m-rem;
    }
  }
}

@media (max-width: 576px) {
  .title-box {
    padding-left: $mobile-base-margin;
    padding-right: $mobile-base-margin;

    &.l {
      padding-top: 100px;
      gap: 20px;
      .title {
        font-size: $title-font-size-l-rem;
      }

      .sub-title {
        font-size: $title-font-size-xs-rem;
      }
    }

    &.m , &.s{
      padding-top: 80px;
    }
  }
}
</style>