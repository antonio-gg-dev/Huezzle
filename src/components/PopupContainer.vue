<template>
  <div
    class="popup-container__backdrop"
    @click="$emit('close')"
  >
    <div
      class="popup-container__popup"
      @click.stop
    >
      <h1 class="popup-container__header">
        <slot name="header" />
      </h1>

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: [
    'close'
  ]
})
</script>

<style scoped lang="scss">
.popup-container {
  &__backdrop {
    cursor: pointer;
    position: fixed;
    inset: 0;
    background-color: #fff5;
    backdrop-filter: blur(4px);
    animation: fade calc(0.1s * var(--speed, 1)) linear;
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

    .dark & {
      background-color: #1115;
    }

    .light & {
      background-color: #fff5;
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
}
</style>
