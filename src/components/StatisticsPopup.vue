<template>
  <div
    class="statistics-popup__backdrop"
    @click="$emit('close')"
  >
    <div
      class="statistics-popup__popup"
      @click.stop
    >
      <h1 class="statistics-popup__header">
        {{ $t('statistics_header') }}
      </h1>

      <div class="statistics-popup__buttons">
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
            page === 'chill' && 'statistics-popup__button--active'
          ]"
          :title="$t('difficulty_chill')"
          @click="page = 'chill'"
        >
          <img
            class="statistics-popup__icon"
            src="/img/statistics-chill.svg"
            alt=""
          >
        </button>

        <button
          :class="[
          'statistics-popup__button',
          page === 'skilled' && 'statistics-popup__button--active'
        ]"
          :title="$t('difficulty_skilled')"
          @click="page = 'skilled'"
        >
          <img
            class="statistics-popup__icon"
            src="/img/statistics-skilled.svg"
            alt=""
          >
        </button>

        <button
          :class="[
            'statistics-popup__button',
            page === 'challenge' && 'statistics-popup__button--active'
          ]"
          :title="$t('difficulty_challenge')"
          @click="page = 'challenge'"
        >
          <img
            class="statistics-popup__icon"
            src="/img/statistics-challenge.svg"
            alt=""
          >
        </button>
      </div>

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
          page === 'chill' && 'statistics-popup__page--active'
        ]"
        difficulty="chill"
        :played-games="statistics.chill.playedGames"
        :total-time="statistics.chill.totalTime"
        :total-movements="statistics.chill.totalMovements"
        :average-time="statistics.chill.averageTime"
        :average-movements="statistics.chill.averageMovements"
        :best-time="statistics.chill.bestTime"
        :best-movements="statistics.chill.bestMovements"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === 'skilled' && 'statistics-popup__page--active'
        ]"
        difficulty="skilled"
        :played-games="statistics.skilled.playedGames"
        :total-time="statistics.skilled.totalTime"
        :total-movements="statistics.skilled.totalMovements"
        :average-time="statistics.skilled.averageTime"
        :average-movements="statistics.skilled.averageMovements"
        :best-time="statistics.skilled.bestTime"
        :best-movements="statistics.skilled.bestMovements"
      />

      <StatisticsPage
        :class="[
          'statistics-popup__page',
          page === 'challenge' && 'statistics-popup__page--active'
        ]"
        difficulty="challenge"
        :played-games="statistics.challenge.playedGames"
        :total-time="statistics.challenge.totalTime"
        :total-movements="statistics.challenge.totalMovements"
        :average-time="statistics.challenge.averageTime"
        :average-movements="statistics.challenge.averageMovements"
        :best-time="statistics.challenge.bestTime"
        :best-movements="statistics.challenge.bestMovements"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Score } from '@/entities/Score'
import { Duration } from 'luxon'
import { Difficulty } from '@/services/DifficultyGenerator'
import StatisticsPage from '@/components/StatisticsPage.vue'

export default defineComponent({
  components: {
    StatisticsPage
  },

  emits: [
    'close'
  ],

  props: {
    scores: {
      required: true,
      type: Object as PropType<Record<string, Score>>
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
        [Difficulty.chill]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({}),
          bestMovements: null as null | number,
          bestTime: null as null | Duration
        },
        [Difficulty.skilled]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({}),
          bestMovements: null as null | number,
          bestTime: null as null | Duration
        },
        [Difficulty.challenge]: {
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

      if (statistics.playedGames) {
        statistics.averageMovements = statistics.totalMovements / statistics.playedGames
        statistics.averageTime = Duration.fromMillis(statistics.totalTime.toMillis() / statistics.playedGames)
      }

      if (statistics.chill.playedGames) {
        statistics.chill.averageMovements = statistics.chill.totalMovements / statistics.chill.playedGames
        statistics.chill.averageTime = Duration.fromMillis(statistics.chill.totalTime.toMillis() / statistics.chill.playedGames)
      }

      if (statistics.skilled.playedGames) {
        statistics.skilled.averageMovements = statistics.skilled.totalMovements / statistics.skilled.playedGames
        statistics.skilled.averageTime = Duration.fromMillis(statistics.skilled.totalTime.toMillis() / statistics.skilled.playedGames)
      }

      if (statistics.challenge.playedGames) {
        statistics.challenge.averageMovements = statistics.challenge.totalMovements / statistics.challenge.playedGames
        statistics.challenge.averageTime = Duration.fromMillis(statistics.challenge.totalTime.toMillis() / statistics.challenge.playedGames)
      }

      return statistics
    }
  }
})
</script>

<style scoped lang="scss">
.statistics-popup {
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

  &__buttons {
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
    transition: all 0.2s linear;
    background-color: transparent;
    cursor: pointer;
    place-items: center;

    &:hover, &:focus, &--active {
      background-color: #eee;

      @media (prefers-color-scheme: dark) {
        background-color: #333;
      }
    }
  }

  &__icon {
    height: 2rem;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }
  }

  &__page {
    overflow: hidden;
    visibility: hidden;
    height: 0;

    &--active {
      visibility: visible;
      height: auto;
    }
  }
}
</style>
