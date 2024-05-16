<script setup>
  import { computed, ref } from 'vue'
  const text = ref(`무엇인가를 써보았다....
      오늘 나는 와이어프레임을 그리고 앞으로 있을 우리의 프로젝트에 대해서 계획을 잡았다.
      그리고 나서 이제 곧 다시 서울을 올라가고 앞으로도 행복하게 살 것이다.
      내일도 화이팅이다.`)

  const textLines = computed(() => text.value.split('\n'))

</script>

<template>
  <div class="text-container">
    <p>
      <span
        v-for="line in textLines"
        :key="line"
      >{{ line }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.text-container {
  padding: 36px 16px;
  color: $gray700;
  font-size: $text-font-size-s;

  p {
    display: flex;
    line-height: 20px;
    flex-direction: column;
    gap: 8px;

    span {
      display: block;
    }
  }
}
</style>