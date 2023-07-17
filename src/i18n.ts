import { createI18n } from 'vue-i18n'
import { en } from '@/lang/en'
import { es } from '@/lang/es'

export const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: { en, es }
})
