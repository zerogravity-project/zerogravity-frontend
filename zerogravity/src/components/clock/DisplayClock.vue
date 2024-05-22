<script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'

  const router = useRouter()

  const props = defineProps({
    size: {
      type: String,
      default: 'm',
    },
    color: {
      type: String,
      default: '#FF2E00',
    },
    isClock: {
      type: Boolean,
      default: true,
    },
  })

  const hours = ref('')
  const minutes = ref('')
  const seconds = ref('')
  const input = ref(null)
  const inputColor = ref(props.color)
  const isTimer = ref(false)
  const maxRange = 50

  const moveCursorToEnd = (event) => {
    if (event) {
      const inputElement = event.target

      if (inputElement) {
        if (inputElement.value === '') {
          seconds.value = '00'
          minutes.value = '0'
        }

        inputElement.style.caretColor = 'transparent'
        inputColor.value = '#4E596860'

        setTimeout(() => {
          inputElement.setSelectionRange(maxRange, maxRange)
          inputElement.style.caretColor = ''
        }, 0)
      }
    }
  }

  watch(seconds, () => {
    if (!isTimer.value) {
      seconds.value = seconds.value.replace(/\D/g, '')
      const inputSecond = `${seconds.value.charAt(1)}${seconds.value.charAt(2)}`
      const inputMinute = `${seconds.value.charAt(0)}`

      if (seconds.value.length >= 3) {
        if (minutes.value.charAt(0) === '0') {
          minutes.value = `${seconds.value.charAt(0)}`
          seconds.value = `${seconds.value.charAt(1)}${seconds.value.charAt(2)}`

          if (inputSecond > 59 && inputMinute !== '0') {
            inputColor.value = 'blue'
            setTimeout(() => {
              if (inputMinute === '9') {
                seconds.value = '59'
              } else {
                seconds.value = '00'
                minutes.value = `${parseInt(inputMinute) + 1}`
              }
              inputColor.value = props.color
            }, 300)
          }
        } else {
          seconds.value = `${seconds.value.charAt(0)}${seconds.value.charAt(1)}`
        }
      } else if (seconds.value.length <= 1) {
        seconds.value = `${minutes.value.charAt(0)}${seconds.value.charAt(0)}`
        minutes.value = '0'
      } else if (seconds.value === '') {
        seconds.value = '00'
      }
    }
  })

  let frameId = null
  let lastUpdateTime = 0
  const updateInterval = 1000

  const updateTime = (timestamp) => {
    if (!lastUpdateTime || timestamp - lastUpdateTime >= updateInterval) {
      const now = new Date()
      hours.value = now.getHours().toString().padStart(2, '0')
      minutes.value = now.getMinutes().toString().padStart(2, '0')
      seconds.value = now.getSeconds().toString().padStart(2, '0')

      lastUpdateTime = timestamp
    }

    frameId = requestAnimationFrame(updateTime)
  }

  const emits = defineEmits(['checkTimer', 'checkAvailability', 'completeMeditation'])
  const transform = ref('')
  const userStore = useUserStore()
  const { recordStatus } = storeToRefs(userStore)

  const submit = () => {
    isTimer.value = true
    inputColor.value = '#4E596807'
    transform.value = { transform: 'scale(3)' }
    emits('checkTimer')

    setTimeout(() => {
      emits('checkAvailability')
    }, 1000)

    setTimeout(() => {
      const timer = (timestamp) => {
        if (timestamp - lastUpdateTime >= updateInterval) {
          if (seconds.value == 0) {
            if (minutes.value == 0) {
              cancelAnimationFrame(frameId)
              recordStatus.value.status = 'meditationComplete'
              recordStatus.value.emotionRecordState = 'moment'
              userStore.saveRecordStatusToSession()
              router.push('/record/emotion')
              return
            } else {
              seconds.value = 59
              minutes.value--
            }
          } else {
            seconds.value--
            if (seconds.value < 10) {
              seconds.value = `0${seconds.value}`
            }
          }
          lastUpdateTime = timestamp
        }

        frameId = requestAnimationFrame(timer)
      }

      frameId = requestAnimationFrame(timer)
    }, 2000)
  }

  onMounted(() => {
    if (props.isClock) {
      frameId = requestAnimationFrame(updateTime)
    }

    moveCursorToEnd()
  })

  onUnmounted(() => {
    cancelAnimationFrame(frameId)
  })
</script>

<template>
  <div
    :class="['clock', props.size]"
    :style="[{ color: props.color }, transform]"
  >
    <input
      v-if="props.isClock"
      type="text"
      name="hours"
      id="hours"
      placeholder="00"
      v-model="hours"
      class="hours en-font"
      :style="{ color: props.color }"
      :readonly="props.isClock"
    >
    <span
      v-if="props.isClock"
      class="colon"
    >:</span>
    <input
      type="text"
      name="minutes"
      id="minutes"
      placeholder="0"
      v-model="minutes"
      @focus="(event) => moveCursorToEnd(event)"
      :class="['minutes', 'en-font', { 'timer': !props.isClock }]"
      :style="{ color: inputColor }"
      readonly
      autocomplete="off"
    >
    <label
      v-if="!props.isClock"
      :style="{ color: isTimer ? inputColor : '' }"
      for="minutes"
    >m</label>
    <span
      :style="{ color: isTimer ? inputColor : '' }"
      class="colon"
    >:</span>
    <input
      ref="input"
      type="text"
      name="seconds"
      id="seconds"
      placeholder="00"
      v-model="seconds"
      @focus="(event) => moveCursorToEnd(event)"
      @keypress.enter="submit"
      class="seconds en-font"
      :style="{ color: inputColor }"
      :readonly="props.isClock || isTimer"
      autocomplete="off"
    >
    <label
      v-if="!props.isClock"
      :style="{ color: isTimer ? inputColor : '' }"
      for="minutes"
    >s</label>
  </div>
</template>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.clock {
  display: flex;
  justify-content: center;
  gap: 2px;
  padding: $padding-m-rem;
  transition: 1s;

  label {
    display: flex;
    align-items: end;
    font-size: 88px;
    color: $grayopacity10;
    padding-bottom: 34px;
  }

  input {
    padding: 10px 0px;
    display: flex;
    width: 200px;
    height: 200px;
    border: none;
    background-color: transparent;
    font-size: 180px;
    line-height: 100%;
    text-align: center;

    &::placeholder {
      color: $grayopacity10
    }

    &:focus {
      outline: none;
    }

    &.timer {
      width: 100px;
    }
  }

  span {
    font-size: 170px;
    line-height: 110%;
  }
}

@media(max-width: 720px) {
  .clock {
    gap: 2px;
    padding: $padding-xs-rem;

    label {
      font-size: 54px;
      color: $grayopacity10;
      padding-bottom: 28px;
    }

    input {
      width: 144px;
      height: 144px;
      padding: 8px 0px;
      font-size: 128px;

      &.timer {
        width: 72px
      }
    }

    span {
      font-size: 118px;
      line-height: 110%;
    }
  }
}

@media (max-width: 576px) {
  .clock {
    gap: 2px;
    padding: $padding-xs-rem;

    label {
      font-size: 36px;
      color: $grayopacity10;
      padding-bottom: 18px;
    }

    input {
      width: 92px;
      height: 90px;
      padding: 8px 0px;
      font-size: 84px;

      &.timer {
        width: 46px
      }
    }

    span {
      font-size: 80px;
      line-height: 112%;
    }
  }
}
</style>
