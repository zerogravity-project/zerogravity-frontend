<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

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
    padding: {
      type: Array,
      default: () => [0, 0],
      validator: value => value.length === 2 || value.length === 3 || value.length === 4,
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

  const paddingStyle = computed(() => {
    const paddingArray = props.padding
    if (paddingArray.length === 2) {
      return `${paddingArray[0]}px ${paddingArray[1]}px`
    } else if (paddingArray.length === 3) {
      return `${paddingArray[0]}px ${paddingArray[1]}px ${paddingArray[2]}px`
    } else if (paddingArray.length === 4) {
      return `${paddingArray[0]}px ${paddingArray[1]}px ${paddingArray[2]}px ${paddingArray[3]}px`
    } else {
      return '0px'
    }
  })

  const buttonStyles = computed(() => {
    return props.buttons.map(button => ({
      variant: button.variant || '',
      style: button.style || '',
      backgroundColor: button.backgroundColor || '',
      textColor: button.textColor || '',
      icon: button.icon || '',
      text: button.text || '',
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

  const navigate = (path) => {
    router.push(`/${path}`)
  }
</script>

<template>
  <div class="headline-container">
    <h2
      :class="['headline', props.size]"
      :style="{ padding: paddingStyle }"
    >
      {{ props.text }}
    </h2>
    <div class="buttons-links">
      <div class="buttons">
        <button
          v-for="(button, index) in buttonStyles"
          :key="index"
          :class="['button', button.variant, button.style]"
          :style="{ backgroundColor: button.backgroundColor, color: button.textColor }"
        >
          <span
            v-if="button.icon"
            class="material-symbols-outlined"
          >{{ button.icon }}</span>
          {{ button.text }}
        </button>
      </div>
      <div class="links">
        <a
          v-for="(link, index) in linkStyles"
          :key="index"
          @click="navigate(link.linkPath)"
          :class="['link-button', { 'active-link': link.isActive }]"
          :style="{ color: link.isActive ? link.activeColor : link.defaultColor, fontSize: link.fontSize + 'px' }"
        >
          {{ link.text }}
        </a>
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
  font-weight: 500;

  &.l {
    font-size: $title-font-size-xl-rem;
  }

  &.m {
    font-size: $title-font-size-s-rem;
  }

  &.s {
    font-size: $title-font-size-mobile-rem;
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

  button {
    display: flex;
    align-items: center;

    .material-symbols-outlined {
      margin-right: 5px;
    }
  }
}

.links {
  display: flex;
  align-items: center;

  .link-button {
    padding: 4px;
    color: $gray700;
    text-align: center;
    cursor: pointer;

    &.active-link {
      text-decoration: underline;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
