<template>
  <PopupContainer
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('statistics_header') }}
    </template>

    <div class="statistics-popup__buttons-container">
      <button
        :class="[
          'statistics-popup__button',
          page === null && 'statistics-popup__button--active'
        ]"
        :title="$t('difficulty_all')"
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
          page === 'easy' && 'statistics-popup__button--active'
        ]"
        :title="$t('difficulty_easy')"
        @click="page = 'easy'"
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
        page === 'normal' && 'statistics-popup__button--active'
      ]"
        :title="$t('difficulty_normal')"
        @click="page = 'normal'"
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
          page === 'hard' && 'statistics-popup__button--active'
        ]"
        :title="$t('difficulty_hard')"
        @click="page = 'hard'"
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
        :played-games="statistics.playedGames"
        :total-time="statistics.totalTime"
        :total-movements="statistics.totalMovements"
        :average-time="statistics.averageTime"
        :average-movements="statistics.averageMovements"
        :best-time="statistics.bestTime"
        :best-movements="statistics.bestMovements"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === 'easy' && 'statistics-popup__page--active'
        ]"
        difficulty="easy"
        :played-games="statistics.easy.playedGames"
        :total-time="statistics.easy.totalTime"
        :total-movements="statistics.easy.totalMovements"
        :average-time="statistics.easy.averageTime"
        :average-movements="statistics.easy.averageMovements"
        :best-time="statistics.easy.bestTime"
        :best-movements="statistics.easy.bestMovements"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === 'normal' && 'statistics-popup__page--active'
        ]"
        difficulty="normal"
        :played-games="statistics.normal.playedGames"
        :total-time="statistics.normal.totalTime"
        :total-movements="statistics.normal.totalMovements"
        :average-time="statistics.normal.averageTime"
        :average-movements="statistics.normal.averageMovements"
        :best-time="statistics.normal.bestTime"
        :best-movements="statistics.normal.bestMovements"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === 'hard' && 'statistics-popup__page--active'
        ]"
        difficulty="hard"
        :played-games="statistics.hard.playedGames"
        :total-time="statistics.hard.totalTime"
        :total-movements="statistics.hard.totalMovements"
        :average-time="statistics.hard.averageTime"
        :average-movements="statistics.hard.averageMovements"
        :best-time="statistics.hard.bestTime"
        :best-movements="statistics.hard.bestMovements"
      />
    </div>
  </PopupContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Score } from '@/entities/Score'
import { Duration } from 'luxon'
import { Difficulty } from '@/services/DifficultyGenerator'
import StatisticsPage from '@/components/StatisticsPage.vue'
import PopupContainer from '@/components/PopupContainer.vue'

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

  data () {
    return {
      page: null as null | Difficulty
    }
  },

  computed: {
    statistics () {
      const statistics = {
        playedGames: Object.keys(this.scores).length,
        totalMovements: 0,
        totalTime: Duration.fromObject({}),
        averageMovements: 0,
        averageTime: Duration.fromObject({}),
        bestMovements: null as null | number,
        bestTime: null as null | Duration,
        [Difficulty.easy]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({}),
          bestMovements: null as null | number,
          bestTime: null as null | Duration
        },
        [Difficulty.normal]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({}),
          bestMovements: null as null | number,
          bestTime: null as null | Duration
        },
        [Difficulty.hard]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({}),
          bestMovements: null as null | number,
          bestTime: null as null | Duration
        }
      }

      for (const rawData in this.scores) {
        const score = this.scores[rawData]

        statistics.totalMovements += score.movements
        statistics.totalTime = statistics.totalTime.plus(score.time)
        statistics.bestMovements =
          score.movements < (statistics.bestMovements ?? Infinity)
            ? score.movements
            : statistics.bestMovements
        statistics.bestTime =
          score.time.toMillis() < (statistics.bestTime?.toMillis() ?? Infinity)
            ? score.time
            : statistics.bestTime

        const difficulty = score.difficulty

        if (statistics[difficulty]) {
          statistics[difficulty].playedGames++
          statistics[difficulty].totalMovements += score.movements
          statistics[difficulty].totalTime = statistics[difficulty].totalTime.plus(score.time)
          statistics[difficulty].bestMovements =
            score.movements < (statistics[difficulty].bestMovements ?? Infinity)
              ? score.movements
              : statistics[difficulty].bestMovements
          statistics[difficulty].bestTime =
            score.time.toMillis() < (statistics[difficulty].bestTime?.toMillis() ?? Infinity)
              ? score.time
              : statistics[difficulty].bestTime
        }
      }

      if (statistics.playedGames) {
        statistics.averageMovements = statistics.totalMovements / statistics.playedGames
        statistics.averageTime = Duration.fromMillis(statistics.totalTime.toMillis() / statistics.playedGames)
      }

      if (statistics.easy.playedGames) {
        statistics.easy.averageMovements = statistics.easy.totalMovements / statistics.easy.playedGames
        statistics.easy.averageTime = Duration.fromMillis(statistics.easy.totalTime.toMillis() / statistics.easy.playedGames)
      }

      if (statistics.normal.playedGames) {
        statistics.normal.averageMovements = statistics.normal.totalMovements / statistics.normal.playedGames
        statistics.normal.averageTime = Duration.fromMillis(statistics.normal.totalTime.toMillis() / statistics.normal.playedGames)
      }

      if (statistics.hard.playedGames) {
        statistics.hard.averageMovements = statistics.hard.totalMovements / statistics.hard.playedGames
        statistics.hard.averageTime = Duration.fromMillis(statistics.hard.totalTime.toMillis() / statistics.hard.playedGames)
      }

      return statistics
    }
  }
})
</script>

<style scoped lang="scss">
.statistics-popup {
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
    width: 5rem;
    height: 5rem;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    transition: all calc(0.2s * var(--speed, 1)) linear;
    background-color: transparent;
    cursor: pointer;
    place-items: center;

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
