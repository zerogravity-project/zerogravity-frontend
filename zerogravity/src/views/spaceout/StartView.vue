<script setup>
  import TitleText from '@/components/text/TitleText.vue'
  import DisplayClock from '@/components/clock/DisplayClock.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
</script>

<template>
  <div class="container">
    <header>
      <TitleText
        class="title"
        :title-text="'시간을 입력하세요.'"
        :sub-title-text="'아무것도 하지 않기 위한 시간을 입력해보세요.'"
        :size="'m'"
        :padding-top="true"
      />
    </header>
    <main>
      <div class="clock-area">
        <DisplayClock
          :is-clock="false"
        />
      </div>
    </main>
    <div class="button-area">
      <ActionButton
        :variant="'round'"
        :text-color="'white'"
        :background-color="'#ccc'"
        :border-color="'transparent'"
        :icon="'arrow_forward'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.clock-area {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-area {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 60px;
}
</style>
