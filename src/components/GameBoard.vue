<template>
  <div
    ref="ghost"
    :class="[
      'game-board__ghost',
      ghostActive && 'game-board__ghost--active',
      selected && 'game-board__ghost--selected',
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

  <div
    class="game-board__tutorial-start"
    v-if="settings.showTutorial() && !board.isShuffled && !alreadyPlayed"
  >
    {{ $t('tutorial_start_message') }}
  </div>

  <div
    class="game-board__tutorial-grab"
    v-if="settings.showTutorial() && board.isShuffled && board.movements === 0"
  >
    {{ $t(settings.getMode() === 'touch' ? 'tutorial_touch_message' : 'tutorial_grab_message') }}
  </div>

  <div
    class="game-board__tutorial-sort"
    v-if="settings.showTutorial() && board.isShuffled && board.movements === 1"
  >
    {{ $t('tutorial_sort_message') }}
  </div>

  <TransitionGroup
    tag="div"
    :class="[
      'game-board__board',
      !board.isShuffled && !alreadyPlayed && 'game-board__board--not-shuffled'
    ]"
    @click="shuffle"
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
        !cell.isFixed && board.isShuffled && !board.isSolved && settings.getMode() !== 'touch' && 'game-board__cell--draggable',
        !cell.isFixed && board.isShuffled && !board.isSolved && (settings.getMode() === 'touch' || selected) && 'game-board__cell--touchable',
        fromId === cell.id && ghostActive && 'game-board__cell--grabbed',
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
import { Mode, Settings } from '@/entities/Settings'
import { DateTime } from 'luxon'

export default defineComponent({
  data () {
    return {
      fromId: null as Cell['id'] | null,
      touchStart: null as DateTime | null,
      selected: false,
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
    },
    settings: {
      required: true,
      type: Settings as PropType<Settings>
    },
    alreadyPlayed: {
      required: true,
      type: Boolean as PropType<boolean>
    }
  },

  emits: [
    'start'
  ],

  computed: {
    ghostActive (): boolean {
      return this.settings.getMode() !== Mode.touch &&
        this.ghostColor !== null &&
        this.ghostWidth !== null &&
        this.ghostHeight !== null &&
        this.ghostStartTop !== null &&
        this.ghostStartLeft !== null &&
        this.ghostTop !== null &&
        this.ghostLeft !== null &&
        (
          this.settings.getMode() === Mode.grab ||
          (DateTime.now().diff(this.touchStart ?? DateTime.now()).toMillis() ?? 0) > 2000
        )
    }
  },

  methods: {
    shuffle () {
      if (
        this.board.isShuffled ||
        this.alreadyPlayed
      ) {
        return
      }

      this.board.shuffle()
      this.$emit('start')
    },

    reset () {
      this.fromId = null
      this.ghostColor = null
      this.ghostWidth = null
      this.ghostHeight = null
      this.ghostStartTop = null
      this.ghostStartLeft = null
      this.ghostTop = null
      this.ghostLeft = null
      this.selected = false
    },

    grab (event: MouseEvent | TouchEvent) {
      if (
        !this.board.isShuffled ||
        this.board.isSolved
      ) {
        return
      }

      const cell = document.elementFromPoint(
        'pageX' in event ? event.pageX : event.touches[0].pageX,
        'pageY' in event ? event.pageY : event.touches[0].pageY
      )

      if (!cell) {
        return
      }

      const cellId = cell.getAttribute('data-cell-id') ?? null

      if (
        this.selected &&
        this.fromId &&
        cellId
      ) {
        this.board.swap(this.fromId, cellId)
        this.reset()
        return
      }

      const rect = cell.getBoundingClientRect()

      this.ghostStartTop = `${rect.top}px`
      this.ghostStartLeft = `${rect.left}px`
      this.ghostWidth = `${rect.width}px`
      this.ghostHeight = `${rect.height}px`

      this.ghostTop = `${'pageY' in event ? event.pageY : event.touches[0].pageY}px`
      this.ghostLeft = `${'pageX' in event ? event.pageX : event.touches[0].pageX}px`
      this.fromId = cellId
      this.ghostColor = cell.getAttribute('data-cell-color') ?? null
      this.touchStart = DateTime.now()
    },

    drop (event: MouseEvent | TouchEvent) {
      if (
        !this.board.isShuffled ||
        this.board.isSolved ||
        this.fromId === null
      ) {
        return
      }

      const cellId = document.elementFromPoint(
        'pageX' in event ? event.pageX : event.changedTouches[0].pageX,
        'pageY' in event ? event.pageY : event.changedTouches[0].pageY
      )?.getAttribute('data-cell-id')

      if (!cellId) {
        this.reset()
        return
      }

      if (
        this.settings.getMode() !== Mode.grab &&
        this.fromId === cellId &&
        !this.selected &&
        this.touchStart &&
        (DateTime.now().diff(this.touchStart).toMillis() ?? Infinity) < 2000
      ) {
        this.selected = true
        return
      }

      if (this.settings.getMode() === Mode.touch) {
        return
      }

      this.board.swap(this.fromId, cellId)
      this.reset()
    },

    over (event: MouseEvent | TouchEvent) {
      if (
        !this.board.isShuffled ||
        this.board.isSolved ||
        this.settings.getMode() === Mode.touch ||
        this.selected
      ) {
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
  &__tutorial-start,
  &__tutorial-grab,
  &__tutorial-sort {
    pointer-events: none;
    text-align: center;
    font-weight: 700;
    font-size: 2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fffe;
    text-shadow: 0 0.1rem 0.2rem #0008;
    animation: appear calc(3.4s * var(--speed, 1)) linear,
      blink calc(0.9s * var(--speed, 1)) linear calc(3.4s * var(--speed, 1)) alternate infinite;

    @keyframes appear {
      0% {
        color: #fff0;
        text-shadow: 0 0.1rem 0.2rem #0000;
      }
      60% {
        color: #fff0;
        text-shadow: 0 0.1rem 0.2rem #0000;
      }
      100% {
        color: #fffe;
        text-shadow: 0 0.1rem 0.2rem #0008;
      }
    }

    @keyframes blink {
      0% {
        color: #fffe;
        text-shadow: 0 0.1rem 0.2rem #0008;
      }
      100% {
        color: #fff5;
        text-shadow: 0 0.1rem 0.2rem #0000;
      }
    }
  }

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
    transition: transform calc(0.2s * var(--speed, 1)) linear;

    &--draggable {
      cursor: grab;
    }

    &--touchable {
      cursor: pointer;
    }

    &--fixed {
      pointer-events: none;
      box-shadow: inset 0 0 0 1vh var(--color),
        inset 0 0 0 1.25vh #fff6;

      @media (prefers-color-scheme: dark) {
        box-shadow: inset 0 0 0 1vh var(--color),
          inset 0 0 0 1.25vh #0006;
      }

      .dark & {
        box-shadow: inset 0 0 0 1vh var(--color),
          inset 0 0 0 1.25vh #0006;
      }

      .light & {
        box-shadow: inset 0 0 0 1vh var(--color),
          inset 0 0 0 1.25vh #fff6;
      }
    }

    &--grabbed {
      background-color: transparent;
    }
  }

  &__ghost {
    display: none;
    pointer-events: none;
    z-index: 2;

    &--active {
      display: block;
      width: var(--width, 0);
      height: var(--height, 0);
      top: var(--top, 0);
      left: var(--left, 0);
      background-color: var(--color, transparent);
      position: fixed;
      transform: translate(-50%, -50%) scale(1.2);
      animation: scale-active calc(0.1s * var(--speed, 1)) linear;

      @keyframes scale-active {
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

    &--selected {
      display: block;
      width: var(--width, 0);
      height: var(--height, 0);
      top: var(--startTop, 0);
      left: var(--startLeft, 0);
      background-color: var(--color, transparent);
      position: fixed;
      transform: scale(1.2);
      animation: scale-selected calc(0.1s * var(--speed, 1)) linear;

      @keyframes scale-selected {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.2);
        }
      }
    }
  }

  &__fade-move {
    pointer-events: none;
    z-index: 1;
  }
}
</style>
