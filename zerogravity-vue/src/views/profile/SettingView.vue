<script setup>
  import { ref } from 'vue'
  import HeadlineText from '@/components/text/HeadlineText.vue'
  import BaseModal from '@/components/modal/BaseModal.vue'
  import TextInput from '@/components/input/TextInput.vue'
  import ActionButton from '@/components/button/ActionButton.vue'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'

  const useStore = useUserStore()
  const { userInfo } = storeToRefs(useStore)

  const modalVisible = ref(false)

  const showModal = () => {
    modalVisible.value = true
  }

  const hideModal = () => {
    modalVisible.value = false
  }

  const deleteAccount = () => {
    useStore.deleteUser()
  }

  const logout = () => {
    useStore.logout()
  }

</script>

<template>
  <section class="main-area">
    <div class="main-title">
      <HeadlineText
        :size="'l'"
        :text="'설정'"
      />
    </div>
    <div class="personal-area">
      <div class="personal-info">
        <HeadlineText
          class="title"
          :size="'m'"
          :text="'기본 정보'"
        />
        <div class="info-detail">
          <TextInput
            :model-value="'Kakao'"
            :label="'로그인 방식'"
            :readonly="true"
          />
          <TextInput
            :model-value="userInfo && userInfo.nickname"
            :label="'이름'"
            :readonly="true"
          />
        </div>
      </div>
    </div>
    <div class="button-area">
      <div class="button-container">
        <ActionButton
          @click="showModal"
          class="buttons"
          :style="{ borderRadius: '100px' }"
          :variant="'main'"
          :state="'tertiary'"
          :text="'회원탈퇴'"
        />
        <ActionButton
          @click="logout"
          class="buttons"
          :style="{ borderRadius: '100px' }"
          :variant="'main'"
          :state="'tertiary'"
          :text="'로그아웃'"
        />
      </div>
    </div>
  </section>
  <div
    class="modal-area"
    :style="{display: modalVisible ? 'block' : 'none'}"
  >
    <div class="modal-container">
      <BaseModal
        @hide="hideModal"
        @action="deleteAccount"
        :title-text="'정말 탈퇴하시겠어요?'"
        :sub-title-text="'고객님의 모든 정보와 활동 기록이 삭제됩니다.\n 삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.'"
        :button-text="'회원탈퇴'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 0 2rem;
  gap: 24px;
}

.main-title {
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: left;
  padding-top: $padding-xxxl-rem;
  padding-left: $padding-xxxs-rem;
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
      padding: $padding-xxl-rem $padding-xxl-rem 0px;
      margin-bottom: 2rem;
    }

    .info-detail {
      display: flex;
      flex-direction: column;
      gap: 28px;
      padding: $padding-xxs-rem $padding-xxl-rem;
    }

    img {
      display: block;
      margin: 0 auto;
    }
  }
}

.button-area {
  display: flex;
  width: 100%;
  justify-content: end;

  .button-container {
    display: flex;
    gap: 1rem;
    padding: 0px 20px;
  }
}

@media (max-width: 576px) {
  .main-area {
    padding: 0;
  }

  .main-title {
    display: none;
  }

  .personal-area {
    .personal-info {
      border: none;
      border-radius: 0px;
      padding: 0 0 28px 0;

      .title {
        width: 100%;
        text-align: center;
        padding: $padding-xl-rem 20px 0px;
        margin-bottom: $margin-xl-rem;
      }

      .info-detail {
        gap: 20px;
        padding: $padding-xxs-rem 20px;
      }
    }

  }
}

.modal-area{
  position: fixed;
  top: 0;
  background-color: $blackopacity50;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

.modal-container{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
