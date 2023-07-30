<template>
  <PopupContainer
    v-if="score"
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('victory_header' )}}
    </template>

    <div class="victory-popup__score-container">
      <span class="victory-popup__score">
        <img
          class="victory-popup__icon"
          src="/img/time.svg"
          alt=""
        >
        {{ $t('victory_time_label') }}
        <strong>{{ score.time.toFormat('m:ss') }}</strong>
      </span>

      <span class="victory-popup__score">
        <img
          class="victory-popup__icon"
          src="/img/movements.svg"
          alt=""
        >
        {{ $t('victory_movements_label') }}
        <strong>{{ score.movements }}</strong>
      </span>
    </div>

    <ShareButtons
      :score="score"
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
  </PopupContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DateTime, Duration } from 'luxon'
import ShareButtons from '@/components/ShareButtons.vue'
import PopupContainer from '@/components/PopupContainer.vue'
import { Score } from '@/entities/Score'

export default defineComponent({
  components: {
    PopupContainer,
    ShareButtons
  },

  emits: [
    'close'
  ],

  props: {
    score: {
      default: null,
      type: Score as PropType<Score | null>
    },
    isOpen: {
      default: false,
      type: Boolean as PropType<boolean>
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
  &__score-container {
    display: grid;
    gap: 0 4rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__score {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: baseline;
    justify-content: center;
  }

  &__icon {
    height: 1.5rem;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }

    .dark & {
      filter: invert(1);
    }

    .light & {
      filter: invert(0);
    }
  }

  &__next {
    font-size: 2rem;
    text-align: center;
  }

  &__countdown {
    display: block;
    margin-top: 0.8rem;
    letter-spacing: 0.3rem;
  }
}
</style>
