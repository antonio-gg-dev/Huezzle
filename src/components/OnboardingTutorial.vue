<template>
  <div
    class="onboarding-tutorial__step"
    v-if="settings.showTutorial() && !board.isShuffled && !alreadyPlayed"
  >
    {{ $t('tutorial_start_message') }}
  </div>

  <div
    class="onboarding-tutorial__step"
    v-else-if="settings.showTutorial() && board.isShuffled && board.movements === 0"
  >
    {{ $t(settings.getMode() === 'touch' ? 'tutorial_touch_message' : 'tutorial_grab_message') }}
  </div>

  <div
    class="onboarding-tutorial__step"
    v-else-if="settings.showTutorial() && board.isShuffled && board.movements === 1"
  >
    {{ $t('tutorial_sort_message') }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Board } from '@/entities/Board'
import { Settings } from '@/entities/Settings'

export default defineComponent({
  props: {
    board: {
      required: true,
      type: Board as PropType<Board>
    },
    settings: {
      required: true,
      type: Settings as PropType<Settings>
    },
    alreadyPlayed: {
      required: true,
      type: Boolean as PropType<boolean>
    }
  }
})
</script>

<style scoped lang="scss">
.onboarding-tutorial {
  &__step {
    pointer-events: none;
    text-align: center;
    font-weight: 700;
    font-size: 2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    background-color: #0008;
    padding: 1rem 2rem;
    max-width: calc(100svw - 2rem);
    border-radius: 0.1rem;
    z-index: 1;
    animation: appear calc(3.4s * var(--speed, 1)) linear,
      blink calc(0.9s * var(--speed, 1)) linear calc(3.4s * var(--speed, 1)) alternate infinite;

    @keyframes appear {
      0% {
        color: #fff0;
        background-color: #0000;
      }
      60% {
        color: #fff0;
        background-color: #0000;
      }
      100% {
        color: #fff;
        background-color: #0008;
      }
    }

    @keyframes blink {
      0% {
        color: #fff;
      }
      100% {
        color: #fff8;
      }
    }
  }
}
</style>
