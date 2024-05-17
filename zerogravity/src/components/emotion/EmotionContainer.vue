<script setup>
  import { ref, computed } from 'vue'
  import EmotionAsset from '@/components/emotion/EmotionAsset.vue'
  import ChipsContainer from '@/components/chip/ChipsContainer.vue'

  const props = defineProps({
    size: {
      type: String,
      default: 'm',
    },
    style: {
      type: String,
      default: 'detail',
    },
    dir: {
      type: String,
      default: 'vertical',
    },
    emotion: {
      type: String,
      default: '감정 이름',
    },
    chipsStyle: {
      type: String,
      default: 'default',
    },
  })

  const list = ref([
    'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label', 'Label',
  ])

  const emotionContainerClass = computed(() => {
    return `emotion-container ${props.size} ${props.style} ${props.dir}`
  })

  const emotionAssetSize = computed(() => {
    if (props.style === 'label' && props.size === 'm') {
      return 'xxl'
    } else if (((props.style === 'detail' || (props.style === 'compact' && props.dir === 'vertical')) && props.size === 'm')
      || (props.style === 'label' && props.size === 's')) {
      return 'xl'
    } else if (((props.style === 'detail' || (props.style === 'compact' && props.dir === 'vertical')) && props.size === 's')
      || (props.style === 'mobile' && props.size === 'm')) {
      return 'l'
    } else if (props.style === 'mobile' && props.size === 's') {
      return 'm'
    } else if (props.dir === 'horizontal' && props.size === 'm') {
      return 's'
    }
    return 'xs'
  })

  const chipsSize = computed(() => {
    if (props.style === 'detail') {
      return 'm'
    } else if (((props.style === 'compact' && props.dir === 'vertical') || props.style === 'mobile') && props.size === 'm') {
      return 'm'
    }
    else if (props.style === 'label') {
      return ''
    }
    return 'xs'
  })

  const isCompact = computed(() => {
    return props.style !== 'detail'
  })
</script>

<template>
  <div :class="emotionContainerClass">
    <EmotionAsset
      :size="emotionAssetSize"
      :emotion="props.emotion"
    />

    <div class="emotion-info">
      <div class="emotion-title-area">
        <h2 class="emotion-title">
          {{ props.emotion }}
        </h2>
        <p
          v-if="props.dir === 'horizontal'"
          class="record-time"
        >
          오전 11시 11분
        </p>
      </div>

      <ChipsContainer
        v-if="chipsSize"
        :label-list="list"
        :size="chipsSize"
        :is-compact="isCompact"
        :style="chipsStyle"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emotion-container {
  &.detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    .emotion-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    &.m {
      padding-bottom: $padding-xl-rem;

      .emotion-title {
        font-size: $title-font-size-l-rem;
      }
    }

    &.s {
      padding-bottom: $padding-m-rem;

      .emotion-title {
        font-size: $title-font-size-s-rem;
      }
    }
  }

  &.compact {

    .emotion-info {
      display: flex;
      width: 100%;
    }

    &.vertical {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;

      .emotion-info {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      &.m {
        .emotion-info {
          gap: 24px;
        }

        .emotion-title {
          font-size: $title-font-size-l-rem;
        }
      }

      &.s {
        .emotion-info {
          gap: 16px;
        }

        .emotion-title {
          font-size: $title-font-size-s-rem;
        }
      }
    }

    &.horizontal {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: $padding-m-rem;

      .emotion-info {
        flex-direction: column;
        justify-content: center;
        gap: 12px;
      }

      .emotion-title-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .record-time {
        color: $grayopacity50;
        font-size: $text-font-size-xs-rem;
      }

      &.m {
        .emotion-info {
          width: calc(100% - 72px - 12px);
        }

        .emotion-title {
          font-size: $title-font-size-xs;
        }
      }

      &.s {
        .emotion-info {
          width: calc(100% - 52px - 12px);
        }

        .emotion-title {
          font-size: $text-font-size-m;
        }
      }
    }
  }

  &.label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    &.m {
      padding-bottom: $padding-xl-rem;

      .emotion-title {
        font-size: $title-font-size-xl;
      }
    }

    &.s {
      padding-bottom: $padding-m-rem;

      .emotion-title {
        font-size: $title-font-size-l-rem;
      }
    }
  }

  &.mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: $padding-xl-rem;

    .emotion-info {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &.m {
      gap: 16px;
      .emotion-info {
       gap: 18px;
      }

      .emotion-title {
        font-size: $title-font-size-xs;
      }
    }

    &.s {
      gap: 12px;
      .emotion-info {
       gap: 16px;
      }
      .emotion-title {
        font-size: $text-font-size-m;
      }
    }
  }
}
</style>