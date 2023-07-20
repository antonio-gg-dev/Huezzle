<template>
  <button
    v-if="canShare"
    @click="share"
    class="share-buttons__button share-buttons__button--share"
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
    class="share-buttons__button share-buttons__button--clipboard"
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
import { DateTime, Duration } from 'luxon'

export default defineComponent({
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

  computed: {
    canShare (): boolean {
      return typeof navigator.share === 'function'
    },
    canCopyToClipboard (): boolean {
      return typeof navigator.clipboard?.writeText === 'function'
    },
    message (): string {
      const launchDate = DateTime.fromISO('2023-08-01')
      const number = Math.floor(DateTime.now().diff(launchDate).as('days'))
      return this.$t('share_message', {
        number: number,
        time: this.time.toFormat('m:ss'),
        movements: this.movements
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
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.5rem;
    background-color: #2ecc71;
    padding: 1rem 2rem;
    border-radius: 99rem;
    transition: background-color 0.2s linear;
    cursor: pointer;
    justify-self: center;
    margin-bottom: 2rem;
    text-align: center;

    &:hover, &focus {
      background-color: #44db86;
    }

    &--share {
      grid-area: share;
    }

    &--clipboard {
      grid-area: clipboard;
    }
  }

  &__icon {
    height: 1.5rem;

    @media (prefers-color-scheme: dark) {
      filter: invert(1);
    }
  }
}
</style>
