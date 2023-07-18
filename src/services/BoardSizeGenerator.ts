import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import { Difficulty } from '@/services/DifficultyGenerator'

export class BoardSizeGenerator {
  private readonly random: DayBasedRandomGenerator

  constructor (
    private readonly difficulty: Difficulty
  ) {
    this.random = new DayBasedRandomGenerator('board size generator')
  }

  public generate (): [number, number] {
    switch (this.difficulty) {
      case Difficulty.chill:
        return this.random.from([[7, 7], [7, 9]])
      case Difficulty.skilled:
        return this.random.from([[7, 7], [7, 9], [9, 9]])
      case Difficulty.challenge:
        return this.random.from([[9, 9], [9, 11]])
    }
  }
}
