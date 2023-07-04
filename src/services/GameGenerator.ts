import { Board } from '@/entities/Board'
import { DateTime } from 'luxon'
import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'

const enum Difficulty {
  chill = 'chill',
  skilled = 'skilled',
  challenge = 'challenge',
}

interface Coordinates {
  x: number,
  y: number
}

export class GameGenerator {
  private readonly date: DateTime
  private readonly random: DayBasedRandomGenerator
  private readonly difficulty: Difficulty
  private readonly boardWidth: number
  private readonly boardHeight: number
  private readonly frozenCells: Coordinates[]

  constructor () {
    this.date = DateTime.now()
    this.random = new DayBasedRandomGenerator('game generator')
    this.difficulty = GameGenerator.calculateDifficulty(this.date)
    this.boardWidth = GameGenerator.calculateBoardWidth(this.difficulty, this.random)
    this.boardHeight = GameGenerator.calculateBoardHeight(this.difficulty, this.random)
    this.frozenCells = GameGenerator.calculateFrozenCells(this.difficulty, this.boardWidth, this.boardHeight)
  }

  public generate (): Board {
    return new Board([])
  }

  private static calculateDifficulty (date: DateTime): Difficulty {
    switch (date.weekday) {
      case (1): /* Monday */
        return Difficulty.skilled
      case (2): /* Tuesday */
        return Difficulty.chill
      case (3): /* Wednesday */
        return Difficulty.chill
      case (4): /* Thursday */
        return Difficulty.skilled
      case (5): /* Friday */
        return Difficulty.skilled
      case (6): /* Saturday */
        return Difficulty.challenge
      case (7): /* Sunday */
        return Difficulty.challenge
    }

    return Difficulty.chill
  }

  private static calculateBoardWidth (difficulty: Difficulty, random: DayBasedRandomGenerator): number {
    switch (difficulty) {
      case Difficulty.chill:
        return Math.round(random.minMax(6, 8))
      case Difficulty.skilled:
        return Math.round(random.minMax(8, 10))
      case Difficulty.challenge:
        return Math.round(random.minMax(10, 12))
    }
  }

  private static calculateBoardHeight (difficulty: Difficulty, random: DayBasedRandomGenerator): number {
    switch (difficulty) {
      case Difficulty.chill:
        return Math.round(random.minMax(8, 10))
      case Difficulty.skilled:
        return Math.round(random.minMax(10, 12))
      case Difficulty.challenge:
        return Math.round(random.minMax(12, 14))
    }
  }

  private static calculateFrozenCells (difficulty: Difficulty, boardWidth: number, boardHeight: number): Coordinates[] {
    switch (difficulty) {
      case Difficulty.chill:
        return [{
          x: 0,
          y: 0
        }, {
          x: boardWidth - 1,
          y: 0
        }, {
          x: 0,
          y: boardHeight - 1
        }, {
          x: boardWidth - 1,
          y: boardHeight - 1
        }]
      case Difficulty.skilled:
        return [{
          x: 0,
          y: 0
        }, {
          x: boardWidth - 1,
          y: 0
        }, {
          x: 0,
          y: boardHeight - 1
        }]
      case Difficulty.challenge:
        return [{
          x: 0,
          y: 0
        }, {
          x: 0,
          y: 1
        }, {
          x: 0,
          y: boardHeight - 1
        }]
    }
  }
}
