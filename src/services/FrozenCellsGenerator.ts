import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import { Difficulty } from '@/services/DifficultyGenerator'

export interface Coordinate {
  x: number,
  y: number
}

export class FrozenCellsGenerator {
  private readonly random: DayBasedRandomGenerator

  constructor (
    private readonly difficulty: Difficulty,
    private readonly boardWidth: number,
    private readonly boardHeight: number
  ) {
    this.random = new DayBasedRandomGenerator('frozen cells generator')
  }

  public generate (): Coordinate[] {
    switch (this.difficulty) {
      case Difficulty.easy:
        return this.random.from([
          () => this.generateChess(),
          () => this.generateChess(),
          () => this.generateChess(),
          () => this.generateChess(),
          () => this.generateDots(),
          () => this.generateDots(),
          () => this.generateDots(),
          () => this.generateWindow(),
          () => this.generateSquare(),
          () => this.generateSquare()
        ])()
      case Difficulty.normal:
        return this.random.from([
          () => this.generateChess(),
          () => this.generateDots(),
          () => this.generateDots(),
          () => this.generateDots(),
          () => this.generateWindow(),
          () => this.generateSquare(),
          () => this.generateSquare(),
          () => this.generateSquare(),
          () => this.generateXSides(),
          () => this.generateYSides()
        ])()
      case Difficulty.hard:
        return this.random.from([
          () => this.generateSquare(),
          () => this.generateSquare(),
          () => this.generateXSides(),
          () => this.generateXSides(),
          () => this.generateXSides(),
          () => this.generateYSides(),
          () => this.generateYSides(),
          () => this.generateYSides(),
          () => this.generateCorners(),
          () => this.generateCorners()
        ])()
    }
  }

  private generateChess () {
    const frozenCells = []

    for (let height = 0; height < this.boardHeight; height++) {
      for (let width = 0; width < this.boardWidth; width++) {
        if ((height % 2) === (width % 2)) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  private generateDots () {
    const frozenCells = []

    for (let height = 0; height < this.boardHeight; height++) {
      for (let width = 0; width < this.boardWidth; width++) {
        if (!(height % 2) && !(width % 2)) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  private generateWindow () {
    const frozenCells = []

    for (let height = 0; height < this.boardHeight; height++) {
      for (let width = 0; width < this.boardWidth; width++) {
        if (
          height === 0 ||
          height === ((this.boardHeight - 1) / 2) ||
          height === (this.boardHeight - 1) ||
          width === 0 ||
          width === ((this.boardWidth - 1) / 2) ||
          width === (this.boardWidth - 1)
        ) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  private generateSquare () {
    const frozenCells = []

    for (let height = 0; height < this.boardHeight; height++) {
      for (let width = 0; width < this.boardWidth; width++) {
        if (
          height === 0 ||
          height === (this.boardHeight - 1) ||
          width === 0 ||
          width === (this.boardWidth - 1)
        ) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  private generateXSides () {
    const frozenCells = []

    for (let height = 0; height < this.boardHeight; height++) {
      frozenCells.push(
        { x: 0, y: height },
        { x: this.boardWidth - 1, y: height }
      )
    }

    return frozenCells
  }

  private generateYSides () {
    const frozenCells = []

    for (let width = 0; width < this.boardWidth; width++) {
      frozenCells.push(
        { x: width, y: 0 },
        { x: width, y: this.boardHeight - 1 }
      )
    }

    return frozenCells
  }

  private generateCorners () {
    return [{
      x: 0,
      y: 0
    }, {
      x: this.boardWidth - 1,
      y: 0
    }, {
      x: 0,
      y: this.boardHeight - 1
    }, {
      x: this.boardWidth - 1,
      y: this.boardHeight - 1
    }]
  }
}
