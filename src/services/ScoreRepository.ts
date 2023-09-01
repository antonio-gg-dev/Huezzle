import { RawScore, Score } from '@/entities/Score'
import { DateTime } from 'luxon'

export class ScoreRepository {
  private readonly storageKey = 'scores'

  constructor (
    private readonly storage: Storage
  ) {}

  public save (day: DateTime, score: Score) {
    const scoreList = this.getAll()
    scoreList[day.toISODate() ?? ''] = score

    this.storage.setItem(this.storageKey, JSON.stringify(scoreList))
  }

  public getAll (): Record<string, Score> {
    const scoreList: Record<string, Score> = {}
    const rawList = this.getAllRaw()

    for (const day in rawList) {
      scoreList[day] = Score.fromRaw(rawList[day])
    }

    return scoreList
  }

  public get (day: DateTime): Score | null {
    const raw = this.getAllRaw()[day.toISODate() ?? '']

    if (!raw) {
      return null
    }

    return Score.fromRaw(raw)
  }

  public export (): string {
    return btoa(this.storage.getItem(this.storageKey) ?? '{}')
  }

  public import (backup: string) {
    this.storage.setItem(this.storageKey, atob(backup))
  }

  private getAllRaw (): Record<string, RawScore> {
    return JSON.parse(this.storage.getItem(this.storageKey) ?? '{}')
  }
}
