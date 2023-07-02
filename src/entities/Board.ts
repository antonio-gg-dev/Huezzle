import { Cell } from '@/entities/Cell'

export class Board {
  private _movements = 0
  private readonly cellsInitialState: Cell[]

  constructor (
    public readonly cells: Cell[][]
  ) {
    this.cellsInitialState = cells.flat()
  }

  public swap (fromX: number, fromY: number, toX: number, toY: number): Board {
    const auxiliary = this.cells[toY][toX]
    this.cells[toY][toX] = this.cells[fromY][fromX]
    this.cells[fromY][fromX] = auxiliary

    if (fromX !== toX || fromY !== toY) {
      this._movements++
    }

    return this
  }

  public get movements (): number {
    return this._movements
  }

  public get isSolved (): boolean {
    return this.cells
      .flat()
      .every((cell, index) => this.cellsInitialState[index] === cell)
  }
}
