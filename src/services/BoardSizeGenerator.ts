import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import { Difficulty } from '@/services/DifficultyGenerator'
import { Coordinate, FrozenCellsGenerator } from '@/services/FrozenCellsGenerator'

export class BoardSizeGenerator {
  private readonly random: DayBasedRandomGenerator

  constructor (
    private readonly difficulty: Difficulty
  ) {
    this.random = new DayBasedRandomGenerator('board size generator')
  }

  public generate (): [number, number, Coordinate[]] {
    switch (this.difficulty) {
      case Difficulty.easy:
        return this.random.from([
          [7, 9, FrozenCellsGenerator.generateWindow(7, 9)],
          [7, 7, FrozenCellsGenerator.generateChess(7, 7)],
          [7, 7, FrozenCellsGenerator.generateSquare(7, 7)],
          [5, 7, FrozenCellsGenerator.generateDots(5, 7)]
        ])
      case Difficulty.normal:
        return this.random.from([
          [9, 11, FrozenCellsGenerator.generateWindow(9, 11)],
          [9, 9, FrozenCellsGenerator.generateChess(9, 9)],
          [8, 9, FrozenCellsGenerator.generateSquare(8, 9)],
          [7, 9, FrozenCellsGenerator.generateDots(7, 9)],
          [7, 8, FrozenCellsGenerator.generateXSides(7, 8)],
          [7, 8, FrozenCellsGenerator.generateYSides(7, 8)]
        ])
      case Difficulty.hard:
        return this.random.from([
          [10, 10, FrozenCellsGenerator.generateSquare(10, 10)],
          [9, 9, FrozenCellsGenerator.generateXSides(9, 9)],
          [9, 9, FrozenCellsGenerator.generateYSides(9, 9)],
          [8, 9, FrozenCellsGenerator.generateCorners(8, 9)]
        ])
    }
  }
}
