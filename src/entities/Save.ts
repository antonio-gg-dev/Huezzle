import { Cell } from '@/entities/Cell'
import { DateTime } from 'luxon'
import { Board } from '@/entities/Board'

interface RawSave {
  cellIds: Cell['id'][],
  startAt: string,
  hints: number
}

export class Save {
  constructor (
    public readonly cellIds: Cell['id'][],
    public readonly startAt: DateTime,
    public readonly hints: number
  ) {}

  public static fromBoard (board: Board, startAt: DateTime, hints: number): Save {
    return new Save(
      board.cells
        .filter(cell => !cell.isFixed)
        .map(cell => cell.id),
      startAt,
      hints
    )
  }

  public toRaw (): RawSave {
    return {
      cellIds: this.cellIds,
      startAt: this.startAt.toISO() ?? '',
      hints: this.hints
    }
  }

  public static fromRaw ({ cellIds, startAt, hints }: RawSave): Save {
    return new Save(
      cellIds,
      DateTime.fromISO(startAt),
      hints
    )
  }
}
