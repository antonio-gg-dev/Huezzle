<template>
  <div
    class="settings-popup__backdrop"
    @click="$emit('close')"
  >
    <div
      class="settings-popup__popup"
      @click.stop
    >
      <h1 class="settings-popup__header">
        {{ $t('settings_header') }}
      </h1>

      <button
        @click="resetTutorial"
        class="settings-popup__button"
      >
        {{ $t('setting_reset_tutorial_button_label') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Settings } from '@/entities/Settings'

export default defineComponent({
  emits: [
    'close',
    'save'
  ],

  props: {
    settings: {
      required: true,
      type: Settings as PropType<Settings>
    }
  },

  methods: {
    resetTutorial () {
      this.settings.resetTutorial()
      this.$emit('save')
    }
  }
})
</script>

<style scoped lang="scss">
.settings-popup {
  &__backdrop {
    cursor: pointer;
    position: fixed;
    inset: 0;
    background-color: #fff5;
    backdrop-filter: blur(4px);
    animation: fade 0.1s linear;
    z-index: 3;
    overflow: hidden;

    @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 100%;
      }
    }

    @media (prefers-color-scheme: dark) {
      background-color: #1115;
    }
  }

  &__popup {
    position: fixed;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    cursor: default;
    background-color: #fff;
    padding: 3rem 4rem;
    border-radius: 0.1rem;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    z-index: 4;
    max-width: 100vw;
    max-height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }

    &:before {
      content: "";
      display: block;
      position: sticky;
      height: 5rem;
      background: linear-gradient(0deg, #fff0 0%, #ffff 100%);
      margin-bottom: -5rem;
      transform: translateY(-3rem);
      top: -1px;
      pointer-events: none;

      @media (prefers-color-scheme: dark) {
        background: linear-gradient(0deg, #2220 0%, #222f 100%);
      }
    }

    &:after {
      content: "";
      display: block;
      position: sticky;
      height: 5rem;
      background: linear-gradient(0deg, #ffff 0%, #fff0 100%);
      margin-top: -5rem;
      transform: translateY(3rem);
      bottom: -1px;
      pointer-events: none;

      @media (prefers-color-scheme: dark) {
        background: linear-gradient(0deg, #222f 0%, #2220 100%);
      }
    }
  }

  &__header {
    all: unset;
    display: block;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 300;
  }

  &__button {
    all: unset;
    display: inline-block;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    align-items: center;
    font-size: 1.5rem;
    background-color: transparent;
    padding: 1rem 2rem;
    border-radius: 99rem;
    transition: background-color 0.2s linear;
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      color: #fff;
    }

    &:hover, &focus {
      background-color: #eee;

      @media (prefers-color-scheme: dark) {
          background-color: #333;
      }
    }
  }
}
</style>
