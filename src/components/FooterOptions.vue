<template>
  <TransitionGroup
    tag="footer"
    name="footer-options__fade"
    class="footer-options__container"
  >
    <button
      v-if="showVictoryButton"
      key="victory"
      class="footer-options__button"
      :title="$t('share_button_label')"
      @click="$emit('openVictoryPopup')"
    >
      <img
        class="footer-options__icon"
        src="/img/victory.svg"
        alt=""
      >
    </button>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  emits: [
    'openVictoryPopup'
  ],
  props: {
    showVictoryButton: {
      required: true,
      type: Boolean as PropType<boolean>
    }
  }
})
</script>

<style scoped lang="scss">
.footer-options {
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button {
    all: unset;
    display: grid;
    height: 50%;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    transition: background-color 0.2s linear;
    background-color: transparent;
    cursor: pointer;
    place-items: center;

    &:hover, &:focus {
      background-color: #eee;

      @media (prefers-color-scheme: dark) {
        background-color: #222;
      }
    }
  }

  &__icon {
    height: 40%;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }
  }

  &__fade-enter-active,
  &__fade-leave-active {
    transition: all 0.2s linear;
  }

  &__fade-enter-from,
  &__fade-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
