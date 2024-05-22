<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import ActionButton from '../button/ActionButton.vue'
  import LinkButton from '../button/LinkButton.vue'

  const props = defineProps({
    text: {
      type: String,
      default: 'Headline',
      required: true,
    },
    size: {
      type: String,
      default: 'm',
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    links: {
      type: Array,
      default: () => [],
    },
  })

  const buttonStyles = computed(() => {
    return props.buttons.map(button => ({
      variant: button.variant || '',
      customStyle: button.customStyle || '',
      backgroundColor: button.backgroundColor || '',
      textColor: button.textColor || '',
      icon: button.icon || '',
      text: button.text || '',
      borderColor: button.borderColor || '',
      borderRadius: button.borderRadius || '',
      hoverBackgroundColor: button.hoverBackgroundColor || '',
      hoverBorderColor: button.hoverBorderColor || '',
      disabledBackgroundColor: button.disabledBackgroundColor || '',
      disabledBorderColor: button.disabledBorderColor || '',
      disabledTextColor: button.disabledTextColor || '',
      linkPath: button.linkPath || '',
    }))
  })

  const linkStyles = computed(() => {
    return props.links.map(link => ({
      text: link.text || '',
      defaultColor: link.defaultColor || '#4e5968',
      activeColor: link.activeColor || '#ff2e00',
      fontSize: link.fontSize || 15,
      isActive: link.isActive || false,
      linkPath: link.linkPath || '',
    }))
  })

  const router = useRouter()

  const onClick = (path) => {
    router.push(`/${path}`)
  }
</script>

<template>
  <div class="headline-container">
    <h2 :class="['headline', props.size]">
      {{ props.text }}
    </h2>
    <div class="buttons-links">
      <div class="buttons">
        <ActionButton
          v-for="(button, index) in buttonStyles"
          :key="index"
          :variant="button.variant"
          :custom-style="button.customStyle"
          :background-color="button.backgroundColor"
          :text-color="button.textColor"
          :icon="button.icon"
          :text="button.text"
          :border-color="button.borderColor"
          :border-radius="button.borderRadius"
          :hover-background-color="button.hoverBackgroundColor"
          :hover-border-color="button.hoverBorderColor"
          :disabled-background-color="button.disabledBackgroundColor"
          :disabled-border-color="button.disabledBorderColor"
          :disabled-text-color="button.disabledTextColor"
          @click="onClick(button.linkPath)"
        />
      </div>
      <div class="links">
        <LinkButton
          v-for="(link, index) in linkStyles"
          :key="index"
          :text="link.text"
          :default-color="link.defaultColor"
          :active-color="link.activeColor"
          :font-size="link.fontSize"
          :is-active="link.isActive"
          :link-path="link.linkPath"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headline-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.headline {
  color: $black900;
  font-weight: 600;

  &.l {
    font-size: $title-font-size-xl-rem;
  }

  &.m {
    font-size: $title-font-size-s-rem;
  }
}

.buttons-links {
  display: flex;
  align-items: center;
}

.buttons {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.links {
  display: flex;
  align-items: center;
}

@media (max-width: 576px) {
  .headline {

    &.l {
      font-size: $title-font-size-s-rem;
    }

    &.m {
      font-size: $title-font-size-mobile-rem;
    }
  }
}
</style>
