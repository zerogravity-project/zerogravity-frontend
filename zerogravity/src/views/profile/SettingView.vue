<script setup>
  import DrawerContainer from '@/components/drawer/DrawerContainer.vue'
  import HeadlineText from '@/components/text/HeadlineText.vue'
  import TextInput from '@/components/input/TextInput.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
</script>

<template>
  <div class="layout">
    <DrawerContainer
      class="menu"
      variant="menu"
      :width="'18.75rem'"
      :is-right="false"
    />
    <main class="main-area">
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
          :variant="'round'"
          :border-color="'transparent'"
          :background-color="'#ccc'"
          :text="'회원탈퇴'"
          :text-color="'white'"
        />

        <ActionButton
          :variant="'round'"
          :border-color="'transparent'"
          :background-color="'#ccc'"
          :text="'로그아웃'"
          :text-color="'white'"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 18.75rem 1fr;
  height: 100vh;
}

.drawer-area {
  grid-column: 1 / 2;
}

.main-area {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
    height: fit-content;
    max-width: 50rem;
    padding: 0 0 2rem 0;
    background-color: white;
    border-radius: 0.5rem;

    .title {
      width: 100%;
      text-align: center;
      margin-bottom: 2rem;
      height: fit-content;
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
  gap: 1rem;
}
</style>
