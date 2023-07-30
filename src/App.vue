<template>
  <h1 class="app__header">
    Huezzle
  </h1>

  <UpdateBar />

  <NewPuzzle />

  <OnboardingTutorial
    :board="board"
    :settings="settings"
    :already-played="!!score"
  />

  <GameBoard
    :board="board"
    :settings="settings"
    :already-played="!!score"
    :show-hints="showHints"
    @start="start"
  />

  <FooterOptions
    :show-statistics-button="board.isSolved"
    @open-statistics-popup="openPopup = 'statistics'"
    :show-hints-button="!board.isSolved && showHintsButton && this.requestedHints < 3"
    @show-hints="handleShowHints"
    :show-victory-button="!!score"
    @open-victory-popup="openPopup = 'victory'"
    @open-settings-popup="openPopup = 'settings'"
  />

  <StatisticsPopup
    :is-open="openPopup === 'statistics'"
    @close="openPopup = null"
    :scores="scoreRepository.getAll()"
  />

  <VictoryPopup
    :is-open="score !== null && openPopup === 'victory'"
    :score="score"
    @close="openPopup = null"
  />

  <SettingsPopup
    :is-open="openPopup === 'settings'"
    @close="openPopup = null"
    @save="saveSettings"
    @credits="openPopup = 'credits'"
    :settings="settings"
  />

  <CreditsPopup
    :is-open="openPopup === 'credits'"
    @close="openPopup = null"
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
import { Theme, Animations, Mode } from '@/entities/Settings'
import CreditsPopup from '@/components/CreditsPopup.vue'
import UpdateBar from '@/components/UpdateBar.vue'
import OnboardingTutorial from '@/components/OnboardingTutorial.vue'
import NewPuzzle from '@/components/NewPuzzle.vue'
import { Save } from '@/entities/Save'
import { Board } from '@/entities/Board'

export default defineComponent({
  components: {
    UpdateBar,
    NewPuzzle,
    OnboardingTutorial,
    GameBoard,
    FooterOptions,
    StatisticsPopup,
    VictoryPopup,
    SettingsPopup,
    CreditsPopup
  },

  data () {
    return {
      ...bindings,
      board: new GameGenerator().generate(),
      openPopup: 'victory' as null | 'statistics' | 'victory' | 'settings' | 'credits',
      startAt: null as DateTime | null,
      endAt: null as DateTime | null,
      score: bindings.scoreRepository.get(DateTime.now()),
      settings: bindings.settingsRepository.get(),
      showHints: false,
      requestedHints: 0,
      showHintsButton: false
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
      setTimeout(() => {
        this.showHintsButton = true
      }, 30_000)
    },

    saveSettings () {
      this.settingsRepository.store(this.settings)

      this.setLanguage()
      this.setMode()
      this.setTheme()
      this.setAnimations()
    },

    setLanguage () {
      this.$i18n.locale = this.settings.getLanguage()
    },

    setTheme () {
      document.body.classList.remove(
        Theme.auto,
        Theme.dark,
        Theme.light
      )

      document.body.classList.add(this.settings.getTheme())
    },

    setMode () {
      document.body.classList.remove(
        Mode.both,
        Mode.grab,
        Mode.touch
      )

      document.body.classList.add(this.settings.getMode())
    },

    setAnimations () {
      document.body.classList.remove(
        Animations.disabled,
        Animations.fast,
        Animations.normal,
        Animations.slow
      )

      document.body.classList.add(this.settings.getAnimations())
    },

    handleShowHints () {
      if (this.requestedHints >= 3) {
        return
      }

      this.showHints = true
      this.showHintsButton = false
      this.requestedHints++

      setTimeout(() => {
        this.showHints = false
      }, 10_000)

      setTimeout(() => {
        this.showHintsButton = true
      }, 60_000)
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
          this.board.movements,
          this.requestedHints
        )

        this.scoreRepository.save(this.startAt, this.score)
      }
    },

    'board.movements' () {
      this.saveRepository.save(Save.fromBoard(this.board as Board, this.startAt as DateTime, this.requestedHints))

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
  },

  created () {
    this.setLanguage()
    this.setMode()
    this.setTheme()
    this.setAnimations()

    const save = this.saveRepository.get()

    if (save) {
      try {
        this.board.loadSave(save)

        this.startAt = save.startAt
        this.requestedHints = save.hints
      } catch (_) {}
    }
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
