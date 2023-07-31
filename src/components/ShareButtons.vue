<template>
  <button
    v-if="canShare"
    @click="share"
    class="share-buttons__button"
  >
    <img
      class="share-buttons__icon"
      src="/img/share.svg"
      alt=""
    >

    {{ $t('share_button_label') }}
  </button>

  <button
    v-if="canCopyToClipboard"
    @click="clipboard"
    class="share-buttons__button"
  >
    <img
      class="share-buttons__icon"
      src="/img/clipboard.svg"
      alt=""
    >

    {{ $t('clipboard_button_label') }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from 'vue/dist/vue'
import { DateTime } from 'luxon'
import { Score } from '@/entities/Score'

export default defineComponent({
  props: {
    score: {
      required: true,
      type: Score as PropType<Score>
    }
  },

  computed: {
    canShare (): boolean {
      return typeof navigator.share === 'function'
    },
    canCopyToClipboard (): boolean {
      return typeof navigator.clipboard?.writeText === 'function'
    },
    message (): string {
      const launchDate = DateTime.fromISO('2023-08-01')
      const number = Math.floor(DateTime.now().diff(launchDate).as('days')) + 1
      return this.$t('share_message', {
        number: number,
        time: this.score.time.toFormat('m:ss'),
        movements: this.score.movements,
        hints: this.score.hints
      })
    },
    url (): string {
      return 'https://huezzle.antonio.gg'
    }
  },

  methods: {
    share () {
      if (this.canShare) {
        navigator.share({
          title: this.message,
          text: this.message,
          url: this.url
        })
      }
    },
    clipboard () {
      if (this.canCopyToClipboard) {
        navigator.clipboard.writeText(`${this.message}\n${this.url}`)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.share-buttons {
  &__button {
    all: unset;
    box-shadow: 0 0 0.1rem 0 #0004,
      0 0.1rem 0.3rem 0 #0004;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.5rem;
    background-color: #2ecc71;
    padding: 1rem 2rem;
    border-radius: 99rem;
    transition: background-color calc(0.2s * var(--speed, 1)) linear;
    cursor: pointer;
    justify-self: center;
    margin: 0 auto 2rem;
    text-align: center;

    &:hover, &focus {
      background-color: #44db86;
    }
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
}
</style>
