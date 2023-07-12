<template>
  <div
    class="victory-popup__backdrop"
    @click="$emit('close')"
  >
    <div class="victory-popup__popup">
      Victory!<br>
      Movements: {{ movements }}<br>
      Time: {{ time.toFormat("m:ss") }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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

    @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 100%;
      }
    }
  }

  &__popup {
    cursor: default;
    background-color: #fff;
    padding: 2rem 4rem;
    border-radius: 0.1rem;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
  }
}
</style>
