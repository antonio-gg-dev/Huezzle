import { Board } from '@/entities/Board'
import {
  anotherFixedCell,
  fixedCell,
  blackCell,
  blueCell,
  greenCell,
  orangeCell,
  pinkCell,
  purpleCell,
  redCell,
  whiteCell,
  yellowCell
} from './fixtures/Cell'
import { UnevenRowLengthError } from '@/exceptions/UnevenRowLengthError'

describe('@/entities/Board', () => {
  describe('construction', () => {
    it('should throw an error for uneven row lengths in the cell matrix', () => {
      expect(() => new Board([
        [blackCell, redCell],
        [blueCell]
      ])).toThrowError(new UnevenRowLengthError())
    })
  })

  describe('swap', () => {
    it('should swap cells properly', () => {
      const board = new Board([
        [blackCell, redCell],
        [blueCell, whiteCell]
      ])

      board.swap(0, 0, 1, 1)

      expect(board.cells).toStrictEqual([
        [whiteCell/* <- */, redCell],
        [blueCell, /* -> */blackCell]
      ])

      board.swap(0, 1, 1, 1)

      expect(board.cells).toStrictEqual([
        [whiteCell, redCell],
        [blackCell/* <- */, /* -> */blueCell]
      ])

      board.swap(0, 1, 1, 0)

      expect(board.cells).toStrictEqual([
        [whiteCell, /* -> */blackCell],
        [redCell/* <- */, blueCell]
      ])
    })

    it('should "swap" one cell to itself', () => {
      const board = new Board([[blackCell, blueCell]])

      board.swap(0, 0, 0, 0)

      expect(board.cells).toStrictEqual([[blackCell, blueCell]])
    })
  })

  describe('movements', () => {
    it('should start on 0', () => {
      const board = new Board([[purpleCell]])

      expect(board.movements).toBe(0)
    })

    it('should count movements properly', () => {
      const board = new Board([
        [pinkCell, redCell],
        [yellowCell, orangeCell]
      ])

      board.swap(0, 1, 0, 0)

      expect(board.movements).toBe(1)

      board.swap(0, 1, 0, 0)

      expect(board.movements).toBe(2)

      board.swap(0, 1, 0, 0)

      expect(board.movements).toBe(3)
    })

    it('should not count when swap a cell to itself', () => {
      const board = new Board([[greenCell, yellowCell]])

      board.swap(1, 0, 1, 0)

      expect(board.movements).toBe(0)
    })
  })

  describe('is solved', () => {
    it('should be true just right after instanced', () => {
      const board = new Board([
        [purpleCell, redCell],
        [blueCell, blackCell]
      ])

      expect(board.isSolved).toBe(true)
    })

    it('should be false if not is in its initial state', () => {
      const board = new Board([
        [purpleCell, redCell],
        [blueCell, blackCell]
      ])

      board.swap(1, 1, 0, 0)

      expect(board.isSolved).toBe(false)
    })

    it('should be true again if it returns to its initial state', () => {
      const board = new Board([
        [purpleCell, redCell],
        [blueCell, blackCell]
      ])

      board.swap(1, 1, 0, 0)
        .swap(1, 1, 0, 0)

      expect(board.isSolved).toBe(true)
    })
  })

  describe('shuffle', () => {
    it('should stop being solved after being shuffled', () => {
      const board = new Board([
        [whiteCell, yellowCell, greenCell],
        [pinkCell, orangeCell, blueCell],
        [purpleCell, redCell, blackCell]
      ])

      board.shuffle()

      expect(board.isSolved).toBe(false)
    })

    it('should be shuffled constantly if shuffled the same day', () => {
      const firstBoard = new Board([
        [whiteCell, yellowCell, greenCell],
        [pinkCell, orangeCell, blueCell],
        [purpleCell, redCell, blackCell]
      ])

      const secondBoard = new Board([
        [whiteCell, yellowCell, greenCell],
        [pinkCell, orangeCell, blueCell],
        [purpleCell, redCell, blackCell]
      ])

      firstBoard.shuffle()
      secondBoard.shuffle()

      expect(firstBoard.cells).toStrictEqual(secondBoard.cells)
    })

    it('should not shuffle fixed cells', () => {
      const board = new Board([
        [fixedCell, yellowCell, greenCell],
        [pinkCell, orangeCell, blueCell],
        [purpleCell, redCell, anotherFixedCell]
      ])

      board.shuffle()

      expect(board.cells[0][0]).toBe(fixedCell)
      expect(board.cells[2][2]).toBe(anotherFixedCell)
    })
  })
})
