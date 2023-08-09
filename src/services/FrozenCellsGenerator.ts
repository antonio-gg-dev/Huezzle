export interface Coordinate {
  x: number,
  y: number
}

export class FrozenCellsGenerator {
  public static generateChess (boardWidth: number, boardHeight: number): Coordinate[] {
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

  public static generateDots (boardWidth: number, boardHeight: number): Coordinate[] {
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

  public static generateWindow (boardWidth: number, boardHeight: number): Coordinate[] {
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

  public static generateSquare (boardWidth: number, boardHeight: number): Coordinate[] {
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

  public static generateXSides (boardWidth: number, boardHeight: number): Coordinate[] {
    const frozenCells = []

    for (let height = 0; height < boardHeight; height++) {
      frozenCells.push(
        { x: 0, y: height },
        { x: boardWidth - 1, y: height }
      )
    }

    return frozenCells
  }

  public static generateYSides (boardWidth: number, boardHeight: number): Coordinate[] {
    const frozenCells = []

    for (let width = 0; width < boardWidth; width++) {
      frozenCells.push(
        { x: width, y: 0 },
        { x: width, y: boardHeight - 1 }
      )
    }

    return frozenCells
  }

  public static generateCorners (boardWidth: number, boardHeight: number): Coordinate[] {
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
