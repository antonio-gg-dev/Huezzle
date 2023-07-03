<template>
  <div class="board">
    <template
      v-for="(row, index) in board.cells"
      :key="`r-${index}`"
    >
      <div
        v-for="(cell, index) in row"
        :key="`c-${index}`"
        class="cell"
        :style="{
          backgroundColor: cell.color,
        } as CSSStyleDeclaration"
      >

      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Board } from '@/entities/Board'

export default defineComponent({
  props: {
    board: {
      required: true,
      type: Board as PropType<Board>
    }
  }
})
</script>

<style scoped lang="scss">
.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 400px;
  margin: 0 auto;
}

.cell {
  aspect-ratio: 1 / 1
}
</style>
