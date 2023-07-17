<template>
  <button
    v-if="canShare || canCopyToClipboard"
    @click="share"
    class="share-button__share"
  >
    <img
      class="share-button__icon"
      :src="canShare ? '/img/share.svg' : '/img/clipboard.svg'"
      alt=""
    >

    {{ $t(canShare ? 'share_button_label' : 'clipboard_button_label') }}
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
    }
  },

  methods: {
    share () {
      const launchDate = DateTime.fromISO('2023-08-01')
      const number = Math.floor(DateTime.now().diff(launchDate).as('days'))
      const url = 'https://huezzle.antonio.gg'
      const message = this.$t('share_message', {
        number: number,
        time: this.time.toFormat('m:ss'),
        movements: this.movements
      })

      if (this.canShare) {
        navigator.share({
          title: message,
          url: url
        })
        return
      }

      if (this.canCopyToClipboard) {
        navigator.clipboard.writeText(`${message}\n${url}`)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.share-button {
  &__share {
    all: unset;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    display: flex;
    gap: 1rem;
    align-items: baseline;
    font-size: 1.5rem;
    background-color: #2ecc71;
    padding: 1rem 2rem;
    border-radius: 99rem;
    transition: background-color 0.2s linear;
    cursor: pointer;

    &:hover, &focus {
      background-color: #44db86;
    }
  }

  &__icon {
    height: 1.5rem;
  }
}
</style>
