import { Cell } from '@/entities/Cell'
import { UnevenRowLengthError } from '@/exceptions/UnevenRowLengthError'
import { FixedCellError } from '@/exceptions/FixedCellError'
import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'
import { CellNotFound } from '@/exceptions/CellNotFound'

export class Board {
  private _movements = 0
  private _isShuffled = false
  public readonly colorsInitialState: string[]
  private _cells
  private readonly random: DayBasedRandomGenerator
  public readonly rowLength: number

  constructor (
    cells: Cell[][]
  ) {
    this.rowLength = cells[0].length

    if (!cells.every((row) => row.length === this.rowLength)) {
      throw new UnevenRowLengthError()
    }

    this._cells = cells.flat()
    this.colorsInitialState = cells.flat().map(cell => cell.color)
    this.random = new DayBasedRandomGenerator('board')
  }

  public swap (fromId: Cell['id'], toId: Cell['id']): Board {
    if (!this._isShuffled) {
      return this
    }

    const fromIndex = this._cells.findIndex(cell => cell.id === fromId)
    const toIndex = this._cells.findIndex(cell => cell.id === toId)

    if (fromIndex === -1 || toIndex === -1) {
      throw new CellNotFound()
    }

    if (this._cells[fromIndex].isFixed || this._cells[toIndex].isFixed) {
      throw new FixedCellError()
    }

    const auxiliary = this._cells[toIndex]
    this._cells[toIndex] = this._cells[fromIndex]
    this._cells[fromIndex] = auxiliary

    if (fromId !== toId) {
      this._movements++
    }

    return this
  }

  public get cells (): Cell[] {
    return this._cells
  }

  public get movements (): number {
    return this._movements
  }

  public get isSolved (): boolean {
    return this._cells
      .flat()
      .every((cell, index) => this.colorsInitialState[index] === cell.color)
  }

  public get isShuffled (): boolean {
    return this._isShuffled
  }

  public shuffle (): Board {
    if (this._isShuffled) {
      return this
    }

    this._isShuffled = true

    let movableIndex = 0
    const shuffleAmount = Math.round(this.random.minMax(5, 10))
    const movableCells = this._cells
      .flat()
      .filter((cell) => !cell.isFixed)

    for (let i = 0; i < shuffleAmount; i++) {
      movableCells.sort(() => this.random.minMax(-1, 1))
    }

    this._cells = this._cells.map((cell) => {
      if (cell.isFixed) {
        return cell
      }

      return movableCells[movableIndex++]
    })

    return this
  }

  public loadSave (save: Save): Board {
    const movableCells = this._cells
      .filter((cell) => !cell.isFixed)

    if (
      movableCells.length !== save.cellIds.length ||
      !movableCells.every(cell => save.cellIds.includes(cell.id))
    ) {
      return this
    }

    movableCells.sort((a, b) => save.cellIds.indexOf(a.id) - save.cellIds.indexOf(b.id))

    let movableIndex = 0
    this._cells = this._cells.map((cell) => {
      if (cell.isFixed) {
        return cell
      }

      return movableCells[movableIndex++]
    })

    this._isShuffled = true
    return this
  }
}
