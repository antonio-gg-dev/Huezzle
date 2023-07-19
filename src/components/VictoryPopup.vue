<template>
  <div
    class="victory-popup__backdrop"
    @click="$emit('close')"
  >
    <div
      class="victory-popup__popup"
      @click.stop
    >
      <h1 class="victory-popup__header">
        {{ $t('victory_header' )}}
      </h1>

      <span class="victory-popup__score victory-popup__score--time">
        <img
          class="victory-popup__icon"
          src="/img/time.svg"
          alt=""
        >
        {{ $t('victory_time_label') }}
        <strong>{{ time.toFormat('m:ss') }}</strong>
      </span>

      <span class="victory-popup__score victory-popup__score--movements">
        <img
          class="victory-popup__icon"
          src="/img/movements.svg"
          alt=""
        >
        {{ $t('victory_movements_label') }}
        <strong>{{ movements }}</strong>
      </span>

      <ShareButton
        class="victory-popup__share-button"
        :time="time"
        :movements="movements"
      />

      <div
        class="victory-popup__next"
        v-if="remaining"
      >
        {{ $t('victory_next_huezzle_label') }}
        <strong class="victory-popup__countdown">
          {{ remaining.toFormat('h:mm:ss') }}
        </strong>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DateTime, Duration } from 'luxon'
import ShareButton from '@/components/ShareButton.vue'

export default defineComponent({
  components: {
    ShareButton
  },

  props: {
    movements: {
      required: true,
      type: Number as PropType<number>
    },
    time: {
      required: true,
      type: Object as PropType<Duration>
    }
  },

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

  mounted () {
    this.loop = setInterval(() => {
      this.remaining = this.target.diff(DateTime.now())

      if (this.remaining.as('seconds') <= 0) {
        this.remaining = null
        clearInterval(this.loop ?? undefined)
      }
    }, 1000)
  },

  beforeUnmount () {
    clearInterval(this.loop ?? undefined)
  }
})
</script>

<style scoped lang="scss">
.victory-popup {
  &__backdrop {
    cursor: pointer;
    display: grid;
    place-items: center;
    position: fixed;
    inset: 0;
    background-color: #fff5;
    backdrop-filter: blur(4px);
    animation: fade 0.1s linear;
    z-index: 3;

    @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 100%;
      }
    }

    @media (prefers-color-scheme: dark) {
      background-color: #1115;
    }
  }

  &__popup {
    text-align: center;
    cursor: default;
    background-color: #fff;
    padding: 3rem 4rem;
    border-radius: 0.1rem;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    z-index: 4;
    display: grid;
    gap: 0 4rem;
    grid-template-areas:
      "header"
      "time"
      "movements"
      "share"
      "clipboard"
      "next";

    @media (min-width: 768px) {
      grid-template-areas:
      "header    header"
      "time      movements"
      "share     share"
      "clipboard clipboard"
      "next      next";
    }

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }
  }

  &__header {
    all: unset;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 300;
    grid-area: header;
  }

  &__score {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: baseline;
    justify-content: center;

    &--movements {
      grid-area: movements;
    }

    &--time {
      grid-area: time;
    }
  }

  &__icon {
    height: 1.5rem;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }
  }

  &__next {
    font-size: 2rem;
    grid-area: next;
  }

  &__countdown {
    display: block;
    margin-top: 0.8rem;
    letter-spacing: 0.3rem;
  }
}
</style>
