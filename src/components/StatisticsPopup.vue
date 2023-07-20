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
        WIP: {{ $t('statistics_header') }}
      </h1>

      <div>
        {{ statistics.playedGames }}
      </div>
      <div>
        {{ statistics.totalMovements }}
      </div>
      <div>
        {{ durationToHuman(statistics.totalTime) }}
      </div>
      <div>
        {{ averageToHuman(statistics.averageMovements) }}
      </div>
      <div>
        {{ durationToHuman(statistics.averageTime) }}
      </div>

      <div>
        {{ statistics.chill.playedGames }}
      </div>
      <div>
        {{ statistics.chill.totalMovements }}
      </div>
      <div>
        {{ durationToHuman(statistics.chill.totalTime) }}
      </div>
      <div>
        {{ averageToHuman(statistics.chill.averageMovements) }}
      </div>
      <div>
        {{ durationToHuman(statistics.chill.averageTime) }}
      </div>

      <div>
        {{ statistics.skilled.playedGames }}
      </div>
      <div>
        {{ statistics.skilled.totalMovements }}
      </div>
      <div>
        {{ durationToHuman(statistics.skilled.totalTime) }}
      </div>
      <div>
        {{ averageToHuman(statistics.skilled.averageMovements) }}
      </div>
      <div>
        {{ durationToHuman(statistics.skilled.averageTime) }}
      </div>

      <div>
        {{ statistics.challenge.playedGames }}
      </div>
      <div>
        {{ statistics.challenge.totalMovements }}
      </div>
      <div>
        {{ durationToHuman(statistics.challenge.totalTime) }}
      </div>
      <div>
        {{ averageToHuman(statistics.challenge.averageMovements) }}
      </div>
      <div>
        {{ durationToHuman(statistics.challenge.averageTime) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Score } from '@/entities/Score'
import { Duration } from 'luxon'
import { Difficulty } from '@/services/DifficultyGenerator'

export default defineComponent({
  emits: [
    'close'
  ],

  props: {
    scores: {
      required: true,
      type: Object as PropType<Record<string, Score>>
    }
  },

  methods: {
    durationToHuman (duration: Duration): string {
      return Duration.fromISO(duration.toISO() ?? '').toHuman()
    },

    averageToHuman (average: number): string {
      return average.toLocaleString(undefined, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1
      })
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
        [Difficulty.chill]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({})
        },
        [Difficulty.skilled]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({})
        },
        [Difficulty.challenge]: {
          playedGames: 0,
          totalMovements: 0,
          totalTime: Duration.fromObject({}),
          averageMovements: 0,
          averageTime: Duration.fromObject({})
        }
      }

      for (const rawData in this.scores) {
        const score = this.scores[rawData]

        statistics.totalMovements += score.movements
        statistics.totalTime = statistics.totalTime.plus(score.time)

        const difficulty = score.difficulty

        statistics[difficulty].playedGames++
        statistics[difficulty].totalMovements += score.movements
        statistics[difficulty].totalTime = statistics[difficulty].totalTime.plus(score.time)
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
    display: grid;
    place-items: center;
    position: fixed;
    inset: 0;
    background-color: #fff5;
    backdrop-filter: blur(4px);
    animation: fade 0.1s linear;
    z-index: 3;

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
    text-align: center;
    cursor: default;
    background-color: #fff;
    padding: 3rem 4rem;
    border-radius: 0.1rem;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    z-index: 4;
    gap: 0 4rem;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }
  }

  &__header {
    all: unset;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 300;
    grid-area: header;
  }
}
</style>
