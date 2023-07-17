import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import { Difficulty } from '@/constants/Difficulty'

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
        return [5, 7]
      case Difficulty.skilled:
        return this.random.from([[5, 7], [7, 9]])
      case Difficulty.challenge:
        return [7, 9]
    }
  }
}
