export const enum Theme {
  auto = 'auto',
  dark = 'dark',
  light = 'light'
}

export interface RawSettings {
  tutorialDone: boolean | undefined,
  theme: Theme | undefined,
  language: string | null | undefined
}

export class Settings {
  constructor (
    public tutorialDone: boolean,
    public theme: Theme,
    public language: string | null
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

  setLanguage (language: string | null): Settings {
    this.language = language
    return this
  }

  getLanguage (): string {
    return this.language ?? navigator.language
  }

  toRaw (): RawSettings {
    return {
      tutorialDone: this.tutorialDone,
      theme: this.theme,
      language: this.language
    }
  }

  static fromRaw ({ tutorialDone, theme, language }: RawSettings): Settings {
    return new Settings(
      tutorialDone ?? false,
      theme ?? Theme.auto,
      language ?? null

    )
  }
}
