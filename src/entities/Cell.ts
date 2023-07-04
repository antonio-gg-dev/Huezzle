import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'

export class Cell {
  public readonly id: string
  static random = new DayBasedRandomGenerator('cell')

  constructor (
    public readonly color: string,
    public readonly isFixed: boolean = false
  ) {
    this.id = String(Cell.random.rnd())
  }
}
