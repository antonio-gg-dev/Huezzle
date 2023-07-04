import { Cell } from '@/entities/Cell'

describe('@/entities/Cell', () => {
  it('should have an unique id', () => {
    for (let i = 0; i < 20; i++) {
      expect((new Cell('white')).id).not.toBe((new Cell('black')).id)
    }
  })
})
