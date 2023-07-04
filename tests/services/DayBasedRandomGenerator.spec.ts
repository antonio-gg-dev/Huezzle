import { DayBasedRandomGenerator } from '@/services/DayBasedRandomGenerator'

describe('@/services/DayBasedRandomGenerator', () => {
  describe('rnd', () => {
    it('should generate a new random number each time its called', () => {
      const random = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(random.rnd()).not.toBe(random.rnd())
      }
    })

    it('should generate predictable random numbers when many created with the same seed', () => {
      const firstRandom = new DayBasedRandomGenerator('seed')
      const secondRandom = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(firstRandom.rnd()).toBe(secondRandom.rnd())
      }
    })

    it('should not generate the same numbers when many created with the different seeds', () => {
      const firstRandom = new DayBasedRandomGenerator('one seed')
      const secondRandom = new DayBasedRandomGenerator('another seed')

      for (let i = 0; i < 20; i++) {
        expect(firstRandom.rnd()).not.toBe(secondRandom.rnd())
      }
    })
  })

  describe('minMax', () => {
    it('should generate a new random number each time its called', () => {
      const random = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(random.minMax(0, 1)).not.toBe(random.minMax(0, 1))
      }
    })

    it('should generate predictable random numbers when many created with the same seed', () => {
      const firstRandom = new DayBasedRandomGenerator('seed')
      const secondRandom = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(firstRandom.minMax(0, 1)).toBe(secondRandom.minMax(0, 1))
      }
    })

    it('should not generate the same numbers when many created with the different seeds', () => {
      const firstRandom = new DayBasedRandomGenerator('one seed')
      const secondRandom = new DayBasedRandomGenerator('another seed')

      for (let i = 0; i < 20; i++) {
        expect(firstRandom.minMax(0, 1)).not.toBe(secondRandom.minMax(0, 1))
      }
    })

    it('should generate numbers bigger o equal than given min', () => {
      const random = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(random.minMax(1000, 2000)).toBeGreaterThanOrEqual(1000)
      }
    })

    it('should generate numbers smaller o equal than given max', () => {
      const random = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(random.minMax(1000, 2000)).toBeLessThanOrEqual(2000)
      }
    })
  })

  describe('hash', () => {
    it('should generate a new random string each time its called', () => {
      const random = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(random.hash()).not.toBe(random.hash())
      }
    })

    it('should generate predictable random strings when many created with the same seed', () => {
      const firstRandom = new DayBasedRandomGenerator('seed')
      const secondRandom = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 20; i++) {
        expect(firstRandom.hash()).toBe(secondRandom.hash())
      }
    })

    it('should not generate the same strings when many created with the different seeds', () => {
      const firstRandom = new DayBasedRandomGenerator('one seed')
      const secondRandom = new DayBasedRandomGenerator('another seed')

      for (let i = 0; i < 20; i++) {
        expect(firstRandom.hash()).not.toBe(secondRandom.hash())
      }
    })

    it.each`
      given
      ${2}
      ${5}
      ${7}
      ${30}
    `('should return strings with given length of "$given"', ({ given }) => {
      const random = new DayBasedRandomGenerator('seed')

      for (let i = 0; i < 5; i++) {
        expect(random.hash(given)).toHaveLength(given)
      }
    })
  })
})
