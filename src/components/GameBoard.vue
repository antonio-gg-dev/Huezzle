<template>
  <div
    ref="ghost"
    :class="[
      'game-board__ghost',
      ghostActive && 'game-board__ghost--active',
    ]"
    :style="{
      '--color': ghostColor,
      '--width': ghostWidth,
      '--height': ghostHeight,
      '--startTop': ghostStartTop,
      '--startLeft': ghostStartLeft,
      '--top': ghostTop,
      '--left': ghostLeft,
    }"
  />

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
    }"
  >
    <div
      v-for="cell in board.cells"
      :key="cell.id"
      :class="[
        'game-board__cell',
        cell.isFixed && 'game-board__cell--fixed',
        !cell.isFixed && board.isShuffled && 'game-board__cell--draggable',
        fromId === cell.id && ghostActive && 'game-board__cell--grabbed'
      ]"
      :style="{
        '--color': cell.color
      } as CSSStyleDeclaration"
      :draggable="board.isShuffled && !cell.isFixed"
      @dragstart="event => grab(event, cell)"
      @dragover.prevent="over"
      @drop="drop(cell)"
      @touchstart="event => grab(event, cell)"
    />
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
      ghostColor: null as Cell['color'] | null,
      ghostWidth: null as string | null,
      ghostHeight: null as string | null,
      ghostStartTop: null as string | null,
      ghostStartLeft: null as string | null,
      ghostTop: null as string | null,
      ghostLeft: null as string | null
    }
  },
  props: {
    board: {
      required: true,
      type: Board as PropType<Board>
    }
  },
  computed: {
    ghostActive (): boolean {
      return this.ghostColor !== null &&
        this.ghostWidth !== null &&
        this.ghostHeight !== null &&
        this.ghostStartTop !== null &&
        this.ghostStartLeft !== null &&
        this.ghostTop !== null &&
        this.ghostLeft !== null
    }
  },
  methods: {
    grab (event: DragEvent, cell: Cell) {
      if (!this.board.isShuffled) {
        return
      }

      const target = event.currentTarget as HTMLElement

      if (target) {
        const rect = target.getBoundingClientRect()

        this.ghostStartTop = `${rect.top}px`
        this.ghostStartLeft = `${rect.left}px`
        this.ghostWidth = `${target.offsetWidth}px`
        this.ghostHeight = `${target.offsetHeight}px`
      }
      this.ghostTop = `${event.pageY}px`
      this.ghostLeft = `${event.pageX}px`
      this.fromId = cell.id
      this.ghostColor = cell.color
    },

    drop (cell: Cell) {
      if (!this.board.isShuffled) {
        return
      }

      if (this.fromId === null) {
        return
      }

      this.board.swap(this.fromId, cell.id)

      this.fromId = null
      this.ghostColor = null
      this.ghostWidth = null
      this.ghostHeight = null
      this.ghostStartTop = null
      this.ghostStartLeft = null
      this.ghostTop = null
      this.ghostLeft = null
    },

    over (event: DragEvent) {
      if (!this.board.isShuffled) {
        return
      }

      this.ghostTop = `${event.pageY}px`
      this.ghostLeft = `${event.pageX}px`
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
    aspect-ratio: 4 / 5;
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
        inset 0 0 0 1.25vh #fff;
    }

    &--grabbed {
      background-color: #00000001;
    }
  }

  &__ghost {
    display: none;

    &--active {
      display: block;
      width: var(--width, 0);
      height: var(--height, 0);
      top: var(--top, 0);
      left: var(--left, 0);
      background-color: var(--color, transparent);
      position: fixed;
      pointer-events: none;
      transform: translate(-50%, -50%) scale(1.2);
      animation: scale 0.1s linear;

      @keyframes scale {
        0% {
          top: var(--startTop, 0);
          left: var(--startLeft, 0);
          transform: translate(0, 0) scale(1);
        }
        100% {
          top: var(--top, 0);
          left: var(--left, 0);
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }
  }

  &__fade-move {
    transition: transform 0.2s linear;
  }
}
</style>
