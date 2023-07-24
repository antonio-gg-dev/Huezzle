<template>
  <h1 class="app__header">
    Huezzle
  </h1>

  <GameBoard
    :board="board"
    :settings="settings"
    :already-played="!!score"
    @start="start"
  />

  <FooterOptions
    :show-victory-button="!!score"
    @open-victory-popup="openPopup = 'victory'"
    @open-statistics-popup="openPopup = 'statistics'"
    @open-settings-popup="openPopup = 'settings'"
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

  <SettingsPopup
    v-if="openPopup === 'settings'"
    @close="openPopup = null"
    @save="settingsRepository.store(settings)"
    :settings="settings"
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
import SettingsPopup from '@/components/SettingsPopup.vue'

export default defineComponent({
  components: {
    SettingsPopup,
    StatisticsPopup,
    FooterOptions,
    VictoryPopup,
    GameBoard
  },

  data () {
    return {
      ...bindings,
      board: new GameGenerator().generate(),
      openPopup: 'victory' as null | 'victory' | 'statistics' | 'settings',
      startAt: null as DateTime | null,
      endAt: null as DateTime | null,
      score: bindings.scoreRepository.get(DateTime.now()),
      settings: bindings.settingsRepository.get()
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
    },
    'board.movements' () {
      if (this.settings.showTutorial() && this.board.movements > 1) {
        this.settingsRepository.store(this.settings.makeTutorial())
      }
    }
  },

  beforeCreate () {
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
