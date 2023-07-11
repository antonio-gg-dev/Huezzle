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
      :data-cell-id="cell.id"
      :data-cell-color="cell.color"
      :class="[
        'game-board__cell',
        cell.isFixed && 'game-board__cell--fixed',
        !cell.isFixed && board.isShuffled && 'game-board__cell--draggable',
        fromId === cell.id && ghostActive && 'game-board__cell--grabbed'
      ]"
      :style="{
        '--color': cell.color
      } as CSSStyleDeclaration"
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
    grab (event: MouseEvent | TouchEvent) {
      if (!this.board.isShuffled) {
        return
      }

      const cell = document.elementFromPoint(
        'pageX' in event ? event.pageX : event.touches[0].pageX,
        'pageY' in event ? event.pageY : event.touches[0].pageY
      )

      if (!cell) {
        return
      }

      const rect = cell.getBoundingClientRect()

      this.ghostStartTop = `${rect.top}px`
      this.ghostStartLeft = `${rect.left}px`
      this.ghostWidth = `${rect.width}px`
      this.ghostHeight = `${rect.height}px`

      this.ghostTop = `${'pageY' in event ? event.pageY : event.touches[0].pageY}px`
      this.ghostLeft = `${'pageX' in event ? event.pageX : event.touches[0].pageX}px`
      this.fromId = cell.getAttribute('data-cell-id') ?? null
      this.ghostColor = cell.getAttribute('data-cell-color') ?? null
    },

    drop (event: MouseEvent | TouchEvent) {
      if (!this.board.isShuffled) {
        return
      }

      if (this.fromId === null) {
        return
      }

      const cellId = document.elementFromPoint(
        'pageX' in event ? event.pageX : event.changedTouches[0].pageX,
        'pageY' in event ? event.pageY : event.changedTouches[0].pageY
      )?.getAttribute('data-cell-id')

      if (cellId) {
        this.board.swap(this.fromId, cellId)
      }

      this.fromId = null
      this.ghostColor = null
      this.ghostWidth = null
      this.ghostHeight = null
      this.ghostStartTop = null
      this.ghostStartLeft = null
      this.ghostTop = null
      this.ghostLeft = null
    },

    over (event: MouseEvent | TouchEvent) {
      if (!this.board.isShuffled) {
        return
      }

      this.ghostTop = `${'pageY' in event ? event.pageY : event.touches[0].pageY}px`
      this.ghostLeft = `${'pageX' in event ? event.pageX : event.touches[0].pageX}px`
    }
  },

  mounted () {
    document.addEventListener('mousedown', this.grab)
    document.addEventListener('touchstart', this.grab)
    document.addEventListener('mousemove', this.over)
    document.addEventListener('touchmove', this.over)
    document.addEventListener('mouseup', this.drop)
    document.addEventListener('touchend', this.drop)
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
      pointer-events: none;
    }

    &--grabbed {
      background-color: transparent;
    }
  }

  &__ghost {
    display: none;
    pointer-events: none;

    &--active {
      display: block;
      width: var(--width, 0);
      height: var(--height, 0);
      top: var(--top, 0);
      left: var(--left, 0);
      background-color: var(--color, transparent);
      position: fixed;
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
