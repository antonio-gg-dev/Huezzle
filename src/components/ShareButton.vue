<template>
  <button
    v-if="canShare || canCopyToClipboard"
    @click="share"
  >
     {{ canShare ? 'Share' : 'Copy to clipboard' }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from 'vue/dist/vue'
import { Duration } from 'luxon'

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
      const url = 'https://huezzle.antonio.gg'
      const message = `The huezzle of the day #1:
🕑 ${this.time.toFormat('m:ss')}
🔄 ${this.movements}`

      if (this.canShare) {
        navigator.share({
          text: message,
          url: url
        })
      }

      if (this.canCopyToClipboard) {
        navigator.clipboard.writeText(`${message}
${url}`)
      }
    }
  }
})
</script>

<style scoped lang="scss">

</style>
