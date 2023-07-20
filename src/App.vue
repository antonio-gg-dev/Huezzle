<template>
  <h1 class="app__header">
    Huezzle
  </h1>

  <GameBoard
    :board="board"
    @start="start"
  />

  <FooterOptions
    :show-victory-button="!!score"
    @open-victory-popup="isVictoryPopupOpen = true"
  />

  <VictoryPopup
    v-if="score && isVictoryPopupOpen"
    :movements="score.movements"
    :time="score.time"
    @close="isVictoryPopupOpen = false"
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

export default defineComponent({
  components: {
    FooterOptions,
    VictoryPopup,
    GameBoard
  },

  data () {
    return {
      ...bindings,
      board: new GameGenerator().generate(),
      isVictoryPopupOpen: true,
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

        this.score = new Score(
          new DifficultyGenerator(this.startAt).generate(),
          this.time,
          this.board.movements
        )

        this.scoreRepository.save(this.startAt, this.score)
      }
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
