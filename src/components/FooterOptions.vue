<template>
  <TransitionGroup
    tag="footer"
    name="footer-options__fade"
    class="footer-options__container"
  >
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
      v-if="showStatisticsButton"
      key="statistics"
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
      v-if="!showStatisticsButton"
      key="hints"
      class="footer-options__button"
      :title="$t('footer_hints_button_label')"
      @click="$emit('showHints')"
      :disabled="!showHintsButton"
    >
      <img
        class="footer-options__icon"
        src="/img/hints.svg"
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
    'openSettingsPopup',
    'showHints'
  ],

  props: {
    showStatisticsButton: {
      default: false,
      type: Boolean as PropType<boolean>
    },
    showHintsButton: {
      default: false,
      type: Boolean as PropType<boolean>
    },
    showVictoryButton: {
      default: false,
      type: Boolean as PropType<boolean>
    }
  }
})
</script>

<style scoped lang="scss">
.footer-options {
  &__container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }

  &__button {
    all: unset;
    position: relative;
    display: grid;
    height: min(50%, 20svw);
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    transition: all calc(0.2s * var(--speed, 1)) linear;
    background-color: transparent;
    cursor: pointer;
    place-items: center;
    box-shadow: 0 0 0.1rem 0 #0004,
      0 0.1rem 0.3rem 0 #0004;

    &:disabled {
      cursor: default;
      overflow: hidden;
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

      &::after {
        display: block;
        content: "";
        background-color: var(--color-disabled, #eee);
        position: absolute;
        top: 0;
        left: 0;
        right: 50%;
        bottom: 0;
        z-index: 2;
        animation: rotate-after 15s linear 15s;
        transform-origin: center right;

        @keyframes rotate-after {
          0% {
            transform: rotate(180deg);
            background-color: var(--color-enabled, #fff);
          }
          100% {
            transform: rotate(180deg);
            background-color: var(--color-enabled, #fff);
          }
        }

        @media (prefers-color-scheme: dark) {
          --color-enabled: #111;
          --color-disabled: #222;
        }

        .dark & {
          --color-enabled: #111;
          --color-disabled: #222;
        }

        .light & {
          --color-enabled: #fff;
          --color-disabled: #eee;
        }
      }

      &::before {
        display: block;
        content: "";
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        right: 50%;
        bottom: 0;
        z-index: 1;
        animation: rotate-before 30s linear;
        transform-origin: center right;

        @keyframes rotate-before {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (prefers-color-scheme: dark) {
          background-color: #111;
        }

        .dark & {
          background-color: #111;
        }

        .light & {
          background-color: #fff;
        }
      }
    }

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
    z-index: 3;

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
