import { Cell } from '@/entities/Cell'

export class Board {
  constructor (
    public readonly cells: Cell[][]
  ) {}

  swap (fromX: number, fromY: number, toX: number, toY: number) {
    const temp = this.cells[toX][toY]
    this.cells[toX][toY] = this.cells[fromX][fromY]
    this.cells[fromX][fromY] = temp
  }
}
