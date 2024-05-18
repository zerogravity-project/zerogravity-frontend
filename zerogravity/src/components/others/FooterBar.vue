<script setup>
  import { ref } from 'vue'
  import LinkButton from '../button/LinkButton.vue'

  const menuList = ref([
    { text: '이용약관', defaultColor: '#4E5968', activeColor: '#4E5968', linkPath: 'terms'},
    { text: '개인정보보호방침', defaultColor: '#4E5968', activeColor: '#4E5968', linkPath: 'privacy-policy'},
  ])

</script>

<template>
  <footer class="footer">
    <ul class="footer-menu">
      <li
        class="footer-item"
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <LinkButton
          :text="menu.text"
          :default-color="menu.defaultColor"
          :active-color="menu.activeColor"
          :font-size="13"
          :link-path="menu.linkPath"
        />
      </li>
    </ul>
    <p class="copyright en-font">
      © Zero Gravity. All rights reserved.
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px $padding-xxl-rem;
}
.footer-menu{
  display: flex;

  .footer-item {
    padding: 0 $padding-m-rem;
    border-right: 1px solid $lightgray300;

    &:first-child{
      padding-left: 0;
    }

    &:last-child{
      padding-right: 0;
      border-right: none;
    }
  }
}
.copyright {
  color: $grayopacity50;
  font-size: $text-font-size-s-rem;
  padding: $padding-xxxs-rem;
}

@media (max-width: 576px) {
  .footer{
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 30px;
  }
}
</style>