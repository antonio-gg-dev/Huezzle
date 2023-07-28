import { DateTime } from 'luxon'

export const enum Difficulty {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard',
}

export class DifficultyGenerator {
  constructor (
    private readonly date: DateTime
  ) {}

  public generate (): Difficulty {
    switch (this.date.weekday) {
      case (1): /* Monday */
        return Difficulty.normal
      case (2): /* Tuesday */
        return Difficulty.easy
      case (3): /* Wednesday */
        return Difficulty.easy
      case (4): /* Thursday */
        return Difficulty.easy
      case (5): /* Friday */
        return Difficulty.normal
      case (6): /* Saturday */
        return Difficulty.hard
      case (7): /* Sunday */
        return Difficulty.hard
    }

    return Difficulty.easy
  }
}
