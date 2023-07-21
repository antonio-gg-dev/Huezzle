<template>
  <div class="statistics-page__page">
    <div class="statistics-page__label">
      {{ $t('statistics_best_movements') }}

      <strong class="statistics-page__value">
        {{ integerToHuman(bestMovements) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_best_time') }}

      <strong class="statistics-page__value">
        {{ durationToHuman(bestTime) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_average_movements') }}

      <strong class="statistics-page__value">
        {{ decimalToHuman(averageMovements) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_average_time') }}

      <strong class="statistics-page__value">
        {{ durationToHuman(averageTime) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_total_movements') }}

      <strong class="statistics-page__value">
        {{ integerToHuman(totalMovements) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_total_time') }}

      <strong class="statistics-page__value">
        {{ durationToHuman(totalTime) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_played_games') }}
      <strong class="statistics-page__value">
        {{ integerToHuman(playedGames) }}
      </strong>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Duration } from 'luxon'
import { Difficulty } from '@/services/DifficultyGenerator'

export default defineComponent({
  emits: [
    'close'
  ],

  props: {
    bestMovements: {
      required: true,
      type: Number as PropType<null | number>
    },
    bestTime: {
      required: true,
      type: Object as PropType<null | Duration>
    },
    averageMovements: {
      required: true,
      type: Number as PropType<number>
    },
    averageTime: {
      required: true,
      type: Object as PropType<Duration>
    },
    totalMovements: {
      required: true,
      type: Number as PropType<number>
    },
    totalTime: {
      required: true,
      type: Object as PropType<Duration>
    },
    playedGames: {
      required: true,
      type: Number as PropType<number>
    }
  },

  data () {
    return {
      page: null as null | Difficulty
    }
  },

  methods: {
    durationToHuman (duration: Duration | null): string {
      if (!duration || !duration.toMillis()) {
        return '—'
      }

      return Duration.fromISO(duration.toISO() ?? '').toHuman()
    },

    integerToHuman (number: number | null): string {
      if (!number) {
        return '—'
      }

      return number.toLocaleString(undefined, {
        maximumFractionDigits: 0
      })
    },

    decimalToHuman (number: number): string {
      if (!number) {
        return '—'
      }

      return number.toLocaleString(undefined, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1
      })
    }
  }
})
</script>

<style scoped lang="scss">
.statistics-page {
  &__page {
    display: grid;
    gap: 2rem 4rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__label {
    font-size: 1rem;
    font-weight: 300;
  }

  &__value {
    font-size: 2rem;
    display: block;
    font-weight: 700;
    margin-top: 0.5rem;
  }
}
</style>
