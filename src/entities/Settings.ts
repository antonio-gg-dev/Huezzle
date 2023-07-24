export const enum Theme {
  auto = 'auto',
  dark = 'dark',
  light = 'light'
}

export interface RawSettings {
  tutorialDone: boolean | undefined,
  theme: Theme | undefined
}

export class Settings {
  constructor (
    public tutorialDone: boolean,
    public theme: Theme
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

  setTheme (theme: Theme): Settings {
    this.theme = theme
    return this
  }

  getTheme (): Theme {
    return this.theme
  }

  toRaw (): RawSettings {
    return {
      tutorialDone: this.tutorialDone,
      theme: this.theme
    }
  }

  static fromRaw ({ tutorialDone, theme }: RawSettings): Settings {
    return new Settings(
      tutorialDone ?? false,
      theme ?? Theme.auto
    )
  }
}
