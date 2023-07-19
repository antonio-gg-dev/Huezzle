import { RawScore, Score } from '@/entities/Score'
import { DateTime } from 'luxon'

export class ScoreHistoric {
  private readonly storageKey = 'score-historic'

  constructor (
    private readonly storage: Storage
  ) {}

  public save (day: DateTime, score: Score) {
    const scoreList = this.getHistoric()
    scoreList[day.toISODate() ?? ''] = score

    this.storage.setItem(this.storageKey, JSON.stringify(scoreList))
  }

  public getHistoric (): Record<string, Score> {
    const rawList: Record<string, RawScore> = JSON.parse(this.storage.getItem(this.storageKey) ?? '{}')
    const scoreList: Record<string, Score> = {}

    for (const day in rawList) {
      scoreList[day] = Score.fromRaw(rawList[day])
    }

    return scoreList
  }
}
