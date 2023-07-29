<template>
  <PopupContainer
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('credits_header') }}
    </template>

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
      <li>Fuensanta Sansano Montoya</li>
      <li>Imanol Ramírez Poveda</li>
      <li>Javier Pérez</li>
      <li>Jesús Valera Reales</li>
      <li>Jonatan Galindo Álvarez</li>
      <li>José María Valera Reales</li>
      <li>Luz María Agulló Chazarra</li>
      <li>Melania Agulló Chazarra</li>
      <li>Noah Cuadrado</li>
      <li>Rocío Tomé</li>
      <li>Roger Vila Crespo</li>
      <li>Yaiza Maestre Deltell</li>

      <li class="credits-popup__long">{{ $t('credits_libraries') }}</li>
      <li>{{ $t('credits_family') }}</li>
    </ul>

    <div class="credits-popup__copy">
      © 2023 - Antonio González Gea
    </div>
  </PopupContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopupContainer from '@/components/PopupContainer.vue'
import { PropType } from 'vue/dist/vue'

export default defineComponent({
  components: { PopupContainer },
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
.credits-popup {
  &__section {
    all: unset;
    display: block;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: -1.5rem;
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
    margin-bottom: 5.5rem;

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
    margin-top: -1.5rem;
  }
}
</style>
