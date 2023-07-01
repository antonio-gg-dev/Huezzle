import { Board } from '@/entities/Board'
import { Cell } from '@/entities/Cell'

describe('@/entities/Board', () => {
  it('should swap cells properly', () => {
    const board = new Board([
      [new Cell('black'), new Cell('red')],
      [new Cell('blue'), new Cell('white')]
    ])

    board.swap(0, 0, 1, 1)
    expect(board.cells).toStrictEqual([
      [new Cell('white'), new Cell('red')],
      [new Cell('blue'), new Cell('black')]
    ])
  })
})
