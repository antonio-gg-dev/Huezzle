import { createI18n } from 'vue-i18n'
import { en } from '@/lang/en'
import { es } from '@/lang/es'
import { de } from '@/lang/de'
import { ca } from '@/lang/ca'
import { bindings } from '@/bindings'

export const i18n = createI18n({
  locale: bindings.settingsRepository.get().getLanguage(),
  fallbackLocale: 'en',
  messages: { en, es, de, ca }
})
