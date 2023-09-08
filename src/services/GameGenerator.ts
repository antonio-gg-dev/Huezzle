import { Board } from '@/entities/Board'
import { DateTime } from 'luxon'
import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import Color from 'colorjs.io'
import { Cell } from '@/entities/Cell'
import { BoardSizeGenerator } from '@/services/BoardSizeGenerator'
import { Coordinate } from '@/services/FrozenCellsGenerator'
import { Difficulty, DifficultyGenerator } from '@/services/DifficultyGenerator'

type LchColor = Color & {h: number}

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
    const [width, height, frozenCells] = new BoardSizeGenerator(this.difficulty).generate()
    this.boardWidth = width
    this.boardHeight = height
    this.frozenCells = frozenCells
  }

  public generate (): Board {
    const chroma = this.random.minMax(90, 135)
    const lightness = this.random.minMax(40, 60)
    const firstColor = this.generateFirstColor(chroma, lightness)
    const secondColor = this.generateSecondColor(chroma, lightness, firstColor as Color & { h: number })
    const thirdColor = this.generateThirdColor(chroma, lightness, firstColor, secondColor)
    const fourthColor = this.generateFourthColor(chroma, lightness, firstColor, secondColor, thirdColor)

    const heightStepOptions = {
      space: 'srgb',
      outputSpace: 'lch',
      steps: this.boardHeight
    }

    const widthStepOptions = {
      space: 'srgb',
      outputSpace: 'lch',
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
      .map(color => new Color('lch', color.coords).toString({ format: 'lch' }))
    const rightGradient = Color.steps(topRightColor, bottomRightColor, heightStepOptions)
      .map(color => new Color('lch', color.coords).toString({ format: 'lch' }))

    const cells: Cell[][] = []

    for (let height = 0; height < this.boardHeight; height++) {
      cells.push(Color.steps(leftGradient[height], rightGradient[height], widthStepOptions)
        .map((color, width) => new Cell(
          new Color('lch', color.coords).toString({ format: 'lch' }),
          this.frozenCells.findIndex(coordinate => coordinate.x === width && coordinate.y === height) !== -1
        )))
    }

    return new Board(cells)
  }

  private generateFourthColor (chroma: number, lightness: number, firstColor: LchColor, secondColor: LchColor, thirdColor: LchColor): LchColor {
    let fourthColor: LchColor
    let attempts = 0

    while (true) {
      if (attempts === 5) {
        fourthColor = new Color('lch', [lightness + this.random.minMax(30, 40), chroma, this.random.minMax(0, 360)]) as LchColor
        break
      }

      fourthColor = new Color('lch', [lightness, chroma, this.random.minMax(0, 360)]) as LchColor

      if (
        Math.abs(fourthColor.h - firstColor.h) > 60 &&
        Math.abs(fourthColor.h - secondColor.h) > 60 &&
        Math.abs(fourthColor.h - thirdColor.h) > 60
      ) {
        break
      }

      attempts++
    }
    return fourthColor as LchColor
  }

  private generateThirdColor (chroma: number, lightness: number, firstColor: LchColor, secondColor: LchColor): LchColor {
    let thirdColor: LchColor
    let attempts = 0

    while (true) {
      if (attempts === 5) {
        thirdColor = new Color('lch', [lightness - this.random.minMax(30, 40), chroma, this.random.minMax(0, 360)]) as LchColor
        break
      }

      thirdColor = new Color('lch', [lightness, chroma, this.random.minMax(0, 360)]) as LchColor

      if (
        Math.abs(thirdColor.h - firstColor.h) > 60 &&
        Math.abs(thirdColor.h - secondColor.h) > 60
      ) {
        break
      }

      attempts++
    }
    return thirdColor as LchColor
  }

  private generateSecondColor (chroma: number, lightness: number, firstColor: LchColor): LchColor {
    let secondColor: LchColor

    console.log({ firstColor })

    while (true) {
      secondColor = new Color('lch', [lightness, chroma, this.random.minMax(0, 360)]) as LchColor

      if (Math.abs(firstColor.h - secondColor.h) > 60) {
        break
      }
    }
    return secondColor
  }

  private generateFirstColor (chroma: number, lightness: number): LchColor {
    return new Color('lch', [lightness, chroma, this.random.minMax(0, 360)]) as LchColor
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
