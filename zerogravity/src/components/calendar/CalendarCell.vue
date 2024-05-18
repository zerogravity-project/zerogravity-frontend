<script setup>
  import { computed } from 'vue'
  import EmotionAsset from '../emotion/EmotionAsset.vue'

  const props = defineProps({
    date: {
      type: Number,
      default: 1,
    },
    isToday: {
      type: Boolean,
      default: false,
    },
    isSunday: {
      type: Boolean,
      default: false,
    },
    mainState: {
      type: String,
      default: '',
    },
    momentState: {
      type: String,
      default: '',
    },
    numericWidth: {
      type: Number,
      default: window.innerWidth,
    },
  })

  const cellClass = computed(() => {
    return `cell ${props.isToday ? 'today' : ''} ${props.isSunday ? 'sunday' : ''} 
    ${props.mainState ? 'main-state' : ''} ${props.momentState ? 'moment-state' : ''}`
  })

  const showMainStateAsset = computed(() => {
    return props.date !== null && props.mainState
  })

  const size = computed(() => {
    if (props.numericWidth > 1200) {
      return 'm'
    } else if (props.numericWidth > 992) {
      return 'm'
    } else if (props.numericWidth > 768) {
      return 's'
    } else if (props.numericWidth > 576) {
      return 's'
    } else if (props.numericWidth > 400) {
      return 's'
    } else {
      return 'xs'
    }
  })
</script>

<template>
  <div :class="cellClass">
    <div class="emotion-area">
      <span class="date-area">{{ props.date }}</span>
      <div
        v-if="props.date !== null && showMainStateAsset"
        class="emotion-asset-main-area"
      >
        <EmotionAsset
          :size="size"
          :emotion="props.mainState"
        />
      </div>
      <div
        v-else-if="props.date !== null && !props.mainState"
        class="no-image"
      >
        <EmotionAsset
          :size="size"
          :emotion="''"
        />
      </div>
      <div
        v-if="props.momentState"
        class="emotion-asset-moment-area"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $padding-xs-rem;
  border: solid 1px $lightgray100;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  background-color: $white900;
  box-sizing: border-box;
}

.today {
  background-color: $redopacity10;
}

.sunday {
  color: $orange900;
}

.emotion-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: $padding-xl-rem;
}

.date-area {
  position: absolute;
  top: 8px;
  left: 8px;
  color: $grayopacity50;
  font-size: $text-font-size-s-rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.emotion-asset-main-area {
  display: flex;
  justify-content: center;
  align-items: center;
}

.emotion-asset-moment-area {
  width: 1rem;
  height: 1rem;
  border-radius: $border-radius-full-rem;
  background-color: $grayopacity50;
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.no-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px dashed $lightgray300;

  span {
    color: $grayopacity50;
    font-size: $text-font-size-xs;
  }
}
</style>