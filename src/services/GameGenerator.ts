import { Board } from '@/entities/Board'
import { DateTime } from 'luxon'
import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import Color from 'colorjs.io'
import { Cell } from '@/entities/Cell'

const enum Difficulty {
  chill = 'chill',
  skilled = 'skilled',
  challenge = 'challenge',
}

interface Coordinate {
  x: number,
  y: number
}

export class GameGenerator {
  private readonly date: DateTime
  private readonly random: DayBasedRandomGenerator
  private readonly difficulty: Difficulty
  private readonly boardWidth: number
  private readonly boardHeight: number
  private readonly frozenCells: Coordinate[]

  constructor () {
    this.date = DateTime.now()
    this.random = new DayBasedRandomGenerator('game generator')
    this.difficulty = GameGenerator.calculateDifficulty(this.date)
    this.boardWidth = GameGenerator.calculateBoardWidth(this.difficulty, this.random)
    this.boardHeight = GameGenerator.calculateBoardHeight(this.difficulty, this.random)
    this.frozenCells = GameGenerator.calculateFrozenCells(this.difficulty, this.boardWidth, this.boardHeight)
  }

  public generate (): Board {
    const topLeftColor = new Color('hsl', [0, 100, 50])
    const topRightColor = new Color('hsl', [60, 100, 50])
    const bottomLeftColor = new Color('hsl', [120, 100, 50])
    const bottomRightColor = new Color('hsl', [180, 100, 50])

    const heightStepOptions = {
      space: 'lab',
      outputSpace: 'srgb',
      steps: this.boardHeight
    }

    const widthStepOptions = {
      space: 'lab',
      outputSpace: 'srgb',
      steps: this.boardWidth
    }

    const leftGradient = Color.steps(topLeftColor, bottomLeftColor, heightStepOptions)
      .map(color => new Color('srgb', color.coords).toString({ format: 'hex' }))
    const rightGradient = Color.steps(topRightColor, bottomRightColor, heightStepOptions)
      .map(color => new Color('srgb', color.coords).toString({ format: 'hex' }))

    const cells: Cell[][] = []

    for (let height = 0; height < this.boardHeight; height++) {
      cells.push(Color.steps(leftGradient[height], rightGradient[height], widthStepOptions)
        .map((color, width) => new Cell(
          new Color('srgb', color.coords).toString({ format: 'hex' }),
          this.frozenCells.findIndex(coordinate => coordinate.x === width && coordinate.y === height) !== -1
        )))
    }

    return new Board(cells)
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

  private static calculateFrozenCells (difficulty: Difficulty, boardWidth: number, boardHeight: number): Coordinate[] {
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
