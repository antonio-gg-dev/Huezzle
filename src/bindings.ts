import { ScoreRepository } from '@/services/ScoreRepository'
import { SettingsRepository } from '@/services/SettingsRepository'
import { SaveRepository } from '@/services/SaveRepository'

export const bindings = Object.freeze({
  scoreRepository: new ScoreRepository(localStorage),
  settingsRepository: new SettingsRepository(localStorage),
  saveRepository: new SaveRepository(localStorage)
})
