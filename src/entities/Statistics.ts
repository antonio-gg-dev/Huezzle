import { Duration } from 'luxon'
import { Difficulty } from '@/services/DifficultyGenerator'
import { Score } from '@/entities/Score'

export class Statistics {
  private _playedGames = 0
  private _totalMovements = 0
  private _totalTime: Duration = Duration.fromObject({})
  private _averageMovements = 0
  private _averageTime: Duration = Duration.fromObject({})
  private _bestMovements: null | number = null
  private _bestTime: null | Duration = null
  private _hints = 0

  constructor (scores: Score[], difficulty?: Difficulty) {
    const filtered = scores.filter((score) => difficulty === undefined || score.difficulty === difficulty)

    filtered.forEach((score) => {
      this._totalMovements += score.movements
      this._totalTime = this._totalTime.plus(score.time)
      this._bestMovements =
        score.movements < (this._bestMovements ?? Infinity)
          ? score.movements
          : this._bestMovements
      this._bestTime =
        score.time.toMillis() < (this._bestTime?.toMillis() ?? Infinity)
          ? score.time
          : this._bestTime
      this._hints += score.hints
    })

    this._playedGames = filtered.length

    if (this._playedGames) {
      this._averageMovements = this._totalMovements / this._playedGames
      this._averageTime = Duration.fromMillis(this._totalTime.toMillis() / this._playedGames)
    }
  }

  public get playedGames (): number {
    return this._playedGames
  }

  public get totalMovements (): number {
    return this._totalMovements
  }

  public get totalTime (): Duration {
    return this._totalTime
  }

  public get averageMovements (): number {
    return this._averageMovements
  }

  public get averageTime (): Duration {
    return this._averageTime
  }

  public get bestMovements (): number | null {
    return this._bestMovements
  }

  public get bestTime (): Duration | null {
    return this._bestTime
  }

  public get hints (): number {
    return this._hints
  }
}
