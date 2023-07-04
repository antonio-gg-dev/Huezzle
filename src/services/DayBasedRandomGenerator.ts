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
}
