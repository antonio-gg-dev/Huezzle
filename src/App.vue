<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <GameBoard
    :board="board"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import { Board } from '@/entities/Board'
import { Cell } from '@/entities/Cell'

export default defineComponent({
  name: 'App',
  components: {
    GameBoard
  },
  data () {
    return {
      board: new Board([
        [new Cell('#FF3C00'), new Cell('#FF7600'), new Cell('#FFB000'), new Cell('#FFEA00')],
        [new Cell('#AA6255'), new Cell('#BD8F3F'), new Cell('#D1BC29'), new Cell('#E4E912')],
        [new Cell('#5588AA'), new Cell('#7CA87D'), new Cell('#A3C751'), new Cell('#CAE725')],
        [new Cell('#00AEFF'), new Cell('#3AC1BC'), new Cell('#75D37A'), new Cell('#AFE637')]
      ])
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
