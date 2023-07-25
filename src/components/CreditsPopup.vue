<template>
  <div
    class="credits-popup__backdrop"
    @click="$emit('close')"
  >
    <div
      class="credits-popup__popup"
      @click.stop
    >
      <h1 class="credits-popup__header">
        {{ $t('credits_header') }}
      </h1>

      <h2 class="credits-popup__section">
        {{ $t('credits_developer') }}
      </h2>

      <ul class="credits-popup__list">
        <li>Antonio González Gea</li>
      </ul>

      <h2 class="credits-popup__section">
        {{ $t('credits_thanks') }}
        <small class="credits-popup__sub">
          {{ $t('credits_sub_thanks')}}
        </small>
      </h2>

      <ul class="credits-popup__list">
        <li>Cristian Manuel Garrido García</li>
        <li>Daniel García Cañada</li>
        <li>Emmanuel Valverde Ramos</li>
        <li>Fabrizio Fasanando Sotelo</li>
        <li>Fuensanta Sansano</li>
        <li>Imanol Ramírez Poveda</li>
        <li>Jesús Valera Reales</li>
        <li>José María Valera Reales</li>
        <li>Luz María Agulló Chazarra</li>
        <li>Melania Agulló Chazarra</li>
        <li>Noah Cuadrado</li>
        <li>Rocío Tomé</li>
        <li>Roger Vila Crespo</li>

        <li class="credits-popup__long">{{ $t('credits_libraries') }}</li>
        <li>{{ $t('credits_family') }}</li>
      </ul>

      <div class="credits-popup__copy">
        © 2023 - Antonio González Gea
      </div>
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
.credits-popup {
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
    max-height: 70vh;
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

  &__grid {
    display: grid;
    gap: 2rem 4rem;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__header {
    all: unset;
    display: block;
    text-align: center;
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  &__section {
    all: unset;
    display: block;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  &__sub {
    display: block;
    font-size: 1rem;
  }

  &__list {
    all: unset;
    display: block;
    list-style: none;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 4rem;

    li {
      margin-bottom: 1rem;
    }
  }

  &__long {
    font-size: 1rem;
  }

  &__copy {
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
  }
}
</style>
