export interface RawSettings {
  tutorialDone: boolean | undefined,
}

export class Settings {
  constructor (
    private tutorialDone: boolean
  ) {}

  resetTutorial (): Settings {
    this.tutorialDone = false

    return this
  }

  makeTutorial (): Settings {
    this.tutorialDone = true

    return this
  }

  showTutorial (): boolean {
    return !this.tutorialDone
  }

  toRaw (): RawSettings {
    return {
      tutorialDone: this.tutorialDone
    }
  }

  static fromRaw ({ tutorialDone }: RawSettings): Settings {
    return new Settings(
      tutorialDone ?? false
    )
  }
}
