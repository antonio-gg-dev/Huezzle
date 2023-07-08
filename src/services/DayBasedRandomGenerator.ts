import SeedRandom from 'seedrandom'
import { DateTime } from 'luxon'

export class DayBasedRandomGenerator {
  private readonly random: () => number

  constructor (seed: string) {
    const daySeed = DateTime.now().toISODate() ?? ''
    this.random = SeedRandom(`${daySeed} ${seed}`)
  }

  rnd (): number {
    return this.random()
  }

  minMax (min: number, max: number): number {
    return min + (this.random() * (max - min))
  }

  from <T> (values: T[]): T {
    return values[Math.floor(this.minMax(0, values.length))]
  }

  hash (length = 6): string {
    let hash = ''
    while (hash.length < length) {
      hash += this.random().toString(36).substring(2, 20)
    }

    return hash.substring(0, length)
  }
}
