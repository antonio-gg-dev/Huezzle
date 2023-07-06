<template>
  <TransitionGroup
    tag="div"
    :class="[
      'game-board__board',
      !board.isShuffled && 'game-board__board--not-shuffled'
    ]"
    @click="!board.isShuffled && board.shuffle()"
    name="game-board__fade"
    :style="{
      '--rowWidth': board.rowLength
    } as CSSStyleDeclaration"
  >
    <div
      v-for="cell in board.cells"
      :key="cell.id"
      class="game-board__cell"
      :style="{
        backgroundColor: cell.color
      } as CSSStyleDeclaration"
    >
      {{ cell.isFixed ? 'X' : '' }}
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
.game-board {
  &__board {
    display: grid;
    grid-template-columns: repeat(var(--rowWidth), 1fr);
    width: 400px;
    margin: 0 auto;

    &--not-shuffled {
      cursor: pointer;
    }
  }

  &__cell {
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
  }

  &__fade-move {
    transition: all 0.3s ease-in-out;
  }
}
</style>
