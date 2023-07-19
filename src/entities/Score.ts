import { Difficulty } from '@/services/DifficultyGenerator'
import { Duration } from 'luxon'

export interface RawScore {
  difficulty: Difficulty,
  time: string,
  movements: number
}

export class Score {
  constructor (
    public readonly difficulty: Difficulty,
    public readonly time: Duration,
    public readonly movements: number
  ) {}

  toRaw (): RawScore {
    return {
      difficulty: this.difficulty,
      time: this.time.toISO() ?? '',
      movements: this.movements
    }
  }

  static fromRaw ({ difficulty, time, movements }: RawScore): Score {
    return new Score(
      difficulty,
      Duration.fromISO(time),
      movements
    )
  }
}
