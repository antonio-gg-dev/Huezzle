<template>
  <div
    class="new-puzzle__container"
    v-if="!remaining"
  >
    {{ $t('new_puzzle_message') }}

    <button
      class="new-puzzle__button"
      @click="start"
    >
      {{ $t('new_puzzle_button') }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DateTime, Duration } from 'luxon'

export default defineComponent({
  data () {
    const target = DateTime.now()
      .plus({ days: 1 })
      .set({ hour: 0, minute: 0, second: 0 })

    return {
      loop: null as number | null,
      remaining: target.diff(DateTime.now()) as Duration | null,
      target
    }
  },

  methods: {
    start () {
      window.location.reload()
    }
  },

  mounted () {
    this.loop = setInterval(() => {
      this.remaining = this.target.diff(DateTime.now())

      if (this.remaining.as('seconds') <= 0) {
        this.remaining = null
        clearInterval(this.loop ?? undefined)
      }
    }, 60_000)
  },

  beforeUnmount () {
    clearInterval(this.loop ?? undefined)
  }
})
</script>

<style scoped lang="scss">
.new-puzzle {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #eee;
    height: 2.5rem;
    text-align: center;
    overflow: hidden;
    padding: 0 1rem;
    z-index: 9;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }

    .dark & {
      background-color: #222;
    }

    .light & {
      background-color: #eee;
    }
  }

  &__button {
    all: unset;
    box-shadow: 0 0 0.1rem 0 #0004,
      0 0.1rem 0.3rem 0 #0004;
    background-color: #2ecc71;
    padding: 0.4rem 1rem;
    border-radius: 99rem;
    transition: background-color calc(0.2s * var(--speed, 1)) linear;
    cursor: pointer;

    &:hover, &focus {
      background-color: #44db86;
    }
  }
}
</style>
