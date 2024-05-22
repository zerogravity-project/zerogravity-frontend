<script setup>
  import HeadlineText from '@/components/text/HeadlineText.vue'
  import TextInput from '@/components/input/TextInput.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
</script>

<template>
  <div class="layout">
    <section class="main-area">
      <div class="main-title">
        <HeadlineText
          :size="'l'"
          :text="'설정'"
          :padding="[48, 0, 0, 0]"
        />
      </div>
      <div class="personal-area">
        <div class="personal-setting">
          <HeadlineText
            class="title"
            :size="'s'"
            :text="'개인 화면 설정'"
            :padding="[32, 32, 0, 32]"
          />
          <img
            src="../../assets/images/background.png"
            alt="Background Image"
          >
        </div>
        <div class="personal-info">
          <HeadlineText
            class="title"
            :size="'s'"
            :text="'기본 정보'"
            :padding="[32, 32, 0, 32]"
          />
          <div class="info-detail">
            <TextInput :label="'이름'" />
            <TextInput :label="'닉네임'" />
            <TextInput :label="'생년월일'" />
            <TextInput :label="'이메일'" />
          </div>
        </div>
      </div>
      <div class="button-area">
        <ActionButton
          class="buttons"
          :variant="'round'"
          :state="'primary'"
          :color="'gray'"
          :text="'회원탈퇴'"
        />
        <ActionButton
          class="buttons"
          :variant="'round'"
          :state="'primary'"
          :color="'gray'"
          :text="'로그아웃'"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>

.layout {
  display: flex;
  width: calc(100% - 18.75rem);
  margin-left: 15px;
  @media (max-width: 567px) {
    width: 100vw;
  }
}

.main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 2rem;

}

.main-title {
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: left;
  padding-left: 0.25rem;

}

.personal-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;

  .personal-setting,
  .personal-info {
    width: 100%;
    max-width: 50rem;
    padding: 0 0 2rem 0;
    border: solid 1px $lightgray300;
    background-color: $white900;
    border-radius: 0.5rem;

    .title {
      width: 100%;
      text-align: center;
      margin-bottom: 2rem;
    }

    .info-detail {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    .info-detail>* {
      width: 100%;
    }

    img {
      display: block;
      margin: 0 auto;
    }
  }
}

.button-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
