<template>
  <h1 class="app__header">
    Huezzle
  </h1>

  <GameBoard
    :board="board"
    :already-played="!!score"
    @start="start"
  />

  <FooterOptions
    :show-victory-button="!!score"
    @open-victory-popup="openPopup = 'victory'"
    @open-statistics-popup="openPopup = 'statistics'"
  />

  <VictoryPopup
    v-if="score && openPopup === 'victory'"
    :movements="score.movements"
    :time="score.time"
    @close="openPopup = null"
  />

  <StatisticsPopup
    v-if="openPopup === 'statistics'"
    @close="openPopup = null"
    :scores="scoreRepository.getAll()"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import { GameGenerator } from '@/services/GameGenerator'
import VictoryPopup from '@/components/VictoryPopup.vue'
import { DateTime, Duration } from 'luxon'
import { Score } from '@/entities/Score'
import { DifficultyGenerator } from '@/services/DifficultyGenerator'
import { bindings } from '@/bindings'
import FooterOptions from '@/components/FooterOptions.vue'
import StatisticsPopup from '@/components/StatisticsPopup.vue'

export default defineComponent({
  components: {
    StatisticsPopup,
    FooterOptions,
    VictoryPopup,
    GameBoard
  },

  data () {
    return {
      ...bindings,
      board: new GameGenerator().generate(),
      openPopup: 'victory' as null | 'victory' | 'statistics',
      startAt: null as DateTime | null,
      endAt: null as DateTime | null,
      score: bindings.scoreRepository.get(DateTime.now())
    }
  },

  computed: {
    time (): Duration | null {
      if (!this.endAt || !this.startAt) {
        return null
      }

      return this.endAt.diff(this.startAt)
    }
  },

  methods: {
    start () {
      this.startAt = DateTime.now()
    }
  },

  watch: {
    'board.isSolved' () {
      if (this.board.isSolved) {
        this.endAt = DateTime.now()

        if (!this.startAt || !this.time) {
          return
        }

        this.openPopup = 'victory'
        this.score = new Score(
          new DifficultyGenerator(this.startAt).generate(),
          this.time,
          this.board.movements
        )

        this.scoreRepository.save(this.startAt, this.score)
      }
    }
  },

  created () {
    document.documentElement.lang = this.$i18n.locale

    document.title = this.$t('meta_title')
    document.querySelectorAll(
      'meta[property="og:title"], meta[name="twitter:title"]'
    ).forEach(
      (title) => title.setAttribute('content', this.$t('meta_title'))
    )

    document.querySelectorAll(
      'meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]'
    ).forEach(
      (description) => description.setAttribute('content', this.$t('meta_description'))
    )
  }
})
</script>

<style lang="scss" scoped>
.app {
  &__header {
    all: unset;
    font-size: 3rem;
    text-align: center;
    font-weight: 300;
    align-self: center;
  }
}
</style>
