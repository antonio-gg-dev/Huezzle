import { Cell } from '@/entities/Cell'
import { UnevenRowLengthError } from '@/exceptions/UnevenRowLengthError'
import { FixedRowError } from '@/exceptions/FixedRowError'
import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'

export class Board {
  private _movements = 0
  private readonly cellsInitialState: Cell[]
  private _cells
  private readonly random: DayBasedRandomGenerator

  constructor (
    cells: Cell[][]
  ) {
    const rowLength = cells[0].length

    if (!cells.every((row) => row.length === rowLength)) {
      throw new UnevenRowLengthError()
    }

    this._cells = cells
    this.cellsInitialState = cells.flat()
    this.random = new DayBasedRandomGenerator('board')
  }

  public swap (fromX: number, fromY: number, toX: number, toY: number): Board {
    if (this._cells[fromY][fromX].isFixed || this._cells[toY][toX].isFixed) {
      throw new FixedRowError()
    }

    const auxiliary = this._cells[toY][toX]
    this._cells[toY][toX] = this._cells[fromY][fromX]
    this._cells[fromY][fromX] = auxiliary

    if (fromX !== toX || fromY !== toY) {
      this._movements++
    }

    return this
  }

  public get cells (): Cell[][] {
    return this._cells
  }

  public get movements (): number {
    return this._movements
  }

  public get isSolved (): boolean {
    return this._cells
      .flat()
      .every((cell, index) => this.cellsInitialState[index] === cell)
  }

  public shuffle (): Board {
    let movableIndex = 0
    const shuffleAmount = Math.round(this.random.minMax(5, 10))
    const movableCells = this._cells
      .flat()
      .filter((cell) => !cell.isFixed)

    for (let i = 0; i < shuffleAmount; i++) {
      movableCells.sort(() => this.random.minMax(-1, 1))
    }

    this._cells = this._cells.map((row) =>
      row.map((cell) => {
        if (cell.isFixed) {
          return cell
        }

        return movableCells[movableIndex++]
      })
    )

    return this
  }
}
