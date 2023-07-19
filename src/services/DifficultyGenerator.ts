import { DateTime } from 'luxon'

export const enum Difficulty {
  chill = 'chill',
  skilled = 'skilled',
  challenge = 'challenge',
}

export class DifficultyGenerator {
  constructor (
    private readonly date: DateTime
  ) {}

  public generate (): Difficulty {
    switch (this.date.weekday) {
      case (1): /* Monday */
        return Difficulty.skilled
      case (2): /* Tuesday */
        return Difficulty.chill
      case (3): /* Wednesday */
        return Difficulty.chill
      case (4): /* Thursday */
        return Difficulty.chill
      case (5): /* Friday */
        return Difficulty.skilled
      case (6): /* Saturday */
        return Difficulty.challenge
      case (7): /* Sunday */
        return Difficulty.challenge
    }

    return Difficulty.chill
  }
}
