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
      case Difficulty.easy:
        return this.random.from([[7, 7], [7, 9]])
      case Difficulty.normal:
        return this.random.from([[7, 7], [7, 9], [9, 9]])
      case Difficulty.hard:
        return this.random.from([[9, 9], [9, 11]])
    }
  }
}
