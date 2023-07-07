<template>
  <h1 class="app__header">
    Huezzle
  </h1>

  <GameBoard
    :board="board"
  />

  <footer>
    Holi
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
    margin: 0;
    font-size: 3rem;
    text-align: center;
    font-weight: lighter;
    align-self: center;
  }
}
</style>
