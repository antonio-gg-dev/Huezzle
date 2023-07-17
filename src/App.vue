<template>
  <h1 class="app__header">
    Huezzle
  </h1>

  <GameBoard
    :board="board"
  />

  <footer>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import { GameGenerator } from '@/services/GameGenerator'

export default defineComponent({
  components: {
    GameBoard
  },
  data () {
    return {
      board: new GameGenerator().generate()
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
