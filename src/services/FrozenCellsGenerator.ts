import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'

export interface Coordinate {
  x: number,
  y: number
}

export class FrozenCellsGenerator {
  private readonly random: DayBasedRandomGenerator

  constructor () {
    this.random = new DayBasedRandomGenerator('frozen cells generator')
  }

  public generate (boardWidth: number, boardHeight: number): Coordinate[] {
    return this.random.from([
      () => this.generateChess(boardWidth, boardHeight),
      () => this.generateChess(boardWidth, boardHeight),
      () => this.generateChess(boardWidth, boardHeight),
      () => this.generateChess(boardWidth, boardHeight),
      () => this.generateDots(boardWidth, boardHeight),
      () => this.generateDots(boardWidth, boardHeight),
      () => this.generateDots(boardWidth, boardHeight),
      () => this.generateWindow(boardWidth, boardHeight),
      () => this.generateSquare(boardWidth, boardHeight),
      () => this.generateSquare(boardWidth, boardHeight)
    ])()
  }

  public generateChess (boardWidth: number, boardHeight: number) {
    const frozenCells = []

    for (let height = 0; height < boardHeight; height++) {
      for (let width = 0; width < boardWidth; width++) {
        if ((height % 2) === (width % 2)) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  public generateDots (boardWidth: number, boardHeight: number) {
    const frozenCells = []

    for (let height = 0; height < boardHeight; height++) {
      for (let width = 0; width < boardWidth; width++) {
        if (!(height % 2) && !(width % 2)) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  public generateWindow (boardWidth: number, boardHeight: number) {
    const frozenCells = []

    for (let height = 0; height < boardHeight; height++) {
      for (let width = 0; width < boardWidth; width++) {
        if (
          height === 0 ||
          height === ((boardHeight - 1) / 2) ||
          height === (boardHeight - 1) ||
          width === 0 ||
          width === ((boardWidth - 1) / 2) ||
          width === (boardWidth - 1)
        ) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  public generateSquare (boardWidth: number, boardHeight: number) {
    const frozenCells = []

    for (let height = 0; height < boardHeight; height++) {
      for (let width = 0; width < boardWidth; width++) {
        if (
          height === 0 ||
          height === (boardHeight - 1) ||
          width === 0 ||
          width === (boardWidth - 1)
        ) {
          frozenCells.push({ x: width, y: height })
        }
      }
    }

    return frozenCells
  }

  public generateXSides (boardWidth: number, boardHeight: number) {
    const frozenCells = []

    for (let height = 0; height < boardHeight; height++) {
      frozenCells.push(
        { x: 0, y: height },
        { x: boardWidth - 1, y: height }
      )
    }

    return frozenCells
  }

  public generateYSides (boardWidth: number, boardHeight: number) {
    const frozenCells = []

    for (let width = 0; width < boardWidth; width++) {
      frozenCells.push(
        { x: width, y: 0 },
        { x: width, y: boardHeight - 1 }
      )
    }

    return frozenCells
  }

  public generateCorners (boardWidth: number, boardHeight: number) {
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
  }
}
