import { ScoreRepository } from '@/services/ScoreRepository'
import { SettingsRepository } from '@/services/SettingsRepository'

export const bindings = Object.freeze({
  scoreRepository: new ScoreRepository(localStorage),
  settingsRepository: new SettingsRepository(localStorage)
})
