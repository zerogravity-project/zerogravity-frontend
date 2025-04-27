<script setup>
  import LogoSvg from '@/components/others/LogoSvg.vue'
  // import ContentText from '@/components/text/ContentText.vue'
  import ActionButton from '@/components/button/ActionButton.vue'

  console.log(Kakao)
  const onClick = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://api.zerogv.com/login/oauth2/code/kakao',
    })
  }

</script>

<template>
  <section>
    <div class="login-form-container">
      <div class="logo-area">
        <LogoSvg
          :width="200"
          :height="60"
        />
        <p class="brand-message">
          <span>아무것도 하지 않기 위한 시간</span>
          <span>무중력의 세계로</span>
        </p>
      </div>
      <div class="login-button-container">
        <ActionButton
          @click="onClick"
          :text="'카카오 로그인'"
          :variant="'kakao'"
          :state="''"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 120px;
  background-color: $white900;
  border: 1px solid $lightgray300;
  border-radius: $border-radius-xs-rem;
  padding: 0 $mobile-margin-base-rem;
}

.logo-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
  gap: 32px;
}

.brand-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: $text-font-size-m-rem;
  font-weight: 300;
  color: $gray700;
}

.login-button-container {
  width: 360px;
  padding-bottom: 90px;
}

.kakao-login-button {
  width: 340px;
  cursor: pointer;
}

@media (max-width: 567px) {
  .login-form-container {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    height: 100%;
    background-color: $white900;
    border: none;
    border-radius: 0;
  }

  .logo-area {
    padding-top: 24vh;
  }

  .login-button-container {
    width: calc(100vw - 40px);
    padding-bottom: 20vh;
  }
}
</style>