import { Cell } from '@/entities/Cell'

export class Board {
  private _movements = 0

  constructor (
    public readonly cells: Cell[][]
  ) {}

  swap (fromX: number, fromY: number, toX: number, toY: number): Board {
    const temp = this.cells[toY][toX]
    this.cells[toY][toX] = this.cells[fromY][fromX]
    this.cells[fromY][fromX] = temp

    if (fromX !== toX || fromY !== toY) {
      this.movements++
    }

    return this
  }

  get movements () {
    return this._movements
  }

  private set movements (value: number) {
    this._movements = value
  }
}
