/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { reactive } from 'vue'

export enum UpdateStatus {
  noUpdates = 'noUpdates',
  downloading = 'downloading',
  ready = 'ready'
}

export const updateStatus = reactive({
  status: UpdateStatus.noUpdates
})

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Game has been cached for offline use.')
      updateStatus.status = UpdateStatus.noUpdates
    },
    updatefound () {
      console.log('New version is downloading.')
      updateStatus.status = UpdateStatus.downloading
    },
    updated () {
      console.log('New version is available.')
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName)
        })
      }).finally(() => {
        updateStatus.status = UpdateStatus.ready
      })
    },
    offline () {
      console.log('No internet connection found. Game is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
