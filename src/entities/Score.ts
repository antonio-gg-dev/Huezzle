import { Difficulty } from '@/services/DifficultyGenerator'
import { Duration } from 'luxon'

export interface RawScore {
  difficulty: string,
  time: string,
  movements: number,
  hints: number | undefined
}

export class Score {
  constructor (
    public readonly difficulty: Difficulty,
    public readonly time: Duration,
    public readonly movements: number,
    public readonly hints: number
  ) {}

  public toRaw (): RawScore {
    return {
      difficulty: this.difficulty,
      time: this.time.toISO() ?? '',
      movements: this.movements,
      hints: this.hints
    }
  }

  public static fromRaw ({ difficulty, time, movements, hints }: RawScore): Score {
    return new Score(
      difficulty in Difficulty ? difficulty as Difficulty : Difficulty.easy,
      Duration.fromISO(time),
      movements,
      hints ?? 0
    )
  }
}
