import { Board } from '@/entities/Board'
import { DateTime } from 'luxon'
import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import Color from 'colorjs.io'
import { Cell } from '@/entities/Cell'
import { BoardSizeGenerator } from '@/services/BoardSizeGenerator'
import { Coordinate, FrozenCellsGenerator } from '@/services/FrozenCellsGenerator'
import { Difficulty, DifficultyGenerator } from '@/services/DifficultyGenerator'

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

    this.difficulty = new DifficultyGenerator(this.date).generate()
    const [width, height] = new BoardSizeGenerator(this.difficulty).generate()
    this.boardWidth = width
    this.boardHeight = height
    this.frozenCells = new FrozenCellsGenerator(this.difficulty, width, height).generate()
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

  private orderColors (firstColor: Color, secondColor: Color, thirdColor: Color, fourthColor: Color): [Color, Color, Color, Color] {
    return this.random.from([[
      secondColor, fourthColor, thirdColor, firstColor
    ], [
      fourthColor, firstColor, secondColor, thirdColor
    ], [
      firstColor, thirdColor, fourthColor, secondColor
    ], [
      thirdColor, secondColor, firstColor, fourthColor
    ]])
  }
}
