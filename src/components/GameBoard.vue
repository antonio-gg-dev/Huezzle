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
      :class="[
        'game-board__cell',
        cell.isFixed && 'game-board__cell--fixed',
        board.isShuffled && !cell.isFixed && 'game-board__cell--draggable'
      ]"
      :style="{
        '--color': cell.color
      } as CSSStyleDeclaration"
      :draggable="board.isShuffled && !cell.isFixed"
    >
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Board } from '@/entities/Board'
import { Cell } from '@/entities/Cell'

export default defineComponent({
  data () {
    return {
      fromId: null as Cell['id'] | null,
      toId: null as Cell['id'] | null
    }
  },
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
    width: 100%;
    aspect-ratio: 3 / 4;
    background-color: #000;

    &--not-shuffled {
      cursor: pointer;
    }
  }

  &__cell {
    background-color: var(--color);
    display: flex;
    align-items: center;
    justify-content: center;

    &--draggable {
      cursor: grab;
    }

    &--fixed {
      box-shadow: inset 0 0 0 1vh var(--color),
        inset 0 0 0 1.5vh #fff;
    }
  }

  &__fade-move {
    transition: all 0.3s ease-in-out;
  }
}
</style>
