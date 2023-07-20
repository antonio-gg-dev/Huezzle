import { ScoreRepository } from '@/services/ScoreRepository'

export const bindings = Object.freeze({
  scoreRepository: new ScoreRepository(localStorage)
})
