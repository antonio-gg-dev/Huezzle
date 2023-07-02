import { Cell } from '@/entities/Cell'
import SeedRandom from 'seedrandom'
import { DateTime } from 'luxon'

export class Board {
  private _movements = 0
  private readonly cellsInitialState: Cell[]
  private _cells
  private readonly random: () => number

  constructor (
    cells: Cell[][]
  ) {
    this._cells = cells
    this.cellsInitialState = cells.flat()
    this.random = SeedRandom(DateTime.now().toISODate() ?? '')
  }

  public swap (fromX: number, fromY: number, toX: number, toY: number): Board {
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
    const rowLength = this._cells[0].length
    const flatCells = this._cells
      .flat()
      .sort(() => this.random() - 0.5)
    const newCells: Cell[][] = []

    for (let i = 0; i < flatCells.length; i += rowLength) {
      newCells.push(flatCells.slice(i, i + rowLength))
    }

    this._cells = newCells

    return this
  }
}
