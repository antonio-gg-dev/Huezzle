<template>
  <PopupContainer
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('statistics_header') }}
    </template>

    <a
      class="statistics-popup__twitter-tips"
      href="https://twitter.com/huezzle"
      target="_blank"
    >
      {{ $t('twitter_tips_1') }}
      <strong class="statistics-popup__fake-link">
        @Huezzle<!--
      --></strong>
      {{ $t('twitter_tips_2') }}
    </a>

    <div class="statistics-popup__buttons-container">
      <button
        :class="[
          'statistics-popup__button',
          page === null && 'statistics-popup__button--active'
        ]"
        :title="$t(`difficulty.all`)"
        @click="page = null"
      >
        <img
          class="statistics-popup__icon"
          src="/img/statistics-all.svg"
          alt=""
        >
      </button>

      <button
        :class="[
          'statistics-popup__button',
          page === Difficulty.easy && 'statistics-popup__button--active'
        ]"
        :title="$t(`difficulty.${Difficulty.easy}`)"
        @click="page = Difficulty.easy"
      >
        <img
          class="statistics-popup__icon"
          src="/img/statistics-easy.svg"
          alt=""
        >
      </button>

      <button
        :class="[
        'statistics-popup__button',
        page === Difficulty.normal && 'statistics-popup__button--active'
      ]"
        :title="$t(`difficulty.${Difficulty.normal}`)"
        @click="page = Difficulty.normal"
      >
        <img
          class="statistics-popup__icon"
          src="/img/statistics-normal.svg"
          alt=""
        >
      </button>

      <button
        :class="[
          'statistics-popup__button',
          page === Difficulty.hard && 'statistics-popup__button--active'
        ]"
        :title="$t(`difficulty.${Difficulty.hard}`)"
        @click="page = Difficulty.hard"
      >
        <img
          class="statistics-popup__icon"
          src="/img/statistics-hard.svg"
          alt=""
        >
      </button>
    </div>

    <div class="statistics-popup__pages-container">
      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === null && 'statistics-popup__page--active'
        ]"
        :difficulty="null"
        :played-games="all.playedGames"
        :total-time="all.totalTime"
        :total-movements="all.totalMovements"
        :average-time="all.averageTime"
        :average-movements="all.averageMovements"
        :best-time="all.bestTime"
        :best-movements="all.bestMovements"
        :hints="all.hints"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === Difficulty.easy && 'statistics-popup__page--active'
        ]"
        :difficulty="Difficulty.easy"
        :played-games="easy.playedGames"
        :total-time="easy.totalTime"
        :total-movements="easy.totalMovements"
        :average-time="easy.averageTime"
        :average-movements="easy.averageMovements"
        :best-time="easy.bestTime"
        :best-movements="easy.bestMovements"
        :hints="easy.hints"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === Difficulty.normal && 'statistics-popup__page--active'
        ]"
        :difficulty="Difficulty.normal"
        :played-games="normal.playedGames"
        :total-time="normal.totalTime"
        :total-movements="normal.totalMovements"
        :average-time="normal.averageTime"
        :average-movements="normal.averageMovements"
        :best-time="normal.bestTime"
        :best-movements="normal.bestMovements"
        :hints="normal.hints"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === Difficulty.hard && 'statistics-popup__page--active'
        ]"
        :difficulty="Difficulty.hard"
        :played-games="hard.playedGames"
        :total-time="hard.totalTime"
        :total-movements="hard.totalMovements"
        :average-time="hard.averageTime"
        :average-movements="hard.averageMovements"
        :best-time="hard.bestTime"
        :best-movements="hard.bestMovements"
        :hints="hard.hints"
      />
    </div>
  </PopupContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Score } from '@/entities/Score'
import { Difficulty } from '@/services/DifficultyGenerator'
import StatisticsPage from '@/components/StatisticsPage.vue'
import PopupContainer from '@/components/PopupContainer.vue'
import { Statistics } from '@/entities/Statistics'

export default defineComponent({
  components: {
    PopupContainer,
    StatisticsPage
  },

  emits: [
    'close'
  ],

  props: {
    scores: {
      required: true,
      type: Object as PropType<Record<string, Score>>
    },
    isOpen: {
      default: false,
      type: Boolean as PropType<boolean>
    }
  },

  computed: {
    Difficulty () {
      return Difficulty
    },

    all () {
      return new Statistics(Object.values(this.scores))
    },

    easy () {
      return new Statistics(Object.values(this.scores), Difficulty.easy)
    },

    normal () {
      return new Statistics(Object.values(this.scores), Difficulty.normal)
    },

    hard () {
      return new Statistics(Object.values(this.scores), Difficulty.hard)
    }
  },

  data () {
    return {
      page: null as null | Difficulty
    }
  }
})
</script>

<style scoped lang="scss">
.statistics-popup {
  &__twitter-tips {
    display: block;
    border-left: #2ecc71 solid 0.5rem;
    padding: 1rem 2rem;
    border-radius: 0.1rem;
    margin-bottom: 2rem;
    text-decoration: none;
    color: #000;
    background-color: #eafaf1;

    @media (prefers-color-scheme: dark) {
      color: #fff;
      background-color: #05150c;
    }

    .dark & {
      color: #fff;
      background-color: #05150c;
    }

    .light & {
      color: #000;
      background: #eafaf1;
    }
  }

  &__fake-link {
    color: #17683a;
    text-decoration: underline;

    @media (prefers-color-scheme: dark) {
      color: #2ecc71;
    }

    .dark & {
      color: #2ecc71;
    }

    .light & {
      color: #17683a;
    }
  }

  &__buttons-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    margin-bottom: 2rem;
    gap: 0.5rem;
  }

  &__button {
    all: unset;
    display: grid;
    width: min(5rem, 20svw);
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    transition: all calc(0.2s * var(--speed, 1)) linear;
    background-color: transparent;
    cursor: pointer;
    place-items: center;
    box-shadow: 0 0 0.1rem 0 #0004,
      0 0.1rem 0.3rem 0 #0004;

    &:hover, &:focus, &--active {
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

  &__pages-container {
    white-space: nowrap;
    max-width: calc(100svw - 8rem);
    margin: 0 auto;
  }

  &__page {
    display: inline-grid;
    transition: opacity calc(0.1s * var(--speed, 1)) linear;
    width: 100%;
    margin-right: -100%;
    opacity: 0;

    &--active {
      opacity: 1;
    }
  }
}
</style>
