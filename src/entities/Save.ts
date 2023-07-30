import { Cell } from '@/entities/Cell'
import { DateTime } from 'luxon'
import { Board } from '@/entities/Board'

interface RawSave {
  cellIds: Cell['id'][],
  startAt: string
}

export class Save {
  constructor (
    public readonly cellIds: Cell['id'][],
    public readonly startAt: DateTime
  ) {}

  public static fromBoard (board: Board, startAt: DateTime): Save {
    return new Save(
      board.cells
        .filter(cell => !cell.isFixed)
        .map(cell => cell.id),
      startAt
    )
  }

  public toRaw (): RawSave {
    return {
      cellIds: this.cellIds,
      startAt: this.startAt.toISO() ?? ''
    }
  }

  public static fromRaw ({ cellIds, startAt }: RawSave): Save {
    return new Save(
      cellIds,
      DateTime.fromISO(startAt)
    )
  }
}
