<template>
  <Transition name="popup-container__fade">
    <div
      v-if="isOpen"
      class="popup-container__backdrop"
      @click="$emit('close')"
    >
      <div class="popup-container__wrapper">
        <div
          class="popup-container__popup"
          @click.stop
        >
          <h1 class="popup-container__header">
            <slot name="header" />
          </h1>

          <slot />
        </div>

        <button
          class="popup-container__button"
          @click="$emit('close')"
          :title="$t('popup_close')"
        >
          <img
            class="popup-container__icon"
            src="/img/close.svg"
            alt=""
          >
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from 'vue/dist/vue'

export default defineComponent({
  emits: [
    'close'
  ],

  props: {
    isOpen: {
      default: false,
      type: Boolean as PropType<boolean>
    }
  }
})
</script>

<style scoped lang="scss">
.popup-container {
  $parent: &;

  &__backdrop {
    cursor: pointer;
    position: fixed;
    inset: 0;
    background-color: #fff5;
    backdrop-filter: blur(4px);
    transition: opacity calc(0.1s * var(--speed, 1)) linear;
    z-index: 3;
    overflow: hidden;

    &#{$parent}__fade-enter-from,
    &#{$parent}__fade-leave-to {
      opacity: 0;
    }

    @media (prefers-color-scheme: dark) {
      background-color: #1115;
    }

    .dark & {
      background-color: #1115;
    }

    .light & {
      background-color: #fff5;
    }
  }

  &__wrapper {
    position: fixed;
    bottom: 50%;
    right: 50%;
    width: fit-content;
    height: fit-content;
    z-index: 4;
    transition: transform calc(0.1s * var(--speed, 1)) linear;
    transform: translate(50%, 50%);

    #{$parent}__fade-enter-from &,
    #{$parent}__fade-leave-to &{
      transform: translate(50%, calc(50% + 4rem));
    }
  }

  &__popup {
    cursor: default;
    background-color: #fff;
    padding: 3rem 4rem;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.1rem 0 #0006,
      0 0.1rem 0.3rem 0 #0006;
    max-height: 70svh;
    overflow-x: hidden;
    overflow-y: auto;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }

    .dark & {
      background-color: #222;
    }

    .light & {
      background-color: #fff;
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

      .dark & {
        background: linear-gradient(0deg, #2220 0%, #222f 100%);
      }

      .light & {
        background: linear-gradient(0deg, #fff0 0%, #ffff 100%);
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

      .dark & {
        background: linear-gradient(0deg, #222f 0%, #2220 100%);
      }

      .light & {
        background: linear-gradient(0deg, #ffff 0%, #fff0 100%);
      }
    }
  }

  &__header {
    all: unset;
    display: block;
    text-align: center;
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 2rem;
  }

  &__button {
    all: unset;
    display: grid;
    width: 5rem;
    height: 5rem;
    max-width: 10svh;
    max-height: 10svh;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    transition: all calc(0.2s * var(--speed, 1)) linear;
    cursor: pointer;
    place-items: center;box-shadow: 0 0 0.1rem 0 #0006,
      0 0.1rem 0.3rem 0 #0006;
    background-color: #fff;
    position: absolute;
    transform: translate(50%, 100%);
    right: 50%;
    bottom: -1rem;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }

    .dark & {
      background-color: #222;
    }

    .light & {
      background-color: #fff;
    }

    &:hover, &:focus {
      background-color: #eee;

      @media (prefers-color-scheme: dark) {
        background-color: #333;
      }

      .dark & {
        background-color: #333;
      }

      .light & {
        background-color: #eee;
      }
    }
  }

  &__icon {
    height: 2rem;

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
}
</style>
