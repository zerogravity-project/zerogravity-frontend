<script setup>
  import { computed, watch, ref, onMounted, nextTick } from 'vue'
  import EmotionAsset from '../emotion/EmotionAsset.vue'
  import { useEmotionStore } from '@/stores/emotion'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    date: {
      type: Date,
      default: null,
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
    emotion: {
      type: String,
      default: '',
    },
    level:{
      type: Number,
      default: 0,
    },
    numericWidth: {
      type: Number,
      default: 0,
    },
    numericHeight: {
      type: Number,
      default: 0,
    },
    isSelected: Boolean,
  })

  const emotionStore = useEmotionStore()
  const { selectedDate, selectedMonth } = storeToRefs(emotionStore)

  const adjustment = 48

  const numericDate = computed(() => {
    return props.date ? props.date.getDate() : ''
  })

  const cellClass = computed(() => {
    return `cell ${props.isToday ? 'today' : ''} ${props.isSunday ? 'sunday' : ''} 
    ${props.mainState ? 'main-state' : ''} ${props.momentState ? 'moment-state' : ''}`
  })

  const size = computed(() => {
    return props.numericWidth < props.numericHeight? `${props.numericWidth-adjustment}px` : `${props.numericHeight-adjustment}px`
  })

  const isChanged = ref(false)

  const onClick = () => {
    isChanged.value =false
  }

  watch(selectedMonth, () => {
    isChanged.value = true
  })

  onMounted(() => {
    nextTick(()=>{
      isChanged.value = true
    })
  })
</script>

<template>
  <div
    :class="cellClass"
    :style="{backgroundColor: selectedDate.getDate() === numericDate && !isChanged ? '#f4f4f4' : ''}"
  >
    <div class="emotion-area">
      <span class="date-area">{{ numericDate }}</span>
      <div
        v-if="props.date !== null"
        class="emotion-asset-main-area"
      >
        <EmotionAsset
          @click="onClick"
          :size="size"
          :emotion="props.emotion"
          :level="props.level"
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
  width: 100%;
  height: 100%;
  padding: $padding-m-rem;
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
  cursor: pointer;
}

.emotion-asset-moment-area {
  width: 1rem;
  height: 1rem;
  border-radius: $border-radius-full-rem;
  background-color: $orange900;
  position: absolute;
  bottom: 8px;
  right: 8px;
}
</style>