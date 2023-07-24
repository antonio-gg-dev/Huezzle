<template>
  <TransitionGroup
    tag="footer"
    name="footer-options__fade"
    class="footer-options__container"
  >
    <button
      key="victory"
      class="footer-options__button"
      :title="$t('footer_statistics_button_label')"
      @click="$emit('openStatisticsPopup')"
    >
      <img
        class="footer-options__icon"
        src="/img/statistics.svg"
        alt=""
      >
    </button>

    <button
      v-if="showVictoryButton"
      key="victory"
      class="footer-options__button"
      :title="$t('footer_victory_button_label')"
      @click="$emit('openVictoryPopup')"
    >
      <img
        class="footer-options__icon"
        src="/img/victory.svg"
        alt=""
      >
    </button>

    <button
      key="settings"
      class="footer-options__button"
      :title="$t('footer_settings_button_label')"
      @click="$emit('openSettingsPopup')"
    >
      <img
        class="footer-options__icon"
        src="/img/settings.svg"
        alt=""
      >
    </button>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  emits: [
    'openVictoryPopup',
    'openStatisticsPopup',
    'openSettingsPopup'
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
    transition: all 0.2s linear;
    background-color: transparent;
    cursor: pointer;
    place-items: center;

    &:hover, &:focus {
      background-color: #eee;

      @media (prefers-color-scheme: dark) {
        background-color: #222;
      }

      .dark & {
        background-color: #222;
      }

      .light & {
        background-color: #eee;
      }
    }
  }

  &__icon {
    height: 40%;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }

    .dark & {
      filter: invert(1);
    }

    .light & {
      filter: invert(0);
    }
  }

  &__fade-enter-from,
  &__fade-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
