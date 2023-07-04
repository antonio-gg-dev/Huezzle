<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <GameBoard
    :board="board"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import { GameGenerator } from '@/services/GameGenerator'

export default defineComponent({
  name: 'App',
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
