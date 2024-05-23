<script setup>
  import { computed } from 'vue'
  import EmotionAsset from '@/components/emotion/EmotionAsset.vue'
  import ChipsContainer from '@/components/chip/ChipsContainer.vue'

  const props = defineProps({
    size: {
      type: String,
      default: 'm',
    },
    state: {
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
    level: {
      type: Number,
      default: 0,
    },
    chipsState: {
      type: String,
      default: 'default',
    },
    reasonList: {
      type: Array,
      default: () => [],
    },
    time: {
      type: String,
      default: '',
    },
  })

  const emotionContainerClass = computed(() => {
    return `emotion-container ${props.size} ${props.state} ${props.dir}`
  })

  const formatedToKoreanTime = computed(() => {
    const time = props.time.split('T')[1]

    const [fullTime ] = time.split('.')
    let [hours, minutes ] = fullTime.split(':')
    const isPM = hours >= 12
    hours = hours % 12 || 12

    return `${isPM ? '오후' : '오전'} ${hours}시 ${minutes}분`
  })

  const emotionAssetSize = computed(() => {
    if (props.state === 'label' && props.size === 'm') {
      return 'xxl'
    } else if (((props.state === 'detail' || (props.state === 'compact' && props.dir === 'vertical')) && props.size === 'm')
      || (props.state === 'label' && props.size === 's')) {
      return 'xl'
    } else if (((props.state === 'detail' || (props.state === 'compact' && props.dir === 'vertical')) && props.size === 's')
      || (props.state === 'mobile' && props.size === 'm')) {
      return 'l'
    } else if (props.state === 'mobile' && props.size === 's') {
      return 'm'
    } else if (props.dir === 'horizontal' && props.size === 'm') {
      return 's'
    }
    return 'xs'
  })

  const chipsSize = computed(() => {
    if (props.state === 'detail') {
      return 'm'
    } else if (((props.state === 'compact' && props.dir === 'vertical') || props.state === 'mobile') && props.size === 'm') {
      return 'm'
    }
    else if (props.state === 'label') {
      return ''
    }
    return 'xs'
  })

  const isCompact = computed(() => {
    return props.state !== 'detail'
  })
</script>

<template>
  <div :class="emotionContainerClass">
    <EmotionAsset
      :size="emotionAssetSize"
      :emotion="props.emotion"
      :level="props.level"
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
          {{ formatedToKoreanTime }}
        </p>
      </div>

      <ChipsContainer
        v-if="chipsSize"
        :label-list="reasonList"
        :size="chipsSize"
        :is-compact="isCompact"
        :state="chipsState"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emotion-container {
  transition: 0.5s;
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