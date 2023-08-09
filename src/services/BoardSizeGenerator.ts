import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import { Difficulty } from '@/services/DifficultyGenerator'
import { Coordinate, FrozenCellsGenerator } from '@/services/FrozenCellsGenerator'

export class BoardSizeGenerator {
  private readonly random: DayBasedRandomGenerator

  constructor (
    private readonly difficulty: Difficulty,
    private readonly frozenCellsGenerator: FrozenCellsGenerator
  ) {
    this.random = new DayBasedRandomGenerator('board size generator')
  }

  public generate (): [number, number, Coordinate[]] {
    switch (this.difficulty) {
      case Difficulty.easy:
        return this.random.from([
          [7, 7, this.frozenCellsGenerator.generate(7, 7)],
          [7, 9, this.frozenCellsGenerator.generate(7, 9)]
        ])
      case Difficulty.normal:
        return this.random.from([
          [9, 11, this.frozenCellsGenerator.generateWindow(9, 11)],
          [9, 9, this.frozenCellsGenerator.generateChess(9, 9)],
          [8, 9, this.frozenCellsGenerator.generateSquare(8, 9)],
          [7, 9, this.frozenCellsGenerator.generateDots(7, 9)],
          [7, 8, this.frozenCellsGenerator.generateXSides(7, 8)],
          [7, 8, this.frozenCellsGenerator.generateYSides(7, 8)]
        ])
      case Difficulty.hard:
        return this.random.from([
          [10, 10, this.frozenCellsGenerator.generateSquare(10, 10)],
          [9, 9, this.frozenCellsGenerator.generateXSides(9, 9)],
          [9, 9, this.frozenCellsGenerator.generateYSides(9, 9)],
          [8, 9, this.frozenCellsGenerator.generateCorners(8, 9)]
        ])
    }
  }
}
