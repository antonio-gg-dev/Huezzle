<template>
  <div class="statistics-page__page">
    <h2 class="statistics-page__header">
      {{ header }}
    </h2>

    <div class="statistics-page__label">
      {{ $t('statistics_best_movements') }}

      <strong class="statistics-page__value">
        {{ integerToHuman(bestMovements) }}
      </strong>
    </div>

    <div class="statistics-page__label">
      {{ $t('statistics_best_time') }}

      <strong class="statistics-page__value">
        {{ durationToHumanShort(bestTime) }}
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
        {{ durationToHumanShort(averageTime) }}
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
        {{ durationToHumanLong(totalTime) }}
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
    difficulty: {
      required: true,
      type: String as PropType<null | Difficulty>
    },
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

  computed: {
    header () {
      switch (this.difficulty) {
        case Difficulty.easy:
          return this.$t('difficulty_easy')
        case Difficulty.normal:
          return this.$t('difficulty_normal')
        case Difficulty.hard:
          return this.$t('difficulty_hard')
      }

      return this.$t('difficulty_all')
    }
  },

  methods: {
    durationToHumanShort (duration: Duration | null): string {
      if (!duration?.toMillis()) {
        return '—'
      }

      return duration.toFormat('m:ss')
    },

    durationToHumanLong (duration: Duration | null): string {
      const milliseconds = duration?.toMillis()

      if (!milliseconds) {
        return '—'
      }

      const second = 1000
      const minute = second * 60
      const hour = minute * 60
      const day = hour * 24
      const week = day * 7
      const month = day * 30.44
      const year = day * 365.25

      if (milliseconds >= year) {
        return Duration.fromObject({ year: +(milliseconds / year).toFixed(1) }).toHuman()
      }

      if (milliseconds >= month) {
        return Duration.fromObject({ month: +(milliseconds / month).toFixed(1) }).toHuman()
      }

      if (milliseconds >= week) {
        return Duration.fromObject({ week: +(milliseconds / week).toFixed(1) }).toHuman()
      }

      if (milliseconds >= day) {
        return Duration.fromObject({ day: +(milliseconds / day).toFixed(1) }).toHuman()
      }

      if (milliseconds >= hour) {
        return Duration.fromObject({ hour: +(milliseconds / hour).toFixed(1) }).toHuman()
      }

      if (milliseconds >= minute) {
        return Duration.fromObject({ minute: +(milliseconds / minute).toFixed(1) }).toHuman()
      }

      return Duration.fromObject({ second: +(milliseconds / second).toFixed(1) }).toHuman()
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

  &__header {
    margin: 0;
    font-size: 2rem;
    text-align: center;

    @media (min-width: 768px) {
      grid-column: span 2;
    }
  }

  &__label {
    font-size: 1rem;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__value {
    font-size: 2rem;
    display: block;
    font-weight: 700;
    margin-top: 0.5rem;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
