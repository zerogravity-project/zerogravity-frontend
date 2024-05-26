<script setup>
  import LogoSvg from '@/components/others/LogoSvg.vue'
  import ContentText from '@/components/text/ContentText.vue'
  import ActionButton from '@/components/button/ActionButton.vue'

  const onClick = () => {
    window.location.href = 'http://localhost:8080/login/oauth2/code/google'
  }
</script>

<template>
  <section>
    <LogoSvg
      width="200"
      height="60"
    />
    <ContentText
      :text="'아무것도 하지 않기 위한 시간\n 무중력의 세계로'"
      :default-padding="true"
      :align="'center'"
    />
    <ActionButton
      @click="onClick"
      :text="'로그인하기'"
      :variant="'main'"
      :state="'primary'"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>