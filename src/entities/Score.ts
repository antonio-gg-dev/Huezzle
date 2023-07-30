import { Difficulty } from '@/services/DifficultyGenerator'
import { Duration } from 'luxon'

export interface RawScore {
  difficulty: Difficulty,
  time: string,
  movements: number,
  hints: undefined | number
}

export class Score {
  constructor (
    public readonly difficulty: Difficulty,
    public readonly time: Duration,
    public readonly movements: number,
    public readonly hints: number
  ) {}

  toRaw (): RawScore {
    return {
      difficulty: this.difficulty,
      time: this.time.toISO() ?? '',
      movements: this.movements,
      hints: this.hints
    }
  }

  static fromRaw ({ difficulty, time, movements, hints }: RawScore): Score {
    return new Score(
      difficulty,
      Duration.fromISO(time),
      movements,
      hints ?? 0
    )
  }
}
