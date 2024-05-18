<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
  })

  const textLines = computed(() => {
    let lines = props.text.split('\n')

    lines = lines.map((line) => {
      return line.trim()
    })

    return lines
  })

</script>

<template>
  <div class="text-container">
    <p>
      <template v-if="props.text !== ''">
        <span
          v-for="line in textLines"
          :key="line"
        >{{ line }}</span>
      </template>

      <span
        v-if="props.text === ''"
        class="placeholder"
      >텍스트를 입력하세요.</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.text-container {
  padding: $padding-m-rem;
  color: $gray700;
  font-size: $text-font-size-s-rem;

  p {
    display: flex;
    line-height: 170%;
    flex-direction: column;

    span {
      display: block;
    }

    .placeholder {
      text-align: center;
      color: $lightgray300;
    }
  }
}

@media (max-width: 576px) {
  .text-container {
    font-size: $title-font-size-xs-rem;
  }
}
</style>