<template>
  <TransitionGroup
    tag="div"
    class="board"
    @click="board.shuffle()"
    name="fade"
  >
    <div
      v-for="cell in board.cells.flat()"
      :key="cell.id"
      class="cell"
      :style="{
        backgroundColor: cell.color,
      } as CSSStyleDeclaration"
    >

    </div>
  </TransitionGroup>
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

.fade-move {
  transition: all 0.3s ease-in-out;
}
</style>
