<template>
  <div
    v-if="updateStatus.status !== UpdateStatus.noUpdates"
    :class="[
      'update-bar__container',
      updateStatus.status === UpdateStatus.downloading && 'update-bar__container--downloading',
      updateStatus.status === UpdateStatus.ready && 'update-bar__container--ready'
    ]"
  >
    <template v-if="updateStatus.status === UpdateStatus.downloading">
      {{ $t('updates_downloading_message') }}
    </template>

    <template v-else-if="updateStatus.status === UpdateStatus.ready">
      {{ $t('updates_ready_message') }}

      <button
        class="update-bar__button"
        @click="apply"
      >
        {{ $t('updates_ready_button') }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UpdateStatus, updateStatus } from '@/registerServiceWorker'

export default defineComponent({
  computed: {
    UpdateStatus () {
      return UpdateStatus
    },

    updateStatus () {
      return updateStatus
    }
  },

  methods: {
    apply () {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName)
        })
      }).finally(() => {
        window.location.reload()
      })
    }
  }
})
</script>

<style scoped lang="scss">
.update-bar {
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
    z-index: 10;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }

    .dark & {
      background-color: #222;
    }

    .light & {
      background-color: #eee;
    }

    &::before {
      content: "";
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      z-index: 11;
      background-color: #2ecc71;
    }

    &--downloading {
      &::before {
        width: 90svw;
        animation: downloading 30s ease-out;

        @keyframes downloading {
          0% { width: 0; }
          1% { width: 10svw; }
          2% { width: 15svw; }
          3% { width: 20svw; }
          4% { width: 25svw; }
          7% { width: 30svw; }
          9% { width: 35svw; }
          10% { width: 40svw; }
          80% { width: 80svw; }
          100% { width: 90svw; }
        }
      }
    }

    &--ready {
      &::before {
        width: 100svw;
        background-color: transparent;
        animation: ready 0.4s linear;

        @keyframes ready {
          0% {
            width: 0;
          }
          50% {
            background-color: #44db86;
          }
          100% {
            width: 100svw;
            background-color: transparent;
          }
        }
      }
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
