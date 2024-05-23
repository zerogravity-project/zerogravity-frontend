<!-- components/dropdown/DropDownButton.vue -->
<script setup>
  import { computed } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useEmotionStore } from '@/stores/emotion'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    textColor: {
      type: String,
      default: 'black',
    },
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
    borderRadius: {
      type: String,
      default: '4px',
    },
    text: {
      type: String,
      default: '',
    },
    padding: {
      type: Array,
      default: () => [],
      validator: value => {
        return value.length >= 2 && value.length <= 4 && value.every(item => typeof item === 'string')
      },
    },
    hoverTextColor: {
      type: String,
      default: '',
    },
    hoverBackgroundColor: {
      type: String,
      default: '',
    },
    emotionRecordState: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['click'])

  const userStore = useUserStore()
  const emotionStore = useEmotionStore()
  const { recordStatus } = storeToRefs(userStore)
  const { emotionRecord, emotionRecords } = storeToRefs(emotionStore)

  const onClick = () => {
    emit('click')
    recordStatus.value.status = 'newEmotionRecord'
    recordStatus.value.emotionRecordState = props.emotionRecordState
    userStore.saveRecordStatusToSession()

    console.log(emotionRecords)

    if(recordStatus.value.emotionRecordState === 'main') {
      const formattedDate = new Date().toISOString().split('T')[0]
      console.log(formattedDate)
      const todayEmotions = emotionRecords.value[formattedDate]

      console.log(todayEmotions)
      if(todayEmotions){
        emotionRecord.value = todayEmotions.find(emotion => emotion.emotionRecordState === 'main')
        emotionStore.saveEmotionRecordToSession()
      }
    }
  }

  const computedPadding = computed(() => {
    if (props.padding.length === 2) {
      return `${props.padding[0]} ${props.padding[1]}`
    } else if (props.padding.length === 3) {
      return `${props.padding[0]} ${props.padding[1]} ${props.padding[2]}`
    } else if (props.padding.length === 4) {
      return `${props.padding[0]} ${props.padding[1]} ${props.padding[2]} ${props.padding[3]}`
    }
    return ''
  })

  const buttonStyles = computed(() => ({
    color: props.textColor,
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    padding: computedPadding.value,
    transition: 'color 0.3s, background-color 0.3s',
  }))

  const handleHover = (event) => {
    event.target.style.color = props.hoverTextColor
    event.target.style.backgroundColor = props.hoverBackgroundColor
  }

  const handleUnHover = (event) => {
    event.target.style.color = props.textColor
    event.target.style.backgroundColor = props.backgroundColor
  }
</script>

<template>
  <button
    @click="onClick"
    @mouseenter="handleHover"
    @mouseleave="handleUnHover"
    :style="buttonStyles"
    class="button"
  >
    <span class="text-area">
      {{ props.text }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  width: 153px;
  border: none;
  cursor: pointer;
}

.text-area {
  display: inline-block;
  width: 100%;
  color: $gray700;
  text-align: left;
  font-size: 14px;
  line-height: 16px;
}
</style>
