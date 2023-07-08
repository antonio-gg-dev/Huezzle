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
    const contrast = this.random.minMax(60, 90)
    const brightness = this.random.minMax(40, 60)
    const firstColor = this.generateFirstColor(contrast, brightness)
    const secondColor = this.generateSecondColor(contrast, brightness, firstColor)
    const thirdColor = this.generateThirdColor(contrast, brightness, firstColor, secondColor)
    const fourthColor = this.generateFourthColor(contrast, brightness, firstColor, secondColor, thirdColor)

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

    const [
      topLeftColor,
      bottomLeftColor,
      topRightColor,
      bottomRightColor
    ] = this.orderColors(
      firstColor,
      secondColor,
      thirdColor,
      fourthColor
    )

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

  private generateFourthColor (contrast: number, brightness: number, firstColor: Color, secondColor: Color, thirdColor: Color) {
    let fourthColor: Color
    let attempts = 0

    while (true) {
      if (attempts === 5) {
        fourthColor = new Color('hsl', [this.random.minMax(0, 360), contrast, brightness + this.random.minMax(30, 40)])
        break
      }

      fourthColor = new Color('hsl', [this.random.minMax(0, 360), contrast, brightness])

      if (
        Color.contrast(fourthColor, firstColor, { algorithm: 'wcag21' }) > 2 &&
        Color.contrast(fourthColor, secondColor, { algorithm: 'wcag21' }) > 2 &&
        Color.contrast(fourthColor, thirdColor, { algorithm: 'wcag21' }) > 2
      ) {
        break
      }

      attempts++
    }
    return fourthColor
  }

  private generateThirdColor (contrast: number, brightness: number, firstColor: Color, secondColor: Color) {
    let thirdColor: Color
    let attempts = 0

    while (true) {
      if (attempts === 5) {
        thirdColor = new Color('hsl', [this.random.minMax(0, 360), contrast, brightness - this.random.minMax(30, 40)])
        break
      }

      thirdColor = new Color('hsl', [this.random.minMax(0, 360), contrast, brightness])

      if (
        Color.contrast(thirdColor, firstColor, { algorithm: 'wcag21' }) > 2 &&
        Color.contrast(thirdColor, secondColor, { algorithm: 'wcag21' }) > 2
      ) {
        break
      }

      attempts++
    }
    return thirdColor
  }

  private generateSecondColor (contrast: number, brightness: number, firstColor: Color) {
    let secondColor: Color

    while (true) {
      secondColor = new Color('hsl', [this.random.minMax(0, 360), contrast, brightness])

      if (Color.contrast(firstColor, secondColor, { algorithm: 'wcag21' }) > 2) {
        break
      }
    }
    return secondColor
  }

  private generateFirstColor (contrast: number, brightness: number) {
    return new Color('hsl', [this.random.minMax(0, 360), contrast, brightness])
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
    // TODO: Chess & Square patterns for chill, corners (current) for challenge, all + side for skilled
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

    // switch (difficulty) {
    //   case Difficulty.chill:
    //   case Difficulty.skilled:
    //   case Difficulty.challenge:
    // }
  }

  private orderColors (firstColor: Color, secondColor: Color, thirdColor: Color, fourthColor: Color): [Color, Color, Color, Color] {
    switch (Math.floor(this.random.minMax(0, 4))) {
      case 1:
        return [
          secondColor,
          fourthColor,
          thirdColor,
          firstColor
        ]
      case 2:
        return [
          fourthColor,
          firstColor,
          secondColor,
          thirdColor
        ]
      case 3:
        return [
          firstColor,
          thirdColor,
          fourthColor,
          secondColor
        ]
    }

    return [
      thirdColor,
      secondColor,
      firstColor,
      fourthColor
    ]
  }
}
